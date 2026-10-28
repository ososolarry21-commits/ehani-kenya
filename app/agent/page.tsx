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
  
  // 🆕 Image State for Previews and Removal
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  
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
    // 🆕 Fetch the listing's status so we know if Admin approved it yet
    const { data } = await supabase
      .from('verification_assignments')
      .select(`
        *,
        listings ( id, name, area, city, price, type, status )
      `)
      .eq('agent_id', agentId)
      .order('assigned_at', { ascending: false })

    if (data) setAssignments(data)
  }

  // 🆕 Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setSelectedFiles(prev => [...prev, ...newFiles])
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file))
      setImagePreviews(prev => [...prev, ...newPreviews])
      
      e.target.value = '' // Reset input
    }
  }

  //  Remove Image Function
  const removeImage = (indexToRemove: number) => {
    setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove))
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove))
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

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]
        const fileExt = file.name.split('.').pop()
        const fileName = `agent-proof-${listingId}-${Date.now()}-${i}.${fileExt}`
        
        const { error: uploadError } = await supabase.storage
          .from('verification-proofs') 
          .upload(fileName, file)

        if (uploadError) throw uploadError

        const { data } = supabase.storage.from('verification-proofs').getPublicUrl(fileName)
        photoUrls.push(data.publicUrl)
      }

      const { error: dbError } = await supabase
        .from('listings')
        .update({
          is_verified: false,
          verification_photos: photoUrls,
          verification_notes: notes,
          water_test: waterTest,
          electricity_test: electricityTest,
          security_check: securityCheck,
          status: 'Pending Admin Approval',
          verification_payment_received: true,
          is_rejected: false,
          rejected: false
        })
        .eq('id', listingId)

      if (dbError) throw dbError

      await supabase
        .from('verification_assignments')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', assignmentId)

      alert('✅ Verification submitted successfully! Awaiting Admin approval.')
      
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
    setImagePreviews([])
    setActiveAssignmentId(null)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return <div style={{padding: 50}}>Loading...</div>

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', fontFamily: "sans-serif" }}>
      
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
        <p> Building exterior photos taken (min. 2)</p>
        <h3 style={{ color: '#1C1209', borderBottom: '2px solid #D4873A', paddingBottom: '5px', marginTop: '20px' }}>B. Interior & Functionality</h3>
        <p>☐ Water Test: Tap/Shower ran for 15s (Pass/Fail)</p>
        <p>☐ Electricity Test: Lights & Sockets working (Pass/Fail)</p>
        <h3 style={{ color: '#1C1209', borderBottom: '2px solid #D4873A', paddingBottom: '5px', marginTop: '20px' }}>C. Safety & Security</h3>
        <p>☐ Main gate/entrance is secure</p>
        <p>☐ Main door has a functioning lock</p>
      </div>

      <nav className="no-print" style={{ background: 'white', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, color: '#1C1209' }}>Agent Portal</h1>
          <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#6B5B4E' }}>Welcome, {profile?.name || user?.email}</p>
        </div>
        <button onClick={handleSignOut} style={{ padding: '8px 16px', background: '#F44336', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Sign Out</button>
      </nav>

      <div className="no-print" style={{ padding: '20px', maxWidth: 800, margin: '0 auto' }}>
        
        <button onClick={() => window.print()} style={{ width: '100%', padding: '12px', background: '#1C1209', color: 'white', border: 'none', borderRadius: 8, marginBottom: 20, cursor: 'pointer', fontWeight: 600 }}>
          ️ Print Physical Checklist (Offline Backup)
        </button>

        {assignments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, background: 'white', borderRadius: 12 }}>
            <p style={{ color: '#6B5B4E' }}>No verifications assigned to you.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 20 }}>
            {assignments.map((assignment) => {
              const listing = assignment.listings;
              // 🆕 Determine the final status based on the Listing's status, not just the assignment
              let statusMessage = "⏳ Submitted. Awaiting Admin Approval.";
              let statusColor = "#FFF8E1"; // Yellow
              let statusTextColor = "#F57C00";

              if (listing?.status === 'Verified') {
                statusMessage = "✅ Approved & Live on Platform!";
                statusColor = "#E8F5E9"; // Green
                statusTextColor = "#2E7D32";
              } else if (listing?.status === 'Rejected') {
                statusMessage = "❌ Rejected by Admin. Check notes.";
                statusColor = "#FFEBEE"; // Red
                statusTextColor = "#C62828";
              }

              return (
                <div key={assignment.id} style={{ background: 'white', padding: 20, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#1C1209' }}>{listing?.name}</h3>
                  <p style={{ margin: '0 0 15px 0', color: '#6B5B4E', fontSize: 14 }}>📍 {listing?.area}, {listing?.city}</p>

                  {assignment.status !== 'completed' ? (
                    <div style={{ borderTop: '1px solid #eee', paddingTop: 20 }}>
                      {activeAssignmentId === assignment.id ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                          <select value={waterTest} onChange={(e) => setWaterTest(e.target.value)} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', width: '100%' }}>
                            <option value="">Water Test...</option>
                            <option value="Pass">✅ Pass</option>
                            <option value="Fail">❌ Fail</option>
                          </select>
                          <select value={electricityTest} onChange={(e) => setElectricityTest(e.target.value)} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', width: '100%' }}>
                            <option value="">Electricity Test...</option>
                            <option value="Pass">✅ Pass</option>
                            <option value="Fail">❌ Fail</option>
                          </select>
                          <select value={securityCheck} onChange={(e) => setSecurityCheck(e.target.value)} style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', width: '100%' }}>
                            <option value="">Security Check...</option>
                            <option value="Pass">✅ Pass</option>
                            <option value="Fail">❌ Fail</option>
                          </select>
                          
                          {/* 🆕 Image Upload with Previews and Remove Buttons */}
                          <div>
                            <label style={{ fontWeight: 600, fontSize: 13, color: '#333', display: 'block', marginBottom: 5 }}>
                              Upload Photos (Min. 3)
                            </label>
                            <input 
                              type="file" 
                              multiple 
                              accept="image/*"
                              onChange={handleImageChange}
                              style={{ display: 'none' }}
                              id={`file-upload-${assignment.id}`}
                            />
                            <label 
                              htmlFor={`file-upload-${assignment.id}`}
                              style={{ display: 'inline-block', padding: '10px 16px', background: '#F0EAE3', color: '#1C1209', borderRadius: 6, cursor: 'pointer', fontWeight: 600, border: '2px dashed #DDD0C4' }}
                            >
                              📸 Choose Photos
                            </label>

                            {imagePreviews.length > 0 && (
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10, marginTop: 16 }}>
                                {imagePreviews.map((preview, index) => (
                                  <div key={index} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', aspectRatio: '1' }}>
                                    <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <button
                                      type="button"
                                      onClick={() => removeImage(index)}
                                      style={{
                                        position: 'absolute', top: 4, right: 4, background: 'rgba(220, 53, 69, 0.9)', color: 'white',
                                        border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 'bold'
                                      }}
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Agent notes / Red flags..." style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', width: '100%' }}></textarea>

                          <button 
                            onClick={() => handleVerificationSubmit(assignment.id, listing.id)}
                            disabled={submittingId === assignment.id}
                            style={{ padding: 12, background: '#D4873A', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', width: '100%' }}
                          >
                            {submittingId === assignment.id ? 'Submitting...' : 'Submit for Admin Approval'}
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setActiveAssignmentId(assignment.id)} style={{ width: '100%', padding: 12, background: '#007BFF', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
                          📝 Start Inspection
                        </button>
                      )}
                    </div>
                  ) : (
                    // 🆕 Updated Status Box
                    <div style={{ marginTop: 16, padding: 12, background: statusColor, borderRadius: 8, border: `1px solid ${statusTextColor}` }}>
                      <p style={{ margin: 0, fontSize: 14, color: statusTextColor, fontWeight: 600 }}>
                        {statusMessage}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}
