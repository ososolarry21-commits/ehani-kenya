'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function AdminPanel() {
  const [user, setUser] = useState<any>(null)
  const [listings, setListings] = useState<any[]>([])
  const [agents, setAgents] = useState<any[]>([])
  const [filter, setFilter] = useState<'all' | 'pending_approval' | 'pending_verification' | 'verified' | 'rejected'>('all')
  const [loading, setLoading] = useState(true)
  
  // Modal States
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [assignListingId, setAssignListingId] = useState('')
  const [selectedAgentId, setSelectedAgentId] = useState('')
  const [assigning, setAssigning] = useState(false)
  
  const [showRejectModal, setShowRejectModal] = useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  
  const router = useRouter()

  useEffect(() => { checkAdmin() }, [])

  async function checkAdmin() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/'); return }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()

    if (profile?.role !== 'admin') {
      await supabase.auth.signOut()
      router.push('/')
      return
    }

    setUser(user)
    await fetchListings()
    await fetchAgents()
    setLoading(false)
  }

  async function fetchListings() {
    try {
      // The '*' automatically fetches the new columns: verification_photos, verification_notes, water_test, etc.
      const { data: listingsData, error: listingsError } = await supabase
        .from('listings')
        .select(`
          *,
          profiles:landlord_id(name, email)
        `)
        .order('is_verified', { ascending: false })
        .order('created_at', { ascending: false })
      
      if (listingsError) {
        console.error('Error fetching listings:', listingsError)
        alert('Error loading listings: ' + listingsError.message)
        return
      }

      if (!listingsData || listingsData.length === 0) {
        setListings([])
        return
      }

      const { data: assignmentsData } = await supabase
        .from('verification_assignments')
        .select('listing_id, proof_url, status, agent_id')
        .in('listing_id', listingsData.map((l: any) => l.id))

      const processed = listingsData.map((listing: any) => {
        const completedAssignment = assignmentsData?.find(
          (a: any) => a.listing_id === listing.id && a.status === 'completed'
        )
        
        return {
          ...listing,
          proof_image_url: completedAssignment?.proof_url || null,
          assigned_agent: completedAssignment?.agent_id || null
        }
      })
      
      setListings(processed)
    } catch (error) {
      console.error('Fatal error in fetchListings:', error)
    }
  }

  async function fetchAgents() {
    const { data } = await supabase
      .from('profiles')
      .select('id, name, email')
      .eq('role', 'agent')
    if (data) setAgents(data)
  }

  // ✅ NEW: Approve and make live
  async function handleApprove(listingId: string) {
    if (!confirm('Approve this listing and make it LIVE?')) return
    try {
      await supabase
        .from('listings')
        .update({ 
          status: 'Verified',
          is_verified: true,
          is_rejected: false,
          rejected: false,
          rejection_reason: null
        })
        .eq('id', listingId)
      
      alert('✅ Listing approved and is now LIVE!')
      await fetchListings()
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  // ❌ NEW: Reject with reason
  async function handleReject(listingId: string) {
    if (!rejectionReason.trim()) {
      alert('⚠️ Please provide a reason for rejection.')
      return
    }
    try {
      await supabase
        .from('listings')
        .update({ 
          status: 'Rejected',
          is_verified: false,
          is_rejected: true,
          rejected: true,
          rejection_reason: rejectionReason
        })
        .eq('id', listingId)
      
      alert('❌ Listing rejected.')
      setShowRejectModal(null)
      setRejectionReason('')
      await fetchListings()
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  // Legacy approve (kept for backwards compatibility if needed)
  async function approveListing(listingId: string) {
    if (!confirm('Approve this listing?')) return
    const listing = listings.find(l => l.id === listingId)
    const shouldAutoVerify = listing?.verification_payment_received && (listing?.proof_image_url || listing?.verification_photos?.length > 0)

    try {
      await supabase
        .from('listings')
        .update({ 
          status: 'Verified',
          is_verified: shouldAutoVerify
        })
        .eq('id', listingId)
      alert('✅ Listing approved!')
      await fetchListings()
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  async function assignAgent() {
    if (!assignListingId || !selectedAgentId) {
      alert('Please select an agent')
      return
    }

    setAssigning(true)
    try {
      const { data: existing } = await supabase
        .from('verification_assignments')
        .select('id, status')
        .eq('listing_id', assignListingId)
        .eq('agent_id', selectedAgentId)
        .single()

      if (existing) {
        if (existing.status === 'completed') {
          alert('This agent has already completed verification for this property.')
        } else {
          alert('This agent is already assigned to this property.')
        }
        setShowAssignModal(false)
        setSelectedAgentId('')
        return
      }

      const { error } = await supabase
        .from('verification_assignments')
        .insert({
          listing_id: assignListingId,
          agent_id: selectedAgentId
        })

      if (error) throw error

      alert('✅ Agent assigned successfully!')
      setShowAssignModal(false)
      setSelectedAgentId('')
      await fetchListings()
    } catch (error: any) {
      alert('Error: ' + error.message)
    } finally {
      setAssigning(false)
    }
  }

  async function deleteListing(listingId: string) {
    if (!confirm('Delete this listing permanently?')) return
    await supabase.from('listings').delete().eq('id', listingId)
    await fetchListings()
  }

  const filteredListings = listings.filter(listing => {
    if (filter === 'all') return true
    if (filter === 'pending_approval') return listing.status === 'Pending Admin Approval' || listing.status === 'pending'
    if (filter === 'pending_verification') return listing.verification_payment_received && !listing.is_verified && listing.status !== 'Pending Admin Approval'
    if (filter === 'verified') return listing.is_verified
    if (filter === 'rejected') return listing.is_rejected || listing.rejected || listing.status === 'Rejected'
    return true
  })

  const stats = {
    total: listings.length,
    pending: listings.filter(l => l.status === 'Pending Admin Approval' || l.status === 'pending').length,
    awaitingVerification: listings.filter(l => l.verification_payment_received && !l.is_verified && l.status !== 'Pending Admin Approval').length,
    verified: listings.filter(l => l.is_verified).length
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
      <nav style={{ background: 'white', padding: '16px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
        <h1 style={{ margin: 0, fontSize: 24, color: '#1C1209' }}>Admin Panel</h1>
        <button onClick={() => router.push('/dashboard')} style={{ padding: '10px 20px', background: '#1C1209', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          Back to Dashboard
        </button>
      </nav>

      <div style={{ padding: '40px 60px', maxWidth: 1400, margin: '0 auto' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 30 }}>
          <div style={{ background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#1C1209' }}>{stats.total}</div>
            <div style={{ color: '#6B5B4E', fontSize: 13 }}>Total Listings</div>
          </div>
          <div style={{ background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#FF9800' }}>{stats.pending}</div>
            <div style={{ color: '#6B5B4E', fontSize: 13 }}>Pending Approval</div>
          </div>
          <div style={{ background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#2196F3' }}>{stats.awaitingVerification}</div>
            <div style={{ color: '#6B5B4E', fontSize: 13 }}>Awaiting Verification</div>
          </div>
          <div style={{ background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#4CAF50' }}>{stats.verified}</div>
            <div style={{ color: '#6B5B4E', fontSize: 13 }}>Verified Properties</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          {['all', 'pending_approval', 'pending_verification', 'verified', 'rejected'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f as any)}
              style={{ 
                padding: '10px 20px', 
                background: filter === f ? (f === 'pending_approval' ? '#FF9800' : f === 'verified' ? '#4CAF50' : f === 'rejected' ? '#F44336' : '#1C1209') : 'white', 
                color: filter === f ? 'white' : '#1C1209',
                border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600,
                textTransform: 'capitalize'
              }}
            >
              {f.replace('_', ' ')} {f === 'pending_approval' ? `(${stats.pending})` : f === 'pending_verification' ? `(${stats.awaitingVerification})` : f === 'verified' ? `(${stats.verified})` : ''}
            </button>
          ))}
        </div>

        {/* Listings */}
        {filteredListings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, background: 'white', borderRadius: 12 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
            <p style={{ color: '#6B5B4E' }}>No listings found</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {filteredListings.map((listing) => (
              <div key={listing.id} style={{ background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 20, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 300 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <h3 style={{ margin: 0, color: '#1C1209' }}>{listing.name}</h3>
                      {listing.is_verified && (
                        <span style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)', color: 'white', padding: '4px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                          ✓ VERIFIED
                        </span>
                      )}
                      {(listing.is_rejected || listing.rejected || listing.status === 'Rejected') && (
                        <span style={{ background: '#F44336', color: 'white', padding: '4px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                          ✗ REJECTED
                        </span>
                      )}
                    </div>
                    <p style={{ margin: '4px 0', color: '#6B5B4E', fontSize: 14 }}>📍 {listing.area}, {listing.city}</p>
                    <p style={{ margin: '4px 0', color: '#6B5B4E', fontSize: 14 }}>👤 {listing.profiles?.name || 'Unknown'} ({listing.profiles?.email || 'No email'})</p>
                    <p style={{ margin: '4px 0', color: '#D4873A', fontSize: 14, fontWeight: 600 }}>KSh {listing.price?.toLocaleString()}/month</p>
                    
                    {listing.assigned_agent && (
                      <p style={{ margin: '4px 0', fontSize: 12, color: '#2196F3' }}>
                        👷 Agent: {agents.find((a: any) => a.id === listing.assigned_agent)?.name || 'Unknown'}
                      </p>
                    )}

                    {/* 🆕 NEW: Agent Verification Data Display */}
                    {listing.status === 'Pending Admin Approval' && (
                      <div style={{ marginTop: 20, borderTop: '1px solid #eee', paddingTop: 20 }}>
                        <h4 style={{ margin: '0 0 15px 0', fontSize: 14, color: '#1C1209' }}>🕵️ Agent Inspection Report</h4>
                        
                        {/* Test Results */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10, marginBottom: 15 }}>
                          <div style={{ background: '#F9FAFB', padding: 10, borderRadius: 6 }}>
                            <p style={{ margin: '0 0 4px 0', fontSize: 11, color: '#666', fontWeight: 600 }}>💧 Water</p>
                            <p style={{ margin: 0, fontSize: 14, color: listing.water_test === 'Pass' ? '#2E7D32' : '#C62828', fontWeight: 700 }}>
                              {listing.water_test === 'Pass' ? '✅ Pass' : listing.water_test === 'Fail' ? '❌ Fail' : 'N/A'}
                            </p>
                          </div>
                          <div style={{ background: '#F9FAFB', padding: 10, borderRadius: 6 }}>
                            <p style={{ margin: '0 0 4px 0', fontSize: 11, color: '#666', fontWeight: 600 }}>⚡ Electricity</p>
                            <p style={{ margin: 0, fontSize: 14, color: listing.electricity_test === 'Pass' ? '#2E7D32' : '#C62828', fontWeight: 700 }}>
                              {listing.electricity_test === 'Pass' ? '✅ Pass' : listing.electricity_test === 'Fail' ? '❌ Fail' : 'N/A'}
                            </p>
                          </div>
                          <div style={{ background: '#F9FAFB', padding: 10, borderRadius: 6 }}>
                            <p style={{ margin: '0 0 4px 0', fontSize: 11, color: '#666', fontWeight: 600 }}>🔒 Security</p>
                            <p style={{ margin: 0, fontSize: 14, color: listing.security_check === 'Pass' ? '#2E7D32' : '#C62828', fontWeight: 700 }}>
                              {listing.security_check === 'Pass' ? '✅ Pass' : listing.security_check === 'Fail' ? '❌ Fail' : 'N/A'}
                            </p>
                          </div>
                        </div>

                        {/* Photos Array */}
                        {listing.verification_photos && listing.verification_photos.length > 0 && (
                          <div style={{ marginBottom: 15 }}>
                            <p style={{ margin: '0 0 8px 0', fontSize: 12, color: '#333', fontWeight: 600 }}>📸 Agent Photos ({listing.verification_photos.length})</p>
                            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
                              {listing.verification_photos.map((url: string, idx: number) => (
                                <img 
                                  key={idx} 
                                  src={url} 
                                  alt={`Proof ${idx}`} 
                                  style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 6, border: '1px solid #ddd', cursor: 'pointer' }} 
                                  onClick={() => window.open(url, '_blank')}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Agent Notes */}
                        {listing.verification_notes && (
                          <div style={{ background: '#FFF8E1', padding: 12, borderRadius: 6, marginBottom: 15, borderLeft: '4px solid #D4873A' }}>
                            <p style={{ margin: '0 0 4px 0', fontSize: 11, color: '#666', fontWeight: 600 }}>📝 Agent Notes:</p>
                            <p style={{ margin: 0, fontSize: 13, color: '#333' }}>{listing.verification_notes}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Legacy Proof Image (for older records) */}
                    {!listing.verification_photos?.length && listing.proof_image_url && (
                      <div style={{ marginTop: 16, padding: 16, background: '#E8F5E9', borderRadius: 8 }}>
                        <p style={{ margin: '0 0 12px 0', fontSize: 13, color: '#2E7D32', fontWeight: 600 }}>✓ Agent Proof Uploaded</p>
                        <img src={listing.proof_image_url} alt="Verification proof" style={{ maxWidth: '300px', borderRadius: 6, border: '2px solid #4CAF50' }} />
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 140 }}>
                    {listing.status === 'Pending Admin Approval' && (
                      <>
                        <button 
                          onClick={() => handleApprove(listing.id)}
                          style={{ padding: '10px 16px', background: '#2E7D32', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 700 }}
                        >
                          ✅ Approve & Go Live
                        </button>
                        <button 
                          onClick={() => setShowRejectModal(listing.id)}
                          style={{ padding: '10px 16px', background: 'white', color: '#C62828', border: '1px solid #C62828', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}
                        >
                          ❌ Reject
                        </button>
                      </>
                    )}

                    {listing.status === 'pending' && (
                      <>
                        <button onClick={() => approveListing(listing.id)} style={{ padding: '8px 16px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>✓ Approve</button>
                        <button onClick={() => { setShowRejectModal(listing.id); }} style={{ padding: '8px 16px', background: '#F44336', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>✗ Reject</button>
                      </>
                    )}
                    
                    {listing.verification_payment_received && !listing.is_verified && listing.status !== 'Pending Admin Approval' && (
                      <button 
                        onClick={() => { setAssignListingId(listing.id); setShowAssignModal(true); }}
                        style={{ padding: '8px 16px', background: 'linear-gradient(135deg, #FF9800, #F57C00)', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 700 }}
                      >
                        👷 Assign Agent
                      </button>
                    )}
                    
                    <button onClick={() => deleteListing(listing.id)} style={{ padding: '8px 16px', background: '#F8D7DA', color: '#721C24', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, marginTop: 8 }}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assign Agent Modal */}
      {showAssignModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: 40, borderRadius: 16, maxWidth: 400, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <h2 style={{ margin: '0 0 16px 0', color: '#FF9800', textAlign: 'center', fontSize: 24 }}>Assign Agent</h2>
            <p style={{ color: '#6B5B4E', textAlign: 'center', marginBottom: 24, fontSize: 14 }}>Select an agent to verify this property.</p>
            
            {agents.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#F44336' }}>No agents registered yet. Create an agent account first.</p>
            ) : (
              <>
                <select value={selectedAgentId} onChange={(e) => setSelectedAgentId(e.target.value)} style={{ width: '100%', padding: '12px', border: '2px solid #DDD0C4', borderRadius: 8, fontSize: 14, marginBottom: 20 }}>
                  <option value="">Select an agent...</option>
                  {agents.map((agent: any) => (
                    <option key={agent.id} value={agent.id}>{agent.name || agent.email}</option>
                  ))}
                </select>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => { setShowAssignModal(false); setSelectedAgentId(''); }} style={{ flex: 1, padding: '12px', background: '#f0f0f0', color: '#333', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
                  <button onClick={assignAgent} disabled={assigning || !selectedAgentId} style={{ flex: 1, padding: '12px', background: assigning || !selectedAgentId ? '#999' : '#FF9800', color: 'white', border: 'none', borderRadius: 8, cursor: assigning || !selectedAgentId ? 'not-allowed' : 'pointer', fontWeight: 700 }}>
                    {assigning ? 'Assigning...' : 'Assign Agent'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 🆕 Reject Modal */}
      {showRejectModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: 30, borderRadius: 16, maxWidth: 450, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#C62828' }}>Reject Listing</h3>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 16 }}>Please provide a reason so the agent/landlord knows what to fix.</p>
            
            <textarea 
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g., Photos do not match description, no running water, unsafe area..."
              rows={4}
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #EF9A9A', marginBottom: 20, fontSize: 14, boxSizing: 'border-box' }}
            />
            
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => { setShowRejectModal(null); setRejectionReason(''); }} style={{ flex: 1, padding: '12px', background: '#f0f0f0', color: '#333', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={() => handleReject(showRejectModal)} style={{ flex: 1, padding: '12px', background: '#C62828', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>Confirm Rejection</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
