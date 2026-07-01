'use client'

import { useEffect } from 'react'

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

function track(event: string, params?: Record<string, string>) {
  window.gtag?.('event', event, params)
}

const HOVER_CARDS: Array<[string, string]> = [
  ['s-hero',        'hover_card_hero'],
  ['s-findme',      'hover_card_instagram_ux'],
  ['s-linkedin',    'hover_card_linkedin'],
  ['s-about',       'hover_card_about'],
  ['s-gumroad',     'hover_card_gumroad'],
  ['s-instagram2',  'hover_card_instagram_art'],
  ['s-contact',     'hover_card_contact'],
  ['s-newsletter',  'hover_card_newsletter'],
  ['s-mentorship',  'hover_card_mentorship'],
]

const HOVER_THRESHOLD = 500 // ms — filters out accidental mouse passes

export default function ClientAnalytics() {
  useEffect(() => {
    const handlers: Array<[Element | Document, string, EventListener]> = []
    const timers = new Map<string, ReturnType<typeof setTimeout>>()

    function on(
      el: Element | Document | null | undefined,
      type: string,
      fn: EventListener,
    ) {
      if (!el) return
      el.addEventListener(type, fn)
      handlers.push([el as Element | Document, type, fn])
    }

    // ── Click events ──────────────────────────────────────────────────────────

    on(document.getElementById('s-linkedin'), 'click', () =>
      track('click_linkedin'))

    on(document.querySelector('#s-findme a'), 'click', () =>
      track('click_instagram_ux'))

    on(document.querySelector('#s-instagram2 a'), 'click', () =>
      track('click_instagram_art'))

    on(document.querySelector('#s-gumroad a'), 'click', () =>
      track('click_gumroad_template'))

    on(document.querySelector('#s-contact a'), 'click', () =>
      track('click_contact_email'))

    on(document.querySelector('#s-newsletter a'), 'click', () =>
      track('click_newsletter_subscribe'))

    // MailerLite form is injected dynamically — use document-level delegation
    on(document, 'submit', (e) => {
      if ((e.target as Element)?.closest?.('#mlb2-43216390')) {
        track('form_submit_waitlist')
      }
    })

    // ── Hover events (500ms threshold, desktop only) ──────────────────────────

    HOVER_CARDS.forEach(([id, eventName]) => {
      const el = document.getElementById(id)
      if (!el) return

      const enter: EventListener = () => {
        timers.set(id, setTimeout(() => track(eventName), HOVER_THRESHOLD))
      }
      const leave: EventListener = () => {
        clearTimeout(timers.get(id))
        timers.delete(id)
      }

      on(el, 'mouseenter', enter)
      on(el, 'mouseleave', leave)
    })

    return () => {
      handlers.forEach(([el, type, fn]) => el.removeEventListener(type, fn))
      timers.forEach((t) => clearTimeout(t))
    }
  }, [])

  return null
}
