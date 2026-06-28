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

  if (count === null) return <span>visitors: —</span>
  return <span>visitors: {String(count).padStart(3, '0')}</span>
}
