import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

async function getRedis() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null
  const { Redis } = await import('@upstash/redis')
  return new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN })
}

// Local filesystem fallback (dev only)
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
  const redis = await getRedis()
  if (redis) {
    const count = (await redis.get<number>('visitor_count')) ?? 0
    return NextResponse.json({ count })
  }
  return NextResponse.json({ count: readLocal() })
}

export async function POST() {
  const redis = await getRedis()
  if (redis) {
    const count = await redis.incr('visitor_count')
    return NextResponse.json({ count })
  }
  return NextResponse.json({ count: incrementLocal() })
}
