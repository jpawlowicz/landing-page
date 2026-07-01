import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

// Local filesystem fallback (dev only — /tmp resets on Vercel cold starts)
const DIR  = join(process.cwd(), 'data')
const FILE = join(DIR, 'visitors.json')

function readLocal(): number {
  try { return JSON.parse(readFileSync(FILE, 'utf8')).count ?? 0 }
  catch { return 0 }
}

function incrementLocal(): number {
  const count = readLocal() + 1
  try { mkdirSync(DIR, { recursive: true }); writeFileSync(FILE, JSON.stringify({ count })) }
  catch {}
  return count
}

export async function GET() {
  try {
    const { Redis } = await import('@upstash/redis')
    const redis = new Redis({
      url:   process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
    const count = (await redis.get<number>('visitor_count')) ?? 0
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: readLocal() })
  }
}

export async function POST() {
  try {
    const { Redis } = await import('@upstash/redis')
    const redis = new Redis({
      url:   process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
    const count = await redis.incr('visitor_count')
    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count: incrementLocal() })
  }
}
