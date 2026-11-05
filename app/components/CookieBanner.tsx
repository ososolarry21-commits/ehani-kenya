'use client'
import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('ehani_cookie_consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('ehani_cookie_consent', 'accepted')
    setShowBanner(false)
  }

  const handleDecline = () => {
    localStorage.setItem('ehani_cookie_consent', 'declined')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#1C1209',
      color: 'white',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px',
      zIndex: 9999,
      boxShadow: '0 -4px 20px rgba(0,0,0,0.15)',
      fontSize: '14px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <p style={{ margin: 0, maxWidth: '800px', lineHeight: '1.5' }}>
        We use cookies to ensure you get the best experience on our website, analyze site traffic, and secure our platform. By clicking "Accept", you consent to our use of cookies. 
        <a href="/terms#part-b" style={{ color: '#D4873A', textDecoration: 'underline', marginLeft: '4px' }}>Read our Cookie Policy</a>.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button 
          onClick={handleDecline}
          style={{
            background: 'transparent',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Decline
        </button>
        <button 
          onClick={handleAccept}
          style={{
            background: '#D4873A',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Accept
        </button>
      </div>
    </div>
  )
}
