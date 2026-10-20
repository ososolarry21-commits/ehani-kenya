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
        <p style={{ fontSize: '16px', color: '#6B5B4E', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Last updated: October 2026. By accessing or using the Ehani Kenya platform, you agree to be bound by the following comprehensive terms and policies.
        </p>
      </div>

      {/* Terms of Service Section */}
      <div style={{ marginBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '40px', background: '#FDF8F3', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1C1209', margin: 0 }}>Terms of Service</h2>
        </div>

        <div style={{ paddingLeft: '52px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>1. Acceptance of Terms & Eligibility</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              By accessing, browsing, or using the Ehani Kenya platform ("Platform"), you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service. If you are entering into these terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity. You must be at least 18 years of age to use this Platform.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>2. User Obligations & Conduct</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              <strong>Landlords and Agents:</strong> You warrant that all property listings, photographs, pricing, and amenity descriptions provided are accurate, current, and not misleading. You represent that you have the legal right or authorization to lease or sublet the property. You agree to comply with all applicable Kenyan housing laws and fair housing regulations, ensuring no discrimination based on gender, tribe, or religion.
              <br /><br />
              <strong>Students and Tenants:</strong> You agree to use the Platform solely for the lawful purpose of seeking accommodation. You agree to interact with landlords and agents respectfully and honestly. You acknowledge that Ehani Kenya is not a party to any rental agreement and is not responsible for the terms of any lease you enter into.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>3. Prohibited Conduct</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              Users are strictly prohibited from: (a) posting fraudulent, fake, or misleading listings; (b) engaging in rental scams or advance-fee fraud; (c) misrepresenting property conditions or amenities; (d) using automated scripts, bots, or scrapers to extract data from the Platform; (e) attempting to reverse-engineer the Platform's code; or (f) using the Platform for any unlawful activities. Ehani Kenya reserves the right to immediately terminate accounts and withhold payouts for users who violate these policies.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>4. Verification Process & Disclaimers</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              Ehani Kenya offers a "Verified" badge for listings that have undergone a physical inspection by our field agents. While we strive for accuracy, our verification is limited to a visual inspection at a specific point in time. We do not guarantee the structural integrity, legal compliance, or future condition of the property. The "Verified" badge is a trust indicator, not a warranty or insurance policy. Users must still conduct their own due diligence before signing any lease or making any payments.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>5. Fees, Payments & Refunds</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              Certain features, such as the Verification Badge and Premium Listings, require payment of non-refundable fees via our integrated payment gateways (e.g., M-Pesa via KCB Buni). By initiating a payment, you authorize us to charge the specified amount. Verification fees (e.g., KSh 500) cover the operational cost of dispatching an agent and are non-refundable once the inspection has been scheduled or completed, regardless of the inspection outcome.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>6. Platform Role & Limitation of Liability</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              Ehani Kenya acts strictly as a technology intermediary connecting property owners with prospective tenants. We do not own, manage, or control the properties listed. To the maximum extent permitted by Kenyan law, Ehani Kenya shall not be liable for any indirect, incidental, or consequential damages, including but not limited to loss of deposits, property damage, or personal injury arising from rental agreements entered into between users. You agree to indemnify and hold Ehani Kenya harmless from any claims arising from your use of the Platform.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Policy Section */}
      <div style={{ marginBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '40px', background: '#FDF8F3', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1C1209', margin: 0 }}>Privacy Policy</h2>
        </div>

        <div style={{ paddingLeft: '52px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>1. Information We Collect</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              We collect information you provide directly, including your full name, email address, phone number, and property details. For landlords, we collect business registration details and M-Pesa Paybill/Till numbers for payouts. We also automatically collect technical data such as IP addresses, browser types, and device information to ensure platform security and optimize performance.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>2. How We Use Your Information</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              Your data is used to: (a) facilitate connections between landlords and students; (b) process verification fees and payouts via our banking partners; (c) assign field agents for physical property inspections; (d) send critical platform updates and security alerts; and (e) improve our search algorithms and verification processes. We do not sell, trade, or rent your personal identification information to third parties for marketing purposes.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>3. Data Sharing & Legal Compliance</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              We may share necessary data with trusted third-party service providers (such as KCB Bank for payment processing) strictly to operate the Platform. We may also disclose information if required by law, court order, or governmental authority. We are committed to complying with the Data Protection Act of Kenya (2019) and ensure your rights to access, correct, or delete your personal data are respected.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>4. Data Security & Retention</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              We implement industry-standard administrative, technical, and physical security measures to protect your data against unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure. We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, or as required by Kenyan tax and financial regulations.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div style={{ background: '#F9FAFB', padding: '40px', borderRadius: '16px', border: '1px solid #F0EAE3', textAlign: 'center' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1C1209', marginBottom: '12px' }}>Questions or Legal Concerns?</h3>
        <p style={{ fontSize: '15px', color: '#6B5B4E', marginBottom: '24px', lineHeight: '1.6' }}>
          If you have any questions regarding these terms, our privacy practices, or wish to exercise your data rights, please contact our legal and support team.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="mailto:support@ehani.co.ke" style={{ color: '#1C1209', fontWeight: '600', fontSize: '14px', textDecoration: 'none', background: 'white', padding: '10px 20px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            support@ehani.co.ke

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
