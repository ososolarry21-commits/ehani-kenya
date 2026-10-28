'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import KcbPaymentButton from '../../components/KcbPaymentButton'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

const AMENITIES_LIST = ['WiFi', 'Water', 'Parking', 'Security', 'Furnished', 'Laundry', 'Balcony', 'Backup Generator']

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [listings, setListings] = useState<any[]>([])
  const [stats, setStats] = useState({ total: 0, active: 0, pending: 0, views: 0, contacts: 0 })
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '', type: 'Bedsitter', price: '', deposit: '', area: '', city: '',
    institution: '', distance: '', gender: 'Mixed', description: '', amenities: [] as string[]
  })
  
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  useEffect(() => { checkUser() }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/'); return }
  
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role === 'student') { router.push('/browse'); return }
  
    setUser(user)
    setProfile(profile)
    await fetchListings(user.id)
    setLoading(false)
  }

  // 🔧 FINAL FIX: Fetches assignments, then fetches agent names separately to avoid join issues
  async function fetchListings(userId: string) {
    console.log(' 1. Current Landlord User ID:', userId);

    // Step 1: Get listings
    const { data: listingsData, error: listingsError } = await supabase
      .from('listings')
      .select('*')
      .eq('landlord_id', userId)
      .order('created_at', { ascending: false })

    if (listingsError) console.error('Listings Error:', listingsError);
    if (!listingsData || listingsData.length === 0) {
      console.log('❌ No listings found for this user.');
      setListings([]);
      return;
    }

    const listingIds = listingsData.map((l: any) => l.id);
    console.log('🔍 2. Listing IDs owned by this user:', listingIds);

    // Step 2: Fetch Assignments (Without the tricky join)
    const { data: assignmentsData, error: assignmentsError } = await supabase
      .from('verification_assignments')
      .select(`listing_id, status, agent_id`) 
      .in('listing_id', listingIds);

    console.log(' 3. Result of assignment query:', assignmentsData);

    // Step 3: If we have assignments, fetch the Agent Names separately
    if (assignmentsData && assignmentsData.length > 0) {
           // Extract unique Agent IDs (Safe for all TS versions)
      const allAgentIds = assignmentsData.map((a: any) => a.agent_id).filter(Boolean);
      const agentIds = allAgentIds.filter((id, index) => allAgentIds.indexOf(id) === index);
      
      if (agentIds.length > 0) {
        console.log('🔍 Fetching names for Agent IDs:', agentIds);
        
        // Fetch Agent Profiles
        const { data: agentsData } = await supabase
          .from('profiles')
          .select('id, name')
          .in('id', agentIds);

        console.log('🔍 4. Fetched Agent Profiles:', agentsData);

        // Map Agent Names to Assignments
        assignmentsData.forEach((assignment: any) => {
          const agent = agentsData?.find((a: any) => a.id === assignment.agent_id);
          assignment.agent_name = agent?.name || 'Unknown Agent';
        });
      }
    }

    // Step 4: Combine Data
    const processedListings = listingsData.map((listing: any) => {
      const listingAssignments = assignmentsData?.filter(
        (a: any) => String(a.listing_id) === String(listing.id)
      ) || []

      const hasAssignment = listingAssignments.length > 0
      const activeAssignment = listingAssignments.find(
        (a: any) => a.status !== 'completed'
      ) || listingAssignments[0]
      
      // Use the manually fetched name
     const agentName = (activeAssignment as any)?.agent_name || null;

      console.log(`✅ Listing: ${listing.name} | Assigned: ${hasAssignment} | Agent: ${agentName}`)

      return {
        ...listing,
        assigned_agent_name: agentName,
        is_agent_assigned: hasAssignment
      }
    })

    setListings(processedListings)
    setStats({
      total: processedListings.length,
      active: processedListings.filter((l: any) => l.status === 'approved' || l.status === 'Verified').length,
      pending: processedListings.filter((l: any) => l.status === 'pending' || l.status === 'Pending Admin Approval').length,
      views: processedListings.reduce((sum: number, l: any) => sum + (l.views || 0), 0),
      contacts: processedListings.reduce((sum: number, l: any) => sum + (l.contacts || 0), 0)
    })
  }

  //  NATIVE IMAGE COMPRESSOR (No npm install needed!)
  const compressImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          let width = img.width;
          let height = img.height;
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Compression failed'));
          }, 'image/jpeg', 0.7); 
        };
      };
    });
  };

  const uploadImages = async (listingId: string): Promise<string[]> => {
    setUploadingImages(true);
    const uploadPromises = images.map(async (file, index) => {
      try {
        const compressedBlob = await compressImage(file);
        const fileName = `${listingId}-${Date.now()}-${index}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(fileName, compressedBlob, { contentType: 'image/jpeg' });
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('property-images').getPublicUrl(fileName);
        return data.publicUrl;
      } catch (error) {
        console.error('Upload error:', error);
        throw error;
      }
    });
    const urls = await Promise.all(uploadPromises);
    setUploadingImages(false);
    return urls;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setImages(prev => [...prev, ...selectedFiles])
      const previews = selectedFiles.map(file => URL.createObjectURL(file))
      setImagePreviews(prev => [...prev, ...previews])
      e.target.value = '' 
    }
  }

  const removeImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove))
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => {
      const current = prev.amenities
      if (current.includes(amenity)) return { ...prev, amenities: current.filter(a => a !== amenity) }
      else return { ...prev, amenities: [...current, amenity] }
    })
  }

  async function handleAddListing(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    if (images.length === 0) {
      alert('Please add at least one photo of the property.')
      return
    }
    try {
      const { data: listingData, error: insertError } = await supabase.from('listings').insert({
        ...formData, landlord_id: user.id, price: Number(formData.price),
        deposit: formData.deposit ? Number(formData.deposit) : null, status: 'pending', images: []
      }).select().single()

      if (insertError) throw insertError

      setUploadingImages(true)
      const imageUrls = await uploadImages(listingData.id)
      await supabase.from('listings').update({ images: imageUrls }).eq('id', listingData.id)
      setUploadingImages(false)

      alert('Listing created successfully! Wait for admin approval.')
      setShowAddForm(false)
      setImages([])
      setImagePreviews([])
      setFormData({ name: '', type: 'Bedsitter', price: '', deposit: '', area: '', city: '', institution: '', distance: '', gender: 'Mixed', description: '', amenities: [] })
      await fetchListings(user.id)
    } catch (error: any) {
      setUploadingImages(false)
      alert('Error creating listing: ' + error.message)
    }
  }

  async function deleteListing(id: string) {
    if (!confirm('Delete this listing?')) return
    const { error } = await supabase.from('listings').delete().eq('id', id)
    if (error) alert('Error deleting: ' + error.message)
    else await fetchListings(user!.id)
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  function handleStkPushSent(checkoutRequestId: string, listingId: string, tier: string) {
    const tierName = tier === 'verified' ? 'Verification (KSh 500)' : 'Featured (KSh 1500)' 
    alert(`M-Pesa prompt sent for ${tierName}! Please check your phone (${phoneNumber}) to enter your PIN.`)
  }

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>

  return (
    <div style={{ minHeight: '100vh', background: '#FDF8F3', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <nav style={{ background: 'white', padding: '16px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => router.push('/')}>
          <img src="/logo.png" alt="Ehani" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {profile?.role === 'admin' && <button onClick={() => router.push('/admin')} style={{ padding: '10px 20px', background: '#1C1209', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Admin Panel</button>}
          <button onClick={() => router.push('/dashboard/settings')} style={{ padding: '10px 20px', background: 'transparent', color: '#1C1209', border: '2px solid #DDD0C4', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Settings</button>
          <button onClick={signOut} style={{ padding: '10px 20px', background: 'transparent', color: '#DC3545', border: '2px solid #DC3545', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Sign Out</button>
        </div>
      </nav>

      <div style={{ background: 'linear-gradient(135deg, #1C1209 0%, #3A2A1D 100%)', padding: '60px 60px 40px', color: 'white' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: '0 0 8px 0' }}>Welcome back, {profile?.name || 'Landlord'}! 👋</h1>
        <p style={{ margin: 0, opacity: 0.9 }}>Manage your student accommodation listings</p>
      </div>

      <div style={{ padding: '40px 60px', maxWidth: 1400, margin: '0 auto' }}>
        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 40 }}>
          <div style={{ background: 'white', padding: 30, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#D4873A', marginBottom: 8 }}>{stats.total}</div>
            <div style={{ color: '#6B5B4E', fontSize: 14 }}>Total Listings</div>
          </div>
          <div style={{ background: 'white', padding: 30, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#2A7A5A', marginBottom: 8 }}>{stats.active}</div>
            <div style={{ color: '#6B5B4E', fontSize: 14 }}>Active Listings</div>
          </div>
          <div style={{ background: 'white', padding: 30, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#007BFF', marginBottom: 8 }}>{stats.pending}</div>
            <div style={{ color: '#6B5B4E', fontSize: 14 }}>Pending Approval</div>
          </div>
          <div style={{ background: 'white', padding: 30, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#9C27B0', marginBottom: 8 }}>{stats.views}</div>
            <div style={{ color: '#6B5B4E', fontSize: 14 }}>Total Views</div>
          </div>
          <div style={{ background: 'white', padding: 30, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#FF5722', marginBottom: 8 }}>{stats.contacts}</div>
            <div style={{ color: '#6B5B4E', fontSize: 14 }}>Total Contacts</div>
          </div>
        </div>

        <div style={{ marginBottom: 30 }}>
          <button onClick={() => setShowAddForm(!showAddForm)} style={{ padding: '14px 28px', background: '#D4873A', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 15 }}>
            {showAddForm ? 'Cancel' : '+ Add New Listing'}
          </button>
        </div>

        {/* Add Listing Form */}
        {showAddForm && (
          <form onSubmit={handleAddListing} style={{ background: 'white', padding: 30, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: 40 }}>
            <h2 style={{ margin: '0 0 24px 0', color: '#1C1209' }}>Create New Listing</h2>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#1C1209' }}>Property Images</label>
              <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} id="image-upload-btn" />
              <label htmlFor="image-upload-btn" style={{ display: 'inline-block', padding: '12px 24px', background: '#F0EAE3', color: '#1C1209', borderRadius: 8, cursor: 'pointer', fontWeight: 600, border: '2px dashed #DDD0C4', marginBottom: 16 }}>
                📸 {images.length > 0 ? 'Add More Photos' : 'Choose Photos'}
              </label>
              {imagePreviews.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10, marginTop: 16 }}>
                  {imagePreviews.map((preview, index) => (
                    <div key={index} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', aspectRatio: '1' }}>
                      <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button type="button" onClick={() => removeImage(index)} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(220, 53, 69, 0.9)', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 'bold' }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
              <input placeholder="Property Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required style={{ padding: '12px 16px', border: '2px solid #DDD0C4', borderRadius: 8, width: '100%', boxSizing: 'border-box' }} />
              <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} style={{ padding: '12px 16px', border: '2px solid #DDD0C4', borderRadius: 8, width: '100%', boxSizing: 'border-box', background: 'white' }}>
                <option value="Bedsitter">Bedsitter</option>
                <option value="Single Room">Single Room</option>
                <option value="1 Bedroom">1 Bedroom</option>
                <option value="2 Bedrooms">2 Bedrooms</option>
                <option value="3+ Bedrooms">3+ Bedrooms</option>
                <option value="Shared Room">Shared Room</option>
                <option value="Studio">Studio</option>
                <option value="Other">Other (Specify in description)</option>
              </select>
              <input type="number" placeholder="Price (KSh/month)" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required style={{ padding: '12px 16px', border: '2px solid #DDD0C4', borderRadius: 8, width: '100%', boxSizing: 'border-box' }} />
              <input type="number" placeholder="Deposit (KSh)" value={formData.deposit} onChange={(e) => setFormData({...formData, deposit: e.target.value})} style={{ padding: '12px 16px', border: '2px solid #DDD0C4', borderRadius: 8, width: '100%', boxSizing: 'border-box' }} />
              <input placeholder="Area/Location" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} required style={{ padding: '12px 16px', border: '2px solid #DDD0C4', borderRadius: 8, width: '100%', boxSizing: 'border-box' }} />
              <input placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required style={{ padding: '12px 16px', border: '2px solid #DDD0C4', borderRadius: 8, width: '100%', boxSizing: 'border-box' }} />
              <input placeholder="Nearest Institution" value={formData.institution} onChange={(e) => setFormData({...formData, institution: e.target.value})} required style={{ padding: '12px 16px', border: '2px solid #DDD0C4', borderRadius: 8, width: '100%', boxSizing: 'border-box' }} />
              <input placeholder="Distance" value={formData.distance} onChange={(e) => setFormData({...formData, distance: e.target.value})} style={{ padding: '12px 16px', border: '2px solid #DDD0C4', borderRadius: 8, width: '100%', boxSizing: 'border-box' }} />
              <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} style={{ padding: '12px 16px', border: '2px solid #DDD0C4', borderRadius: 8, width: '100%', boxSizing: 'border-box', background: 'white' }}>
                <option value="Mixed">Mixed</option>
                <option value="Ladies Only">Ladies Only</option>
                <option value="Gents Only">Gents Only</option>
              </select>
            </div>

            <div style={{ marginTop: 24, marginBottom: 24 }}>
              <label style={{ display: 'block', marginBottom: 12, fontWeight: 600, color: '#1C1209' }}>Amenities & Features</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {AMENITIES_LIST.map(amenity => (
                  <button key={amenity} type="button" onClick={() => toggleAmenity(amenity)} style={{ padding: '10px 16px', background: formData.amenities.includes(amenity) ? '#D4873A' : '#f0f0f0', color: formData.amenities.includes(amenity) ? 'white' : '#333', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                    {formData.amenities.includes(amenity) ? '✓ ' : ''}{amenity}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#1C1209' }}>Description & House Rules</label>
              <textarea 
                placeholder={formData.type === 'Other' ? "⚠️ Please specify the exact property type here (e.g., '2 Bedroom Apartment') and describe amenities, location, and house rules..." : "Describe the property, amenities, location, and any house rules..."} 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                rows={4} 
                style={{ width: '100%', padding: '12px 16px', border: `2px solid ${formData.type === 'Other' ? '#D4873A' : '#DDD0C4'}`, borderRadius: 8, boxSizing: 'border-box', transition: 'border-color 0.2s' }} 
              />
              {formData.type === 'Other' && (
                <p style={{ fontSize: 13, color: '#D4873A', marginTop: 8, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>💡</span> Since you selected "Other", please clearly state the exact property type at the beginning of your description.
                </p>
              )}
            </div>

            <button type="submit" disabled={uploadingImages} style={{ marginTop: 20, padding: '14px 32px', background: uploadingImages ? '#999' : '#2A7A5A', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700, width: '100%' }}>
              {uploadingImages ? 'Uploading & Compressing...' : 'Submit for Approval'}
            </button>
          </form>
        )}

        <h2 style={{ margin: '0 0 24px 0', color: '#1C1209' }}>Your Listings</h2>
        
        {listings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, background: 'white', borderRadius: 16 }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>📭</div>
            <h3 style={{ color: '#1C1209', marginBottom: 12 }}>No listings yet</h3>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {listings.map((listing) => (
              <div key={listing.id} style={{ background: 'white', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', flex: 1 }}>
                  {listing.images && listing.images.length > 0 && <img src={listing.images[0]} alt={listing.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />}
                  <div>
                    <h3 style={{ margin: '0 0 6px 0', color: '#1C1209' }}>{listing.name}</h3>
                    <p style={{ margin: '0 0 8px 0', color: '#6B5B4E', fontSize: 14 }}>{listing.area}, {listing.city}</p>
                    <div style={{ display: 'flex', gap: 12, fontSize: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ background: '#F0EAE3', padding: '4px 10px', borderRadius: 6 }}>{listing.type}</span>
                      <span style={{ fontWeight: 700, color: '#D4873A' }}>KSh {listing.price?.toLocaleString()}/mo</span>
                      
                      {/* 🔍 CRITICAL FIX: Show Assigned Agent Name to Landlord */}
                      {listing.is_agent_assigned && listing.assigned_agent_name && (
                        <span style={{ background: '#E3F2FD', color: '#1976D2', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
                          👷 Agent: {listing.assigned_agent_name}
                        </span>
                      )}

                      <span style={{ background: '#E8F5E9', color: '#2E7D32', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>👁️ {listing.views || 0} views</span>
                      <span style={{ background: '#FFF3E0', color: '#E65100', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}> {listing.contacts || 0} contacts</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 600, background: listing.status === 'approved' || listing.status === 'Verified' ? '#D4EDDA' : listing.status === 'pending' || listing.status === 'Pending Admin Approval' ? '#FFF3CD' : '#F8D7DA', color: listing.status === 'approved' || listing.status === 'Verified' ? '#155724' : listing.status === 'pending' || listing.status === 'Pending Admin Approval' ? '#856404' : '#721C24' }}>
                    {listing.status === 'approved' || listing.status === 'Verified' ? 'Approved' : listing.status === 'pending' || listing.status === 'Pending Admin Approval' ? 'Pending' : 'Rejected'}
                  </span>
                  
                  {listing.is_verified && (
                    <span style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)', color: 'white', padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>✓ VERIFIED</span>
                  )}

                  {listing.is_featured && (
                    <span style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: '#1C1209', padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>⭐ FEATURED</span>
                  )}
                  
                  {listing.verification_payment_received && !listing.is_verified && (
                    <span style={{ background: '#E3F2FD', color: '#1976D2', padding: '6px 14px', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>💰 Verification Payment Received - Awaiting Agent</span>
                  )}
                  
                  { (listing.status === 'approved' || listing.status === 'Verified') && (!listing.is_verified || !listing.is_featured) && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 220 }}>
                      <input type="tel" placeholder="M-Pesa Phone (e.g. 0712...)" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #DDD0C4', fontSize: 14, outline: 'none' }} />
                      {!listing.is_verified && !listing.verification_payment_received && (
                        <KcbPaymentButton phoneNumber={phoneNumber} amount={500} tier="verified" listingId={listing.id} onSuccess={(ref: any) => handleStkPushSent(ref, listing.id, 'verified')} />
                      )}
                      {!listing.is_featured && (
                        <KcbPaymentButton phoneNumber={phoneNumber} amount={1500} tier="featured" listingId={listing.id} onSuccess={(ref: any) => handleStkPushSent(ref, listing.id, 'featured')} />
                      )}
                    </div>
                  )}

                  <button onClick={() => deleteListing(listing.id)} style={{ padding: '8px 16px', background: '#F8D7DA', color: '#721C24', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
