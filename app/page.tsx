import MentorshipCard from './components/MentorshipCard'
import FindMeCard from './components/FindMeCard'

const CIRCLE_TEXT = 'available · UX Design · AI Products · available · UX Design · AI Products · '

function RotatingBadge() {
  const radius = 52
  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.75rem', pointerEvents: 'none', zIndex: 10 }}>
      <div style={{ position: 'relative', width: 148, height: 148 }}>
        <svg viewBox="0 0 148 148" width="148" height="148" className="bento-spin">
          <defs>
            <path id="circlePath" d={`M 74,74 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`} />
          </defs>
          <text fill="#1a1a1a" fontFamily="var(--font-space-grotesk), sans-serif" fontSize="8.8" fontWeight="500" letterSpacing="2.2">
            <textPath href="#circlePath" startOffset="0%">{CIRCLE_TEXT}</textPath>
          </text>
        </svg>
        <div style={{ position: 'absolute', width: 10, height: 10, borderRadius: '50%', background: '#22c55e', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="bento-wrap">
      <div className="bento-grid">

        {/* HERO */}
        <div className="b-card card-hero">
          <div>
            <div className="b-label">Hero</div>
            <h1 style={{ fontSize: 'clamp(2rem,3.8vw,2.75rem)', fontWeight: 800, lineHeight: 1.0, color: '#1a1a1a', letterSpacing: '-0.035em', marginBottom: '0.9rem' }}>
              Joanna<br />Wrobel
            </h1>
            <p style={{ fontSize: '0.74rem', color: '#555', lineHeight: 1.8 }}>
              UX design · Figma expert · AI design<br />Illustration · 3D · Systems
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: '0.9rem' }}>
            <span className="b-tag">Available for work</span>
            <span className="b-tag">Warsaw / Remote</span>
          </div>
        </div>

        {/* FIND ME — Instagram with pink gradient */}
        <FindMeCard />

        {/* MENTORSHIP — dark card with canvas mesh */}
        <MentorshipCard />

        {/* RESUME */}
        <div className="b-card card-resume">
          <div>
            <div className="b-label">Resume</div>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.3rem' }}>Download CV</h2>
            <p style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.8rem' }}>PDF · updated 2026</p>
            <a href="#" className="b-btn">↓ Get it</a>
          </div>
        </div>

        {/* LINKEDIN */}
        <div className="b-card card-linkedin">
          <div className="b-label">LinkedIn</div>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.3rem' }}>{"Let's connect"}</h2>
            <p style={{ fontSize: '0.7rem', color: '#666' }}>Full work history + recommendations</p>
          </div>
        </div>

        {/* WORK */}
        <div className="b-card card-work">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="b-label">Work · 4 Case Studies</div>
            <span className="b-arrow">↗</span>
          </div>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a1a', marginBottom: '0.3rem' }}>Selected projects</h2>
            <p style={{ fontSize: '0.7rem', color: '#555' }}>UX design, AI products, design systems — with process.</p>
          </div>
        </div>

        {/* SOCIAL PROOF */}
        <div className="b-card card-social">
          <div className="b-label">Social proof</div>
          <p className="b-quote" style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.45, fontStyle: 'italic', marginBottom: '0.4rem' }}>
            &ldquo;She pinpointed exactly what was off in 20 minutes.&rdquo;
          </p>
          <p style={{ fontSize: '0.67rem', color: '#888' }}>— designer, 3 yrs exp</p>
        </div>

        {/* CONTACT */}
        <div className="b-card card-contact">
          <div className="b-label">Contact</div>
          <div>
            <p style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.3, marginBottom: '0.75rem' }}>
              joannawrobel.ux@gmail.com
            </p>
            <a href="mailto:joannawrobel.ux@gmail.com" className="b-btn">Say hello →</a>
          </div>
        </div>

      </div>

      <RotatingBadge />
    </div>
  )
}
