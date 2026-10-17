import { NextResponse } from 'next/server'

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

    if (!consumerKey || !consumerSecret || !callbackUrl) {
      return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 })
    }

    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
    
    // 1. Force Sandbox Token URL (since keys are from Sandbox portal)
    const tokenUrl = 'https://sandbox.buni.kcbgroup.com/token?grant_type=client_credentials'
    console.log('🎯 Hitting Token URL:', tokenUrl)

    const tokenRes = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: 'grant_type=client_credentials',
    })

    // Read as text FIRST to prevent JSON parse crashes
    const tokenText = await tokenRes.text()
    console.log('Token Response Status:', tokenRes.status)
    console.log('Token Response Type:', tokenRes.headers.get('content-type'))
    
    let tokenData
    try {
      tokenData = JSON.parse(tokenText)
    } catch (e) {
      console.error('❌ TOKEN ENDPOINT RETURNED HTML! Snippet:', tokenText.substring(0, 300))
      return NextResponse.json({ 
        error: 'Token endpoint returned HTML. Your keys might not match this environment.',
        snippet: tokenText.substring(0, 200)
      }, { status: 500 })
    }

    if (!tokenRes.ok || !tokenData.access_token) {
      console.error('Token Error:', tokenData)
      return NextResponse.json({ error: 'KCB Auth Failed', details: tokenData }, { status: 401 })
    }

    console.log('✅ Token obtained successfully')

    // 2. Send STK Push to Sandbox
    const stkUrl = 'https://sandbox.buni.kcbgroup.com/mm/api/request/1.0.0'
    console.log('🎯 Hitting STK URL:', stkUrl)

    const stkPayload = {
      phoneNumber: phoneNumber,
      amount: amount.toString(),
      invoiceNumber: `522533-TEST123`, // Format: KCBTILLNO-YOURACCREF
      sharedShortCode: true,
      orgShortCode: '',
      orgPassKey: '',
      transactionDescription: 'Ehani Homes Verification',
      callbackUrl: callbackUrl,
    }

    const stkRes = await fetch(stkUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify(stkPayload),
    })

    // Read as text FIRST to prevent JSON parse crashes
    const stkText = await stkRes.text()
    console.log('STK Response Status:', stkRes.status)
    console.log('STK Response Type:', stkRes.headers.get('content-type'))

    let stkData
    try {
      stkData = JSON.parse(stkText)
    } catch (e) {
      console.error('❌ STK ENDPOINT RETURNED HTML! Snippet:', stkText.substring(0, 300))
      return NextResponse.json({ 
        error: 'STK endpoint returned HTML.',
        snippet: stkText.substring(0, 200)
      }, { status: 500 })
    }

    console.log('✅ KCB JSON Response:', stkData)

    if (!stkRes.ok) {
      return NextResponse.json({ 
        error: stkData.header?.statusDescription || stkData.fault?.message || 'STK Failed',
        details: stkData
      }, { status: stkRes.status })
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
