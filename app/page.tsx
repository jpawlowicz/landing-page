import Link from 'next/link'
import VisitorCount from './VisitorCount'

const corners = [
  { label: 'Work',     sub: '4 case studies',        href: '#work',      pos: 'top-0 left-0 items-start' },
  { label: 'About',    sub: 'Warsaw / Remote',        href: '/about',     pos: 'top-0 right-0 items-end'  },
  { label: 'Services', sub: 'Research · Design · AI', href: '#services',  pos: 'bottom-0 left-0 items-start' },
  { label: 'Contact',  sub: "Let's work together",    href: '/contact',   pos: 'bottom-0 right-0 items-end'  },
]

const links = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn',  href: 'https://linkedin.com'  },
  { label: 'Read.cv',   href: 'https://read.cv'       },
  { label: 'Resume ↓',  href: '#'                     },
]


export default function Home() {
  return (
    <main className="relative min-h-screen bg-paper flex items-center justify-center overflow-hidden font-mono">

      {/* Corner navigation */}
      {corners.map(({ label, sub, href, pos }) => (
        <Link
          key={label}
          href={href}
          className={`absolute p-4 flex flex-col gap-1 cursor-pointer group no-underline ${pos}`}
        >
          <span className="text-[10px] font-bold tracking-[0.05em] text-ink flex items-center gap-[5px]">
            {label} {' '}
            <span className="text-[14px] leading-none inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
              ↗
            </span>
          </span>
          <span className="text-[8.5px] text-ink opacity-30">{sub}</span>
        </Link>
      ))}

      <div className="flex flex-col items-center">

        {/* Card + spinning badge */}
        <div className="relative">

          <div className="border-2 border-ink w-[452px] bg-paper flex flex-col">

            <div className="flex">

              {/* Left panel — name & title */}
              <div className="w-[154px] shrink-0 border-r-2 border-ink px-[18px] py-[22px] flex flex-col justify-between">
                <div>
                  <h1 className="font-syne text-[22px] font-bold text-ink tracking-[-0.04em] leading-[1.05]">
                    Joanna<br />Wrobel
                  </h1>
                  <p className="text-[8px] text-ink opacity-40 mt-[9px] leading-[1.75] tracking-[0.02em]">
                    UX Design<br />& AI Products
                  </p>
                </div>
                <p className="text-[7.5px] text-ink opacity-[0.22]">Warsaw · Remote</p>
              </div>

              {/* Right panel — info, about, links */}
              <div className="flex-1 flex flex-col">

                {/* Status */}
                <div className="flex justify-between items-center px-[14px] py-[7px] border-b border-ink/10 text-[9px] text-ink gap-2">
                  <span className="opacity-40 shrink-0">Status</span>
                  <span className="flex items-center gap-[5px]">
                    <span className="w-[5px] h-[5px] rounded-full bg-available shrink-0 inline-block" />
                    Available for work
                  </span>
                </div>

                {/* About */}
                <div className="px-[14px] py-[9px] border-b border-ink/10 flex-1">
                  <p className="text-[7.5px] text-ink opacity-[0.35] tracking-[0.06em] mb-[7px]">About</p>
                  <p className="text-[9px] text-ink leading-[1.85]">
                    UX design · Figma expert · AI design<br />
                    Illustration · 3D · Interior design<br />
                    Front-end · Animation · Systems<br />
                    <span className="opacity-[0.45]">Mentor · Knowledge sharer · Versatile</span>
                  </p>
                </div>

                {/* Now */}
                <div className="flex justify-between items-start px-[14px] py-[7px] border-b border-ink/10 text-[9px] text-ink gap-2">
                  <span className="opacity-40 shrink-0 pt-px">Now</span>
                  <span className="text-right leading-[1.6]">
                    AI-native interfaces<br />for humans
                    <span className="animate-blink">_</span>
                  </span>
                </div>

                {/* Links 2×2 grid */}
                <div className="grid grid-cols-2 border-t border-ink/10">
                  {links.map(({ label, href }, i) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={[
                        'px-[11px] py-[7px] text-[9px] text-ink flex items-center gap-[5px]',
                        'transition-opacity hover:opacity-40 no-underline',
                        i % 2 === 0 ? 'border-r border-ink/10' : '',
                        i < 2      ? 'border-b border-ink/10' : '',
                      ].join(' ')}
                    >
                      <span className="opacity-[0.28]">→</span>
                      {label}
                    </a>
                  ))}
                </div>

              </div>
            </div>

            {/* Card footer */}
            <div className="px-4 py-[7px] border-t-2 border-ink flex justify-between text-[7.5px] text-ink opacity-25">
              <span>Est. 2025</span>
              <VisitorCount />
            </div>

          </div>

          {/* Spinning circular badge */}
          <div className="absolute -bottom-11 -right-11 pointer-events-none">
            <div className="w-[88px] h-[88px] animate-spin-slow" style={{ transformOrigin: 'center center' }}>
              <svg width="88" height="88" viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path id="textCircle" d="M44,7 a37,37 0 1,1 -0.01,0" fill="none" />
                </defs>
                <text
                  fontFamily="var(--font-space-mono), monospace"
                  fontSize="7.2"
                  fill="#0A0907"
                  letterSpacing="1.8"
                >
                  <textPath href="#textCircle">
                    ◆ Available ◆ UX Design ◆ AI Products ◆ Warsaw
                  </textPath>
                </text>
                <circle cx="44" cy="44" r="3.5" fill="#3EC96B" />
              </svg>
            </div>
          </div>

        </div>
  

      </div>
    </main>
  )
}
