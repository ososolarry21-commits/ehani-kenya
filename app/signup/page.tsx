'use client'
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function Signup() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<'student' | 'landlord'>('student')
  const [tier, setTier] = useState('free')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const roleParam = searchParams.get('role')
    const tierParam = searchParams.get('tier')
    if (roleParam === 'landlord' || roleParam === 'student') setRole(roleParam)
    if (tierParam) setTier(tierParam)
  }, [searchParams])

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMsg('')

    if (password.length < 6) {
      setMsg('⚠️ Password must be at least 6 characters.')
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role, tier }
      }
    })

    if (error) {
      setMsg('⚠️ ' + error.message)
    } else if (data.user) {
      setMsg('✅ Account created! Please check your email to confirm.')
      setTimeout(() => router.push('/'), 2000)
    }
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = { 
    width: '100%', padding: '12px 14px', marginBottom: 12, boxSizing: 'border-box', 
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
        padding: '32px 28px',
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
          marginBottom: 20 
        }}>
          <img 
            src="/logo.png" 
            alt="Ehani" 
            style={{ height: '60px', width: 'auto', marginBottom: '6px', display: 'block' }} 
          />
          <p style={{ color: '#6B5B4E', margin: 0, fontSize: 11, letterSpacing: '1.5px', fontWeight: 700, textTransform: 'uppercase' }}>
            Search. Settle. Study.
          </p>
        </div>

        <form onSubmit={handleSignup}>
          <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
          <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password (Min 6 chars)"
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
              {/* 🆕 INDUSTRY STANDARD SVG ICONS */}
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#1C1209', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>I am a:</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="button" onClick={() => setRole('student')} style={{ flex: 1, padding: '10px', background: role === 'student' ? '#1C1209' : 'white', color: role === 'student' ? 'white' : '#1C1209', border: '1px solid #E0D8D0', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                🎓 Student
              </button>
              <button type="button" onClick={() => setRole('landlord')} style={{ flex: 1, padding: '10px', background: role === 'landlord' ? '#1C1209' : 'white', color: role === 'landlord' ? 'white' : '#1C1209', border: '1px solid #E0D8D0', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                🏠 Landlord
              </button>
            </div>
          </div>

          {role === 'landlord' && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#1C1209', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Select Tier:</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['free', 'verified', 'premium'].map((t) => (
                  <button key={t} type="button" onClick={() => setTier(t)} style={{ flex: 1, padding: '8px', background: tier === t ? '#D4873A' : 'white', color: tier === t ? 'white' : '#1C1209', border: '1px solid #E0D8D0', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 11, textTransform: 'capitalize' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#D4873A', color: 'white', border: 'none', borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 15, marginBottom: 12, boxShadow: '0 4px 12px rgba(212, 135, 58, 0.2)' }}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          {msg && (
            <div style={{ padding: 10, background: msg.includes('✅') ? '#D4EDDA' : '#F8D7DA', color: msg.includes('✅') ? '#155724' : '#721C24', borderRadius: 6, fontSize: 12, textAlign: 'center', marginBottom: 12 }}>
              {msg}
            </div>
          )}

          <div style={{ borderTop: '1px solid #E0D8D0', paddingTop: 16, textAlign: 'center' }}>
            <p style={{ color: '#6B5B4E', fontSize: 12, marginBottom: 0 }}>
              Already have an account?{' '}
              <Link href="/" style={{ color: '#D4873A', textDecoration: 'none', fontWeight: 600 }}>
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
