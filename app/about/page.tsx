import Link from 'next/link'

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', color: '#333' }}>
      <Link href="/" style={{ color: '#D4873A', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
        ← Back to Home
      </Link>
      
      <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1C1209', marginTop: '20px', marginBottom: '20px' }}>
        About Ehani Kenya
      </h1>
      
      <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '16px' }}>
        Ehani Kenya is a digital platform built to solve one of the biggest challenges for students in higher learning institutions across Kenya: finding safe, affordable, and verified accommodation.
      </p>

      <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '16px' }}>
        We connect students directly with landlords and property agents, cutting out the middlemen and reducing the risk of rental scams. Every property on our platform goes through a verification process to ensure that the listing is real and the landlord is reachable.
      </p>

      <h2 style={{ fontSize: '24px', fontWeight: '700', marginTop: '30px', marginBottom: '15px', color: '#1C1209' }}>
        Our Mission
      </h2>
      <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '16px' }}>
        To make student housing hunting transparent, secure, and stress-free for every student in Kenya.
      </p>

      <h2 style={{ fontSize: '24px', fontWeight: '700', marginTop: '30px', marginBottom: '15px', color: '#1C1209' }}>
        Contact Us
      </h2>
      <p style={{ lineHeight: '1.6', marginBottom: '16px', fontSize: '16px' }}>
        Have questions? Reach out to our support team:<br />
        📧 <a href="mailto:support@ehani.co.ke" style={{ color: '#D4873A' }}>support@ehani.co.ke</a><br />
        📞 0710 236 242 (Safaricom) | 0107 650 275 (Airtel)
      </p>

      <div style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '20px', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#D4873A', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
