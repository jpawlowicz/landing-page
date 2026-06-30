'use client'

export default function NewsletterForm() {
  return (
    <form className="nl-form" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="your@email.com"
        className="nl-input"
        required
        aria-label="Email address"
      />
      <button type="submit" className="b-btn nl-submit">Subscribe →</button>
    </form>
  )
}
