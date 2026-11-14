'use client'
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

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
  const [referredBy, setReferredBy] = useState<string>('') // 🆕 Affiliate tracking state
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  // Auto-select role, tier, and referrer from URL parameters
  useEffect(() => {
    const urlRole = searchParams.get('role')
    const urlTier = searchParams.get('tier')
    const urlRef = searchParams.get('ref') // 🆕 Capture the ref parameter
    
    if (urlRole === 'landlord') setRole('landlord')
    if (urlTier) setSelectedTier(urlTier)
    if (urlRef) setReferredBy(urlRef) // 🆕 Save it to state
  }, [searchParams])

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
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
          tier: selectedTier || 'free',
          referred_by: referredBy || null // 🆕 Pass the referrer to Supabase metadata
        } 
      }
    })
    
    if (error) {
      if (error.message.includes('already registered')) {
        setMsg('⚠️ Email already exists. Please log in.')
      } else {
        setMsg('⚠️ ' + error.message)
      }
      setLoading(false)
      return
    }

    if (data.user) {
      setMsg('✅ Account created! Check your email to verify.')
    }
    setLoading(false)
  }

  // 🆕 UPDATED: Reflects the new KSh 1,000 Verified pricing
  const getTierName = () => {
    switch(selectedTier) {
      case 'verified': return 'Verified (KSh 1,000)'
      case 'premium': return 'Premium (KSh 1,500)'
      default: return 'Free Starter'
    }
  }

  // 🎨 Compact Input Style (Matches optimized Login Page)
  const inputStyle: React.CSSProperties = { 
    width: '100%', padding: '12px 14px', marginBottom: 10, boxSizing: 'border-box', 
    border: '1px solid #E0D8D0', borderRadius: 8, fontSize: 14,
    color: '#1C1209', background: '#FAFAFA', outline: 'none', transition: 'all 0.2s'
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FDF8F3 0%, #E8DFD5 100%)', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: 16
    }}>
      <div style={{ 
        background: 'white',
        padding: '28px 24px',
        borderRadius: 16,
        boxShadow: '0 10px 40px rgba(28, 18, 9, 0.08)', 
        maxWidth: 400,
        width: '100%'
      }}>
        {/* Compact Logo Area */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          textAlign: 'center', 
          marginBottom: 16 
        }}>
          <img src="/logo.png" alt="Ehani" style={{ height: '50px', width: 'auto', marginBottom: '4px', display: 'block' }} />
          <p style={{ color: '#6B5B4E', margin: 0, fontSize: 11, letterSpacing: '1.5px', fontWeight: 700, textTransform: 'uppercase' }}>
            Search. Settle. Study.
          </p>
        </div>

        <form onSubmit={handleSignUp}>
          {/* Compact Title */}
          <h2 style={{ margin: '0 0 12px 0', color: '#1C1209', textAlign: 'center', fontSize: 20, fontWeight: 800 }}>
            Create Account
          </h2>

          {/* Selected Tier Banner (Compact) */}
          {selectedTier && (
            <div style={{ 
              background: '#FDF8F3', 
              padding: '8px 12px', 
              borderRadius: 6, 
              textAlign: 'center', 
              marginBottom: 12,
              border: '1px solid #D4873A'
            }}>
              <p style={{ margin: 0, color: '#1C1209', fontSize: 12, fontWeight: 600 }}>
                Selected Plan: {getTierName()}
              </p>
            </div>
          )}
          
          {/* Full Name */}
          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={inputStyle}
          />

          {/* Phone Number */}
          <input
            placeholder="Phone Number (e.g., 0712345678)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={inputStyle}
          />
          
          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          
          {/* Password with Industry Standard SVG Icon */}
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ ...inputStyle, marginBottom: 0, paddingRight: 40 }}
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)} 
              style={{ 
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', 
                background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
                color: '#6B5B4E', display: 'flex', alignItems: 'center'
              }}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          </div>

          {/* Role Selection */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#1C1209', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>I am a:</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button 
                type="button"
                onClick={() => setRole('student')}
                style={{ 
                  flex: 1, padding: '10px', 
                  background: role === 'student' ? '#1C1209' : 'white', 
                  color: role === 'student' ? 'white' : '#1C1209',
                  border: '1px solid #E0D8D0', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13, transition: 'all 0.2s' 
                }}
              >
                🎓 Student
              </button>
              <button 
                type="button"
                onClick={() => setRole('landlord')}
                style={{ 
                  flex: 1, padding: '10px', 
                  background: role === 'landlord' ? '#1C1209' : 'white', 
                  color: role === 'landlord' ? 'white' : '#1C1209',
                  border: '1px solid #E0D8D0', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13, transition: 'all 0.2s' 
                }}
              >
                🏠 Landlord
              </button>
            </div>
          </div>
          
          {/* Sign Up Button */}
          <button 
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', padding: '12px', background: '#D4873A', color: 'white', 
              border: 'none', borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer', 
              fontWeight: 700, fontSize: 15, marginBottom: 12, 
              boxShadow: '0 4px 12px rgba(212, 135, 58, 0.2)' 
            }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          {/* Success/Error Message */}
          {msg && (
            <div style={{ 
              padding: 10, 
              background: msg.includes('✅') ? '#D4EDDA' : '#F8D7DA', 
              color: msg.includes('✅') ? '#155724' : '#721C24', 
              borderRadius: 6, fontSize: 12, textAlign: 'center', marginBottom: 12 
            }}>
              {msg}
            </div>
          )}

          {/* Back to Login Link */}
          <div style={{ textAlign: 'center', borderTop: '1px solid #E0D8D0', paddingTop: 16, fontSize: 13, color: '#6B5B4E' }}>
            Already have an account?{' '}
            <Link href="/" style={{ color: '#D4873A', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Log in
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
