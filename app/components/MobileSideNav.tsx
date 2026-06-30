'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

const CARDS = [
  { id: 's-hero',        label: 'Joanna Wrobel' },
  { id: 's-findme',      label: 'Instagram'     },
  { id: 's-mentorship',  label: 'Work with me'  },
  { id: 's-linkedin',    label: 'LinkedIn'      },
  { id: 's-about',       label: 'About'         },
  { id: 's-gumroad',     label: 'Template'      },
  { id: 's-instagram2',  label: '@_joannawrobel'},
  { id: 's-contact',     label: 'Contact'       },
  { id: 's-newsletter',  label: 'Newsletter'    },
]

const VISIBLE = 5

export default function MobileSideNav() {
  const [open, setOpen]       = useState(false)
  const [active, setActive]   = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [dragging, setDragging] = useState(false)
  const lastYRef = useRef<number | null>(null)
  const ignoreClickRef = useRef(false)
  const movedRef = useRef(false)

  const clampIndex = useCallback((value: number) => {
    return Math.min(CARDS.length - 1, Math.max(0, value))
  }, [])

  const scrollToCard = useCallback((i: number, smooth = true) => {
    document.getElementById(CARDS[i].id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 700)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Sync active card as user scrolls the page
  useEffect(() => {
    const update = () => {
      let best = 0, bestDist = Infinity
      CARDS.forEach(({ id }, i) => {
        const el = document.getElementById(id)
        if (!el) return
        const { top, height } = el.getBoundingClientRect()
        const dist = Math.abs(top + height / 2 - window.innerHeight / 2)
        if (dist < bestDist) { bestDist = dist; best = i }
      })
      setActive(best)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const jump = useCallback((i: number) => {
    setActive(i)
    scrollToCard(i)
    setTimeout(() => setOpen(false), 320)
  }, [scrollToCard])

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault()
    lastYRef.current = e.clientY
    movedRef.current = false
    ignoreClickRef.current = false
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (lastYRef.current === null) return

    const dy = e.clientY - lastYRef.current
    const dragThreshold = 12
    const stepThreshold = 22

    if (!movedRef.current && Math.abs(dy) >= dragThreshold) {
      movedRef.current = true
      ignoreClickRef.current = true
      setDragging(true)
      setOpen(true)
      lastYRef.current = e.clientY
    }

    if (movedRef.current && Math.abs(dy) >= stepThreshold) {
      setActive(prev => {
        const next = clampIndex(prev + Math.sign(dy))
        if (next !== prev) {
          scrollToCard(next)
          return next
        }
        return prev
      })
      lastYRef.current = e.clientY
    }
  }, [clampIndex, scrollToCard])

  const handlePointerUp = useCallback(() => {
    if (movedRef.current) {
      setDragging(false)
      setTimeout(() => setOpen(false), 150)
      movedRef.current = false
      lastYRef.current = null
      window.setTimeout(() => {
        ignoreClickRef.current = false
      }, 0)
      return
    }

    setOpen(o => !o)
    lastYRef.current = null
  }, [])

  if (!isMobile) return null

  return (
    <div className="wheel-wrap">
      <button
        className="wheel-handle"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={() => {
          if (ignoreClickRef.current) return
          setOpen(o => !o)
        }}
        aria-label="Navigate cards"
      >
        <span className="wheel-pip" style={{ background: open ? '#1a1a1a' : '#22c55e' }} />
        {!open && <span className="wheel-pip" />}
        {!open && <span className="wheel-pip" />}
      </button>

      {open && (
        <div className="wheel-panel">
          <button
            className="wheel-arrow"
            onClick={() => setActive(prev => {
              const next = Math.max(0, prev - 1)
              scrollToCard(next)
              return next
            })}
          >↑</button>

          <div className="wheel-drum" style={{ perspective: 500 }}>
            {CARDS.map((card, i) => {
              const offset = i - active
              const abs    = Math.abs(offset)
              if (abs > Math.floor(VISIBLE / 2)) return null
              const rotX  = offset * -22
              const scale = 1 - abs * 0.07
              const op    = 1 - abs * 0.28
              return (
                <div
                  key={card.id}
                  className={`wheel-item${i === active ? ' wheel-item-active' : ''}`}
                  style={{ transform: `rotateX(${rotX}deg) scale(${scale})`, opacity: op }}
                  onClick={() => jump(i)}
                >
                  {i === active && <span className="wheel-dot" />}
                  {card.label}
                </div>
              )
            })}
          </div>

          <button
            className="wheel-arrow"
            onClick={() => setActive(prev => {
              const next = Math.min(CARDS.length - 1, prev + 1)
              scrollToCard(next)
              return next
            })}
          >↓</button>
        </div>
      )}
    </div>
  )
}
