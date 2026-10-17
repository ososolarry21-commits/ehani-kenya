import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
// Note: For backend webhooks, it's often best to use the SUPABASE_SERVICE_ROLE_KEY 
// to bypass Row Level Security, but the ANON_KEY works if your RLS policies allow it.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('=== KCB CALLBACK RECEIVED ===')
    console.log(JSON.stringify(data, null, 2))

    const stkCallback = data.Body?.stkCallback

    if (!stkCallback) {
      console.error('Invalid callback payload')
      return NextResponse.json({ status: 'failed', message: 'Invalid callback payload' }, { status: 400 })
    }

    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc } = stkCallback

    console.log('Result Code:', ResultCode)
    console.log('Result Desc:', ResultDesc)
    console.log('CheckoutRequestID:', CheckoutRequestID)

    // ResultCode 0 = SUCCESS (per KCB Spec)
    if (ResultCode === 0) {
      const metadata = stkCallback.CallbackMetadata?.Item || []
      
      // Extract details from the metadata array
      const mpesaReceipt = metadata.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value
      const amount = metadata.find((item: any) => item.Name === 'Amount')?.Value
      const phoneNumber = metadata.find((item: any) => item.Name === 'PhoneNumber')?.Value

      console.log('✅ Payment Success!')
      console.log('Receipt:', mpesaReceipt)
      console.log('Amount:', amount)
      console.log('Phone:', phoneNumber)

      // 🆕 Update the database using your EXACT column names
      const { error: updateError } = await supabase
        .from('listings')
        .update({ 
          verification_payment_received: true,       // Sets the boolean to TRUE
          verification_receipt: mpesaReceipt         // Saves the M-Pesa code (e.g., UJH8BAT68E)
        })
        .eq('checkout_request_id', CheckoutRequestID) // Matches the ID we saved during STK Push

      if (updateError) {
        console.error('❌ Failed to update database:', updateError)
        return NextResponse.json({ status: 'error', message: 'Database update failed' }, { status: 500 })
      }

      console.log('✅ Database updated successfully for CheckoutRequestID:', CheckoutRequestID)
      return NextResponse.json({ status: 'success', message: 'Payment verified and database updated' })
      
    } else {
      // Handle failures (e.g., User cancelled, Insufficient funds)
      console.log(`❌ Payment Failed: ${ResultDesc}`)
      
      // Optional: You can update the DB to reflect a failed attempt if you want
      await supabase
        .from('listings')
        .update({ verification_payment_received: false })
        .eq('checkout_request_id', CheckoutRequestID)

      return NextResponse.json({ status: 'failed', message: ResultDesc })
    }

  } catch (error: any) {
    console.error('💥 Callback Error:', error)
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
  }
}
