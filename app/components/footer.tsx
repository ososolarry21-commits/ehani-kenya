import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ 
      background: '#1C1209', 
      color: 'white', 
      padding: '40px 20px', 
      textAlign: 'center', 
      marginTop: 'auto' 
    }}>
      {/* Clean, Professional Links Only */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '24px', 
        flexWrap: 'wrap', 
        marginBottom: '24px',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        paddingBottom: '24px'
      }}>
        <Link href="/" style={{ color: '#D4873A', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
          Home
        </Link>
        <Link href="/about" style={{ color: '#D4873A', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
          About Us
        </Link>
        <Link href="/landlords" style={{ color: '#D4873A', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
          For Landlords
        </Link>
        <Link href="/terms" style={{ color: '#D4873A', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
          Terms & Privacy
        </Link>
      </div>

      {/* Copyright */}
      <p style={{ fontSize: '12px', opacity: 0.6, margin: 0 }}>
        © 2026 Ehani Kenya. All rights reserved.
      </p>
    </footer>
  )
}
