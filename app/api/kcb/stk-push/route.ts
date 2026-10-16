import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { phoneNumber, amount, invoiceNumber } = await request.json()
    
    // Get credentials from Vercel
    const consumerKey = process.env.KCB_BUNI_CONSUMER_KEY
    const consumerSecret = process.env.KCB_BUNI_CONSUMER_SECRET
    const callbackUrl = process.env.KCB_CALLBACK_URL // Make sure this is set in Vercel!

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json({ error: 'Missing KCB credentials' }, { status: 500 })
    }

    // 1. Generate Token directly from KCB (No internal fetch needed!)
    const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
    
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
      return NextResponse.json({ error: 'Failed to authenticate with KCB' }, { status: 500 })
    }

    // 2. Send the STK Push Request
    // Note: Using the exact URL format from your KCB Buni screenshot
    const stkResponse = await fetch('https://sandbox.buni.kcbgroup.com/mm/api/request/1.0.0', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber, // e.g., "254710236242"
        amount: amount.toString(), // e.g., "500"
        invoiceNumber: `522533-${invoiceNumber}`, // KCB Paybill is 522533
        sharedShortCode: true,
        orgShortCode: "",
        orgPassKey: "",
        transactionDescription: "Ehani Homes Verification",
        callbackUrl: callbackUrl,
      }),
    })

    const result = await stkResponse.json()

    if (!stkResponse.ok) {
      console.error('STK Push failed:', result)
      return NextResponse.json({ error: result.fault?.message || 'STK Push failed' }, { status: stkResponse.status })
    }

    return NextResponse.json({ 
      success: true, 
      message: result.header?.statusDescription || 'Request accepted',
      checkoutRequestId: result.response?.CheckoutRequestID 
    })

  } catch (error) {
    console.error('KCB STK Push Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
