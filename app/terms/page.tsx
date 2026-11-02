'use client'
import { useRouter } from 'next/navigation'

export default function PrivacyPolicy() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', background: '#FDF8F3', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", color: '#1C1209' }}>
      {/* Navigation */}
      <nav style={{ background: 'white', padding: '16px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => router.push('/')}>
          <img src="/logo.png" alt="Ehani" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <button onClick={() => router.push('/')} style={{ padding: '10px 20px', background: '#1C1209', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
          ← Back to Home
        </button>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 20px' }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, color: '#1C1209' }}>Privacy Policy</h1>
        <p style={{ color: '#6B5B4E', marginBottom: 40, fontSize: 16 }}>Effective Date: {new Date().toLocaleDateString()}</p>

        <div style={{ background: 'white', padding: 40, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, color: '#D4873A', borderBottom: '2px solid #F0EAE3', paddingBottom: 12 }}>PART B — PRIVACY POLICY</h2>

          <Section title="9. Controller and Contact">
            <p>Ehani determines purposes and means for account, listing, verification, disclosure and platform-operation data. <strong>Controller:</strong> Eugene Larry Ososo, operating EHANI HOMES. <br/><strong>Privacy contact:</strong> +254 710 236 242 | <a href="mailto:support@ehani.co.ke" style={{ color: '#D4873A' }}>support@ehani.co.ke</a> | 1098-60200, Meru, Kenya.</p>
          </Section>

          <Section title="10. Data Collected">
            <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
              <li><strong>Student:</strong> email, verification status and necessary account/security records.</li>
              <li><strong>Landlord:</strong> display name, email, phone, account and verification status.</li>
              <li><strong>Listing:</strong> property details, location, rent/deposit, amenities, photos, availability and listing history.</li>
              <li><strong>Inspection:</strong> date, assigned agent, findings, notes/photos, review decision, badge period and renewal history.</li>
              <li><strong>Disclosure:</strong> authorisation, exact fields, relevant disclosure event/recipient, time and notice version.</li>
              <li><strong>Payments:</strong> transaction reference, amount, status and reconciliation data; payment credentials handled by provider as applicable.</li>
              <li><strong>Technical/support:</strong> verification events, access/security logs, generated device/network data, errors and communications.</li>
            </ul>
          </Section>

          <Section title="11. Purposes and Lawful Bases">
            <p>We use data to create/secure accounts, verify email, review/publish listings, inspect properties, administer verification/renewals and gated contact disclosure, process platform fees, respond to requests, prevent abuse, secure systems, maintain records and meet legal obligations. Each processing activity must have an applicable lawful basis under Kenya’s Data Protection Act, 2019 (for example consent where required, contract necessity, legal obligation or properly assessed legitimate interests).</p>
          </Section>

          <Section title="12. Recipients, Providers and Transfers">
            <p>Authorised administrators and assigned agents access data on a need-to-know basis. Relevant data may be shared with hosting/database/email/payment/security providers, with a student when landlord contact disclosure is authorised, or with authorities where law requires. Ehani does not sell personal data.</p>
            <p style={{ marginTop: 12, fontWeight: 600 }}>Current providers:</p>
            <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
              <li>Hosting.com (hosting)</li>
              <li>Supabase (database/email verification)</li>
              <li>KCB Buni APIs (M-Pesa processing)</li>
              <li>KCB business bank (settlement)</li>
            </ul>
          </Section>

          <Section title="13. Security and Retention">
            <p>Ehani uses appropriate safeguards such as access controls, secure authentication, role limitation, credential protection, backups, updates, monitoring and incident response. No system is completely secure. Data is retained only as reasonably necessary for purpose, law, security, accounting or claims, then securely deleted/anonymised/pseudonymised where appropriate under the retention schedule. Legal holds may delay disposal.</p>
          </Section>

          <Section title="14. Rights, Cookies and Children">
            <p>Subject to law and identity verification, users may request access, correction, deletion, restriction, objection, portability where applicable, or withdraw consent where processing relies on it. Contact <a href="mailto:support@ehani.co.ke" style={{ color: '#D4873A' }}>support@ehani.co.ke</a> or complain to ODPC. We respond within applicable Kenyan timelines. Essential cookies may support sessions/security; non-essential analytics/advertising must be disclosed and consented to where required. Platform is for adults 18+; we do not knowingly design registration for children.</p>
          </Section>

          <Section title="15. Updates and Website">
            <p>Policy changes will be communicated appropriately and the current version/effective date displayed.</p>
            <div style={{ marginTop: 20, padding: 20, background: '#FDF8F3', borderRadius: 8, borderLeft: '4px solid #D4873A' }}>
              <p style={{ margin: '0 0 8px 0', fontWeight: 700 }}>Website: <a href="https://ehani.co.ke" style={{ color: '#D4873A', textDecoration: 'none' }}>ehani.co.ke</a></p>
              <p style={{ margin: '0 0 8px 0', fontWeight: 700 }}>Contact number: +254 710 236 242</p>
              <p style={{ margin: 0, fontWeight: 700 }}>Privacy contact: <a href="mailto:support@ehani.co.ke" style={{ color: '#D4873A' }}>support@ehani.co.ke</a> | 1098-60200 Meru, Kenya</p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

// Helper component for clean sections
function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#1C1209' }}>{title}</h3>
      <div style={{ fontSize: 15, lineHeight: 1.7, color: '#4a4a4a' }}>
        {children}
      </div>
    </div>
  )
}
