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

    // 1. Generate Token (Using UAT URL from Spec)
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
    
    const tokenRes = await fetch('https://uat.buni.kcbgroup.com/token?grant_type=client_credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: 'grant_type=client_credentials',
    })

    const tokenData = await tokenRes.json()
    
    if (!tokenRes.ok || !tokenData.access_token) {
      console.error('Token Error:', tokenData)
      return NextResponse.json({ error: 'KCB Auth Failed' }, { status: 401 })
    }

    // 2. Format Payload EXACTLY as per KCB Spec
    // Spec says invoiceNumber format: KCBTILLNO-YOURACCREF
    // KCB Paybill is 522533
    const formattedInvoice = `522533-${invoiceNumber}`

    const stkPayload = {
      phoneNumber: phoneNumber,       // e.g., "254710236242"
      amount: amount.toString(),      // e.g., "500" (Must be string per spec)
      invoiceNumber: formattedInvoice, // e.g., "522533-VERIFIED-xyz"
      sharedShortCode: true,          // Mandatory boolean per spec
      orgShortCode: "",               // Optional
      orgPassKey: "",                 // Optional
      transactionDescription: "Ehani Homes Verification", // Optional
      callbackUrl: callbackUrl,       // Mandatory secure URL
    }

    console.log('Sending Payload:', JSON.stringify(stkPayload))

    // 3. Send STK Push (Using UAT URL)
    const stkRes = await fetch('https://sandbox.buni.kcbgroup.com/mm/api/request/1.0.0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify(stkPayload),
    })

    const result = await stkRes.json()
    console.log('KCB Response:', result)

    if (!stkRes.ok) {
      return NextResponse.json({ 
        error: result.header?.statusDescription || result.fault?.message || 'STK Failed' 
      }, { status: stkRes.status })
    }

    return NextResponse.json({ 
      success: true, 
      message: result.header?.statusDescription || 'Success',
      checkoutRequestId: result.response?.CheckoutRequestID 
    })

  } catch (error: any) {
    console.error('CRASH:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
