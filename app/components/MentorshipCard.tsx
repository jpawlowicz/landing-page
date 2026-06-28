'use client'

import { useRef, useCallback, useEffect } from 'react'

const TAGS = ['Figma deep dives', 'Career advice', 'Design critique', 'Process fix']
const CELL = 18, GAP = 3, RADIUS = 140

export default function MentorshipCard() {
  const cardRef   = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef<{ x: number; y: number } | null>(null)
  const rafRef    = useRef<number>(0)
  const activeRef = useRef(false)
  const phasesRef = useRef<Float32Array | null>(null)

  const syncCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const card   = cardRef.current
    if (!canvas || !card) return
    const { width, height } = card.getBoundingClientRect()
    if (canvas.width !== Math.round(width) || canvas.height !== Math.round(height)) {
      canvas.width  = Math.round(width)
      canvas.height = Math.round(height)
      const cols   = Math.ceil(width  / (CELL + GAP)) + 1
      const rows   = Math.ceil(height / (CELL + GAP)) + 1
      const phases = new Float32Array(cols * rows)
      for (let i = 0; i < phases.length; i++) phases[i] = Math.random() * Math.PI * 2
      phasesRef.current = phases
    }
  }, [])

  const draw = useCallback((ts: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = canvas.width, H = canvas.height
    const t = ts / 1000
    const mouse  = mouseRef.current
    const phases = phasesRef.current
    ctx.clearRect(0, 0, W, H)
    const cols = Math.ceil(W / (CELL + GAP)) + 1
    const rows = Math.ceil(H / (CELL + GAP)) + 1
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * (CELL + GAP) + CELL / 2
        const cy = r * (CELL + GAP) + CELL / 2
        let proximity = 0
        if (mouse) {
          const dist = Math.hypot(cx - mouse.x, cy - mouse.y)
          proximity  = Math.max(0, 1 - dist / RADIUS)
          proximity  = proximity * proximity * proximity
        }
        if (proximity < 0.008) continue
        const phase = phases ? phases[r * cols + c] : 0
        const pulse = 0.5 + 0.5 * Math.sin(t * (1.8 + proximity * 3.5) + phase)
        const size  = 2 + (CELL - 2) * proximity * (0.75 + pulse * 0.25)
        const alpha = proximity * (0.22 + pulse * 0.16)
        ctx.save()
        ctx.translate(cx, cy)
        ctx.globalAlpha = alpha
        ctx.fillStyle   = '#ffffff'
        ctx.fillRect(-size / 2, -size / 2, size, size)
        ctx.restore()
      }
    }
    rafRef.current = requestAnimationFrame(draw)
  }, [])

  const startLoop = useCallback(() => {
    if (activeRef.current) return
    activeRef.current = true
    syncCanvas()
    rafRef.current = requestAnimationFrame(draw)
  }, [draw, syncCanvas])

  const stopLoop = useCallback(() => {
    activeRef.current = false
    mouseRef.current  = null
    cancelAnimationFrame(rafRef.current)
    const canvas = canvasRef.current
    const ctx    = canvas?.getContext('2d')
    if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    if (!activeRef.current) startLoop()
  }, [startLoop])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return (
    <div ref={cardRef} className="b-card card-mentorship" onMouseMove={handleMouseMove} onMouseLeave={stopLoop}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="b-label" style={{ color: '#555' }}>Primary Offer</div>
        <span className="b-arrow">↗</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem 0', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '1.55rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.75rem', color: '#e8e2d9' }}>
          Work<br />with me
        </h2>
        <p style={{ fontSize: '0.74rem', lineHeight: 1.7, marginBottom: '1.1rem', color: '#999' }}>
          1:1 sessions on Figma, design process, career, or project feedback. Paid. Limited spots.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.5rem' }}>
          {TAGS.map(tag => <span key={tag} className="b-tag b-tag-dark">{tag}</span>)}
        </div>
        <a href="#" className="b-btn b-btn-light">Book a session →</a>
      </div>

      <p style={{ fontSize: '0.62rem', color: '#444', marginTop: 'auto', position: 'relative', zIndex: 1 }}>
        Mentorship — Limited spots
      </p>
    </div>
  )
}
