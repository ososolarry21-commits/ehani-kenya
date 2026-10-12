'use client'
import { PaystackButton } from 'react-paystack'
import { useState } from 'react'

interface PaystackCheckoutProps {
  email: string
  amount: number // Amount in KSh
  tier: 'verified' | 'featured'
  onSuccess: (reference: string) => void
}

export default function PaystackCheckout({ email, amount, tier, onSuccess }: PaystackCheckoutProps) {
  const [loading, setLoading] = useState(false)

  // IMPORTANT: Paystack calculates amounts in Kobo/Cents. KSh 1 = 100.
  const amountInKobo = amount * 100 

  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amountInKobo,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '', // We will add this key next
    metadata: {
      custom_fields: [
        {
          display_name: "Listing Tier",
          variable_name: "listing_tier",
          value: tier,
        },
      ],
    },
  }

  const handlePaystackSuccessAction = (reference: any) => {
    // This is where we will eventually tell Supabase to update the database!
    console.log("Payment successful:", reference)
    onSuccess(reference.reference)
    setLoading(false)
  }

  const handlePaystackCloseAction = () => {
    console.log("Payment window closed")
    setLoading(false)
  }

  const componentProps = {
    ...config,
    text: loading ? 'Processing...' : `Pay KSh ${amount.toLocaleString()} for ${tier === 'verified' ? 'Verification' : 'Featured'}`,
    onSuccess: handlePaystackSuccessAction,
    onClose: handlePaystackCloseAction,
  }

  return (
    <PaystackButton 
      {...componentProps} 
      className="paystack-btn"
      style={{
        width: '100%',
        padding: '14px',
        background: '#D4873A',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '700',
        fontSize: '15px',
        marginTop: '10px'
      }}
    />
  )
}
