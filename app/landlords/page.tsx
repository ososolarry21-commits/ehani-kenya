'use client'
import { useRouter } from 'next/navigation'

export default function PricingPage() {
  const router = useRouter()

  const handlePlanClick = (tier: 'free' | 'verified' | 'premium') => {
    // Redirect to signup with landlord role pre-selected and tier parameter
    router.push(`/signup?role=landlord&tier=${tier}`)
  }

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: 24, 
      padding: '40px 20px',
      maxWidth: 1200,
      margin: '0 auto'
    }}>
      {/* Starter Card */}
      <div 
        onClick={() => handlePlanClick('free')}
        style={{ 
          background: 'white',
          padding: '40px 30px',
          borderRadius: 16,
          border: '2px solid #E0D8D0',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)'
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(28, 18, 9, 0.12)'
          e.currentTarget.style.borderColor = '#D4873A'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.borderColor = '#E0D8D0'
        }}
      >
        <h3 style={{ margin: '0 0 8px 0', color: '#1C1209', fontSize: 20, fontWeight: 700 }}>Starter</h3>
        <p style={{ margin: '0 0 24px 0', color: '#6B5B4E', fontSize: 14 }}>For individual landlords testing the market.</p>
        
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 48, fontWeight: 800, color: '#1C1209' }}>Free</span>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
          <li style={{ padding: '8px 0', color: '#1C1209', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#2A7A5A' }}>✓</span> List up to 1 property
          </li>
          <li style={{ padding: '8px 0', color: '#1C1209', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#2A7A5A' }}>✓</span> Standard search placement
          </li>
          <li style={{ padding: '8px 0', color: '#6B5B4E', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#D4873A' }}>!</span> Contact info gated behind warning
          </li>
        </ul>

        <button 
          style={{ 
            width: '100%', 
            padding: '14px', 
            background: '#F5F5F5', 
            color: '#1C1209', 
            border: 'none', 
            borderRadius: 10, 
            cursor: 'pointer', 
            fontWeight: 700,
            fontSize: 15,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#E8E8E8'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#F5F5F5'}
        >
          Create Account
        </button>
      </div>

      {/* Verified Card - MOST POPULAR */}
      <div 
        onClick={() => handlePlanClick('verified')}
        style={{ 
          background: 'white',
          padding: '40px 30px',
          borderRadius: 16,
          border: '3px solid #D4873A',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          transform: 'scale(1.05)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)'
          e.currentTarget.style.boxShadow = '0 16px 40px rgba(212, 135, 58, 0.25)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <div style={{ 
          position: 'absolute', 
          top: -12, 
          left: '50%', 
          transform: 'translateX(-50%)',
          background: '#D4873A',
          color: 'white',
          padding: '4px 16px',
          borderRadius: 20,
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Most Popular
        </div>

        <h3 style={{ margin: '0 0 8px 0', color: '#1C1209', fontSize: 20, fontWeight: 700 }}>Verified</h3>
        <p style={{ margin: '0 0 24px 0', color: '#6B5B4E', fontSize: 14 }}>For landlords seeking maximum trust and inquiries.</p>
        
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 48, fontWeight: 800, color: '#D4873A' }}>KSh 500</span>
          <span style={{ color: '#6B5B4E', fontSize: 14 }}> / listing</span>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
          <li style={{ padding: '8px 0', color: '#1C1209', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#2A7A5A' }}>✓</span> Physical agent inspection
          </li>
          <li style={{ padding: '8px 0', color: '#1C1209', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#2A7A5A' }}>✓</span> Official "Ehani Verified" badge
          </li>
          <li style={{ padding: '8px 0', color: '#1C1209', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#2A7A5A' }}>✓</span> Direct phone & WhatsApp visible
          </li>
          <li style={{ padding: '8px 0', color: '#1C1209', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#2A7A5A' }}>✓</span> Priority search placement
          </li>
        </ul>

        <button 
          style={{ 
            width: '100%', 
            padding: '14px', 
            background: '#D4873A', 
            color: 'white', 
            border: 'none', 
            borderRadius: 10, 
            cursor: 'pointer', 
            fontWeight: 700,
            fontSize: 15,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#C4772A'
            e.currentTarget.style.transform = 'scale(1.02)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#D4873A'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          Get Verified
        </button>
      </div>

      {/* Premium Card */}
      <div 
        onClick={() => handlePlanClick('premium')}
        style={{ 
          background: 'white',
          padding: '40px 30px',
          borderRadius: 16,
          border: '2px solid #E0D8D0',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)'
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(28, 18, 9, 0.12)'
          e.currentTarget.style.borderColor = '#1C1209'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.borderColor = '#E0D8D0'
        }}
      >
        <h3 style={{ margin: '0 0 8px 0', color: '#1C1209', fontSize: 20, fontWeight: 700 }}>Premium</h3>
        <p style={{ margin: '0 0 24px 0', color: '#6B5B4E', fontSize: 14 }}>For peak season dominance and high-volume agents.</p>
        
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 48, fontWeight: 800, color: '#1C1209' }}>KSh 1,500</span>
          <span style={{ color: '#6B5B4E', fontSize: 14 }}> / 30 days</span>
        </div>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
          <li style={{ padding: '8px 0', color: '#1C1209', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#2A7A5A' }}>✓</span> All Verified tier features
          </li>
          <li style={{ padding: '8px 0', color: '#1C1209', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#2A7A5A' }}>✓</span> "Top Pick" banner placement
          </li>
          <li style={{ padding: '8px 0', color: '#1C1209', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#2A7A5A' }}>✓</span> Pinned to campus search results
          </li>
          <li style={{ padding: '8px 0', color: '#1C1209', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#2A7A5A' }}>✓</span> Included in weekly tenant broadcasts
          </li>
        </ul>

        <button 
          style={{ 
            width: '100%', 
            padding: '14px', 
            background: '#1C1209', 
            color: 'white', 
            border: 'none', 
            borderRadius: 10, 
            cursor: 'pointer', 
            fontWeight: 700,
            fontSize: 15,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2C2219'
            e.currentTarget.style.transform = 'scale(1.02)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#1C1209'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          Go Premium
        </button>
      </div>
    </div>
  )
}
