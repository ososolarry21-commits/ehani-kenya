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

    // 1. Generate Token
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

    console.log('Token obtained successfully')

    // 2. Send STK Push - Try SANDBOX URL since you have sandbox keys
    const formattedInvoice = `522533-TEST123`

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

    console.log('Sending Payload:', JSON.stringify(stkPayload))

    // Try sandbox URL first
    const stkRes = await fetch('https://sandbox.buni.kcbgroup.com/mm/api/request/1.0.0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify(stkPayload),
    })

    // Check content type before parsing
    const contentType = stkRes.headers.get('content-type')
    console.log('Response Content-Type:', contentType)
    console.log('Response Status:', stkRes.status)

    // Get response as text first
    const responseText = await stkRes.text()
    console.log('Raw Response:', responseText.substring(0, 500))

    // Try to parse as JSON
    let result
    try {
      result = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Failed to parse JSON. Raw response:', responseText)
      return NextResponse.json({ 
        error: 'KCB returned HTML instead of JSON',
        status: stkRes.status,
        rawResponse: responseText.substring(0, 200)
      }, { status: 500 })
    }

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
