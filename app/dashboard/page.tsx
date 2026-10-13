'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import PaystackCheckout from '../../components/PaystackCheckout'

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
  
  // Paystack Success State
  const [processingDbUpdate, setProcessingDbUpdate] = useState(false)
  
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    type: 'Bedsitter',
    price: '',
    deposit: '',
    area: '',
    city: '',
    institution: '',
    distance: '',
    gender: 'Mixed',
    description: '',
    amenities: [] as string[]
  })
  
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  useEffect(() => { checkUser() }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/')
      return
    }
  
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
  
    if (profile?.role === 'student') {
      router.push('/browse')
      return
    }
  
    setUser(user)
    setProfile(profile)
    await fetchListings(user.id)
    setLoading(false)
  }

  async function fetchListings(userId: string) {
    const { data } = await supabase.from('listings').select('*').eq('landlord_id', userId).order('created_at', { ascending: false })
    if (data) {
      setListings(data)
      setStats({
        total: data.length,
        active: data.filter((l: any) => l.status === 'approved').length,
        pending: data.filter((l: any) => l.status === 'pending').length,
        views: data.reduce((sum: number, l: any) => sum + (l.views || 0), 0),
        contacts: data.reduce((sum: number, l: any) => sum + (l.contacts || 0), 0)
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setImages(selectedFiles)
      const previews = selectedFiles.map(file => URL.createObjectURL(file))
      setImagePreviews(previews)
    }
  }

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => {
      const current = prev.amenities
      if (current.includes(amenity)) {
        return { ...prev, amenities: current.filter(a => a !== amenity) }
      } else {
        return { ...prev, amenities: [...current, amenity] }
      }
    })
  }

  const uploadImages = async (listingId: string): Promise<string[]> => {
    const uploadPromises = images.map(async (file, index) => {
      const fileExt = file.name.split('.').pop()
      const fileName = `${listingId}-${Date.now()}-${index}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from('property-images').upload(fileName, file)
      if (uploadError) throw uploadError
      const { data } = supabase.storage.from('property-images').getPublicUrl(fileName)
      return data.publicUrl
    })
    return await Promise.all(uploadPromises)
  }

  async function handleAddListing(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    try {
      const { data: listingData, error: insertError } = await supabase.from('listings').insert({
        ...formData,
        landlord_id: user.id,
        price: Number(formData.price),
        deposit: formData.deposit ? Number(formData.deposit) : null,
        status: 'pending',
        images: []
      }).select().single()

      if (insertError) throw insertError

      if (images.length > 0) {
        setUploadingImages(true)
        const imageUrls = await uploadImages(listingData.id)
        await supabase.from('listings').update({ images: imageUrls }).eq('id', listingData.id)
        setUploadingImages(false)
      }

      alert('Listing created successfully! Wait for admin approval.')
      setShowAddForm(false)
      setImages([])
      setImagePreviews([])
      setFormData({ name: '', type: 'Bedsitter', price: '', deposit: '', area: '', city: '', institution: '', distance: '', gender: 'Mixed', description: '', amenities: [] })
      await fetchListings(user.id)
    } catch (error: any) {
      alert('Error creating listing: ' + error.message)
    }
  }

  // NEW: Handle Paystack Success
  async function handlePaymentSuccess(reference: string, listingId: string, tier: 'verified' | 'featured') {
    setProcessingDbUpdate(true)
    try {
      const updateData: any = { 
        verification_payment_received: true,
        payment_reference: reference 
      }
      
      // Note: In a full setup, you might want a separate 'is_featured' column. 
      // For now, we mark it as paid and your admin dashboard will handle the physical verification.
      
      const { error } = await supabase.from('listings').update(updateData).eq('id', listingId)
      
      if (error) {
        alert('Payment successful, but failed to update listing. Please contact support with ref: ' + reference)
      } else {
        alert(`Payment successful! Your listing is now pending physical verification. Reference: ${reference}`)
        await fetchListings(user.id)
      }
    } catch (error) {
      console.error('DB Update Error:', error)
      alert('An error occurred while updating your listing status.')
    } finally {
      setProcessingDbUpdate(false)
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
        
