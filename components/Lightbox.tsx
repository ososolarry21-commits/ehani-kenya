'use client'
import { useEffect, useState, useRef } from 'react'

type LightboxProps = {
  images: string[]
  startIndex?: number
  onClose: () => void
}

export default function Lightbox({ images, startIndex = 0, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex)
  const [zoomed, setZoomed] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const total = images.length

  useEffect(() => {
    setCurrent(startIndex)
    setZoomed(false)
  }, [startIndex, images])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, total])

  const next = () => { setZoomed(false); setCurrent(c => (c + 1) % total) }
  const prev = () => { setZoomed(false); setCurrent(c => (c - 1 + total) % total) }

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.95)',
        display: 'flex', flexDirection: 'column',
        animation: 'fadeIn 0.2s ease'
      }}
    >
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>

      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', color: 'white' }}>
        <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: 0.5 }}>{current + 1} / {total}</span>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.12)', border: 'none', color: 'white', width: 40, height: 40, borderRadius: '50%', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
      >
        {zoomed ? (
          <div style={{ width: '100%', height: '100%', overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={images[current]} alt={`Photo ${current + 1}`} style={{ maxWidth: 'none', width: '100%', objectFit: 'contain', cursor: 'zoom-out' }} onClick={() => setZoomed(false)} />
          </div>
        ) : (
          <img
            src={images[current]}
            alt={`Photo ${current + 1}`}
            style={{ maxWidth: '92%', maxHeight: '82vh', objectFit: 'contain', cursor: 'zoom-in', borderRadius: 8 }}
            onClick={() => setZoomed(true)}
          />
        )}

        {total > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); prev() }} style={navBtn('left')}>‹</button>
            <button onClick={(e) => { e.stopPropagation(); next() }} style={navBtn('right')}>›</button>
          </>
        )}
      </div>

      <div onClick={(e) => e.stopPropagation()} style={{ padding: '12px 20px 20px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, margin: '0 0 12px 0' }}>
          {zoomed ? 'Tap image to fit • swipe arrows to change' : 'Tap image to zoom • swipe or use arrows'}
        </p>
        {total > 1 && (
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {images.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Thumb ${i + 1}`}
                onClick={() => { setZoomed(false); setCurrent(i) }}
                style={{
                  width: 56, height: 56, objectFit: 'cover', borderRadius: 6, cursor: 'pointer',
                  border: i === current ? '2px solid #D4873A' : '2px solid transparent',
                  opacity: i === current ? 1 : 0.6, transition: 'all 0.2s'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const navBtn = (side: 'left' | 'right'): React.CSSProperties => ({
  position: 'absolute',
  [side]: 12,
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(255,255,255,0.12)',
  border: 'none',
  color: 'white',
  width: 44,
  height: 44,
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: 28,
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
})
