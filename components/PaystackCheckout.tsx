'use client'
import { usePaystackPayment } from 'react-paystack'
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
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '', 
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

  // This is the magic hook that opens the Paystack popup
  const initializePayment = usePaystackPayment(config)

  const handleSuccess = (reference: any) => {
    console.log("Payment successful:", reference)
    onSuccess(reference.reference)
    setLoading(false)
  }

  const handleClose = () => {
    console.log("Payment window closed")
    setLoading(false)
  }

  return (
    <button
      onClick={() => {
        setLoading(true)
        initializePayment(handleSuccess, handleClose)
      }}
      disabled={loading}
      style={{
        width: '100%',
        padding: '14px',
        background: loading ? '#ccc' : '#D4873A',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontWeight: '700',
        fontSize: '15px',
        marginTop: '10px'
      }}
    >
      {loading ? 'Processing...' : `Pay KSh ${amount.toLocaleString()} for ${tier === 'verified' ? 'Verification' : 'Featured'}`}
    </button>
  )
}
