import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Buffer } from 'buffer'; // Added for safety

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// Define CORS headers to attach to ALL responses
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
    const { phoneNumber, amount, invoiceNumber } = body

    const consumerKey = process.env.KCB_CONSUMER_KEY
    const consumerSecret = process.env.KCB_CONSUMER_SECRET
    const callbackUrl = process.env.KCB_CALLBACK_URL || 'https://ehani.co.ke/api/kcb-callback'

    console.log('=== KCB STK PUSH DEBUG (PRODUCTION) ===')
    console.log('Keys present:', !!consumerKey, !!consumerSecret)
    console.log('Callback:', callbackUrl)
    console.log('Raw Phone:', phoneNumber, 'Amount:', amount, 'Invoice:', invoiceNumber)

    // 1. Check for keys
    if (!consumerKey || !consumerSecret) {
      return NextResponse.json({ error: 'Missing KCB environment variables' }, { status: 500, headers: corsHeaders })
    }

    // 2. Generate Authentication Token
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
    const tokenUrl = 'https://accounts.buni.kcbgroup.com/oauth2/token'
    
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
    try {
      tokenData = JSON.parse(tokenText)
    } catch (e) {
      return NextResponse.json({ error: 'Token endpoint returned HTML', snippet: tokenText.substring(0, 100) }, { status: 500, headers: corsHeaders })
    }

    if (!tokenRes.ok || !tokenData.access_token) {
      return NextResponse.json({ error: 'KCB Auth Failed', details: tokenData }, { status: 401, headers: corsHeaders })
    }

    // 3. Format Payload
    const formattedInvoice = `8151420-${invoiceNumber}`
    let cleanPhone = String(phoneNumber).replace(/[\s\-\+]/g, '');
    if (cleanPhone.startsWith('0')) cleanPhone = cleanPhone.substring(1);
    const formattedPhone = cleanPhone.startsWith('254') ? cleanPhone : `254${cleanPhone}`;

    const stkPayload = {
      phoneNumber: formattedPhone,
      amount: amount.toString(),
      invoiceNumber: formattedInvoice,
      sharedShortCode: true,
      orgShortCode: '',
      orgPassKey: '',
      transactionDescription: 'Ehani Homes Payment',
      callbackUrl: callbackUrl,
    }

    // 4. Send STK Push
    const stkUrl = 'https://uat.buni.kcbgroup.com/mm/api/request/1.0.0/stkpush'
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
    try {
      stkData = JSON.parse(stkText)
    } catch (e) {
      return NextResponse.json({ error: 'STK endpoint returned HTML', snippet: stkText.substring(0, 100) }, { status: 500, headers: corsHeaders })
    }

    if (!stkRes.ok) {
      return NextResponse.json({ 
        error: stkData.header?.statusDescription || 'STK Failed',
        details: stkData
      }, { status: stkRes.status, headers: corsHeaders })
    }

    // 5. Update Supabase
    const { error: dbError } = await supabase
      .from('listings')
      .update({ 
        verification_payment_received: false, 
        checkout_request_id: stkData.response?.CheckoutRequestID 
      })
      .eq('id', invoiceNumber)

    if (dbError) console.error('DB Error:', dbError)

    return NextResponse.json({ 
      success: true, 
      message: 'STK Push sent successfully',
      checkoutRequestId: stkData.response?.CheckoutRequestID 
    }, { headers: corsHeaders })

  } catch (error: any) {
    console.error('💥 CRASH:', error)
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders })
  }
}
