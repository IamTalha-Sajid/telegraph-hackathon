import Link from 'next/link'
import { LINKS } from '@/data/season2/event'
import { SHOW_BUYER_NAMES } from '@/data/season2/tracks'

export default function S2Footer() {
  return (
    <footer className="s2-footer">
      <div className="s2-inner">
        <div className="s2-footer-row">
          <Link href="/" className="s2-brand">
            <img src="/Telegraoh-Logo.png" alt="" className="s2-brand-mark" aria-hidden="true" />
            <span className="s2-brand-name">Telegraph</span>
          </Link>
          <nav className="s2-footer-links" aria-label="Footer">
            <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
            <a href={LINKS.protocol} target="_blank" rel="noopener noreferrer">Protocol ↗</a>
            <a href={LINKS.alexandria} target="_blank" rel="noopener noreferrer">Alexandria ↗</a>
            <a href={LINKS.docs} target="_blank" rel="noopener noreferrer">Docs ↗</a>
            <Link href="/season-1">Season I archive</Link>
          </nav>
        </div>
        {SHOW_BUYER_NAMES && (
          <p className="s2-disclaimer">
            Companies named in the tracks are examples of the buyers each use case is designed for.
            Telegraph is not affiliated with, sponsored by or endorsed by any of them, and naming them
            does not imply they have reviewed or requested these builds.
          </p>
        )}
        <p className="s2-footer-copy">© 2026 Telegraph Protocol</p>
      </div>
    </footer>
  )
}
