import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { phoneNumber, amount, invoiceNumber } = await request.json()
    const callbackUrl = process.env.NEXT_PUBLIC_KCB_CALLBACK_URL || 'https://posthere.io/f613-4b7f-b82b' // Fallback for testing

    // 1. Get the auth token first
    const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/kcb/get-token`)
    const tokenData = await tokenRes.json()
    
    if (!tokenData.accessToken) {
      return NextResponse.json({ error: 'Failed to authenticate with KCB' }, { status: 500 })
    }

    // 2. Format the payload exactly as per KCB Spec
    const payload = {
      phoneNumber: phoneNumber, // e.g., "254712345678"
      amount: amount.toString(), // e.g., "500"
      invoiceNumber: `522533-${invoiceNumber}`, // KCB Paybill is 522533
      sharedShortCode: true,
      orgShortCode: "",
      orgPassKey: "",
      transactionDescription: "Ehani Homes Verification",
      callbackUrl: callbackUrl,
    }

    // 3. Send the STK Push request to KCB Sandbox
    // Note: Change to 'https://uat.buni.kcbgroup.com/api/v1/mpesa/express' for production
    const stkResponse = await fetch('https://sandbox.buni.kcbgroup.com/api/v1/mpesa/express', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.accessToken}`,
      },
      body: JSON.stringify(payload),
    })

    const result = await stkResponse.json()

    if (!stkResponse.ok) {
      return NextResponse.json({ error: 'STK Push failed', details: result }, { status: stkResponse.status })
    }

    return NextResponse.json({ 
      success: true, 
      message: result.header?.statusDescription || 'Request accepted for processing',
      checkoutRequestId: result.response?.CheckoutRequestID 
    })

  } catch (error) {
    console.error('KCB STK Push Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
