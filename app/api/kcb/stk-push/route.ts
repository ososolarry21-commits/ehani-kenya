import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Buffer } from 'buffer';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // invoiceNumber here is actually the Listing ID passed from frontend
    const { phoneNumber, amount, invoiceNumber: listingId } = body 

    const consumerKey = process.env.KCB_BUNI_CONSUMER_KEY
    const consumerSecret = process.env.KCB_BUNI_CONSUMER_SECRET
    const callbackUrl = process.env.KCB_BUNI_CALLBACK_URL || 'https://ehani.co.ke/api/kcb/callback'

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json({ error: 'Missing KCB environment variables' }, { status: 500, headers: corsHeaders })
    }

    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
    const tokenUrl = 'https://api.buni.kcbgroup.com/token'
    
    const tokenRes = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: 'grant_type=client_credentials',
    })

    const tokenText = await tokenRes.text()
    let tokenData
    try { tokenData = JSON.parse(tokenText) } catch (e) { return NextResponse.json({ error: 'Token error' }, { status: 500 }) }

    if (!tokenRes.ok || !tokenData.access_token) {
      return NextResponse.json({ error: 'KCB Auth Failed' }, { status: 401 })
    }

    // 🆕 FIX 1: Generate a short, clean reference code (e.g., EH293847)
    const shortRef = 'EH' + Math.floor(100000 + Math.random() * 900000);
    const formattedInvoice = `522533-${shortRef}`;
    
    let cleanPhone = String(phoneNumber).replace(/[\s\-\+]/g, '');
    if (cleanPhone.startsWith('0')) cleanPhone = cleanPhone.substring(1);
    const formattedPhone = cleanPhone.startsWith('254') ? cleanPhone : `254${cleanPhone}`;

    const stkPayload = {
      phoneNumber: formattedPhone,
      amount: amount.toString(),
      invoiceNumber: formattedInvoice, // Sends short code to M-Pesa
      sharedShortCode: true,
      orgShortCode: '',
      orgPassKey: '',
      transactionDescription: 'Ehani Homes Verification',
      callbackUrl: callbackUrl,
    }

    const stkUrl = 'https://api.buni.kcbgroup.com/mm/api/request/1.0.0/stkpush'
    
    const stkRes = await fetch(stkUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify(stkPayload),
    })

    const stkText = await stkRes.text()
    let stkData
    try { stkData = JSON.parse(stkText) } catch (e) { return NextResponse.json({ error: 'STK error' }, { status: 500 }) }

    if (!stkRes.ok) {
      return NextResponse.json({ error: stkData.header?.statusDescription || 'STK Failed' }, { status: stkRes.status })
    }

    // 🆕 FIX 2: Save the MerchantRequestID instead of CheckoutRequestID
    // The MerchantRequestID is always a valid string, whereas CheckoutRequestID can be boolean false
    const merchantId = stkData.response?.MerchantRequestID;

    if (merchantId) {
      const { error: dbError } = await supabase
        .from('listings')
        .update({ 
          verification_payment_received: false, 
          checkout_request_id: merchantId // We store MerchantID here for reliable matching
        })
        .eq('id', listingId)

      if (dbError) console.error('DB Error:', dbError)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'STK Push sent successfully',
      reference: formattedInvoice // Send short code back to frontend if needed
    }, { headers: corsHeaders })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
