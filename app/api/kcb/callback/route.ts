import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('=== KCB CALLBACK RECEIVED ===')
    console.log(JSON.stringify(data, null, 2))

    const stkCallback = data.Body?.stkCallback

    if (!stkCallback) {
      return NextResponse.json({ status: 'failed', message: 'Invalid callback' }, { status: 400 })
    }

    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc } = stkCallback

    console.log('Result Code:', ResultCode)
    console.log('Result Desc:', ResultDesc)

    // ResultCode 0 = SUCCESS
    if (ResultCode === 0) {
      const metadata = stkCallback.CallbackMetadata?.Item || []
      const mpesaReceipt = metadata.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value
      const amount = metadata.find((item: any) => item.Name === 'Amount')?.Value
      const phoneNumber = metadata.find((item: any) => item.Name === 'PhoneNumber')?.Value

      console.log('✅ Payment Success!')
      console.log('Receipt:', mpesaReceipt)
      console.log('Amount:', amount)
      console.log('Phone:', phoneNumber)

      // TODO: Update your database here
      // You'll need to map MerchantRequestID to your listing_id
      // For now, you can manually verify via admin dashboard

      return NextResponse.json({ status: 'success', message: 'Payment verified' })
    } else {
      console.log('❌ Payment Failed:', ResultDesc)
      return NextResponse.json({ status: 'failed', message: ResultDesc })
    }

  } catch (error: any) {
    console.error('Callback Error:', error)
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
  }
}
