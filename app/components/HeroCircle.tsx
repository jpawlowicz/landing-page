'use client'

import { useState, useEffect } from 'react'

const CIRCLE_TEXT = ' Building this site with Claude Code and Figma AI · '

export default function HeroCircle() {
  const [hovered, setHovered] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const r = 52
  const DOT_EXPAND = 88

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches)
  }, [])

  const expanded = isTouch || hovered

  return (
    <div
      style={{ position: 'relative', width: 148, height: 148, flexShrink: 0 }}
      onMouseEnter={() => { if (!isTouch) setHovered(true) }}
      onMouseLeave={() => { if (!isTouch) setHovered(false) }}
    >
      <svg
        viewBox="0 0 148 148" width="148" height="148"
        className="bento-spin"
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          <path id="cp" d={`M 74,74 m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`} />
        </defs>
        <text fill="#1a1a1a" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="8.8" fontWeight="500" letterSpacing="2.2">
          <textPath href="#cp">{CIRCLE_TEXT}</textPath>
        </text>
      </svg>

      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: expanded ? DOT_EXPAND : 10,
        height: expanded ? DOT_EXPAND : 10,
        borderRadius: '50%',
        background: '#22c55e',
        overflow: 'hidden',
        transition: 'width 0.5s cubic-bezier(0.34,1.4,0.64,1), height 0.5s cubic-bezier(0.34,1.4,0.64,1)',
        cursor: expanded ? 'default' : 'pointer',
      }}>
        <img
          src="/photo.png"
          alt="Joanna Wrobel"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: expanded ? 1 : 0,
            transition: isTouch ? 'none' : 'opacity 0.25s ease 0.18s',
            display: 'block',
          }}
        />
      </div>
    </div>
  )
}
