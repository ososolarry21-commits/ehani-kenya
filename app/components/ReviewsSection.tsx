'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function ReviewsSection({ listingId, currentUser }: { listingId: string, currentUser: any }) {
  const [reviews, setReviews] = useState<any[]>([])
  const [averageRating, setAverageRating] = useState(0)
  const [loading, setLoading] = useState(true)
  const [newRating, setNewRating] = useState(5)
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    fetchReviews()
    if (currentUser) {
      supabase.from('profiles').select('role').eq('id', currentUser.id).single().then(({ data }) => {
        setUserRole(data?.role || null)
      })
    }
  }, [listingId, currentUser])

  async function fetchReviews() {
    const { data } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles:user_id (name)
      `)
      .eq('listing_id', listingId)
      .eq('is_approved', true) // 🚨 MANDATORY: Only fetch reviews that the admin has approved
      .order('created_at', { ascending: false })

    if (data) {
      setReviews(data)
      if (data.length > 0) {
        const avg = data.reduce((sum: number, r: any) => sum + r.rating, 0) / data.length
        setAverageRating(Math.round(avg * 10) / 10) // Round to 1 decimal
      }
    }
    setLoading(false)
  }

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault()
    if (!currentUser) return alert('Please log in to leave a review.')
    if (userRole !== 'student') return alert('Only students can leave reviews.')
    if (!newComment.trim()) return alert('Please write a comment.')

    setSubmitting(true)
    const { error } = await supabase
      .from('reviews')
      .insert({
        listing_id: listingId,
        user_id: currentUser.id,
        rating: newRating,
        comment: newComment
      })

    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('✅ Review submitted! It is pending admin approval and will appear shortly.')
      setNewComment('')
      setNewRating(5)
      // We do NOT call fetchReviews() here because the new review is not approved yet, 
      // so it shouldn't appear in the list immediately.
    }
    setSubmitting(false)
  }

  const renderStars = (rating: number) => {
    return '⭐'.repeat(Math.round(rating))
  }

  if (loading) return <div style={{ padding: 20, textAlign: 'center', color: '#666' }}>Loading reviews...</div>

  return (
    <div style={{ marginTop: 40, padding: 30, background: 'white', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
      <h2 style={{ color: '#1C1209', marginBottom: 20, fontSize: 24 }}>Student Reviews</h2>
      
      {/* Average Rating Summary */}
      {reviews.length > 0 ? (
        <div style={{ marginBottom: 30, padding: 20, background: '#FDF8F3', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 800, color: '#D4873A' }}>{averageRating}</div>
            <div style={{ fontSize: 14, color: '#6B5B4E' }}>{renderStars(averageRating)}</div>
            <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>{reviews.length} review{reviews.length !== 1 ? 's' : ''}</div>
          </div>
          <div style={{ flex: 1, height: 1, background: '#DDD0C4' }} />
          <div style={{ fontSize: 14, color: '#6B5B4E', fontStyle: 'italic' }}>
            "Verified properties give you peace of mind. Read what other students say about their experience!"
          </div>
        </div>
      ) : (
        <div style={{ marginBottom: 30, padding: 20, background: '#FDF8F3', borderRadius: 12, textAlign: 'center', color: '#6B5B4E' }}>
          <p style={{ margin: 0 }}>Be the first student to review this property! 🎓</p>
        </div>
      )}

      {/* Review Form (Only for Students) */}
      {currentUser && userRole === 'student' && (
        <form onSubmit={handleSubmitReview} style={{ marginBottom: 30, padding: 20, background: '#F9FAFB', borderRadius: 12, border: '1px solid #eee' }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#1C1209', fontSize: 18 }}>Leave a Review</h3>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#333' }}>Your Rating:</label>
            <select 
              value={newRating} 
              onChange={(e) => setNewRating(Number(e.target.value))}
              style={{ padding: 10, borderRadius: 8, border: '1px solid #DDD0C4', width: '100%', fontSize: 14 }}
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
              <option value={4}>⭐⭐⭐⭐ (4/5)</option>
              <option value={3}>⭐⭐⭐ (3/5)</option>
              <option value={2}>⭐⭐ (2/5)</option>
              <option value={1}>⭐ (1/5)</option>
            </select>
          </div>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#333' }}>Your Experience:</label>
            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              placeholder="Share your experience with this property..."
              style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #DDD0C4', fontSize: 14, boxSizing: 'border-box' }}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={submitting}
            style={{ 
              padding: '12px 24px', 
              background: submitting ? '#999' : '#D4873A', 
              color: 'white', 
              border: 'none', 
              borderRadius: 8, 
              cursor: 'pointer', 
              fontWeight: 600 
            }}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      {/* List of Reviews */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {reviews.map((review) => (
          <div key={review.id} style={{ padding: 16, background: '#fff', borderRadius: 8, border: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontWeight: 700, color: '#1C1209' }}>
                {review.profiles?.name || 'Anonymous Student'}
              </div>
              <div style={{ fontSize: 12, color: '#999' }}>
                {new Date(review.created_at).toLocaleDateString()}
              </div>
            </div>
            <div style={{ color: '#D4873A', marginBottom: 8 }}>{renderStars(review.rating)}</div>
            <p style={{ margin: 0, color: '#444', fontSize: 14, lineHeight: 1.5 }}>{review.comment}</p>
            {review.admin_response && (
              <div style={{ marginTop: 12, padding: 10, background: '#FDF8F3', borderRadius: 6, fontSize: 13, color: '#6B5B4E', borderLeft: '3px solid #D4873A' }}>
                <strong>Ehani Homes Response:</strong> {review.admin_response}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
