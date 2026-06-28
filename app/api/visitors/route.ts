import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

// In production (Vercel), the project root is read-only.
// We use /tmp as a writable fallback — it resets per cold start,
// so the counter won't persist. Replace with Vercel KV when live.
const DIR  = process.env.VERCEL ? '/tmp' : join(process.cwd(), 'data')
const FILE = join(DIR, 'visitors.json')

function read(): number {
  try {
    return JSON.parse(readFileSync(FILE, 'utf8')).count ?? 0
  } catch {
    return 0
  }
}

function increment(): number {
  const count = read() + 1
  try {
    mkdirSync(DIR, { recursive: true })
    writeFileSync(FILE, JSON.stringify({ count }))
  } catch {
    // silently ignore write failures
  }
  return count
}

export async function GET() {
  return NextResponse.json({ count: read() })
}

export async function POST() {
  return NextResponse.json({ count: increment() })
}
