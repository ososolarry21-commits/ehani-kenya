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

    const consumerKey = process.env.KCB_BUNI_CONSUMER_KEY
    const consumerSecret = process.env.KCB_BUNI_CONSUMER_SECRET
    const callbackUrl = process.env.KCB_CALLBACK_URL

    console.log('=== KCB STK PUSH DEBUG ===')
    console.log('Keys present:', !!consumerKey, !!consumerSecret)
    console.log('Callback:', callbackUrl)
    console.log('Phone:', phoneNumber, 'Amount:', amount, 'Invoice:', invoiceNumber)

    if (!consumerKey || !consumerSecret || !callbackUrl) {
      return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 })
    }

    // 1. Generate Authentication Token (UAT Environment)
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
    const tokenUrl = 'https://uat.buni.kcbgroup.com/token?grant_type=client_credentials'
    
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
    // invoiceNumber from frontend is like "VERIFIED-uuid-here"
    const formattedInvoice = `522533-${invoiceNumber}`

    const stkPayload = {
      phoneNumber: phoneNumber,
      amount: amount.toString(),
      invoiceNumber: formattedInvoice,
      sharedShortCode: true,
      orgShortCode: '',
      orgPassKey: '',
      transactionDescription: 'Ehani Homes Verification',
      callbackUrl: callbackUrl,
    }

    // 3. Send STK Push to the CORRECT KCB Buni Endpoint
    const stkUrl = 'https://uat.buni.kcbgroup.com/mm/api/request/1.0.0/stkpush'
    console.log('🎯 Hitting STK URL:', stkUrl)

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

    // 🆕 4. Update Supabase to save the Checkout Request ID for this listing
    // Extract the listing ID from the formatted invoice (e.g., "522533-VERIFIED-uuid" -> "uuid")
    const parts = formattedInvoice.split('-')
    const listingId = parts.slice(2).join('-')

    const { error: dbError } = await supabase
      .from('listings')
      .update({ 
        verification_payment_received: false, // Still pending the actual M-Pesa callback
        checkout_request_id: stkData.response?.CheckoutRequestID 
      })
      .eq('id', listingId)

    if (dbError) {
      console.error('⚠️ Failed to update listing status in DB:', dbError)
      // We don't return an error to the frontend here, because the STK push itself succeeded.
      // The user will still get the PIN prompt.
    } else {
      console.log('✅ Database updated with checkout_request_id for listing:', listingId)
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
