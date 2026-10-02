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
          Reach thousands of students in higher learning institutions. Choose the plan that fits your needs and start getting calls today.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
        
        {/* Tier 1: Basic */}
        <div style={{ flex: '1 1 300px', maxWidth: '320px', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '24px', background: '#fff' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1C1209', margin: '0 0 8px 0' }}>Basic Listing</h3>
          <p style={{ fontSize: '32px', fontWeight: '800', color: '#1C1209', margin: '0 0 16px 0' }}>FREE</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', lineHeight: '1.8', color: '#555' }}>
            <li>✅ List up to 1 property</li>
            <li>✅ Appears in standard search</li>
            <li>⚠️ Phone number hidden behind safety warning</li>
            <li>❌ No "Verified" badge</li>
          </ul>
          <a href="mailto:support@ehani.co.ke?subject=New Basic Listing Request" style={{ display: 'block', textAlign: 'center', background: '#f0f0f0', color: '#333', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
            Get Started Free
          </a>
        </div>

        {/* Tier 2: Verified (Highlighted) */}
        <div style={{ flex: '1 1 300px', maxWidth: '320px', border: '2px solid #D4873A', borderRadius: '12px', padding: '24px', background: '#FFFBF7', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#D4873A', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
            MOST POPULAR
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1C1209', margin: '0 0 8px 0' }}>Verified Listing</h3>
          <p style={{ fontSize: '32px', fontWeight: '800', color: '#D4873A', margin: '0 0 16px 0' }}>KSh 500 <span style={{ fontSize: '14px', fontWeight: '400', color: '#666' }}>/ listing</span></p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', lineHeight: '1.8', color: '#555' }}>
            <li>✅ <strong>Manual ID & Photo Check</strong> (No spam!)</li>
            <li>✅ Official 🛡️ "Ehani Verified" Green Badge</li>
            <li>✅ Phone number clearly visible</li>
            <li>✅ Priority placement in search results</li>
          </ul>
          <a href="mailto:support@ehani.co.ke?subject=Verified Listing Request" style={{ display: 'block', textAlign: 'center', background: '#D4873A', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
            Get Verified Now
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
          <a href="mailto:support@ehani.co.ke?subject=Featured Listing Request" style={{ display: 'block', textAlign: 'center', background: '#1C1209', color: 'white', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
            Maximize Visibility
          </a>
        </div>

      </div>

      <div style={{ marginTop: '60px', textAlign: 'center', background: '#f9f9f9', padding: '30px', borderRadius: '12px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1C1209', marginBottom: '12px' }}>Ready to list your property?</h3>
        <p style={{ color: '#666', marginBottom: '20px' }}>Email us your property details, photos, and your ID, and we will get you set up within 24 hours.</p>
        <a href="mailto:support@ehani.co.ke" style={{ color: '#D4873A', fontWeight: '700', fontSize: '18px', textDecoration: 'none' }}>
          📧 support@ehani.co.ke
        </a>
      </div>

      <div style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '20px', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#D4873A', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
