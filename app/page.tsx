'use client'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<'student' | 'landlord'>('student')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  
  const [showReset, setShowReset] = useState(false)
  const [resetMsg, setResetMsg] = useState('')

  async function handlePasswordReset() {
    setLoading(true)
    setResetMsg('')
    if (!email) {
      setResetMsg('⚠️ Please enter your email address first.')
      setLoading(false)
      return
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://ehani.co.ke',
    })
    if (error) {
      setResetMsg('⚠️ ' + error.message)
    } else {
      setResetMsg('✅ Password reset link sent! Please check your email.')
    }
    setLoading(false)
  }

  async function logIn() {
    setLoading(true)
    setMsg('')
    
    const failedAttempts = parseInt(localStorage.getItem(`failed_attempts_${email}`) || '0')
    if (failedAttempts >= 3) {
      const lockoutTime = parseInt(localStorage.getItem(`lockout_time_${email}`) || '0')
      const now = Date.now()
      if (now - lockoutTime < 15 * 60 * 1000) { 
        const minutesLeft = Math.ceil((15 * 60 * 1000 - (now - lockoutTime)) / 60000)
        setMsg(`🔒 Too many failed attempts. Try again in ${minutesLeft}m.`)
        setLoading(false)
        return
      } else {
        localStorage.removeItem(`failed_attempts_${email}`)
        localStorage.removeItem(`lockout_time_${email}`)
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      const newAttempts = failedAttempts + 1
      localStorage.setItem(`failed_attempts_${email}`, newAttempts.toString())
      if (newAttempts >= 3) {
        localStorage.setItem(`lockout_time_${email}`, Date.now().toString())
        setMsg('🔒 Account temporarily locked. Try again in 15 mins.')
      } else {
        setMsg(`⚠️ Invalid credentials. ${3 - newAttempts} attempts left.`)
      }
      setLoading(false)
      return
    }

    if (data.user) {
      localStorage.removeItem(`failed_attempts_${email}`)
      localStorage.removeItem(`lockout_time_${email}`)

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, is_locked')
        .eq('id', data.user.id)
        .single()

      if (profileError || !profile) {
        setMsg('⚠️ Account profile not found. Please sign up again.')
        await supabase.auth.signOut()
        setLoading(false)
        return
      }

      if (profile.is_locked) {
        setMsg('🔒 Account locked by admin. Contact support.')
        await supabase.auth.signOut()
        setLoading(false)
        return
      }

      const dbRole = profile.role

      if (dbRole === 'admin' && role !== 'landlord') {
        setMsg('⚠️ Admin account. Select "Landlord" to login.')
        setLoading(false)
        return
      }
      if (dbRole === 'agent' && role !== 'landlord') {
        setMsg('⚠️ Agent account. Select "Landlord" to login.')
        setLoading(false)
        return
      }
      if (dbRole !== role && dbRole !== 'admin' && dbRole !== 'agent') {
        setMsg(`⚠️ Account is ${dbRole}. Select ${dbRole} button.`)
        setLoading(false)
        return
      }

      if (dbRole === 'student') window.location.href = '/browse'
      else if (dbRole === 'admin') window.location.href = '/admin'
      else if (dbRole === 'agent') window.location.href = '/agent'
      else window.location.href = '/dashboard'
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

        {showReset ? (
          <>
            <h2 style={{ margin: '0 0 6px 0', color: '#1C1209', textAlign: 'center', fontSize: 20, fontWeight: 800 }}>Reset Password</h2>
            <p style={{ textAlign: 'center', color: '#6B5B4E', fontSize: 13, marginBottom: 16, lineHeight: 1.4 }}>
              Enter your email to receive a reset link.
            </p>
            
            <input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            
            <button onClick={handlePasswordReset} disabled={loading} style={{ width: '100%', padding: '12px', background: '#D4873A', color: 'white', border: 'none', borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            {resetMsg && (
              <div style={{ padding: 10, background: resetMsg.includes('✅') ? '#D4EDDA' : '#F8D7DA', color: resetMsg.includes('✅') ? '#155724' : '#721C24', borderRadius: 6, fontSize: 12, textAlign: 'center', marginBottom: 12 }}>
                {resetMsg}
              </div>
            )}

            <div style={{ textAlign: 'center' }}>
              <button onClick={() => { setShowReset(false); setResetMsg(''); }} style={{ background: 'transparent', border: 'none', color: '#D4873A', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                ← Back to Login
              </button>
            </div>
          </>
        ) : (
          <>
            <input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#1C1209', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>I am a:</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" onClick={() => setRole('student')} style={{ flex: 1, padding: '10px', background: role === 'student' ? '#1C1209' : 'white', color: role === 'student' ? 'white' : '#1C1209', border: '1px solid #E0D8D0', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13, transition: 'all 0.2s' }}>
                  🎓 Student
                </button>
                <button type="button" onClick={() => setRole('landlord')} style={{ flex: 1, padding: '10px', background: role === 'landlord' ? '#1C1209' : 'white', color: role === 'landlord' ? 'white' : '#1C1209', border: '1px solid #E0D8D0', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13, transition: 'all 0.2s' }}>
                  🏠 Landlord
                </button>
              </div>
            </div>
            
            <button onClick={logIn} disabled={loading} style={{ width: '100%', padding: '12px', background: '#D4873A', color: 'white', border: 'none', borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 15, marginBottom: 12, boxShadow: '0 4px 12px rgba(212, 135, 58, 0.2)' }}>
              {loading ? 'Processing...' : 'Log In'}
            </button>

            {msg && (
              <div style={{ padding: 10, background: '#F8D7DA', color: '#721C24', borderRadius: 6, fontSize: 12, textAlign: 'center', marginBottom: 12 }}>
                {msg}
              </div>
            )}

            {/* 🆕 COMPACT SIDE-BY-SIDE LINKS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <button onClick={() => setShowReset(true)} style={{ background: 'transparent', border: 'none', color: '#6B5B4E', cursor: 'pointer', fontSize: 12, fontWeight: 500, padding: 0 }}>
                Forgot Password?
              </button>
              <Link href="/browse" style={{ color: '#D4873A', textDecoration: 'none', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Just browsing?
              </Link>
            </div>

            <div style={{ borderTop: '1px solid #E0D8D0', paddingTop: 16, textAlign: 'center' }}>
              <p style={{ color: '#6B5B4E', fontSize: 12, marginBottom: 10 }}>Don't have an account?</p>
              <button onClick={() => window.location.href = '/signup'} style={{ width: '100%', padding: '11px', background: 'white', color: '#1C1209', border: '1px solid #1C1209', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
                Create Account →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
