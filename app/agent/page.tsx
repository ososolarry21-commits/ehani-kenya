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
          id,
          name,
          area,
          city,
          price,
          type
        )
      `)
      .eq('agent_id', agentId)
      .in('status', ['pending', 'completed'])
      .order('assigned_at', { ascending: false })

    if (data) setAssignments(data)
  }

  // 🆕 Comprehensive Verification Submission
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

      // 1. Upload Multiple Photos to Supabase Storage
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        const fileExt = file.name.split('.').pop()
        const fileName = `agent-proof-${listingId}-${Date.now()}-${i}.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('verification-photos') // Make sure this bucket exists in Supabase!
          .upload(fileName, file)

        if (uploadError) throw uploadError

        const { data } = supabase.storage.from('verification-photos').getPublicUrl(fileName)
        photoUrls.push(data.publicUrl)
      }

      // 2. Update the Listing in the Database
      const { error: dbError } = await supabase
        .from('listings')
        .update({
          is_verified: true,
          verification_photos: photoUrls,
          verification_notes: notes,
          water_test: waterTest,
          electricity_test: electricityTest,
          security_check: securityCheck,
          status: 'Verified',
          verification_payment_received: true
        })
        .eq('id', listingId)

      if (dbError) throw dbError

      // 3. Update Assignment Status
      await supabase
        .from('verification_assignments')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', assignmentId)

      alert('✅ Verification successful! Listing is now LIVE.')
      
      // Reset form and refresh
      resetForm()
      if (user) await fetchAssignments(user.id)
      
    } catch (error: any) {
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

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Print Styles for Backup Checklist */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white; }
        }
        .print-only { display: none; }
      `}</style>

      {/* Print Backup View (Hidden on screen, visible when printing) */}
      <div className="print-only" style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>Ehani Homes - Physical Verification Checklist</h1>
        <p><strong>Agent Name:</strong> {profile?.name || user?.email}</p>
        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        <hr />
        <h3>Inspection Criteria</h3>
        <p>☐ Water Test (Tap/Shower running)</p>
        <p>☐ Electricity Test (Lights & Sockets working)</p>
        <p> Security Check (Gate, locks, ground floor grills)</p>
        <p> Photos taken (Exterior, Interior, Bathroom)</p>
        <h3>Notes / Red Flags:</h3>
        <div style={{ border: '1px solid #ccc', height: '150px', marginTop: '10px' }}></div>
      </div>

      <nav className="no-print" style={{ 
        background: 'white', 
        padding: '16px 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, color: '#1C1209' }}>Agent Portal</h1>
          <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#6B5B4E' }}>
            Welcome, {profile?.name || user?.email}
          </p>
        </div>
        <button 
          onClick={handleSignOut}
          style={{ padding: '8px 16px', background: '#F44336', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}
        >
          Sign Out
        </button>
      </nav>

      <div className="no-print" style={{ padding: '20px', maxWidth: 800, margin: '0 auto' }}>
        
        {/* Print Button */}
        <button 
          onClick={() => window.print()}
          style={{ width: '100%', padding: '12px', background: '#f3f4f6', border: '1px solid #ccc', borderRadius: 8, marginBottom: 20, cursor: 'pointer', fontWeight: 600, color: '#333' }}
        >
          🖨️ Print Physical Checklist (Offline Backup)
        </button>

        <div style={{ marginBottom: 20 }}>
          <h2 style={{ color: '#1C1209', marginBottom: 8, fontSize: 22 }}>Your Assigned Verifications</h2>
          <p style={{ color: '#6B5B4E', margin: 0, fontSize: 14 }}>
            Visit each property, complete the form, and upload photos.
          </p>
        </div>

        {assignments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, background: 'white', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
            <p style={{ color: '#6B5B4E' }}>No pending verifications assigned to you.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 20 }}>
            {assignments.map((assignment) => (
              <div key={assignment.id} style={{
                background: 'white',
                padding: 20,
                borderRadius: 12,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                opacity: assignment.status === 'completed' ? 0.8 : 1
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 15, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 250 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <h3 style={{ margin: 0, color: '#1C1209', fontSize: 18 }}>
                        {assignment.listings?.name}
                      </h3>
                      {assignment.status === 'completed' && (
                        <span style={{ background: '#4CAF50', color: 'white', padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700 }}>
                          ✓ COMPLETED
                        </span>
                      )}
                    </div>
                    <p style={{ margin: '4px 0', color: '#6B5B4E', fontSize: 14 }}>
                       {assignment.listings?.area}, {assignment.listings?.city}
                    </p>
                    <p style={{ margin: '4px 0', color: '#6B5B4E', fontSize: 14 }}>
                      🏠 {assignment.listings?.type} • KSh {assignment.listings?.price?.toLocaleString()}/mo
                    </p>
                  </div>
                </div>

                {/* 🆕 Comprehensive Form for Pending Assignments */}
                {assignment.status === 'pending' && (
                  <div style={{ marginTop: 20, borderTop: '1px solid #eee', paddingTop: 20 }}>
                    {activeAssignmentId === assignment.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                        
                        <div>
                          <label style={{ fontWeight: 600, fontSize: 13, color: '#333', display: 'block', marginBottom: 5 }}>Water Test (Tap/Shower)</label>
                          <select 
                            value={waterTest} 
                            onChange={(e) => setWaterTest(e.target.value)} 
                            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 14 }}
                          >
                            <option value="">Select...</option>
                            <option value="Pass">✅ Pass</option>
                            <option value="Fail">❌ Fail</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontWeight: 600, fontSize: 13, color: '#333', display: 'block', marginBottom: 5 }}>Electricity Test (Lights/Sockets)</label>
                          <select 
                            value={electricityTest} 
                            onChange={(e) => setElectricityTest(e.target.value)} 
                            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 14 }}
                          >
                            <option value="">Select...</option>
                            <option value="Pass">✅ Pass</option>
                            <option value="Fail">❌ Fail</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontWeight: 600, fontSize: 13, color: '#333', display: 'block', marginBottom: 5 }}>Security Check (Gate/Locks)</label>
                          <select 
                            value={securityCheck} 
                            onChange={(e) => setSecurityCheck(e.target.value)} 
                            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 14 }}
                          >
                            <option value="">Select...</option>
                            <option value="Pass">✅ Pass</option>
                            <option value="Fail">❌ Fail</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ fontWeight: 600, fontSize: 13, color: '#333', display: 'block', marginBottom: 5 }}>Upload Photos (Min. 3)</label>
                          <input 
                            type="file" 
                            multiple 
                            accept="image/*"
                            capture="environment" // Opens camera directly on mobile!
                            onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))} 
                            style={{ width: '100%', padding: 10, border: '1px solid #ccc', borderRadius: 6 }}
                          />
                          {selectedFiles.length > 0 && <p style={{ fontSize: 12, color: '#4CAF50', marginTop: 5 }}>{selectedFiles.length} file(s) selected</p>}
                        </div>

                        <div>
                          <label style={{ fontWeight: 600, fontSize: 13, color: '#333', display: 'block', marginBottom: 5 }}>Agent Notes / Red Flags</label>
                          <textarea 
                            value={notes} 
                            onChange={(e) => setNotes(e.target.value)} 
                            rows={3}
                            placeholder="e.g., Water pressure is low, but everything else is fine."
                            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 14 }}
                          ></textarea>
                        </div>

                        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                          <button 
                            onClick={() => handleVerificationSubmit(assignment.id, assignment.listings.id)}
                            disabled={submittingId === assignment.id}
                            style={{ flex: 1, padding: 12, background: submittingId === assignment.id ? '#999' : '#D4873A', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
                          >
                            {submittingId === assignment.id ? 'Uploading...' : 'Submit Verification'}
                          </button>
                          <button 
                            onClick={resetForm}
                            style={{ padding: 12, background: '#f3f4f6', color: '#333', border: '1px solid #ccc', borderRadius: 8, cursor: 'pointer' }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setActiveAssignmentId(assignment.id)}
                        style={{ width: '100%', padding: 12, background: '#007BFF', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', marginTop: 10 }}
                      >
                        📝 Start Inspection Form
                      </button>
                    )}
                  </div>
                )}

                {/* Completed View */}
                {assignment.status === 'completed' && assignment.proof_url && (
                  <div style={{ marginTop: 16, padding: 12, background: '#E8F5E9', borderRadius: 8 }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: 12, color: '#2E7D32', fontWeight: 600 }}>
                      ✓ Proof uploaded successfully
                    </p>
                    <img 
                      src={assignment.proof_url} 
                      alt="Verification proof" 
                      style={{ maxWidth: '150px', borderRadius: 6, border: '2px solid #4CAF50' }}
                    />
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
