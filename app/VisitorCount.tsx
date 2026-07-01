'use client'

import { useEffect, useState } from 'react'

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/visitors', { method: 'POST' })
      .then(r => r.json())
      .then(d => setCount(d.count))
      .catch(() => {})
  }, [])

  const display = count === null ? '——————' : String(count).padStart(6, '0')

  return (
    <span style={{
      fontFamily: 'var(--font-space-mono)',
      fontSize: '0.6rem',
      color: '#888',
      letterSpacing: '0.08em',
    }}>
      visitors: {display}
    </span>
  )
}
