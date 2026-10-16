import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { phoneNumber, amount, invoiceNumber } = body

    // ✅ Declare environment variables FIRST
    const consumerKey = process.env.KCB_BUNI_CONSUMER_KEY
    const consumerSecret = process.env.KCB_BUNI_CONSUMER_SECRET
    const callbackUrl = process.env.KCB_CALLBACK_URL

    // ✅ Now log them (they're defined now)
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

    // Step 1: Generate Authentication Token
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
    
    const tokenResponse = await fetch('https://uat.buni.kcbgroup.com/token?grant_type=client_credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: 'grant_type=client_credentials',
    })

    // Check if response is JSON before parsing
    const contentType = tokenResponse.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await tokenResponse.text()
      console.error('Token endpoint returned non-JSON:', text.substring(0, 200))
      return NextResponse.json({ 
        error: 'KCB token endpoint returned HTML instead of JSON',
        status: tokenResponse.status 
      }, { status: 500 })
    }

    const tokenData = await tokenResponse.json()
    console.log('Token Response Status:', tokenResponse.status)
    console.log('Token Data:', tokenData)

    if (!tokenResponse.ok || !tokenData.access_token) {
      return NextResponse.json({ 
        error: 'Authentication failed', 
        details: tokenData.fault?.message || 'Check your credentials'
      }, { status: 401 })
    }

    // Step 2: Send STK Push Request
    const stkPayload = {
      phoneNumber: phoneNumber,
      amount: amount.toString(),
      invoiceNumber: `522533-${invoiceNumber}`,
      sharedShortCode: true,
      orgShortCode: '',
      orgPassKey: '',
      transactionDescription: 'Ehani Homes Verification',
      callbackUrl: callbackUrl,
    }

    console.log('Sending STK Payload:', JSON.stringify(stkPayload, null, 2))

    const stkResponse = await fetch('https://uat.buni.kcbgroup.com/mm/api/request/1.0.0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify(stkPayload),
    })

    // Check if response is JSON before parsing
    const stkContentType = stkResponse.headers.get('content-type')
    if (!stkContentType || !stkContentType.includes('application/json')) {
      const text = await stkResponse.text()
      console.error('STK endpoint returned non-JSON:', text.substring(0, 200))
      return NextResponse.json({ 
        error: 'KCB STK endpoint returned HTML instead of JSON',
        status: stkResponse.status 
      }, { status: 500 })
    }

    const result = await stkResponse.json()
    console.log('KCB Response Status:', stkResponse.status)
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
