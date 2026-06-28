import Link from 'next/link'

const corners = [
  { label: 'Work',     sub: '4 case studies',        href: '/#work',     pos: 'top-0 left-0 items-start' },
  { label: 'About',    sub: 'Warsaw / Remote',        href: '/about',     pos: 'top-0 right-0 items-end'  },
  { label: 'Services', sub: 'Research · Design · AI', href: '/#services', pos: 'bottom-0 left-0 items-start' },
  { label: 'Contact',  sub: "Let's work together",    href: '/contact',   pos: 'bottom-0 right-0 items-end'  },
]

const boxes = [
  {
    label: 'Instagram',
    sub: '@joannawrobel.ux',
    href: 'https://instagram.com/joannawrobel.ux',
    note: 'Design process · WIP · Inspiration',
    span: 'col-span-2',
  },
  {
    label: 'Email',
    sub: 'joannawrobel.ux\n@gmail.com',
    href: 'mailto:joannawrobel.ux@gmail.com',
    note: 'For project inquiries',
    span: 'col-span-1',
  },
  {
    label: 'LinkedIn',
    sub: '/in/joannawrobel',
    href: 'https://linkedin.com/in/joannawrobel',
    note: 'Professional network',
    span: 'col-span-1',
  },
  {
    label: 'Gumroad',
    sub: 'gumroad.com/joanna',
    href: 'https://gumroad.com/joanna',
    note: 'Templates · Kits · Resources',
    span: 'col-span-2',
  },
]

export default function Contact() {
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
            {label}
            <span className="text-[14px] leading-none inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">↗</span>
          </span>
          <span className="text-[8.5px] text-ink opacity-30">{sub}</span>
        </Link>
      ))}

      <div className="flex flex-col gap-0 w-[480px]">

        {/* Header */}
        <p className="text-[7.5px] text-ink opacity-30 tracking-[0.12em] mb-4">CONTACT</p>

        {/* Bento grid */}
        <div className="grid grid-cols-3 gap-[6px]">
          {boxes.map(({ label, sub, href, note, span }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={[
                'border-2 border-ink px-[18px] py-[18px] flex flex-col justify-between min-h-[130px]',
                'transition-opacity hover:opacity-50 no-underline group',
                span,
              ].join(' ')}
            >
              <div className="flex items-start justify-between">
                <span className="text-[7.5px] text-ink opacity-30 tracking-[0.1em]">{label}</span>
                <span className="text-[12px] text-ink opacity-20 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
              </div>
              <div>
                <p className="text-[13px] font-bold font-syne text-ink leading-[1.2] tracking-[-0.02em] whitespace-pre-line">
                  {sub}
                </p>
                <p className="text-[7.5px] text-ink opacity-30 mt-[6px]">{note}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-[7.5px] text-ink opacity-20 tracking-[0.04em] mt-[14px] text-center">
          Based in Warsaw · Available remotely worldwide
        </p>

      </div>
    </main>
  )
}
