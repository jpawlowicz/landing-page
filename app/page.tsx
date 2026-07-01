import FindMeCard      from './components/FindMeCard'
import MentorshipCard  from './components/MentorshipCard'
import HeroCircle      from './components/HeroCircle'
import BackgroundCanvas from './components/BackgroundCanvas'
import MobileSideNav   from './components/MobileSideNav'
import NewsletterForm  from './components/NewsletterForm'
import ClientAnalytics from './components/ClientAnalytics'

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="b-tag">{children}</span>
}

export default function Home() {
  return (
    <>
      <BackgroundCanvas />

      <div className="bento-wrap">
        <div className="bento-grid">

          {/* ROW 1 ── Hero · FindMe · Mentorship */}

          <div id="s-hero" className="b-card card-hero" style={{ paddingRight: '152px' }}>
            <div>
              <div className="b-label">UX Designer & Mentor</div>
              <h1 style={{
                fontSize: 'clamp(2rem, 3.8vw, 2.75rem)',
                fontWeight: 800,
                lineHeight: 1.0,
                color: '#1a1a1a',
                letterSpacing: '-0.035em',
                fontFamily: 'var(--font-syne), sans-serif',
                marginBottom: '1.1rem',
              }}>
                Joanna<br />Wrobel
              </h1>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              <Tag>Available for work</Tag>
              <Tag>Gdansk / Remote</Tag>
            </div>
            <div style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}>
              <HeroCircle />
            </div>
          </div>

          <FindMeCard id="s-findme" />

          <MentorshipCard id="s-mentorship" />

          {/* ROW 2 ── LinkedIn · About */}

          <a id="s-linkedin" className="b-card card-linkedin" href="https://www.linkedin.com/in/joannawrobel-ux/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="b-label">LinkedIn</div>
              <span className="b-arrow">↗</span>
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.4rem' }}>{"Let's connect"}</h2>
              <p style={{ fontSize: '0.74rem', color: '#666' }}>Full work history, case studies, and recommendations.</p>
            </div>
          </a>

          <div id="s-about" className="b-card card-about">
            <div className="b-label">About</div>
            <div>
              <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.35, marginBottom: '0.6rem' }}>
                12 years designing.<br />8 focused on UX.
              </p>
              <p style={{ fontSize: '0.71rem', color: '#555', lineHeight: 1.75 }}>
                Drawn to design since childhood — now specialising in design systems and advanced prototypes. Equally passionate about illustration and animation. I love discovering new workflows and sharing what I learn. Right now I&rsquo;m experimenting with how AI can genuinely support the UX process.
              </p>
            </div>
          </div>

          {/* ROW 3 ── Gumroad · Instagram2 · Contact */}

          <div id="s-gumroad" className="b-card card-gumroad">
            <div>
              <div className="b-label">Template</div>
              <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.3rem' }}>Case Study Template</h2>
              <p style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.8rem' }}>Notion template for documenting UX work. Process-first.</p>
              <a href="https://joannawrobel.gumroad.com/l/notion-case-study" target="_blank" rel="noopener noreferrer" className="b-btn">↗ Get on Gumroad</a>
            </div>
          </div>

          <div id="s-instagram2" className="b-card card-instagram2">
            <div className="b-label">Illustration</div>
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.3rem' }}>Art & Sketches</h2>
              <p style={{ fontSize: '0.7rem', color: '#555', marginBottom: '0.75rem' }}>Artwork, sketches & process videos</p>
              <a href="https://www.instagram.com/_joannawrobel/" target="_blank" rel="noopener noreferrer" className="b-btn b-btn-black">→ @_joannawrobel</a>
            </div>
          </div>

          <div id="s-contact" className="b-card card-contact">
            <div className="b-label">Contact</div>
            <div>
              <p style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.3, marginBottom: '0.75rem', overflowWrap: 'anywhere' }}>
                joannawrobel.ux@gmail.com
              </p>
              <a href="mailto:joannawrobel.ux@gmail.com" className="b-btn">Say hello →</a>
            </div>
          </div>

          {/* ROW 4 ── Newsletter */}

          <div id="s-newsletter" className="b-card card-newsletter">
            <div className="nl-inner">
              <div>
                <div className="b-label">Mailing list</div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.3rem' }}>
                  Be the first to know
                </h2>
                <p style={{ fontSize: '0.73rem', color: '#555', lineHeight: 1.65 }}>
                  I&rsquo;m working on a Variables ebook and more resources. No spam — just a quiet heads-up when something worth knowing drops, plus subscriber-only promos.
                </p>
              </div>
              <NewsletterForm />
            </div>
          </div>

        </div>
      </div>

      <MobileSideNav />
      <ClientAnalytics />
    </>
  )
}
