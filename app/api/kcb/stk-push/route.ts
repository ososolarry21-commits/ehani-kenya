import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { phoneNumber, amount, invoiceNumber } = await request.json()
    
    // 1. Get credentials from Vercel
    const consumerKey = process.env.KCB_BUNI_CONSUMER_KEY
    const consumerSecret = process.env.KCB_BUNI_CONSUMER_SECRET
    const callbackUrl = process.env.KCB_CALLBACK_URL

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json({ error: 'Missing KCB credentials in Vercel' }, { status: 500 })
    }
    if (!callbackUrl) {
      return NextResponse.json({ error: 'Missing Callback URL in Vercel' }, { status: 500 })
    }

    // 2. Generate Token directly from KCB Sandbox
    // Using btoa instead of Buffer for better Vercel compatibility
    const credentials = btoa(`${consumerKey}:${consumerSecret}`)
    
    const tokenRes = await fetch('https://sandbox.buni.kcbgroup.com/token?grant_type=client_credentials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: 'grant_type=client_credentials',
    })

    const tokenData = await tokenRes.json()
    
    if (!tokenData.access_token) {
      console.error('Token generation failed:', tokenData)
      return NextResponse.json({ error: 'Auth Failed: ' + (tokenData.fault?.message || 'Check Keys') }, { status: 401 })
    }

    // 3. Send the STK Push Request
    const stkResponse = await fetch('https://sandbox.buni.kcbgroup.com/mm/api/request/1.0.0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber, 
        amount: amount.toString(), 
        invoiceNumber: `522533-${invoiceNumber}`, // KCB Paybill format
        sharedShortCode: true,
        orgShortCode: "",
        orgPassKey: "",
        transactionDescription: "Ehani Homes Verification",
        callbackUrl: callbackUrl,
      }),
    })

    const result = await stkResponse.json()

    // If KCB returns an error (like 400 Bad Request), show it!
    if (!stkResponse.ok) {
      console.error('STK Push failed:', result)
      return NextResponse.json({ error: result.fault?.message || result.header?.statusDescription || 'KCB API Error' }, { status: stkResponse.status })
    }

    return NextResponse.json({ 
      success: true, 
      message: result.header?.statusDescription || 'Request accepted',
      checkoutRequestId: result.response?.CheckoutRequestID 
    })

  } catch (error: any) {
    console.error('KCB STK Push Crash:', error)
    // Return the actual error message so we can see it on the screen
    return NextResponse.json({ error: error.message || 'Unknown crash' }, { status: 500 })
  }
}
