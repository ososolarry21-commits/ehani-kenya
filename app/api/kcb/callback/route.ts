import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('=== KCB CALLBACK RECEIVED ===')
    console.log(JSON.stringify(body, null, 2))

    const stkCallback = body.Body?.stkCallback
    if (!stkCallback) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const { ResultCode, ResultDesc, MerchantRequestID, CallbackMetadata } = stkCallback

    // 🆕 FIX: Look up using MerchantRequestID (which we saved in the STK step)
    const { data: listing, error: fetchError } = await supabase
      .from('listings')
      .select('id')
      .eq('checkout_request_id', MerchantRequestID)
      .single()

    if (fetchError || !listing) {
      console.error('Listing not found for MerchantRequestID:', MerchantRequestID)
      return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' }) 
    }

    if (ResultCode === 0) {
      // ✅ Payment Successful
      const receiptItem = CallbackMetadata?.Item?.find((item: any) => item.Name === 'MpesaReceiptNumber')

      await supabase
        .from('listings')
        .update({ 
          verification_payment_received: true,
          verification_receipt: receiptItem?.Value || null,
          status: 'Pending Admin Approval' 
        })
        .eq('id', listing.id)
      
      console.log(`✅ Payment successful for listing ${listing.id}`)
    } else {
      console.log(`❌ Payment failed: ${ResultDesc}`)
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })

  } catch (error: any) {
    console.error('💥 CALLBACK CRASH:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
