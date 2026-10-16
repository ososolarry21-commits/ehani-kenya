'use client'
import { useState } from 'react'

interface PaymentProps {
  phoneNumber: string
  amount: number
  tier: 'verified' | 'featured'
  listingId: string
  onSuccess: (checkoutRequestId: string) => void
}

export default function KcbPaymentButton({ phoneNumber, amount, tier, listingId, onSuccess }: PaymentProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handlePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setMessage('Please enter a valid phone number (e.g., 0712345678)')
      return
    }

    setLoading(true)
    setMessage('')

    // Format phone number to 2547XXXXXXXX
    let formattedPhone = phoneNumber.replace(/\D/g, '')
    if (formattedPhone.startsWith('0')) formattedPhone = '254' + formattedPhone.substring(1)
    else if (!formattedPhone.startsWith('254')) formattedPhone = '254' + formattedPhone

    try {
      const response = await fetch('/api/kcb/stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: formattedPhone,
          amount: amount,
          invoiceNumber: `${tier.toUpperCase()}-${listingId}`,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage('✅ Check your phone! Enter your M-Pesa PIN to complete.')
        onSuccess(data.checkoutRequestId)
      } else {
        setMessage(`❌ ${data.error || data.details?.header?.statusDescription || 'Payment failed'}`)
      }
    } catch (error) {
      setMessage('❌ Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ width: '100%', marginTop: '10px' }}>
      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          width: '100%',
          padding: '14px',
          background: loading ? '#ccc' : '#00C35D', // M-Pesa Green
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: '700',
          fontSize: '15px',
        }}
      >
        {loading ? 'Sending Prompt...' : `Pay KSh ${amount.toLocaleString()} via M-Pesa`}
      </button>
      {message && (
        <p style={{ fontSize: '12px', color: message.includes('✅') ? '#2A7A5A' : '#DC3545', marginTop: '8px', textAlign: 'center' }}>
          {message}
        </p>
      )}
    </div>
  )
}
