import Link from 'next/link'

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', color: '#1C1209', background: '#FFFFFF' }}>
      
      {/* Navigation */}
      <div style={{ marginBottom: '60px' }}>
        <Link href="/" style={{ color: '#6B5B4E', textDecoration: 'none', fontSize: '14px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: '800', color: '#1C1209', marginBottom: '16px', letterSpacing: '-1px' }}>
          Terms of Service & Privacy Policy
        </h1>
        <p style={{ fontSize: '16px', color: '#6B5B4E', maxWidth: '600px', margin: '0 auto' }}>
          Last updated: October 2026. Please read these terms carefully before using the Ehani Kenya platform.
        </p>
      </div>

      {/* Terms of Service Section */}
      <div style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '40px', height: '40px', background: '#FDF8F3', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1C1209', margin: 0 }}>Terms of Service</h2>
        </div>

        <div style={{ paddingLeft: '52px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '8px' }}>1. Acceptance of Terms</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.6', margin: 0 }}>
              By accessing or using the Ehani Kenya platform ("Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '8px' }}>2. User Obligations</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.6', margin: 0 }}>
              <strong>Landlords and Agents:</strong> You warrant that all property listings, photos, and pricing information provided are accurate and that you have the legal right to lease the property. 
              <br /><br />
              <strong>Students and Tenants:</strong> You agree to use the Platform solely for the purpose of finding accommodation and to interact with landlords in a respectful and lawful manner.
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '8px' }}>3. Prohibited Conduct</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.6', margin: 0 }}>
              Users are strictly prohibited from posting fraudulent listings, engaging in rental scams, misrepresenting property conditions, or using the Platform for any unlawful activities. Ehani Kenya reserves the right to terminate accounts that violate these policies without notice.
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '8px' }}>4. Platform Role & Limitation of Liability</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.6', margin: 0 }}>
              Ehani Kenya acts as an intermediary technology platform connecting property owners with prospective tenants. While we conduct physical verification checks on "Verified" listings, we do not own or manage the properties. We are not liable for any disputes, damages, or losses arising from rental agreements entered into between users.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Policy Section */}
      <div style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '40px', height: '40px', background: '#FDF8F3', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1C1209', margin: 0 }}>Privacy Policy</h2>
        </div>

        <div style={{ paddingLeft: '52px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '8px' }}>1. Information We Collect</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.6', margin: 0 }}>
              We collect information you provide directly to us, such as your name, email address, phone number, and property details when you create an account or list a property. We also collect automated data like IP addresses and browser types to improve our services.
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '8px' }}>2. How We Use Your Information</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.6', margin: 0 }}>
              Your information is used to facilitate connections between landlords and students, process verification fees, send platform updates, and improve our verification algorithms. We do not sell, trade, or rent your personal identification information to third parties.
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '8px' }}>3. Data Security</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.6', margin: 0 }}>
              We implement industry-standard security measures to protect your data against unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div style={{ background: '#F9FAFB', padding: '40px', borderRadius: '16px', border: '1px solid #F0EAE3', textAlign: 'center' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1C1209', marginBottom: '12px' }}>Questions or Concerns?</h3>
        <p style={{ fontSize: '15px', color: '#6B5B4E', marginBottom: '24px', lineHeight: '1.6' }}>
          If you have any questions regarding these terms or our privacy practices, please contact our legal and support team.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="mailto:support@ehani.co.ke" style={{ color: '#1C1209', fontWeight: '600', fontSize: '14px', textDecoration: 'none', background: 'white', padding: '10px 20px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            support@ehani.co.ke
          </a>
          <a href="mailto:sales@ehani.co.ke" style={{ color: '#1C1209', fontWeight: '600', fontSize: '14px', textDecoration: 'none', background: 'white', padding: '10px 20px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            sales@ehani.co.ke
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
