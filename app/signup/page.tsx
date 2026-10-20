'use client'
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function SignupPage() {
  const searchParams = useSearchParams()
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<'student' | 'landlord'>('student')
  const [selectedTier, setSelectedTier] = useState<string>('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  // Auto-select role and tier from URL parameters (from Pricing Page)
  useEffect(() => {
    const urlRole = searchParams.get('role')
    const urlTier = searchParams.get('tier')
    
    if (urlRole === 'landlord') setRole('landlord')
    if (urlTier) setSelectedTier(urlTier)
  }, [searchParams])

  async function handleSignUp() {
    setLoading(true)
    setMsg('')
    
    if (!fullName || !phone || !email || !password) {
      setMsg('⚠️ Please fill in all fields.')
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: { 
        data: { 
          role: role,
          full_name: fullName,
          phone: phone,
          tier: selectedTier || 'free' 
        } 
      }
    })
    
    if (error) {
      if (error.message.includes('already registered')) {
        setMsg('⚠️ Email already exists. Please log in.')
      } else {
        setMsg(error.message)
      }
      setLoading(false)
      return
    }

    if (data.user) {
      setMsg('✅ Account created! Please check your email to verify before logging in.')
    }
    setLoading(false)
  }

  const getTierName = () => {
    switch(selectedTier) {
      case 'verified': return 'Verified (KSh 500)'
      case 'premium': return 'Premium (KSh 1,500)'
      default: return 'Free Starter'
    }
  }

  // 🎨 Shared Input Style (Matches Login Page)
  const inputStyle: React.CSSProperties = { 
    width: '100%', padding: '14px 16px', marginBottom: 12, boxSizing: 'border-box', 
    border: '1px solid #E0D8D0', borderRadius: 10, fontSize: 15,
    color: '#1C1209', background: '#FAFAFA', outline: 'none', transition: 'all 0.2s'
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FDF8F3 0%, #E8DFD5 100%)', //  Warm brand background
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: 20
    }}>
      <div style={{ 
        background: 'white',
        padding: '40px 35px',
        borderRadius: 20,
        boxShadow: '0 10px 40px rgba(28, 18, 9, 0.08)', 
        maxWidth: 420,
        width: '100%'
      }}>
        {/* LOGO */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          textAlign: 'center', 
          marginBottom: 24 
        }}>
          <img src="/logo.png" alt="Ehani" style={{ height: '80px', width: 'auto', marginBottom: '4px', display: 'block' }} />
          <p style={{ color: '#6B5B4E', margin: 0, fontSize: 12, letterSpacing: '1px', fontWeight: 600, textTransform: 'uppercase' }}>
            Search. Settle. Study.
          </p>
        </div>

        {/* 🆕 MATCHING TYPOGRAPHY */}
        <h2 style={{ margin: '0 0 8px 0', color: '#1C1209', textAlign: 'center', fontSize: 26, fontWeight: 800, letterSpacing: '-0.5px' }}>
          Create Your Account
        </h2>
        <p style={{ textAlign: 'center', color: '#6B5B4E', fontSize: 14, marginBottom: 24 }}>
          Join Ehani Homes today.
        </p>

        {/* Show selected tier from pricing page */}
        {selectedTier && (
          <div style={{ 
            background: '#F0EAE3', 
            padding: '12px', 
            borderRadius: 10, 
            textAlign: 'center', 
            marginBottom: 20,
            border: '1px solid #D4873A'
          }}>
            <p style={{ margin: 0, color: '#1C1209', fontSize: 13, fontWeight: 600 }}>
              Selected Plan: {getTierName()}
            </p>
          </div>
        )}
        
        {/* Full Name */}
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={inputStyle}
        />

        {/* Phone Number */}
        <input
          placeholder="Phone Number (e.g., 0712345678)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={inputStyle}
        />
        
        {/* Email */}
        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        
        {/* Password */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ ...inputStyle, marginBottom: 0, paddingRight: 45 }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18, padding: 4 }}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        {/* Role Selection */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#1C1209', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>I am a:</label>
          <div style={{ display: 'flex', gap: 10 }}>
            <button 
              type="button"
              onClick={() => setRole('student')}
              style={{ 
                flex: 1, padding: '12px', 
                background: role === 'student' ? '#1C1209' : 'white', 
                color: role === 'student' ? 'white' : '#1C1209',
                border: '1px solid #E0D8D0', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: 14, transition: 'all 0.2s' 
              }}
            >
              🎓 Student
            </button>
            <button 
              type="button"
              onClick={() => setRole('landlord')}
              style={{ 
                flex: 1, padding: '12px', 
                background: role === 'landlord' ? '#1C1209' : 'white', 
                color: role === 'landlord' ? 'white' : '#1C1209',
                border: '1px solid #E0D8D0', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: 14, transition: 'all 0.2s' 
              }}
            >
               Landlord
            </button>
          </div>
        </div>
        
        {/* Sign Up Button */}
        <button 
          onClick={handleSignUp} 
          disabled={loading}
          style={{ 
            width: '100%', padding: '14px', background: '#D4873A', color: 'white', 
            border: 'none', borderRadius: 10, cursor: loading ? 'not-allowed' : 'pointer', 
            fontWeight: 700, fontSize: 16, marginBottom: 16, 
            boxShadow: '0 4px 12px rgba(212, 135, 58, 0.3)', transition: 'transform 0.2s' 
          }}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        {/* Success/Error Message */}
        {msg && (
          <div style={{ 
            padding: 12, 
            background: msg.includes('✅') ? '#D4EDDA' : '#F8D7DA', 
            color: msg.includes('✅') ? '#155724' : '#721C24', 
            borderRadius: 8, fontSize: 13, textAlign: 'center', marginBottom: 16 
          }}>
            {msg}
          </div>
        )}

        {/* Back to Login */}
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={() => window.location.href = '/'}
            style={{ 
              background: 'transparent', border: 'none', color: '#6B5B4E', 
              cursor: 'pointer', fontSize: 14, fontWeight: 600 
            }}
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  )
}
