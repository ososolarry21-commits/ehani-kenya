import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { phoneNumber, amount, invoiceNumber } = body

    const consumerKey = process.env.KCB_BUNI_CONSUMER_KEY
    const consumerSecret = process.env.KCB_BUNI_CONSUMER_SECRET
    const callbackUrl = process.env.KCB_CALLBACK_URL

    console.log('=== KCB STK PUSH DEBUG ===')
    console.log('Consumer Key present:', !!consumerKey)
    console.log('Consumer Secret present:', !!consumerSecret)
    console.log('Callback URL:', callbackUrl)
    console.log('Phone:', phoneNumber)
    console.log('Amount:', amount)
    console.log('Invoice:', invoiceNumber)

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json({ error: 'Missing KCB credentials' }, { status: 500 })
    }

    if (!callbackUrl) {
      return NextResponse.json({ error: 'Missing callback URL' }, { status: 500 })
    }

    // Step 1: Generate Authentication Token (from KCB spec)
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
    
    const tokenResponse = await fetch('https://sandbox.buni.kcbgroup.com/token?grant_type=client_credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: 'grant_type=client_credentials',
    })

    const tokenData = await tokenResponse.json()
    console.log('Token Response:', tokenData)

    if (!tokenResponse.ok || !tokenData.access_token) {
      return NextResponse.json({ 
        error: 'Authentication failed', 
        details: tokenData.fault?.message || 'Check your credentials'
      }, { status: 401 })
    }

    // Step 2: Send STK Push Request (following KCB spec exactly)
    const stkPayload = {
      phoneNumber: phoneNumber,           // e.g., "254710236242"
      amount: amount.toString(),          // e.g., "500"
      invoiceNumber: `522533-${invoiceNumber}`, // KCB Paybill + reference
      sharedShortCode: true,              // As per KCB spec
      orgShortCode: "",                   // Optional - leave empty
      orgPassKey: "",                     // Optional - leave empty
      transactionDescription: "Ehani Homes Verification",
      callbackUrl: callbackUrl,           // Must be HTTPS
    }

    console.log('Sending STK Payload:', JSON.stringify(stkPayload, null, 2))

    const stkResponse = await fetch('https://sandbox.buni.kcbgroup.com/mm/api/request/1.0.0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify(stkPayload),
    })

    const result = await stkResponse.json()
    console.log('KCB Response:', result)

    if (!stkResponse.ok) {
      return NextResponse.json({ 
        error: result.header?.statusDescription || result.fault?.message || 'STK Push failed',
        details: result
      }, { status: stkResponse.status })
    }

    return NextResponse.json({ 
      success: true, 
      message: result.header?.statusDescription || 'Request accepted',
      checkoutRequestId: result.response?.CheckoutRequestID 
    })

  } catch (error: any) {
    console.error('=== STK PUSH ERROR ===', error)
    return NextResponse.json({ 
      error: error.message || 'Internal server error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}
