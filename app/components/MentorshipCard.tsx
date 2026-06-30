'use client'

import { useRef, useCallback, useEffect } from 'react'

const BAYER8: number[][] = [
  [ 0, 32,  8, 40,  2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44,  4, 36, 14, 46,  6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [ 3, 35, 11, 43,  1, 33,  9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47,  7, 39, 13, 45,  5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
]
const B8 = 8
const B8N = 64

const TAGS       = ['Figma deep dives', 'Career advice', 'Design critique', 'Process fix']
const CELL       = 4    // dither pixel size
const MAX_RADIUS = 180
const IDLE_MS    = 160
const FADE_IN    = 0.10
const FADE_OUT   = 0.025

export default function MentorshipCard({ id }: { id?: string }) {
  const cardRef     = useRef<HTMLDivElement>(null)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const mouseRef    = useRef<{ x: number; y: number } | null>(null)
  const lastMoveRef = useRef(0)
  const alphaRef    = useRef(0)
  const rafRef      = useRef<number>(0)

  const syncCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const card   = cardRef.current
    if (!canvas || !card) return
    const { width, height } = card.getBoundingClientRect()
    const w = Math.round(width), h = Math.round(height)
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w; canvas.height = h
    }
  }, [])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const ctx    = canvas?.getContext('2d')
    if (!canvas || !ctx) { rafRef.current = 0; return }

    syncCanvas()

    const idle = Date.now() - lastMoveRef.current > IDLE_MS
    alphaRef.current = idle
      ? Math.max(0, alphaRef.current - FADE_OUT)
      : Math.min(1, alphaRef.current + FADE_IN)

    const alpha = alphaRef.current
    const mouse = mouseRef.current

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (mouse && alpha > 0.004) {
      ctx.globalAlpha = alpha
      ctx.fillStyle   = 'rgb(218,212,202)' // soft beige on dark bg

      const cols = Math.ceil(canvas.width  / CELL)
      const rows = Math.ceil(canvas.height / CELL)

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x    = col * CELL + CELL * 0.5
          const y    = row * CELL + CELL * 0.5
          const dist = Math.hypot(x - mouse.x, y - mouse.y)
          if (dist >= MAX_RADIUS) continue

          const u    = dist / MAX_RADIUS
          const prox = 1 - u * u * (3 - 2 * u)  // smoothstep

          if (prox > BAYER8[row % B8][col % B8] / B8N) {
            ctx.fillRect(col * CELL, row * CELL, CELL - 1, CELL - 1)
          }
        }
      }
      ctx.globalAlpha = 1
    }

    if (alpha > 0 || !idle) {
      rafRef.current = requestAnimationFrame(draw)
    } else {
      rafRef.current = 0
    }
  }, [syncCanvas])

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseRef.current    = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    lastMoveRef.current = Date.now()
    if (!rafRef.current) rafRef.current = requestAnimationFrame(draw)
  }, [draw])

  const onLeave = useCallback(() => {
    mouseRef.current    = null
    lastMoveRef.current = 0
    if (!rafRef.current) rafRef.current = requestAnimationFrame(draw)
  }, [draw])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return (
    <div ref={cardRef} id={id} className="b-card card-mentorship" onMouseMove={onMove} onMouseLeave={onLeave}>
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
        <a href="#" className="b-btn b-btn-light">Join the waitlist →</a>
      </div>

      <p style={{ fontSize: '0.62rem', color: '#444', marginTop: 'auto', position: 'relative', zIndex: 1 }}>
        Mentorship — Limited spots
      </p>
    </div>
  )
}
