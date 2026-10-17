'use client'
import { useState } from 'react'

// This component handles the button click and talks to your API
export default function KcbPaymentButton({ phoneNumber, amount, tier, listingId, onSuccess }: any) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePayment = async () => {
    if (!phoneNumber) {
      setError('Please enter a phone number first')
      return
    }

    // Format phone number to 254... (KCB requirement)
    let formattedPhone = phoneNumber
    if (phoneNumber.startsWith('0')) {
      formattedPhone = '254' + phoneNumber.substring(1)
    } else if (phoneNumber.startsWith('+254')) {
      formattedPhone = phoneNumber.substring(1) 
    }

    setLoading(true)
    setError('')

    try {
      // Call the API route we built
      const res = await fetch('/api/kcb/stk-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: formattedPhone,
          amount: amount,
          invoiceNumber: `${tier}-${listingId}` 
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Payment request failed')
      }

      if (data.success) {
        // Tell the dashboard that the request was sent successfully
        onSuccess(data.checkoutRequestId, listingId, tier)
      } else {
        throw new Error(data.message || 'Unknown error')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
      <button 
        onClick={handlePayment} 
        disabled={loading}
        style={{
          padding: '10px',
          background: loading ? '#ccc' : '#25D366', // M-Pesa Green
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: 700,
          fontSize: 14,
          width: '100%'
        }}
      >
        {loading ? 'Sending Request...' : `Pay KSh ${amount} via M-Pesa`}
      </button>
      {error && <span style={{ color: 'red', fontSize: 12, textAlign: 'center' }}>{error}</span>}
    </div>
  )
}
