'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function AgentPortal() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [assignments, setAssignments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submittingId, setSubmittingId] = useState<string | null>(null)
  
  // Form State
  const [activeAssignmentId, setActiveAssignmentId] = useState<string | null>(null)
  const [waterTest, setWaterTest] = useState('')
  const [electricityTest, setElectricityTest] = useState('')
  const [securityCheck, setSecurityCheck] = useState('')
  const [notes, setNotes] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  
  const router = useRouter()

  useEffect(() => { checkAgent() }, [])

  async function checkAgent() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/'); return }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role, name')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'agent') {
      alert('Access denied. Agent portal is for agents only.')
      await supabase.auth.signOut()
      router.push('/')
      return
    }

    setUser(user)
    setProfile(profile)
    await fetchAssignments(user.id)
    setLoading(false)
  }

  async function fetchAssignments(agentId: string) {
    const { data } = await supabase
      .from('verification_assignments')
      .select(`
        *,
        listings (
          id, name, area, city, price, type
        )
      `)
      .eq('agent_id', agentId)
      .in('status', ['pending', 'completed'])
      .order('assigned_at', { ascending: false })

    if (data) setAssignments(data)
  }

  async function handleVerificationSubmit(assignmentId: string, listingId: string) {
    if (!waterTest || !electricityTest || !securityCheck) {
      alert('⚠️ Please complete all inspection dropdowns.')
      return
    }
    if (selectedFiles.length === 0) {
      alert('⚠️ Please upload at least one photo.')
      return
    }

    setSubmittingId(assignmentId)
    try {
      const photoUrls: string[] = []

      // 1. Upload Multiple Photos
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        const fileExt = file.name.split('.').pop()
        const fileName = `agent-proof-${listingId}-${Date.now()}-${i}.${fileExt}`
        
        console.log('Uploading:', fileName)
        const { error: uploadError } = await supabase.storage
          .from('verification-proofs') 
          .upload(fileName, file)

        if (uploadError) throw uploadError

        const { data } = supabase.storage.from('verification-proofs').getPublicUrl(fileName)
        photoUrls.push(data.publicUrl)
      }

      console.log('Photo URLs:', photoUrls)

      // 2. Update Listing
      const { data: updateData, error: dbError } = await supabase
        .from('listings')
        .update({
          is_verified: true,
          verification_photos: photoUrls, // Array of URLs
          verification_notes: notes,
          water_test: waterTest,
          electricity_test: electricityTest,
          security_check: securityCheck,
          status: 'Verified',
          verification_payment_received: true
        })
        .eq('id', listingId)

      if (dbError) throw dbError
      console.log('DB Update Success:', updateData)

      // 3. Update Assignment
      await supabase
        .from('verification_assignments')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', assignmentId)

      alert('✅ Verification successful! Listing is now LIVE.')
      resetForm()
      if (user) await fetchAssignments(user.id)
      
    } catch (error: any) {
      console.error('Submission Error:', error)
      alert('❌ Error: ' + error.message)
    } finally {
      setSubmittingId(null)
    }
  }

  function resetForm() {
    setWaterTest('')
    setElectricityTest('')
    setSecurityCheck('')
    setNotes('')
    setSelectedFiles([])
    setActiveAssignmentId(null)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return <div style={{padding: 50}}>Loading...</div>

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', fontFamily: "sans-serif" }}>
      
      {/* 🎨 PRINT STYLES & CHECKLIST */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white; -webkit-print-color-adjust: exact; }
        }
        .print-only { display: none; }
      `}</style>

      <div className="print-only" style={{ padding: '40px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
        <div style={{ borderBottom: '4px solid #D4873A', paddingBottom: '20px', marginBottom: '30px' }}>
          <h1 style={{ color: '#1C1209', margin: 0, fontSize: '32px' }}>Ehani Homes</h1>
          <h2 style={{ color: '#D4873A', margin: '10px 0 0 0', fontSize: '20px', fontWeight: 'normal' }}>Field Verification Checklist</h2>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', fontSize: '14px' }}>
          <div><strong>Agent:</strong> {profile?.name || user?.email}</div>
          <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
        </div>

        <h3 style={{ color: '#1C1209', borderBottom: '2px solid #D4873A', paddingBottom: '5px' }}>A. Location & Exterior</h3>
        <p>☐ Street/Landmark photo taken</p>
        <p>☐ Building exterior photos taken (min. 2)</p>
        <p>☐ Location matches landlord's description</p>

        <h3 style={{ color: '#1C1209', borderBottom: '2px solid #D4873A', paddingBottom: '5px', marginTop: '20px' }}>B. Interior & Functionality</h3>
        <p>☐ Interior photos taken (Bedroom, Bathroom, Kitchen)</p>
        <p>☐ <strong>Water Test:</strong> Tap/Shower ran for 15s (Pass/Fail)</p>
        <p>☐ <strong>Electricity Test:</strong> Lights & Sockets working (Pass/Fail)</p>
        <p>☐ Toilet flushed (Drainage clear)</p>

        <h3 style={{ color: '#1C1209', borderBottom: '2px solid #D4873A', paddingBottom: '5px', marginTop: '20px' }}>C. Safety & Security</h3>
        <p>☐ Main gate/entrance is secure</p>
        <p>☐ Ground floor windows have grills (if applicable)</p>
        <p>☐ Main door has a functioning lock</p>

        <h3 style={{ color: '#1C1209', borderBottom: '2px solid #D4873A', paddingBottom: '5px', marginTop: '20px' }}>D. Final Decision</h3>
        <p>☐ <strong>APPROVED:</strong> Property meets Ehani Standards.</p>
        <p>☐ <strong>REJECTED:</strong> Property failed inspection.</p>

        <div style={{ marginTop: '40px', border: '1px solid #ccc', padding: '20px', height: '150px' }}>
          <strong>Agent Notes / Red Flags:</strong>
        </div>
      </div>

      {/*  APP INTERFACE */}
      <nav className="no-print" style={{ background: 'white', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, color: '#1C1209' }}>Agent Portal</h1>
          <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#6B5B4E' }}>Welcome, {profile?.name || user?.email}</p>
        </div>
        <button onClick={handleSignOut} style={{ padding: '8px 16px', background: '#F44336', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Sign Out</button>
      </nav>

      <div className="no-print" style={{ padding: '20px', maxWidth: 800, margin: '0 auto' }}>
        
        <button onClick={() => window.print()} style={{ width: '100%', padding: '12px', background: '#1C1209', color: 'white', border: 'none', borderRadius: 8, marginBottom: 20, cursor: 'pointer', fontWeight: 600 }}>
          🖨️ Print Physical Checklist (Offline Backup)
        </button>

        {assignments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, background: 'white', borderRadius: 12 }}>
            <p style={{ color: '#6B5B4E' }}>No pending verifications.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 20 }}>
            {assignments.map((assignment) => (
              <div key={assignment.id} style={{ background: 'white', padding: 20, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#1C1209' }}>{assignment.listings?.name}</h3>
                <p style={{ margin: '0 0 15px 0', color: '#6B5B4E', fontSize: 14 }}>📍 {assignment.listings?.area}, {assignment.listings?.city}</p>

                {assignment.status === 'pending' && (
                  <div style={{ borderTop: '1px solid #eee', paddingTop: 20 }}>
                    {activeAssignmentId === assignment.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                        <select value={waterTest} onChange={(e) => setWaterTest(e.target.value)} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}>
                          <option value="">Water Test...</option>
                          <option value="Pass">✅ Pass</option>
                          <option value="Fail"> Fail</option>
                        </select>
                        <select value={electricityTest} onChange={(e) => setElectricityTest(e.target.value)} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}>
                          <option value="">Electricity Test...</option>
                          <option value="Pass">✅ Pass</option>
                          <option value="Fail">❌ Fail</option>
                        </select>
                        <select value={securityCheck} onChange={(e) => setSecurityCheck(e.target.value)} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}>
                          <option value="">Security Check...</option>
                          <option value="Pass">✅ Pass</option>
                          <option value="Fail">❌ Fail</option>
                        </select>
                        
                        {/* 🆕 Multi-photo input without capture restriction */}
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*"
                          onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))} 
                          style={{ padding: 10, border: '1px solid #ccc', borderRadius: 6 }}
                        />
                        {selectedFiles.length > 0 && <p style={{ fontSize: 12, color: '#4CAF50' }}>{selectedFiles.length} photo(s) selected</p>}

                        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Agent notes..." style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}></textarea>

                        <button 
                          onClick={() => handleVerificationSubmit(assignment.id, assignment.listings.id)}
                          disabled={submittingId === assignment.id}
                          style={{ padding: 12, background: '#D4873A', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
                        >
                          {submittingId === assignment.id ? 'Submitting...' : 'Submit Verification'}
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setActiveAssignmentId(assignment.id)} style={{ width: '100%', padding: 12, background: '#007BFF', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
                        📝 Start Inspection
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
