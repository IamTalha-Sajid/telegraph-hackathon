import { useCallback, useEffect, useState } from 'react'

interface Props { onRegister: () => void; onRules: () => void }

export default function Nav({ onRegister, onRules }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const handleRegister = useCallback(() => { closeMenu(); onRegister() }, [closeMenu, onRegister])
  const handleRules    = useCallback(() => { closeMenu(); onRules()    }, [closeMenu, onRules])

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

  const NAV_LINKS = [
    { href: '#how',    label: 'How It Works' },
    { href: '#apis',   label: 'Tracks'       },
    { href: 'https://telegraph-2.gitbook.io/telegraph', label: 'Docs ↗',   external: true },
    { href: 'https://github.com/telegraphprotocol/telegraph-usecases',     label: 'GitHub ↗', external: true },
  ]

  return (
    <>
      <nav className="nav">
        <div className="nav-left">
          <a href="https://telegraphprotocol.com/" target="_blank" rel="noopener noreferrer" className="nav-logo">
            <img src="/Telegraoh-Logo.png" alt="" className="nav-logo-img" aria-hidden="true" />
            TELEGRAPH
          </a>
          <span className="nav-badge">Hackathon</span>
        </div>

        {/* Desktop links */}
        <div className="nav-right nav-right-desktop">
          {NAV_LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="nav-link"
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {l.label}
            </a>
          ))}
          <button className="nav-rules-btn" onClick={onRules}>Rules</button>
          <button className="nav-btn"       onClick={onRegister}>Register Now</button>
        </div>

        {/* Mobile controls */}
        <div className="nav-right nav-right-mobile">
          <button className="nav-rules-btn" onClick={handleRules}>Rules</button>
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
              {NAV_LINKS.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="mobile-nav-link"
                  onClick={closeMenu}
                  {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {l.label}
                </a>
              ))}
              <div className="mobile-drawer-divider" />
              <button className="nav-rules-btn mobile-drawer-btn mobile-rules-btn" onClick={handleRules}>Rules</button>
              <button className="btn-fill mobile-drawer-btn" onClick={handleRegister}>Register Now</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
