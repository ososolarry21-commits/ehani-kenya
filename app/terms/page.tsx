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
          Last updated: {new Date().toLocaleDateString()}. By accessing or using the Ehani Homes platform, you agree to be bound by the following comprehensive terms and policies.
        </p>
      </div>

      {/* Terms of Service Section */}
      <div style={{ marginBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '40px', background: '#FDF8F3', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1C1209', margin: 0 }}>PART A — Terms of Service</h2>
        </div>

        <div style={{ paddingLeft: '52px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>1. About EHANI HOMES</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              EHANI HOMES (“Ehani”, “we”, “us”) operates an online student-accommodation marketplace to help students discover accommodation and providers publish listings. EHANI HOMES is a registered business name operated by Eugene Larry Ososo of 1098-60200, Meru, Kenya.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>2. Platform Role</h3>
            <ul style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0, paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>Ehani publishes accommodation listings, reviews submissions and may conduct physical property inspections through assigned field agents.</li>
              <li style={{ marginBottom: '8px' }}>Ehani is <strong>not</strong> a landlord, letting agent, property manager, rent collector, deposit holder or guarantor of a tenancy.</li>
              <li style={{ marginBottom: '8px' }}>Ehani does not facilitate rent/deposit payments or arrange meetings or negotiate tenancy contracts. After contact disclosure, users communicate, inspect, negotiate and contract independently.</li>
              <li>Users must perform their own due diligence and assess property suitability, availability, identity, ownership/authority and terms.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>3. Accounts and Eligibility</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              Users must be 18 or older. Students register with email and verify it. Landlords provide display name, email and phone and verify email. A display name need not be a legal name, but users must not impersonate or mislead. Users protect credentials and report suspected unauthorised access.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>4. Listings and Moderation</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              Listings may include property name, location, accommodation type, rent/deposit, amenities, distance to institution, photographs and availability. Providers must have authority to advertise, provide accurate information and lawful photos, and update material changes. Ehani may request clarification, reject, suspend or remove incomplete, misleading, unsafe, unlawful, duplicated or rule-breaking listings. Publication is not a guarantee of ownership, safety, availability or suitability.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>5. Annual Verification and Contact Access</h3>
            <ul style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0, paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}>The annual verification fee covers the package: fresh physical inspection, verification assessment/review and contact visibility for the approved 12-month period. No separate contact-visibility fee applies.</li>
              <li style={{ marginBottom: '8px' }}>Verification starts only after required steps are completed and Ehani approves. Payment alone does not guarantee approval.</li>
              <li style={{ marginBottom: '8px' }}>Approval is valid for 12 months from approval date and does not renew automatically. Renewal requires applicable fee, fresh physical inspection and a new approval decision.</li>
              <li style={{ marginBottom: '8px' }}>On expiry, rejection, suspension or withdrawal, the verified badge is disabled and contact details return to gated status. The listing may remain published if ordinary listing rules are met, without implying current verification.</li>
              <li>While renewal inspection is pending, badge/contact access remain off. After fresh inspection approval, both restore for a new 12-month period.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>6. Contact Disclosure</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              Landlord contacts are gated by default. Ehani discloses specified fields only when platform conditions are met and the landlord authorises disclosure. We record the authorisation, exact fields, relevant recipient/disclosure event, timestamp, notice version and validity. Withdrawal stops future disclosure where applicable; it cannot reverse a disclosure already lawfully made.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>7. Fees, Conduct and Disclaimers</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              Fees and payment instructions are shown before payment. Platform fees are processed through configured payment services; Ehani does not hold tenancy rent or deposits. Verification payment is not approval. Refunds and reversals follow displayed terms, provider workflow and applicable law; no blanket exclusion overrides legal rights. Users must not post unlawful/fraudulent content, harvest contacts, bypass controls or misuse platform data. To the extent lawful, Ehani does not warrant uninterrupted service or listing accuracy; liability that cannot legally be excluded remains unaffected.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>8. Suspension, Closure and Law</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              Ehani may restrict accounts/listings for breach, fraud, security, legal duties or user protection. Account closure may be requested from the registered email at <a href="mailto:support@ehani.co.ke" style={{ color: '#D4873A', textDecoration: 'none', fontWeight: '600' }}>support@ehani.co.ke</a>; requester identity will be verified. Closure is not necessarily immediate erasure: access/publication is disabled and unnecessary data deleted or anonymised, subject to legal, tax, security and dispute retention. Terms are governed by Kenyan law.
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
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1C1209', margin: 0 }}>PART B — Privacy Policy</h2>
        </div>

        <div style={{ paddingLeft: '52px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>9. Controller and Contact</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              Ehani determines purposes and means for account, listing, verification, disclosure and platform-operation data. <strong>Controller:</strong> Eugene Larry Ososo, operating EHANI HOMES. <br/>
              <strong>Privacy contact:</strong> +254 710 236 242 | <a href="mailto:support@ehani.co.ke" style={{ color: '#D4873A', textDecoration: 'none', fontWeight: '600' }}>support@ehani.co.ke</a> | 1098-60200, Meru, Kenya.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>10. Data Collected</h3>
            <ul style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0, paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Student:</strong> email, verification status and necessary account/security records.</li>
              <li style={{ marginBottom: '8px' }}><strong>Landlord:</strong> display name, email, phone, account and verification status.</li>
              <li style={{ marginBottom: '8px' }}><strong>Listing:</strong> property details, location, rent/deposit, amenities, photos, availability and listing history.</li>
              <li style={{ marginBottom: '8px' }}><strong>Inspection:</strong> date, assigned agent, findings, notes/photos, review decision, badge period and renewal history.</li>
              <li style={{ marginBottom: '8px' }}><strong>Disclosure:</strong> authorisation, exact fields, relevant disclosure event/recipient, time and notice version.</li>
              <li style={{ marginBottom: '8px' }}><strong>Payments:</strong> transaction reference, amount, status and reconciliation data; payment credentials handled by provider as applicable.</li>
              <li><strong>Technical/support:</strong> verification events, access/security logs, generated device/network data, errors and communications.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>11. Purposes and Lawful Bases</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              We use data to create/secure accounts, verify email, review/publish listings, inspect properties, administer verification/renewals and gated contact disclosure, process platform fees, respond to requests, prevent abuse, secure systems, maintain records and meet legal obligations. Each processing activity must have an applicable lawful basis under Kenya’s Data Protection Act, 2019 (for example consent where required, contract necessity, legal obligation or properly assessed legitimate interests).
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>12. Recipients, Providers and Transfers</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: '0 0 12px 0' }}>
              Authorised administrators and assigned agents access data on a need-to-know basis. Relevant data may be shared with hosting/database/email/payment/security providers, with a student when landlord contact disclosure is authorised, or with authorities where law requires. Ehani does not sell personal data.
            </p>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: '0 0 8px 0', fontWeight: '600' }}>Current providers:</p>
            <ul style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0, paddingLeft: '20px' }}>
              <li style={{ marginBottom: '4px' }}>Hosting.com (hosting)</li>
              <li style={{ marginBottom: '4px' }}>Supabase (database/email verification)</li>
              <li style={{ marginBottom: '4px' }}>KCB Buni APIs (M-Pesa processing)</li>
              <li>KCB business bank (settlement)</li>
            </ul>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>13. Security and Retention</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              Ehani uses appropriate safeguards such as access controls, secure authentication, role limitation, credential protection, backups, updates, monitoring and incident response. No system is completely secure. Data is retained only as reasonably necessary for purpose, law, security, accounting or claims, then securely deleted/anonymised/pseudonymised where appropriate under the retention schedule. Legal holds may delay disposal.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>14. Rights, Cookies and Children</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: 0 }}>
              Subject to law and identity verification, users may request access, correction, deletion, restriction, objection, portability where applicable, or withdraw consent where processing relies on it. Contact <a href="mailto:support@ehani.co.ke" style={{ color: '#D4873A', textDecoration: 'none', fontWeight: '600' }}>support@ehani.co.ke</a> or complain to ODPC. We respond within applicable Kenyan timelines. Essential cookies may support sessions/security; non-essential analytics/advertising must be disclosed and consented to where required. Platform is for adults 18+; we do not knowingly design registration for children.
            </p>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>15. Updates and Website</h3>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7', margin: '0 0 16px 0' }}>
              Policy changes will be communicated appropriately and the current version/effective date displayed.
            </p>
            <div style={{ background: '#FDF8F3', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #D4873A' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1C1209', fontWeight: '600' }}>Website: <a href="https://ehani.co.ke" style={{ color: '#D4873A', textDecoration: 'none' }}>ehani.co.ke</a></p>
              <p style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#1C1209', fontWeight: '600' }}>Contact number: +254 710 236 242</p>
              <p style={{ margin: 0, fontSize: '15px', color: '#1C1209', fontWeight: '600' }}>Privacy contact: <a href="mailto:support@ehani.co.ke" style={{ color: '#D4873A', textDecoration: 'none' }}>support@ehani.co.ke</a> | 1098-60200 Meru, Kenya</p>
            </div>
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
          <a href="tel:+254710236242" style={{ color: '#1C1209', fontWeight: '600', fontSize: '14px', textDecoration: 'none', background: 'white', padding: '10px 20px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            +254 710 236 242
          </a>
        </div>
      </div>

      {/* Footer Link */}
      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#6B5B4E', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>
          © {new Date().getFullYear()} Ehani Homes. All rights reserved.
        </Link>
      </div>
    </div>
  )
}
