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
  
  //  Forgot Password States
  const [showReset, setShowReset] = useState(false)
  const [resetMsg, setResetMsg] = useState('')

  // 🆕 Forgot Password Logic
  async function handlePasswordReset() {
    setLoading(true)
    setResetMsg('')
    
    if (!email) {
      setResetMsg('⚠️ Please enter your email address first.')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://ehani.co.ke', // Redirects them back to your site after clicking the link
    })

    if (error) {
      setResetMsg('⚠️ ' + error.message)
    } else {
      setResetMsg('✅ Password reset link sent! Please check your email inbox (and spam folder).')
    }
    setLoading(false)
  }

  // SECURE LOGIN
  async function logIn() {
    setLoading(true)
    setMsg('')
    
    const failedAttempts = parseInt(localStorage.getItem(`failed_attempts_${email}`) || '0')
    
    if (failedAttempts >= 3) {
      const lockoutTime = parseInt(localStorage.getItem(`lockout_time_${email}`) || '0')
      const now = Date.now()
      if (now - lockoutTime < 15 * 60 * 1000) { 
        const minutesLeft = Math.ceil((15 * 60 * 1000 - (now - lockoutTime)) / 60000)
        setMsg(`🔒 Too many failed attempts. Please try again in ${minutesLeft} minutes.`)
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
        setMsg(' Account temporarily locked. Try again in 15 minutes.')
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
        setMsg('️ Admin account. Select "Landlord" to login.')
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

      if (dbRole === 'student') {
        window.location.href = '/browse'
      } else if (dbRole === 'admin') {
        window.location.href = '/admin'
      } else if (dbRole === 'agent') {
        window.location.href = '/agent'
      } else {
        window.location.href = '/dashboard'
      }
    }
    setLoading(false)
  }

  return (
    <>
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        padding: 20
      }}>
        <div style={{ 
          background: 'white',
          padding: '50px 40px',
          borderRadius: 24,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          maxWidth: 450,
          width: '100%'
        }}>
          {/* LOGO */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <img 
              src="/logo.png" 
              alt="Ehani" 
              style={{ 
                height: '100px', 
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
                marginBottom: '8px',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
              }} 
            />
            <p style={{ color: '#6B5B4E', margin: 0, fontSize: 13, letterSpacing: '0.5px' }}>
              Search. Settle. Study.
            </p>
          </div>

          {/* 🆕 FORGOT PASSWORD VIEW */}
          {showReset ? (
            <>
              <h2 style={{ margin: '0 0 24px 0', color: '#1C1209', textAlign: 'center', fontSize: 22 }}>Reset Password</h2>
              <p style={{ textAlign: 'center', color: '#6B5B4E', fontSize: 14, marginBottom: 20 }}>
                Enter your email address and we will send you a link to reset your password.
              </p>
              
              <input
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', marginBottom: 16, boxSizing: 'border-box', border: '1px solid #DDD0C4', borderRadius: 8, fontSize: 16 }}
              />
              
              <button 
                onClick={handlePasswordReset} 
                disabled={loading}
                style={{ width: '100%', padding: '14px', background: '#D4873A', color: 'white', border: 'none', borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 16, marginBottom: 16 }}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>

              {resetMsg && (
                <div style={{ padding: 12, background: resetMsg.includes('✅') ? '#D4EDDA' : '#F8D7DA', color: resetMsg.includes('✅') ? '#155724' : '#721C24', borderRadius: 8, fontSize: 13, textAlign: 'center', marginBottom: 16 }}>
                  {resetMsg}
                </div>
              )}

              <div style={{ textAlign: 'center' }}>
                <button 
                  onClick={() => { setShowReset(false); setResetMsg(''); }}
                  style={{ padding: '10px 24px', background: 'transparent', color: '#D4873A', border: '2px solid #D4873A', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}
                >
                  ← Back to Login
                </button>
              </div>
            </>
          ) : (
            /* 🆕 STANDARD LOGIN VIEW */
            <>
              <h2 style={{ margin: '0 0 24px 0', color: '#1C1209', textAlign: 'center', fontSize: 22 }}>Welcome Back</h2>
              
              <input
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', marginBottom: 12, boxSizing: 'border-box', border: '1px solid #DDD0C4', borderRadius: 8, fontSize: 16 }}
              />
              
              <div style={{ position: 'relative', marginBottom: 16 }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '12px 45px 12px 14px', boxSizing: 'border-box', border: '1px solid #DDD0C4', borderRadius: 8, fontSize: 16 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px', padding: '4px' }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#1C1209', fontSize: 13 }}>I am a:</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button 
                    type="button"
                    onClick={() => setRole('student')}
                    style={{ flex: 1, padding: '10px', background: role === 'student' ? '#D4873A' : 'white', color: role === 'student' ? 'white' : '#1C1209', border: '1px solid #DDD0C4', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}
                  >
                    🎓 Student
                  </button>
                  <button 
                    type="button"
                    onClick={() => setRole('landlord')}
                    style={{ flex: 1, padding: '10px', background: role === 'landlord' ? '#D4873A' : 'white', color: role === 'landlord' ? 'white' : '#1C1209', border: '1px solid #DDD0C4', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}
                  >
                     Landlord
                  </button>
                </div>
              </div>
              
              <button 
                onClick={logIn} 
                disabled={loading}
                style={{ width: '100%', padding: '14px', background: '#D4873A', color: 'white', border: 'none', borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: 16, marginBottom: 16, opacity: loading ? 0.6 : 1 }}
              >
                {loading ? 'Processing...' : 'Log In'}
              </button>

              {msg && (
                <div style={{ padding: 12, background: '#F8D7DA', color: '#721C24', borderRadius: 8, fontSize: 13, textAlign: 'center', marginBottom: 16 }}>
                  {msg}
                </div>
              )}

              {/* Forgot Password Link */}
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <button 
                  onClick={() => setShowReset(true)}
                  style={{ background: 'transparent', border: 'none', color: '#007BFF', cursor: 'pointer', fontSize: 13, fontWeight: 600, textDecoration: 'underline' }}
                >
                  Forgot Password?
                </button>
              </div>

              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <p style={{ color: '#6B5B4E', fontSize: 13, marginBottom: 8 }}>Don't have an account?</p>
                <button 
                  onClick={() => window.location.href = '/signup'}
                  style={{ padding: '10px 24px', background: '#333', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
                >
                  Create Account →
                </button>
              </div>

              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#6B5B4E', fontSize: 13, marginBottom: 8 }}>Just browsing?</p>
                <button 
                  onClick={() => window.location.href = '/browse'}
                  style={{ padding: '10px 24px', background: 'transparent', color: '#D4873A', border: '2px solid #D4873A', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}
                >
                  Browse Student Housing →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
