'use client'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

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
      setResetMsg('✅ Password reset link sent! Please check your email inbox.')
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
        setMsg(` Too many failed attempts. Please try again in ${minutesLeft} minutes.`)
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
        setMsg('🔒 Account temporarily locked. Try again in 15 minutes.')
      } else {
        setMsg(`⚠️ Invalid credentials. ${3 - newAttempts} attempts remaining.`)
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
        setMsg('️ Account profile not found. Please sign up again.')
        await supabase.auth.signOut()
        setLoading(false)
        return
      }

      if (profile.is_locked) {
        setMsg(' Account locked by admin. Contact support.')
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

  // 🎨 Shared Input Style
const inputStyle: React.CSSProperties = { 
    width: '100%', padding: '14px 16px', marginBottom: 12, boxSizing: 'border-box', 
    border: '1px solid #E0D8D0', borderRadius: 10, fontSize: 15,
    color: '#1C1209', background: '#FAFAFA', outline: 'none', transition: 'all 0.2s'
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FDF8F3 0%, #E8DFD5 100%)', // Warm brand background
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
        boxShadow: '0 10px 40px rgba(28, 18, 9, 0.08)', // Soft, modern shadow
        maxWidth: 420,
        width: '100%'
      }}>
        {/* LOGO */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src="/logo.png" alt="Ehani" style={{ height: '80px', width: 'auto', marginBottom: '4px' }} />
          <p style={{ color: '#6B5B4E', margin: 0, fontSize: 12, letterSpacing: '1px', fontWeight: 600, textTransform: 'uppercase' }}>
            Search. Settle. Study.
          </p>
        </div>

        {showReset ? (
          <>
            <h2 style={{ margin: '0 0 8px 0', color: '#1C1209', textAlign: 'center', fontSize: 24, fontWeight: 800 }}>Reset Password</h2>
            <p style={{ textAlign: 'center', color: '#6B5B4E', fontSize: 14, marginBottom: 24, lineHeight: 1.5 }}>
              Enter your email and we'll send you a link to get back into your account.
            </p>
            
            <input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            
            <button onClick={handlePasswordReset} disabled={loading} style={{ width: '100%', padding: '14px', background: '#D4873A', color: 'white', border: 'none', borderRadius: 10, cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 15, marginBottom: 16, boxShadow: '0 4px 12px rgba(212, 135, 58, 0.3)' }}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            {resetMsg && (
              <div style={{ padding: 12, background: resetMsg.includes('✅') ? '#D4EDDA' : '#F8D7DA', color: resetMsg.includes('✅') ? '#155724' : '#721C24', borderRadius: 8, fontSize: 13, textAlign: 'center', marginBottom: 16 }}>
                {resetMsg}
              </div>
            )}

            <div style={{ textAlign: 'center' }}>
              <button onClick={() => { setShowReset(false); setResetMsg(''); }} style={{ background: 'transparent', border: 'none', color: '#D4873A', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
                ← Back to Login
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ margin: '0 0 8px 0', color: '#1C1209', textAlign: 'center', fontSize: 26, fontWeight: 800, letterSpacing: '-0.5px' }}>Welcome Back</h2>
            <p style={{ textAlign: 'center', color: '#6B5B4E', fontSize: 14, marginBottom: 24 }}>Log in to continue your journey.</p>
            
            <input placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...inputStyle, marginBottom: 0, paddingRight: 45 }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18, padding: 4 }}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#1C1209', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>I am a:</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" onClick={() => setRole('student')} style={{ flex: 1, padding: '12px', background: role === 'student' ? '#1C1209' : 'white', color: role === 'student' ? 'white' : '#1C1209', border: '1px solid #E0D8D0', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: 14, transition: 'all 0.2s' }}>
                  🎓 Student
                </button>
                <button type="button" onClick={() => setRole('landlord')} style={{ flex: 1, padding: '12px', background: role === 'landlord' ? '#1C1209' : 'white', color: role === 'landlord' ? 'white' : '#1C1209', border: '1px solid #E0D8D0', borderRadius: 10, cursor: 'pointer', fontWeight: 600, fontSize: 14, transition: 'all 0.2s' }}>
                  🏠 Landlord
                </button>
              </div>
            </div>
            
            <button onClick={logIn} disabled={loading} style={{ width: '100%', padding: '14px', background: '#D4873A', color: 'white', border: 'none', borderRadius: 10, cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 16, marginBottom: 16, boxShadow: '0 4px 12px rgba(212, 135, 58, 0.3)', transition: 'transform 0.2s' }}>
              {loading ? 'Processing...' : 'Log In'}
            </button>

            {msg && (
              <div style={{ padding: 12, background: '#F8D7DA', color: '#721C24', borderRadius: 8, fontSize: 13, textAlign: 'center', marginBottom: 16 }}>
                {msg}
              </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <button onClick={() => setShowReset(true)} style={{ background: 'transparent', border: 'none', color: '#6B5B4E', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
                Forgot Password?
              </button>
            </div>

            <div style={{ borderTop: '1px solid #E0D8D0', paddingTop: 20, textAlign: 'center' }}>
              <p style={{ color: '#6B5B4E', fontSize: 13, marginBottom: 12 }}>Don't have an account?</p>
              <button onClick={() => window.location.href = '/signup'} style={{ width: '100%', padding: '12px', background: 'white', color: '#1C1209', border: '1px solid #1C1209', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
                Create Account →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
