'use client'

import { useRef, useState, useCallback } from 'react'

export default function FindMeCard({ id }: { id?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  return (
    <div ref={cardRef} id={id} className="b-card card-findme" onMouseMove={handleMouseMove} onMouseLeave={() => setPos(null)}>
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          opacity: pos ? 1 : 0,
          transition: 'opacity 0.3s ease',
          background: pos
            ? `radial-gradient(circle 220px at ${pos.x}px ${pos.y}px, rgba(236,42,140,0.55) 0%, rgba(236,72,153,0.18) 50%, transparent 75%)`
            : 'none',
        }}
      />
      <div className="b-label" style={{ position: 'relative' }}>Find me</div>
      <div style={{ position: 'relative' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.3rem' }}>Instagram</h2>
        <p style={{ fontSize: '0.7rem', color: '#555', marginBottom: '0.85rem' }}>Design tips, Figma, AI workflow</p>
        <a href="https://instagram.com/joannawrobel_ux" target="_blank" rel="noopener noreferrer" className="b-btn b-btn-black">
          → @joannawrobel_ux
        </a>
      </div>
    </div>
  )
}
