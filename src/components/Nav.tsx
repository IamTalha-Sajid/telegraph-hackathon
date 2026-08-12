'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

interface Props { onRegister: () => void }

export default function Nav({ onRegister }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const handleRegister = useCallback(() => { closeMenu(); onRegister() }, [closeMenu, onRegister])

  useEffect(() => {
    if (!menuOpen) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu() }
    document.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', h)
      document.body.style.overflow = ''
    }
  }, [menuOpen, closeMenu])

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav-left">
          <a href="https://telegraphprotocol.com/" target="_blank" rel="noopener noreferrer" className="nav-logo">
            <img src="/Telegraoh-Logo.png" alt="" className="nav-logo-img" aria-hidden="true" />
            <span className="nav-logo-text">TELEGRAPH</span>
          </a>
          <span className="nav-badge">Hackathon</span>
        </div>

        {/* Desktop */}
        <div className="nav-right nav-right-desktop">
          <Link href="/rules" className="nav-rules-btn">Rules</Link>
          <Link href="/supported-intents" className="nav-rules-btn">Intents</Link>
          <a href="https://docs.telegraphprotocol.com/" target="_blank" rel="noopener noreferrer" className="nav-rules-btn">Docs ↗</a>
          <a href="https://github.com/telegraphprotocol/telegraph-usecases" target="_blank" rel="noopener noreferrer" className="nav-rules-btn">GitHub ↗</a>
          <a href="https://telegraphprotocol.com/" target="_blank" rel="noopener noreferrer" className="nav-rules-btn nav-telegraph">Telegraph ↗</a>
          <button className="btn-register" onClick={onRegister}>Register Now</button>
        </div>

        {/* Mobile controls */}
        <div className="nav-right nav-right-mobile">
          <Link href="/rules" className="nav-rules-btn">Rules</Link>
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`ham-bar${menuOpen ? ' ham-bar-1-open' : ''}`} />
            <span className={`ham-bar${menuOpen ? ' ham-bar-2-open' : ''}`} />
            <span className={`ham-bar${menuOpen ? ' ham-bar-3-open' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-drawer-bd" onClick={closeMenu}>
          <div className="mobile-drawer" onClick={e => e.stopPropagation()}>
            <div className="mobile-drawer-inner">
              <div className="mobile-drawer-divider" />
              <Link href="/rules" className="nav-rules-btn mobile-drawer-btn" onClick={closeMenu}>Rules</Link>
              <Link href="/supported-intents" className="nav-rules-btn mobile-drawer-btn" onClick={closeMenu}>Intents</Link>
              <a href="https://docs.telegraphprotocol.com/" target="_blank" rel="noopener noreferrer" className="nav-rules-btn mobile-drawer-btn" onClick={closeMenu}>Docs ↗</a>
              <a href="https://github.com/telegraphprotocol/telegraph-usecases" target="_blank" rel="noopener noreferrer" className="nav-rules-btn mobile-drawer-btn" onClick={closeMenu}>GitHub ↗</a>
              <a href="https://telegraphprotocol.com/" target="_blank" rel="noopener noreferrer" className="nav-rules-btn mobile-drawer-btn" onClick={closeMenu}>Telegraph ↗</a>
              <button className="btn-register mobile-drawer-btn" onClick={handleRegister}>Register Now</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
