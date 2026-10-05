import Link from 'next/link'

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', color: '#1C1209', background: '#FFFFFF' }}>
      
      {/* Navigation */}
      <div style={{ marginBottom: '80px' }}>
        <Link href="/" style={{ color: '#6B5B4E', textDecoration: 'none', fontSize: '14px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px auto' }}>
        <div style={{ display: 'inline-block', background: '#FDF8F3', color: '#D4873A', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '24px', textTransform: 'uppercase' }}>
          Our Mission
        </div>
        <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#1C1209', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-1px' }}>
          Building the trusted infrastructure <br />for student housing in Kenya.
        </h1>
        <p style={{ fontSize: '18px', color: '#6B5B4E', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Ehani Kenya is redefining how students find accommodation and how landlords fill vacancies. We replace market friction and rental scams with physical verification and digital trust.
        </p>
      </div>

      {/* The Problem & Solution */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginBottom: '100px' }}>
        <div style={{ flex: '1 1 400px', background: '#F9FAFB', padding: '40px', borderRadius: '16px', border: '1px solid #F0EAE3' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1C1209', marginBottom: '16px' }}>The Market Problem</h2>
          <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.6', margin: 0 }}>
            The student housing market in Kenya is highly fragmented. Students frequently encounter unreliable listings, hidden fees, and rental scams, leading to financial loss and unsafe living conditions. Conversely, legitimate landlords struggle with high vacancy rates and an influx of unqualified inquiries.
          </p>
        </div>
        <div style={{ flex: '1 1 400px', background: '#1C1209', padding: '40px', borderRadius: '16px', color: 'white' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>The Ehani Solution</h2>
          <p style={{ fontSize: '15px', color: '#D1D5DB', lineHeight: '1.6', margin: 0 }}>
            We bridge this gap through a dual-sided marketplace. We empower landlords with digital tools to showcase their properties, while deploying physical field agents to verify every listing. This creates a closed-loop ecosystem of trust, ensuring safety for students and quality leads for property owners.
          </p>
        </div>
      </div>

      {/* Core Pillars */}
      <div style={{ marginBottom: '100px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1C1209', marginBottom: '40px', textAlign: 'center' }}>
          Our Core Pillars
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '30px' }}>
          
          {/* Pillar 1 */}
          <div style={{ flex: '1 1 280px', textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', background: '#FDF8F3', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 12px 0', color: '#1C1209' }}>Physical Verification</h3>
            <p style={{ fontSize: '15px', color: '#6B5B4E', margin: 0, lineHeight: '1.6' }}>
              We don't just aggregate data; we validate it. Our field agents physically inspect properties to ensure they exist, are safe, and match the digital listing.
            </p>
          </div>

          {/* Pillar 2 */}
          <div style={{ flex: '1 1 280px', textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', background: '#FDF8F3', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 12px 0', color: '#1C1209' }}>Market Transparency</h3>
            <p style={{ fontSize: '15px', color: '#6B5B4E', margin: 0, lineHeight: '1.6' }}>
              By standardizing listing details, pricing, and availability, we eliminate information asymmetry and empower students to make data-driven housing decisions.
            </p>
          </div>

          {/* Pillar 3 */}
          <div style={{ flex: '1 1 280px', textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', background: '#FDF8F3', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 12px 0', color: '#1C1209' }}>Community Focus</h3>
            <p style={{ fontSize: '15px', color: '#6B5B4E', margin: 0, lineHeight: '1.6' }}>
              Built specifically for the Kenyan higher education ecosystem, our platform is tailored to the unique geographic and financial realities of local students.
            </p>
          </div>

        </div>
      </div>

      {/* Vision / CTA Section */}
      <div style={{ textAlign: 'center', background: '#F9FAFB', padding: '60px 40px', borderRadius: '16px', border: '1px solid #F0EAE3' }}>
        <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px', color: '#1C1209', letterSpacing: '-0.5px' }}>
          The Future of Student Living
        </h3>
        <p style={{ color: '#6B5B4E', marginBottom: '32px', fontSize: '16px', maxWidth: '600px', margin: '0 auto 32px auto', lineHeight: '1.6' }}>
          We are currently scaling our verification network across major university towns in Kenya. Our goal is to become the definitive standard for trust in the East African student housing market.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="/" style={{ color: '#1C1209', fontWeight: '600', fontSize: '15px', textDecoration: 'none', background: 'white', padding: '12px 24px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            Explore the Platform
          </a>
          <a href="mailto:support@ehani.co.ke?subject=Partnership Inquiry" style={{ color: 'white', fontWeight: '600', fontSize: '15px', textDecoration: 'none', background: '#D4873A', padding: '12px 24px', borderRadius: '8px' }}>
            Partner With Us
          </a>
        </div>
      </div>

      {/* Footer Link */}
      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#6B5B4E', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>
          © 2026 Ehani Kenya. All rights reserved.
        </Link>
      </div>
    </div>
  )
}
