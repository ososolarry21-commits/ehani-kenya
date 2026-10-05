import Link from 'next/link'

export default function LandlordsPage() {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', color: '#333' }}>
      <Link href="/" style={{ color: '#D4873A', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
        ← Back to Home
      </Link>
      
      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#1C1209', marginBottom: '16px' }}>
          List Your Property on Ehani Kenya
        </h1>
        <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Upload your property details directly to our platform and reach thousands of verified students.
        </p>
      </div>

      {/* HOW VERIFICATION WORKS */}
      <div style={{ background: '#F0EAE3', padding: '30px', borderRadius: '12px', marginBottom: '50px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1C1209', marginBottom: '20px' }}>
          🛡️ How Our Physical Verification Works
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', textAlign: 'left' }}>
          <div style={{ flex: '1 1 250px', maxWidth: '300px' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>1️</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0' }}>You Upload</h3>
            <p style={{ fontSize: '14px', color: '#555', margin: 0 }}>Create an account and upload your property photos and details directly to the site.</p>
          </div>
          <div style={{ flex: '1 1 250px', maxWidth: '300px' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>2️</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0' }}>You Upgrade</h3>
            <p style={{ fontSize: '14px', color: '#555', margin: 0 }}>Pay the KSh 500 verification fee to request an inspection.</p>
          </div>
          <div style={{ flex: '1 1 250px', maxWidth: '300px' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>3️</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0' }}>We Inspect</h3>
            <p style={{ fontSize: '14px', color: '#555', margin: 0 }}>Our Ehani field agents physically visit the property to confirm it exists and is safe.</p>
          </div>
          <div style={{ flex: '1 1 250px', maxWidth: '300px' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>4️</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 8px 0' }}>You Get Calls</h3>
            <p style={{ fontSize: '14px', color: '#555', margin: 0 }}>Once approved, your listing gets the Green Badge and your phone number is revealed.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
        
        {/* Tier 1: Basic */}
        <div style={{ flex: '1 1 300px', maxWidth: '320px', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '24px', background: '#fff' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1C1209', margin: '0 0 8px 0' }}>Basic Listing</h3>
          <p style={{ fontSize: '32px', fontWeight: '800', color: '#1C1209', margin: '0 0 16px 0' }}>FREE</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', lineHeight: '1.8', color: '#555' }}>
            <li>✅ Upload up to 1 property</li>
            <li>✅ Appears in standard search</li>
            <li>⚠️ Phone number hidden behind safety warning</li>
            <li>❌ No "Verified" badge</li>
          </ul>
          <a href="/" style={{ display: 'block', textAlign: 'center', background: '#f0f0f0', color: '#333', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
            Create Free Account
          </a>
        </div>

        {/* Tier 2: Verified (Highlighted) */}
        <div style={{ flex: '1 1 300px', maxWidth: '320px', border: '2px solid #D4873A', borderRadius: '12px', padding: '24px', background: '#FFFBF7', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#D4873A', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
            MOST POPULAR
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1C1209', margin: '0 0 8px 0' }}>Verified Listing</h3>
          <p style={{ fontSize: '32px', fontWeight: '800', color: '#D4873A', margin: '0 0 16px 0' }}>KSh 500 <span style={{ fontSize: '14px', fontWeight: '400', color: '#666' }}>/ inspection</span></p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', lineHeight: '1.8', color: '#555' }}>
            <li>✅ <strong>Physical Agent Inspection</strong></li>
            <li>✅ Official 🛡️ "Ehani Verified" Green Badge</li>
            <li>✅ Phone number clearly visible</li>
            <li>✅ Priority placement in search results</li>
          </ul>
          <a href="/" style={{ display: 'block', textAlign: 'center', background: '#D4873A', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
            List Property to Verify
          </a>
        </div>

        {/* Tier 3: Featured */}
        <div style={{ flex: '1 1 300px', maxWidth: '320px', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '24px', background: '#fff' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1C1209', margin: '0 0 8px 0' }}>Featured (Peak Season)</h3>
          <p style={{ fontSize: '32px', fontWeight: '800', color: '#1C1209', margin: '0 0 16px 0' }}>KSh 1,500 <span style={{ fontSize: '14px', fontWeight: '400', color: '#666' }}>/ 30 days</span></p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', lineHeight: '1.8', color: '#555' }}>
            <li>✅ Everything in Verified</li>
            <li>✅ 🌟 "Top Pick" Gold Banner</li>
            <li>✅ Pinned to the top of campus search</li>
            <li>✅ Featured in weekly student broadcasts</li>
          </ul>
          <a href="/" style={{ display: 'block', textAlign: 'center', background: '#1C1209', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
             List Property to Feature
          </a>
        </div>

      </div>

      {/* BOTTOM CTA SECTION - UPDATED FOR SALES EMAIL */}
      <div style={{ marginTop: '60px', textAlign: 'center', background: '#f9f9f9', padding: '40px 30px', borderRadius: '12px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#1C1209', marginBottom: '12px' }}>
          Ready to fill your vacancies?
        </h3>
        <p style={{ color: '#666', marginBottom: '24px', fontSize: '16px', maxWidth: '600px', margin: '0 auto 24px auto' }}>
          Create an account above to upload your property directly. 
          <br />
          <strong style={{ color: '#D4873A' }}>Are you a Property Agent managing multiple houses?</strong> Contact our sales team for bulk listing discounts!
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="/" style={{ color: '#1C1209', fontWeight: '700', fontSize: '16px', textDecoration: 'none', border: '2px solid #1C1209', padding: '12px 24px', borderRadius: '8px', background: 'white' }}>
            Create Account
          </a>
          <a href="mailto:sales@ehani.co.ke?subject=Agent Bulk Listing Inquiry" style={{ color: 'white', fontWeight: '700', fontSize: '16px', textDecoration: 'none', background: '#D4873A', padding: '12px 24px', borderRadius: '8px' }}>
            📧 Contact Sales Team
          </a>
        </div>
      </div>

      <div style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '20px', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#D4873A', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
