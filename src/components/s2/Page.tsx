import Link from 'next/link'
import type { ReactNode } from 'react'
import { PAGES, pageIndex, type PageHref } from '@/data/season2/pages'

/** Page header in the Season I style: eyebrow with an amber rule, bold title, engraving behind. */
export function PageHero({ page, title, sub, children, art }: {
  page: PageHref; title: ReactNode; sub?: ReactNode; children?: ReactNode; art?: string
}) {
  const i = pageIndex(page)
  return (
    <section className="s2-page-hero">
      <img src={art ?? PAGES[i].art} alt="" aria-hidden="true" className="s2-art" />
      <div className="s2-inner">
        <p className="s2-eyebrow">{String(i + 1).padStart(2, '0')} / {PAGES[i].label}</p>
        <h1 className="s2-title">{title}</h1>
        {sub && <p className="s2-sub">{sub}</p>}
        {children}
      </div>
    </section>
  )
}

export function Section({ label, title, sub, children, className = '' }: {
  label?: string; title?: ReactNode; sub?: ReactNode; children?: ReactNode; className?: string
}) {
  return (
    <section className={`s2-block ${className}`}>
      <div className="s2-inner">
        {label && <p className="s2-eyebrow">{label}</p>}
        {title && <h2 className="s2-h2">{title}</h2>}
        {sub && <p className="s2-sub">{sub}</p>}
        {children}
      </div>
    </section>
  )
}

/** "Next page" link so the site can be read front to back. */
export function NextPage({ page }: { page: PageHref }) {
  const i = pageIndex(page)
  const next = PAGES[i + 1]
  const prev = i > 0 ? PAGES[i - 1] : null
  return (
    <nav className="s2-inner s2-next" aria-label="Continue reading">
      {prev ? (
        <Link href={prev.href} className="s2-next-prev"><span>Previous</span>{prev.label}</Link>
      ) : <span />}
      {next && (
        <Link href={next.href} className="s2-next-link">
          <span>Next, {String(i + 2).padStart(2, '0')}</span>
          {next.label} →
        </Link>
      )}
    </nav>
  )
}
