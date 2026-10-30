'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

// 🆕 PREMIUM UI COMPONENT: Custom Status Toggle
function StatusToggle({ label, icon, value, onChange }: { label: string, icon: React.ReactNode, value: string, onChange: (val: string) => void }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: '#1C1209', fontWeight: 600, fontSize: 14 }}>
        {icon}
        {label}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={() => onChange(value === 'Pass' ? '' : 'Pass')}
          style={{
            flex: 1, padding: '12px', borderRadius: 8, border: `2px solid ${value === 'Pass' ? '#2E7D32' : 'transparent'}`, 
            cursor: 'pointer', fontWeight: 700, fontSize: 14,
            background: value === 'Pass' ? '#E8F5E9' : '#F5F5F5',
            color: value === 'Pass' ? '#2E7D32' : '#666',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            transition: 'all 0.2s ease', boxShadow: value === 'Pass' ? '0 2px 8px rgba(46, 125, 50, 0.2)' : 'none'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          PASS
        </button>
        <button
          type="button"
          onClick={() => onChange(value === 'Fail' ? '' : 'Fail')}
          style={{
            flex: 1, padding: '12px', borderRadius: 8, border: `2px solid ${value === 'Fail' ? '#C62828' : 'transparent'}`, 
            cursor: 'pointer', fontWeight: 700, fontSize: 14,
            background: value === 'Fail' ? '#FFEBEE' : '#F5F5F5',
            color: value === 'Fail' ? '#C62828' : '#666',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            transition: 'all 0.2s ease', boxShadow: value === 'Fail' ? '0 2px 8px rgba(198, 40, 40, 0.2)' : 'none'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          FAIL
        </button>
      </div>
    </div>
  )
}

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
  
  // Image State for Previews and Removal
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setSelectedFiles(prev => [...prev, ...newFiles])
      const newPreviews = newFiles.map(file => URL.createObjectURL(file))
      setImagePreviews(prev => [...prev, ...newPreviews])
      e.target.value = '' 
    }
  }

  const removeImage = (indexToRemove: number) => {
    setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove))
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  async function handleVerificationSubmit(assignmentId: string, listingId: string) {
    if (!waterTest || !electricityTest || !securityCheck) {
      alert('⚠️ Please complete all inspection checks (Pass or Fail).')
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

  if (loading) return <div style={{padding: 50, textAlign: 'center', color: '#666'}}>Loading portal...</div>

  // SVG Icons
  const WaterIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
  const ElectricIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF9800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
  const SecurityIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      
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
        <h3 style={{ color: '#1C1209', borderBottom: '2px solid #D4873A', paddingBottom: '5px', marginTop: '20px' }}>B. Interior & Functionality</h3>
        <p>☐ Water Test: Tap/Shower ran for 15s (Pass/Fail)</p>
        <p>☐ Electricity Test: Lights & Sockets working (Pass/Fail)</p>
        <h3 style={{ color: '#1C1209', borderBottom: '2px solid #D4873A', paddingBottom: '5px', marginTop: '20px' }}>C. Safety & Security</h3>
        <p>☐ Main gate/entrance is secure</p>
        <p>☐ Main door has a functioning lock</p>
      </div>

      <nav className="no-print" style={{ background: 'white', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, color: '#1C1209' }}>Agent Portal</h1>
          <p style={{ margin: '4px 0 0 0', fontSize: 12, color: '#6B5B4E' }}>Welcome, {profile?.name || user?.email}</p>
        </div>
        <button onClick={handleSignOut} style={{ padding: '8px 16px', background: '#F44336', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>Sign Out</button>
      </nav>

      <div className="no-print" style={{ padding: '20px', maxWidth: 800, margin: '0 auto' }}>
        
        <button onClick={() => window.print()} style={{ width: '100%', padding: '14px', background: '#1C1209', color: 'white', border: 'none', borderRadius: 10, marginBottom: 24, cursor: 'pointer', fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Print Physical Checklist (Offline Backup)
        </button>

        {assignments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, background: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
            <p style={{ color: '#6B5B4E', fontSize: 16, fontWeight: 500 }}>No verifications assigned to you yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 20 }}>
            {assignments.map((assignment) => {
              const listing = assignment.listings;
              let statusMessage = "⏳ Submitted. Awaiting Admin Approval.";
              let statusColor = "#FFF8E1";
              let statusTextColor = "#F57C00";

              if (listing?.status === 'Verified') {
                statusMessage = "✅ Approved & Live on Platform!";
                statusColor = "#E8F5E9";
                statusTextColor = "#2E7D32";
              } else if (listing?.status === 'Rejected') {
                statusMessage = "❌ Rejected by Admin. Check notes.";
                statusColor = "#FFEBEE";
                statusTextColor = "#C62828";
              }

              return (
                <div key={assignment.id} style={{ background: 'white', padding: 24, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#1C1209', fontSize: 18 }}>{listing?.name}</h3>
                  <p style={{ margin: '0 0 20px 0', color: '#6B5B4E', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {listing?.area}, {listing?.city}
                  </p>

                  {assignment.status !== 'completed' ? (
                    <div style={{ borderTop: '1px solid #eee', paddingTop: 20 }}>
                      {activeAssignmentId === assignment.id ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                          
                          {/* 🆕 PREMIUM TOGGLES REPLACE DROPDOWNS */}
                          <StatusToggle 
                            label="Water Test (Tap/Shower)" 
                            icon={WaterIcon} 
                            value={waterTest} 
                            onChange={setWaterTest} 
                          />
                          <StatusToggle 
                            label="Electricity Test (Lights/Sockets)" 
                            icon={ElectricIcon} 
                            value={electricityTest} 
                            onChange={setElectricityTest} 
                          />
                          <StatusToggle 
                            label="Security Check (Locks/Gates)" 
                            icon={SecurityIcon} 
                            value={securityCheck} 
                            onChange={setSecurityCheck} 
                          />
                          
                          <div>
                            <label style={{ fontWeight: 600, fontSize: 14, color: '#1C1209', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                              Upload Proof Photos (Min. 3)
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
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '14px', background: '#FDF8F3', color: '#1C1209', borderRadius: 10, cursor: 'pointer', fontWeight: 600, border: '2px dashed #D4873A', boxSizing: 'border-box' }}
                            >
                              Choose Photos
                            </label>

                            {imagePreviews.length > 0 && (
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 12, marginTop: 16 }}>
                                {imagePreviews.map((preview, index) => (
                                  <div key={index} style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', aspectRatio: '1', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                    <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <button
                                      type="button"
                                      onClick={() => removeImage(index)}
                                      style={{
                                        position: 'absolute', top: 6, right: 6, background: 'rgba(255, 255, 255, 0.95)', color: '#C62828',
                                        border: 'none', borderRadius: '50%', width: 26, height: 26, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 'bold',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                      }}
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div>
                            <label style={{ fontWeight: 600, fontSize: 14, color: '#1C1209', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                              Agent Notes / Red Flags
                            </label>
                            <textarea 
                              value={notes} 
                              onChange={(e) => setNotes(e.target.value)} 
                              rows={3} 
                              placeholder="e.g., Water pressure is low, but locks are new..." 
                              style={{ width: '100%', padding: 14, borderRadius: 10, border: '1px solid #DDD0C4', fontSize: 14, boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }}
                            ></textarea>
                          </div>

                          <button 
                            onClick={() => handleVerificationSubmit(assignment.id, listing.id)}
                            disabled={submittingId === assignment.id}
                            style={{ 
                              padding: '16px', 
                              background: submittingId === assignment.id ? '#999' : 'linear-gradient(135deg, #D4873A, #B86E28)', 
                              color: 'white', 
                              border: 'none', 
                              borderRadius: 10, 
                              fontWeight: 700, 
                              fontSize: 16,
                              cursor: submittingId === assignment.id ? 'not-allowed' : 'pointer', 
                              width: '100%',
                              boxShadow: '0 4px 12px rgba(212, 135, 58, 0.3)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                            }}
                          >
                            {submittingId === assignment.id ? (
                              <>Submitting...</>
                            ) : (
                              <>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                Submit for Admin Approval
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setActiveAssignmentId(assignment.id)} 
                          style={{ width: '100%', padding: '16px', background: '#1C1209', color: 'white', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                          Start Inspection
                        </button>
                      )}
                    </div>
                  ) : (
                    <div style={{ marginTop: 16, padding: 16, background: statusColor, borderRadius: 10, border: `1px solid ${statusTextColor}`, display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ fontSize: 24 }}>{listing?.status === 'Verified' ? '🎉' : listing?.status === 'Rejected' ? '⚠️' : '⏳'}</div>
                      <p style={{ margin: 0, fontSize: 15, color: statusTextColor, fontWeight: 600 }}>
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
