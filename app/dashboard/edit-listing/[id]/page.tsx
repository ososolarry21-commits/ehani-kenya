'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter, useParams } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

const AMENITIES_LIST = ['WiFi', 'Water', 'Parking', 'Security', 'Furnished', 'Laundry', 'Balcony', 'Backup Generator']

export default function EditListingPage() {
  const router = useRouter()
  const params = useParams()
  const listingId = params.id as string

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)

  const [formData, setFormData] = useState({
    name: '', type: 'Bedsitter', price: '', deposit: '', area: '', city: '',
    institution: '', distance: '', gender: 'Mixed', description: '', amenities: [] as string[]
  })
  
  // Separate existing images (URLs) from new images (Files)
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [newImages, setNewImages] = useState<File[]>([])
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([])

  useEffect(() => { 
    checkUserAndFetchListing() 
  }, [])

  async function checkUserAndFetchListing() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/'); return }
    setUser(user)

    const { data: listing, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', listingId)
      .single()

    if (error || !listing) {
      alert('Listing not found.')
      router.push('/dashboard')
      return
    }

    // Security check: Ensure the logged-in user owns this listing
    if (listing.landlord_id !== user.id) {
      alert('You do not have permission to edit this listing.')
      router.push('/dashboard')
      return
    }

    // Pre-fill form data
    setFormData({
      name: listing.name || '',
      type: listing.type || 'Bedsitter',
      price: listing.price?.toString() || '',
      deposit: listing.deposit?.toString() || '',
      area: listing.area || '',
      city: listing.city || '',
      institution: listing.institution || '',
      distance: listing.distance || '',
      gender: listing.gender || 'Mixed',
      description: listing.description || '',
      amenities: listing.amenities || []
    })

    // Pre-fill existing images
    if (listing.images && Array.isArray(listing.images)) {
      setExistingImages(listing.images)
    }

    setLoading(false)
  }

  const compressImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target?.result as string
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const MAX_WIDTH = 1200
          let width = img.width
          let height = img.height
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)
          canvas.toBlob((blob) => {
            if (blob) resolve(blob)
            else reject(new Error('Compression failed'))
          }, 'image/jpeg', 0.7) 
        }
      }
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setNewImages(prev => [...prev, ...selectedFiles])
      const previews = selectedFiles.map(file => URL.createObjectURL(file))
      setNewImagePreviews(prev => [...prev, ...previews])
      e.target.value = '' 
    }
  }

  const removeExistingImage = (indexToRemove: number) => {
    setExistingImages(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const removeNewImage = (indexToRemove: number) => {
    setNewImages(prev => prev.filter((_, index) => index !== indexToRemove))
    setNewImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove))
  }

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => {
      const current = prev.amenities
      if (current.includes(amenity)) return { ...prev, amenities: current.filter(a => a !== amenity) }
      else return { ...prev, amenities: [...current, amenity] }
    })
  }

  async function handleUpdateListing(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    
    // Optional: Require at least one image total (existing + new)
    if (existingImages.length + newImages.length === 0) {
      alert('Please have at least one photo of the property.')
      return
    }

    setSaving(true)
    try {
      let finalImages = [...existingImages]

      // Upload new images if any
      if (newImages.length > 0) {
        setUploadingImages(true)
        const uploadPromises = newImages.map(async (file, index) => {
          const compressedBlob = await compressImage(file)
          const fileName = `${listingId}-${Date.now()}-${index}.jpg`
          const { error: uploadError } = await supabase.storage
            .from('property-images')
            .upload(fileName, compressedBlob, { contentType: 'image/jpeg', upsert: true })
          
          if (uploadError) throw uploadError
          const { data } = supabase.storage.from('property-images').getPublicUrl(fileName)
          return data.publicUrl
        })
        const newUrls = await Promise.all(uploadPromises)
        finalImages = [...finalImages, ...newUrls]
        setUploadingImages(false)
      }

      // Update the listing in the database
      const { error: updateError } = await supabase
        .from('listings')
        .update({
          ...formData,
          price: Number(formData.price),
          deposit: formData.deposit ? Number(formData.deposit) : null,
          images: finalImages,
          // Optional: Reset status to pending if major changes are made, or keep as is:
          // status: 'pending' 
        })
        .eq('id', listingId)

      if (updateError) throw updateError

      alert('Listing updated successfully!')
      router.push('/dashboard')
    } catch (error: any) {
      setUploadingImages(false)
      setSaving(false)
      alert('Error updating listing: ' + error.message)
    }
  }

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>

  return (
    <div style={{ minHeight: '100vh', background: '#FDF8F3', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <nav style={{ background: 'white', padding: '16px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }} onClick={() => router.push('/dashboard')}>
          <img src="/logo.png" alt="Ehani Homes Logo" style={{ height: '50px', width: 'auto', objectFit: 'contain' }} />
          <span style={{ fontWeight: 700, color: '#1C1209', fontSize: 18 }}>← Back to Dashboard</span>
        </div>
      </nav>

      <div style={{ padding: '40px 60px', maxWidth: 900, margin: '0 auto' }}>
        <form onSubmit={handleUpdateListing} style={{ background: 'white', padding: 30, borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <h2 style={{ margin: '0 0 24px 0', color: '#1C1209' }}>Edit Listing</h2>
          
          {/* Images Section */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#1C1209' }}>Property Images</label>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} id="image-upload-btn" />
            <label htmlFor="image-upload-btn" style={{ display: 'inline-block', padding: '12px 24px', background: '#F0EAE3', color: '#1C1209', borderRadius: 8, cursor: 'pointer', fontWeight: 600, border: '2px dashed #DDD0C4', marginBottom: 16 }}>
              📸 {newImages.length > 0 ? 'Add More Photos' : 'Choose New Photos'}
            </label>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 13, color: '#6B5B4E', marginBottom: 8 }}>Current Images:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
                  {existingImages.map((url, index) => (
                    <div key={`existing-${index}`} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', aspectRatio: '1' }}>
                      <img src={url} alt={`Existing ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button type="button" onClick={() => removeExistingImage(index)} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(220, 53, 69, 0.9)', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 'bold' }}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Image Previews */}
            {newImagePreviews.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <p style={{ fontSize: 13, color: '#6B5B4E', marginBottom: 8 }}>New Images to Upload:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
                  {newImagePreviews.map((preview, index) => (
                    <div key={`new-${index}`} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', aspectRatio: '1' }}>
                      <img src={preview} alt={`New Preview ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button type="button" onClick={() => removeNewImage(index)} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(220, 53, 69, 0.9)', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 'bold' }}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Fields */}
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

          {/* Amenities */}
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

          {/* Description */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#1C1209' }}>Description & House Rules</label>
            <textarea 
              placeholder={formData.type === 'Other' ? "⚠️ Please specify the exact property type here..." : "Describe the property, amenities, location, and any house rules..."} 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              rows={4} 
              style={{ width: '100%', padding: '12px 16px', border: `2px solid ${formData.type === 'Other' ? '#D4873A' : '#DDD0C4'}`, borderRadius: 8, boxSizing: 'border-box', transition: 'border-color 0.2s' }} 
            />
          </div>

          <button type="submit" disabled={saving || uploadingImages} style={{ marginTop: 20, padding: '14px 32px', background: (saving || uploadingImages) ? '#999' : '#2A7A5A', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700, width: '100%' }}>
            {uploadingImages ? 'Uploading & Compressing...' : saving ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
