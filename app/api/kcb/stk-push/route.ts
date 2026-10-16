import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { phoneNumber, amount, invoiceNumber } = body

    const consumerKey = process.env.KCB_BUNI_CONSUMER_KEY
    const consumerSecret = process.env.KCB_BUNI_CONSUMER_SECRET
    const callbackUrl = process.env.KCB_CALLBACK_URL

    // Debug: Log what we have (check Vercel logs after testing)
    console.log('KCB Keys present:', !!consumerKey, !!consumerSecret)
    console.log('Callback URL:', callbackUrl)
    console.log('Phone:', phoneNumber, 'Amount:', amount)

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json({ error: 'Missing KCB credentials' }, { status: 500 })
    }

    if (!callbackUrl) {
      return NextResponse.json({ error: 'Missing callback URL' }, { status: 500 })
    }

    // Step 1: Get token from KCB
    const credentials = btoa(`${consumerKey}:${consumerSecret}`)
    
    const tokenResponse = await fetch('https://sandbox.buni.kcbgroup.com/token?grant_type=client_credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: 'grant_type=client_credentials',
    })

    const tokenData = await tokenResponse.json()
    console.log('Token response:', tokenData)

    if (!tokenResponse.ok || !tokenData.access_token) {
      return NextResponse.json({ 
        error: 'Authentication failed', 
        details: tokenData 
      }, { status: 401 })
    }

    // Step 2: Send STK Push
    const stkResponse = await fetch('https://sandbox.buni.kcbgroup.com/mm/api/request/1.0.0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        amount: amount.toString(),
        invoiceNumber: `522533-${invoiceNumber}`,
        sharedShortCode: true,
        orgShortCode: '',
        orgPassKey: '',
        transactionDescription: 'Ehani Homes Verification',
        callbackUrl: callbackUrl,
      }),
    })

    const result = await stkResponse.json()
    console.log('STK Response:', result)

    if (!stkResponse.ok) {
      return NextResponse.json({ 
        error: result.fault?.message || result.header?.statusDescription || 'STK Push failed' 
      }, { status: stkResponse.status })
    }

    return NextResponse.json({ 
      success: true, 
      message: result.header?.statusDescription || 'Request accepted',
      checkoutRequestId: result.response?.CheckoutRequestID 
    })

  } catch (error: any) {
    console.error('STK Push error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
