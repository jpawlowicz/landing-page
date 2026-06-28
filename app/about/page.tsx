import Link from 'next/link'

const corners = [
  { label: 'Work',     sub: '4 case studies',        href: '/#work',     pos: 'top-0 left-0 items-start' },
  { label: 'About',    sub: 'Warsaw / Remote',        href: '/about',     pos: 'top-0 right-0 items-end'  },
  { label: 'Services', sub: 'Research · Design · AI', href: '/#services', pos: 'bottom-0 left-0 items-start' },
  { label: 'Contact',  sub: "Let's work together",    href: '/contact',   pos: 'bottom-0 right-0 items-end'  },
]

const experience = [
  {
    role: 'Senior UX Designer',
    company: 'Freelance',
    period: '2021 — Present',
    desc: 'End-to-end product design for AI-native tools, design systems, and cross-platform apps.',
  },
  {
    role: 'UX / Product Designer',
    company: 'Digital Agency',
    period: '2019 — 2021',
    desc: 'Led design for B2B SaaS products across fintech and e-commerce verticals.',
  },
  {
    role: 'Junior UI Designer',
    company: 'Studio Warsaw',
    period: '2017 — 2019',
    desc: 'Brand identity, illustration, and interface design for local and international clients.',
  },
]

const education = [
  { degree: 'MA Communication Design', school: 'Academy of Fine Arts, Warsaw', year: '2019' },
  { degree: 'BA Graphic Design',        school: 'University of Arts, Poznań',   year: '2017' },
]

const skills = [
  'UX Research', 'Figma', 'Prototyping', 'Design Systems',
  'AI Product Design', 'Front-end (Next.js)', 'Illustration',
  '3D / Blender', 'Animation', 'Interior Design', 'Mentoring',
]

export default function About() {
  return (
    <main className="relative min-h-screen bg-paper flex items-center justify-center overflow-hidden font-mono py-20">

      {/* Corner navigation */}
      {corners.map(({ label, sub, href, pos }) => (
        <Link
          key={label}
          href={href}
          className={`absolute p-4 flex flex-col gap-1 cursor-pointer group no-underline ${pos}`}
        >
          <span className="text-[10px] font-bold tracking-[0.05em] text-ink flex items-center gap-[5px]">
            {label}
            <span className="text-[14px] leading-none inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">↗</span>
          </span>
          <span className="text-[8.5px] text-ink opacity-30">{sub}</span>
        </Link>
      ))}

      <div className="w-[640px] flex flex-col gap-0">

        {/* Header label */}
        <p className="text-[7.5px] text-ink opacity-30 tracking-[0.12em] mb-4">ABOUT</p>

        {/* Top section: image + bio */}
        <div className="border-2 border-ink flex">

          {/* Image placeholder */}
          <div className="w-[180px] shrink-0 border-r-2 border-ink bg-ink/5 flex items-end justify-end p-3 min-h-[220px]">
            <span className="text-[7px] text-ink opacity-20 tracking-[0.06em]">photo</span>
          </div>

          {/* Bio text */}
          <div className="flex-1 px-[22px] py-[20px] flex flex-col justify-between">
            <div>
              <h1 className="font-syne text-[20px] font-bold text-ink tracking-[-0.04em] leading-[1.05] mb-[14px]">
                Joanna<br />Wrobel
              </h1>
              <p className="text-[8.5px] text-ink opacity-40 tracking-[0.02em] leading-[1.75] mb-[14px]">
                UX Design · AI Products · Warsaw / Remote
              </p>
              <p className="text-[9px] text-ink leading-[1.9] opacity-80">
                I design digital products that feel human — from early research
                and concept through polished interfaces and working prototypes.
                My work spans AI-native tools, design systems, and cross-platform
                experiences built at the intersection of craft and technology.
              </p>
              <p className="text-[9px] text-ink leading-[1.9] opacity-80 mt-[10px]">
                I also illustrate, build in 3D, write front-end code, and mentor
                junior designers. Based in Warsaw, available remotely worldwide.
              </p>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-[5px] mt-[16px]">
              {skills.map(s => (
                <span
                  key={s}
                  className="border border-ink/20 text-[7.5px] text-ink opacity-60 px-[7px] py-[3px] tracking-[0.04em]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Resume section */}
        <div className="border-2 border-ink border-t-0">

          {/* Resume header */}
          <div className="px-[18px] py-[9px] border-b border-ink/20 flex items-center justify-between">
            <p className="text-[7.5px] text-ink opacity-30 tracking-[0.12em]">RÉSUMÉ</p>
            <a href="#" className="text-[7.5px] text-ink opacity-30 hover:opacity-60 transition-opacity no-underline tracking-[0.04em]">
              Download PDF ↓
            </a>
          </div>

          <div className="grid grid-cols-3 divide-x divide-ink/10">

            {/* Experience */}
            <div className="px-[16px] py-[16px] flex flex-col gap-[18px]">
              <p className="text-[7px] text-ink opacity-30 tracking-[0.12em]">EXPERIENCE</p>
              {experience.map(({ role, company, period, desc }) => (
                <div key={role} className="flex flex-col gap-[4px]">
                  <p className="text-[9px] font-bold text-ink leading-[1.3]">{role}</p>
                  <p className="text-[7.5px] text-ink opacity-50">{company}</p>
                  <p className="text-[7px] text-ink opacity-30 tracking-[0.04em]">{period}</p>
                  <p className="text-[7.5px] text-ink opacity-55 leading-[1.7] mt-[2px]">{desc}</p>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="px-[16px] py-[16px] flex flex-col gap-[18px]">
              <p className="text-[7px] text-ink opacity-30 tracking-[0.12em]">EDUCATION</p>
              {education.map(({ degree, school, year }) => (
                <div key={degree} className="flex flex-col gap-[4px]">
                  <p className="text-[9px] font-bold text-ink leading-[1.3]">{degree}</p>
                  <p className="text-[7.5px] text-ink opacity-50">{school}</p>
                  <p className="text-[7px] text-ink opacity-30 tracking-[0.04em]">{year}</p>
                </div>
              ))}
            </div>

            {/* Skills column */}
            <div className="px-[16px] py-[16px] flex flex-col gap-[6px]">
              <p className="text-[7px] text-ink opacity-30 tracking-[0.12em] mb-[12px]">TOOLS & SKILLS</p>
              {[
                'Figma / Prototyping',
                'UX Research',
                'Design Systems',
                'AI Product Design',
                'Next.js / React',
                'Tailwind CSS',
                'Illustration',
                'Blender / 3D',
                'After Effects',
                'Framer',
                'Notion',
                'Mentoring',
              ].map(s => (
                <div key={s} className="flex items-center gap-[6px]">
                  <span className="w-[3px] h-[3px] rounded-full bg-ink opacity-20 shrink-0" />
                  <span className="text-[8px] text-ink opacity-60">{s}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </main>
  )
}
