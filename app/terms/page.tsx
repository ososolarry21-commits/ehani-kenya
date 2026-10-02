import Link from 'next/link'

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', color: '#333' }}>
      <Link href="/" style={{ color: '#D4873A', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
        ← Back to Home
      </Link>
      
      <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1C1209', marginTop: '20px', marginBottom: '10px' }}>
        Terms and Conditions & Privacy Policy
      </h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Last Updated: October 1, 2026</p>

      <h2 style={{ fontSize: '20px', fontWeight: '700', marginTop: '24px', marginBottom: '12px' }}>1. Introduction</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        Welcome to Ehani Kenya ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your use of our website (ehani.co.ke) and services. By accessing or using Ehani Kenya, you agree to be bound by these Terms. If you do not agree, please do not use our platform.
      </p>

      <h2 style={{ fontSize: '20px', fontWeight: '700', marginTop: '24px', marginBottom: '12px' }}>2. Nature of Our Services</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        Ehani Kenya is an online technology platform that connects <strong>students in higher learning institutions</strong> seeking accommodation ("Students") with property owners and agents ("Landlords"). 
      </p>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        <strong>We are an intermediary:</strong> Ehani Kenya is not a real estate agent, property manager, or landlord. We do not own, manage, or lease the properties listed on our platform. While we strive to verify listings, we do not guarantee the physical condition, legality, or continuous availability of any property listed. Students are strongly advised to physically inspect any property before making any rental payments directly to a Landlord.
      </p>

      <h2 style={{ fontSize: '20px', fontWeight: '700', marginTop: '24px', marginBottom: '12px' }}>3. User Accounts and Responsibilities</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        To use certain features, you must create an account. You are responsible for maintaining the confidentiality of your account and password.
      </p>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        <strong>Students:</strong> You agree to use the platform solely for finding accommodation. You will not harass, spam, or misrepresent yourself to Landlords.
      </p>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        <strong>Landlords/Agents:</strong> You agree to provide accurate, truthful, and up-to-date information regarding your properties. You must have the legal right to lease the property you list.
      </p>

      <h2 style={{ fontSize: '20px', fontWeight: '700', marginTop: '24px', marginBottom: '12px' }}>4. Verification and Payments</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        <strong>Verification Fee:</strong> To build trust, Landlords may be required to pay a one-time verification fee (currently KSh 500) via M-Pesa. 
      </p>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        <strong>What "Verified" Means:</strong> A "Verified" badge indicates that Ehani Kenya has collected basic documentation and confirmed the Landlord's identity and contact details. It does not constitute a legal guarantee of the property's structural integrity or legal compliance.
      </p>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        <strong>Refunds:</strong> Verification fees are non-refundable once the verification process has been initiated, as they cover administrative and technical costs.
      </p>

      <h2 style={{ fontSize: '20px', fontWeight: '700', marginTop: '24px', marginBottom: '12px' }}>5. Limitation of Liability</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        To the maximum extent permitted by the laws of Kenya, Ehani Kenya shall not be liable for any indirect, incidental, or consequential damages arising from disputes between Students and Landlords regarding rent, deposits, or property conditions, or any inaccuracies in the listings provided by Landlords.
      </p>

      <h2 style={{ fontSize: '20px', fontWeight: '700', marginTop: '24px', marginBottom: '12px' }}>6. Privacy Policy (Data Protection)</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        We are committed to protecting your personal data in accordance with the <strong>Data Protection Act, 2019 of Kenya</strong>.
      </p>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        <strong>Data We Collect:</strong> We collect names, phone numbers, email addresses, and M-Pesa transaction details.
      </p>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        <strong>How We Use It:</strong> We use this data to facilitate connections between Students and Landlords, process verification payments, and send service updates.
      </p>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        <strong>Data Sharing:</strong> We do not sell your data. We only share necessary contact details (like a Landlord's phone number) with a Student when the Student expresses genuine interest in a listing.
      </p>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        <strong>Your Rights:</strong> You have the right to request access to, correction, or deletion of your personal data by contacting us at support@ehani.co.ke.
      </p>

      <h2 style={{ fontSize: '20px', fontWeight: '700', marginTop: '24px', marginBottom: '12px' }}>7. Prohibited Activities</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        You agree not to use the platform to post fraudulent or misleading listings, discriminate against any user based on race, gender, religion, or ethnicity, or attempt to hack, disrupt, or reverse-engineer the Ehani Kenya platform.
      </p>

      <h2 style={{ fontSize: '20px', fontWeight: '700', marginTop: '24px', marginBottom: '12px' }}>8. Governing Law and Dispute Resolution</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        These Terms shall be governed by and construed in accordance with the laws of the Republic of Kenya. Any disputes arising from these Terms shall first be resolved through amicable mediation. If unresolved, the dispute shall be subject to the exclusive jurisdiction of the courts of Kenya.
      </p>

      <h2 style={{ fontSize: '20px', fontWeight: '700', marginTop: '24px', marginBottom: '12px' }}>9. Contact Us</h2>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        If you have any questions about these Terms, please contact us at:
      </p>
      <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
        <strong>Email:</strong> support@ehani.co.ke<br />
        <strong>Phone:</strong> +254 710 236 242
      </p>

      <div style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '20px', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#D4873A', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
