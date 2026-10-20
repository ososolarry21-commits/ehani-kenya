'use client'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<'student' | 'landlord'>('student')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

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
          phone: phone
        } 
      }
    })
    
    if (error) {
      if (error.message.includes('already registered')) {
        setMsg('️ Email already exists. Please log in.')
      } else {
        setMsg(error.message)
      }
      setLoading(false)
      return
    }

    if (data.user) {
      // ✅ Profile created automatically by trigger
      setMsg('✅ Account created! Please check your email to verify before logging in.')
    }
    setLoading(false)
  }

  return (
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
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <img src="/logo.png" alt="Ehani" style={{ height: '100px', width: 'auto', marginBottom: '8px' }} />
          <p style={{ color: '#6B5B4E', margin: 0, fontSize: 13 }}>Search. Settle. Study.</p>
        </div>

        <h2 style={{ margin: '0 0 24px 0', color: '#1C1209', textAlign: 'center' }}>Create Your Account</h2>
        
        {/* Full Name */}
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{ width: '100%', padding: '12px 14px', marginBottom: 12, border: '1px solid #DDD0C4', borderRadius: 8, fontSize: 16 }}
        />

        {/* Phone Number */}
        <input
          placeholder="Phone Number (e.g., 0712345678)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: '100%', padding: '12px 14px', marginBottom: 12, border: '1px solid #DDD0C4', borderRadius: 8, fontSize: 16 }}
        />
        
        {/* Email */}
        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '12px 14px', marginBottom: 12, border: '1px solid #DDD0C4', borderRadius: 8, fontSize: 16 }}
        />
        
        {/* Password */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px 45px 12px 14px', border: '1px solid #DDD0C4', borderRadius: 8, fontSize: 16 }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            {showPassword ? '' : '👁️'}
          </button>
        </div>

        {/* Role Selection */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#1C1209', fontSize: 13 }}>I am a:</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              onClick={() => setRole('student')}
              style={{ 
                flex: 1, padding: '10px', 
                background: role === 'student' ? '#D4873A' : 'white', 
                color: role === 'student' ? 'white' : '#1C1209',
                border: '1px solid #DDD0C4', borderRadius: 8, cursor: 'pointer', fontWeight: 600 
              }}
            >
              🎓 Student
            </button>
            <button 
              onClick={() => setRole('landlord')}
              style={{ 
                flex: 1, padding: '10px', 
                background: role === 'landlord' ? '#D4873A' : 'white', 
                color: role === 'landlord' ? 'white' : '#1C1209',
                border: '1px solid #DDD0C4', borderRadius: 8, cursor: 'pointer', fontWeight: 600 
              }}
            >
              🏠 Landlord
            </button>
          </div>
        </div>
        
        {/* Sign Up Button */}
        <button 
          onClick={handleSignUp} 
          disabled={loading}
          style={{ 
            width: '100%', padding: '14px', background: '#333', color: 'white', 
            border: 'none', borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer', 
            fontWeight: 700, fontSize: 16, marginBottom: 16 
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
              padding: '10px 24px', background: 'transparent', color: '#D4873A', 
              border: '2px solid #D4873A', borderRadius: 8, cursor: 'pointer', 
              fontWeight: 600, fontSize: 13 
            }}
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  )
}
