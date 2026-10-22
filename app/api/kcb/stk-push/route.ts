import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

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
    console.log('Phone:', phoneNumber, 'Amount:', amount, 'Invoice:', invoiceNumber)

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json({ error: 'Missing KCB environment variables' }, { status: 500 })
    }

    // 1. Generate Authentication Token (PRODUCTION Environment)
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
    const tokenUrl = 'https://accounts.buni.kcbgroup.com/oauth2/token' // <-- CHANGED TO PROD
    
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
      console.error('❌ TOKEN ENDPOINT RETURNED HTML! Snippet:', tokenText.substring(0, 300))
      return NextResponse.json({ error: 'Token endpoint returned HTML' }, { status: 500 })
    }

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error('Token Error:', tokenData)
      return NextResponse.json({ error: 'KCB Auth Failed', details: tokenData }, { status: 401 })
    }

    console.log('✅ Token obtained successfully')

    // 2. Format Payload EXACTLY as per KCB Spec: KCBTILLNO-YOURACCREF
    // Using your REAL Till Number: 8151420
    const formattedInvoice = `8151420-${invoiceNumber}` // <-- CHANGED TO REAL TILL

    const stkPayload = {
           // 1. Clean up the phone number (remove spaces, dashes, plus signs)
      let cleanPhone = phoneNumber.replace(/[\s\-\+]/g, '');
      
      // 2. Remove leading '0' if it exists (e.g., 0712... becomes 712...)
      if (cleanPhone.startsWith('0')) {
        cleanPhone = cleanPhone.substring(1);
      }
      
      // 3. Ensure it starts with '254'
      const formattedPhone = cleanPhone.startsWith('254') ? cleanPhone : `254${cleanPhone}`;
      amount: amount.toString(),
      invoiceNumber: formattedInvoice,
      sharedShortCode: true,
      orgShortCode: '',
      orgPassKey: '',
      transactionDescription: 'Ehani Homes Payment',
      callbackUrl: callbackUrl,
    }

    // 3. Send STK Push to the PRODUCTION KCB Buni Endpoint
    const stkUrl = 'https://buni.kcbgroup.com/mm/api/request/1.0.0' // <-- CHANGED TO PROD URL

    console.log('🎯 Hitting PROD STK URL:', stkUrl)

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
      console.error('❌ STK ENDPOINT RETURNED HTML! Snippet:', stkText.substring(0, 300))
      return NextResponse.json({ error: 'STK endpoint returned HTML' }, { status: 500 })
    }

    console.log('✅ KCB JSON Response:', stkData)

    if (!stkRes.ok) {
      return NextResponse.json({ 
        error: stkData.header?.statusDescription || stkData.fault?.message || 'STK Failed',
        details: stkData
      }, { status: stkRes.status })
    }

    // 🆕 4. Update Supabase to save the Checkout Request ID
    // Adjust this logic based on how your frontend passes the invoiceNumber
    const { error: dbError } = await supabase
      .from('listings')
      .update({ 
        verification_payment_received: false, 
        checkout_request_id: stkData.response?.CheckoutRequestID 
      })
      .eq('id', invoiceNumber) // Assuming invoiceNumber is the listing ID

    if (dbError) {
      console.error('⚠️ Failed to update listing status in DB:', dbError)
    } else {
      console.log('✅ Database updated with checkout_request_id')
    }

    return NextResponse.json({ 
      success: true, 
      message: stkData.header?.statusDescription || 'Success',
      checkoutRequestId: stkData.response?.CheckoutRequestID 
    })

  } catch (error: any) {
    console.error('💥 CRASH:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
