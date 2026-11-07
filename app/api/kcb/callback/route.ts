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
      return NextResponse.json({ error: 'Invalid callback payload' }, { status: 400 })
    }

    const { ResultCode, ResultDesc, CheckoutRequestID, CallbackMetadata } = stkCallback

    // Find the listing using the CheckoutRequestID we saved during the STK push
    const { data: listing, error: fetchError } = await supabase
      .from('listings')
      .select('id')
      .eq('checkout_request_id', CheckoutRequestID)
      .single()

    if (fetchError || !listing) {
      console.error('Listing not found for CheckoutRequestID:', CheckoutRequestID)
      // Still return 200 to KCB so they stop retrying
      return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' }) 
    }

    if (ResultCode === 0) {
      // ✅ Payment Successful
      const receiptItem = CallbackMetadata?.Item?.find((item: any) => item.Name === 'MpesaReceiptNumber')

      await supabase
        .from('listings')
        .update({ 
          verification_payment_received: true,
          mpesa_receipt_number: receiptItem?.Value || null,
          status: 'Pending Admin Approval' // Triggers the next step in your workflow
        })
        .eq('id', listing.id)
      
      console.log(`✅ Payment successful for listing ${listing.id}`)
    } else {
      // ❌ Payment Failed or Cancelled (e.g., ResultCode 1032 = Cancelled by user)
      console.log(`❌ Payment failed for listing ${listing.id}: ${ResultDesc}`)
      // We leave verification_payment_received as false so the landlord can retry
    }

    // KCB expects a 200 OK response to acknowledge receipt of the callback
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })

  } catch (error: any) {
    console.error('💥 CALLBACK CRASH:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
