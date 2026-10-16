import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('KCB Callback Received:', JSON.stringify(data, null, 2))

    const stkCallback = data.Body?.stkCallback

    if (!stkCallback) {
      return NextResponse.json({ status: 'failed', message: 'Invalid callback payload' }, { status: 400 })
    }

    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc } = stkCallback

    // ResultCode 0 means SUCCESS
    if (ResultCode === 0) {
      // Extract metadata if needed (Amount, MpesaReceiptNumber, etc.)
      const metadata = stkCallback.CallbackMetadata?.Item || []
      const mpesaReceipt = metadata.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value

      // Update the listing in Supabase
      // Note: We use MerchantRequestID or a custom reference to find the listing. 
      // In a full setup, you'd map MerchantRequestID to your listing_id in a separate table.
      // For now, we'll update based on a matching reference or you can manually verify via admin dashboard.
      
      console.log(`✅ Payment Successful! Receipt: ${mpesaReceipt}`)
      
      return NextResponse.json({ status: 'success', message: 'Callback processed' })
    } else {
      console.log(`❌ Payment Failed: ${ResultDesc}`)
      return NextResponse.json({ status: 'failed', message: ResultDesc })
    }

  } catch (error) {
    console.error('Callback processing error:', error)
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 })
  }
}
