'use client'

import { useRef, useEffect } from 'react'

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

const BG_CSS  = '#e8e2d9'
const BG_RGBA = '232,226,217'
const CELL    = 5    // dither pixel size
const R       = 105  // brush radius
const FADE    = 0.022 // per-frame overlay alpha → ~2s trail
const TTL     = 3200  // ms after last paint before canvas resets

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    let raf: number = 0
    let mouse: { x: number; y: number } | null = null
    let prev:  { x: number; y: number } | null = null
    let lastPaint = 0

    const init = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      const ctx = canvas.getContext('2d')!
      ctx.fillStyle = BG_CSS
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    init()

    function stamp(ctx: CanvasRenderingContext2D, x: number, y: number, intensity: number) {
      const r = R * (0.75 + intensity * 0.25)

      const grd = ctx.createRadialGradient(x, y, 0, x, y, r)
      grd.addColorStop(0,    'rgb(255,218,52)')
      grd.addColorStop(0.38, 'rgb(255,135,48)')
      grd.addColorStop(0.78, 'rgb(234,62,114)')
      grd.addColorStop(1,    'rgb(234,62,114)')
      ctx.fillStyle = grd

      const x0 = Math.floor((x - r) / CELL) * CELL
      const y0 = Math.floor((y - r) / CELL) * CELL
      const x1 = Math.ceil ((x + r) / CELL) * CELL
      const y1 = Math.ceil ((y + r) / CELL) * CELL

      for (let py = y0; py < y1; py += CELL) {
        for (let px = x0; px < x1; px += CELL) {
          const cx = px + CELL * 0.5
          const cy = py + CELL * 0.5
          const dist = Math.hypot(cx - x, cy - y)
          if (dist >= r) continue

          const u    = dist / r
          const fill = (1 - u * u * (3 - 2 * u)) * intensity

          const col = (Math.floor(px / CELL) % B8 + B8) % B8
          const row = (Math.floor(py / CELL) % B8 + B8) % B8
          if (fill > BAYER8[row][col] / B8N) {
            ctx.fillRect(px, py, CELL - 1, CELL - 1)
          }
        }
      }
    }

    function loop() {
      const ctx = canvas?.getContext('2d')
      if (!ctx) return
      const now = Date.now()

      // Thin overlay blends dithered pixels back toward background over ~2s
      const { width, height } = ctx.canvas
      ctx.fillStyle = `rgba(${BG_RGBA},${FADE})`
      ctx.fillRect(0, 0, width, height)

      if (mouse) {
        const speed     = prev ? Math.hypot(mouse.x - prev.x, mouse.y - prev.y) : 0
        const intensity = 0.22 + Math.min(0.78, speed / 14)

        if (prev && speed > 1) {
          const steps = Math.max(1, Math.ceil(speed / (R * 0.28)))
          for (let i = 0; i <= steps; i++) {
            const t = i / steps
            stamp(ctx,
              prev.x + (mouse.x - prev.x) * t,
              prev.y + (mouse.y - prev.y) * t,
              intensity,
            )
          }
        } else {
          stamp(ctx, mouse.x, mouse.y, intensity)
        }
        prev      = { ...mouse }
        lastPaint = now
      }

      if (now - lastPaint < TTL) {
        raf = requestAnimationFrame(loop)
      } else {
        // Hard reset once trail has fully faded
        ctx.fillStyle = BG_CSS
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        raf = 0
      }
    }

    const onMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY }
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const onLeave = () => { mouse = null; prev = null }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', init)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', init)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0 }}
    />
  )
}
