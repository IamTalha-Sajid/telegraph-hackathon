'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PAGES } from '@/data/season2/pages'
import { LINKS } from '@/data/season2/event'

type Theme = 'light' | 'dark'

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('tg-theme', next) } catch {}
    setTheme(next)
  }

  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
  return (
    <button className="s2-theme" onClick={toggle} aria-label={label} title={label}>
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg>
      )}
    </button>
  )
}

export default function S2Nav({ onRegister }: { onRegister: () => void }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [open])

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="s2-nav">
      <div className="s2-nav-bar">
        <Link href="/" className="s2-brand" aria-label="Telegraph Hackathon Season II home">
          <img src="/Telegraoh-Logo.png" alt="" className="s2-brand-mark" aria-hidden="true" />
          <span className="s2-brand-name">Telegraph</span>
          <span className="s2-brand-badge">Hackathon</span>
          <span className="s2-brand-season">Season II</span>
        </Link>

        <div className="s2-nav-actions">
          <Link href="/intents" className={`s2-nav-btn s2-hide-sm${pathname.startsWith('/intents') ? ' is-on' : ''}`}>Intents</Link>
          <a href={LINKS.docs} target="_blank" rel="noopener noreferrer" className="s2-nav-btn s2-hide-sm">Docs ↗</a>
          <ThemeToggle />
          <button className="s2-btn s2-btn-accent s2-hide-sm" onClick={onRegister}>Register</button>
          <button
            className="s2-nav-toggle"
            aria-expanded={open}
            aria-controls="s2-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(o => !o)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <nav id="s2-menu" className={`s2-tabs${open ? ' is-open' : ''}`} aria-label="Season II pages">
        {PAGES.map((p, i) => (
          <Link key={p.href} href={p.href} onClick={close} className={isActive(p.href) ? 'is-on' : ''} aria-current={isActive(p.href) ? 'page' : undefined}>
            <span className="s2-tab-n">{String(i + 1).padStart(2, '0')}</span>{p.label}
          </Link>
        ))}
        <Link href="/intents" onClick={close} className={`s2-show-sm${pathname.startsWith('/intents') ? ' is-on' : ''}`}>Intent catalogue</Link>
        <a href={LINKS.docs} target="_blank" rel="noopener noreferrer" className="s2-show-sm">Docs ↗</a>
        <Link href="/season-1" onClick={close} className="s2-show-sm">Season I archive</Link>
        <button className="s2-btn s2-btn-accent s2-show-sm" onClick={() => { setOpen(false); onRegister() }}>Register</button>
      </nav>
    </header>
  )
}
