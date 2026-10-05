import Link from 'next/link'

export default function LandlordsPage() {
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
          For Property Owners & Agents
        </div>
        <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#1C1209', marginBottom: '24px', lineHeight: '1.1', letterSpacing: '-1px' }}>
          The trusted infrastructure for <br />student housing in Kenya.
        </h1>
        <p style={{ fontSize: '18px', color: '#6B5B4E', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Reduce vacancy rates and eliminate time-wasters. Ehani provides physical verification and digital trust, connecting your properties directly with verified students.
        </p>
      </div>

      {/* Operational Pipeline (Replaces the emoji steps) */}
      <div style={{ background: '#F9FAFB', padding: '60px 40px', borderRadius: '16px', marginBottom: '80px', border: '1px solid #F0EAE3' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1C1209', marginBottom: '40px', textAlign: 'center' }}>
          The Ehani Verification Pipeline
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '30px' }}>
          
          {/* Step 1 */}
          <div style={{ flex: '1 1 200px', textAlign: 'left' }}>
            <div style={{ width: '40px', height: '40px', background: '#1C1209', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0', color: '#1C1209' }}>1. Digital Onboarding</h3>
            <p style={{ fontSize: '14px', color: '#6B5B4E', margin: 0, lineHeight: '1.5' }}>Landlords upload property details and media directly to our secure portal.</p>
          </div>

          {/* Step 2 */}
          <div style={{ flex: '1 1 200px', textAlign: 'left' }}>
            <div style={{ width: '40px', height: '40px', background: '#1C1209', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0', color: '#1C1209' }}>2. Verification Fee</h3>
            <p style={{ fontSize: '14px', color: '#6B5B4E', margin: 0, lineHeight: '1.5' }}>A nominal KSh 500 fee initiates the physical inspection process.</p>
          </div>

          {/* Step 3 */}
          <div style={{ flex: '1 1 200px', textAlign: 'left' }}>
            <div style={{ width: '40px', height: '40px', background: '#1C1209', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0', color: '#1C1209' }}>3. Physical Inspection</h3>
            <p style={{ fontSize: '14px', color: '#6B5B4E', margin: 0, lineHeight: '1.5' }}>Our field agents verify the property's existence, safety, and condition.</p>
          </div>

          {/* Step 4 */}
          <div style={{ flex: '1 1 200px', textAlign: 'left' }}>
            <div style={{ width: '40px', height: '40px', background: '#1C1209', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0', color: '#1C1209' }}>4. Direct Connections</h3>
            <p style={{ fontSize: '14px', color: '#6B5B4E', margin: 0, lineHeight: '1.5' }}>Verified listings receive priority placement and direct tenant inquiries.</p>
          </div>

        </div>
      </div>

      {/* Pricing Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', marginBottom: '80px' }}>
        
        {/* Tier 1: Basic */}
        <div style={{ flex: '1 1 300px', maxWidth: '340px', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '32px', background: '#FFFFFF' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', margin: '0 0 8px 0' }}>Starter</h3>
          <p style={{ fontSize: '14px', color: '#6B5B4E', margin: '0 0 24px 0' }}>For individual landlords testing the market.</p>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#1C1209', marginBottom: '24px' }}>Free</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', lineHeight: '2', color: '#4B5563', fontSize: '14px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> List up to 1 property</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Standard search placement</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Contact info gated behind warning</li>
          </ul>
          <a href="/" style={{ display: 'block', textAlign: 'center', background: '#F3F4F6', color: '#1C1209', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '14px', transition: 'background 0.2s' }}>
            Create Account
          </a>
        </div>

        {/* Tier 2: Verified (Highlighted) */}
        <div style={{ flex: '1 1 300px', maxWidth: '340px', border: '2px solid #D4873A', borderRadius: '12px', padding: '32px', background: '#FFFFFF', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#D4873A', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Most Popular
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', margin: '0 0 8px 0' }}>Verified</h3>
          <p style={{ fontSize: '14px', color: '#6B5B4E', margin: '0 0 24px 0' }}>For landlords seeking maximum trust and inquiries.</p>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#D4873A', marginBottom: '24px' }}>KSh 500 <span style={{ fontSize: '14px', fontWeight: '400', color: '#6B5B4E' }}>/ listing</span></div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', lineHeight: '2', color: '#4B5563', fontSize: '14px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <strong>Physical agent inspection</strong></li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Official "Ehani Verified" badge</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Direct phone & WhatsApp visible</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Priority search placement</li>
          </ul>
          <a href="/" style={{ display: 'block', textAlign: 'center', background: '#D4873A', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
            Get Verified
          </a>
        </div>

        {/* Tier 3: Featured */}
        <div style={{ flex: '1 1 300px', maxWidth: '340px', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '32px', background: '#FFFFFF' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', margin: '0 0 8px 0' }}>Premium</h3>
          <p style={{ fontSize: '14px', color: '#6B5B4E', margin: '0 0 24px 0' }}>For peak season dominance and high-volume agents.</p>
          <div style={{ fontSize: '36px', fontWeight: '800', color: '#1C1209', marginBottom: '24px' }}>KSh 1,500 <span style={{ fontSize: '14px', fontWeight: '400', color: '#6B5B4E' }}>/ 30 days</span></div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', lineHeight: '2', color: '#4B5563', fontSize: '14px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> All Verified tier features</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> "Top Pick" banner placement</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Pinned to campus search results</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Included in weekly tenant broadcasts</li>
          </ul>
          <a href="/" style={{ display: 'block', textAlign: 'center', background: '#1C1209', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
            Go Premium
          </a>
        </div>

      </div>

      {/* B2B / Agent CTA Section */}
      <div style={{ textAlign: 'center', background: '#1C1209', padding: '60px 40px', borderRadius: '16px', color: 'white' }}>
        <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px', letterSpacing: '-0.5px' }}>
          Managing a large portfolio?
        </h3>
        <p style={{ color: '#A8A29E', marginBottom: '32px', fontSize: '16px', maxWidth: '600px', margin: '0 auto 32px auto', lineHeight: '1.6' }}>
          We offer customized bulk verification packages and API integrations for large-scale property agents and real estate firms.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="/" style={{ color: '#1C1209', fontWeight: '600', fontSize: '15px', textDecoration: 'none', background: 'white', padding: '12px 24px', borderRadius: '8px' }}>
            Create Enterprise Account
          </a>
          <a href="mailto:sales@ehani.co.ke?subject=Enterprise Partnership Inquiry" style={{ color: 'white', fontWeight: '600', fontSize: '15px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)', padding: '12px 24px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' }}>
            Contact Sales Team
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
