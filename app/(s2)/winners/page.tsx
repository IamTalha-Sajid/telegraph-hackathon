import type { Metadata } from 'next'
import Link from 'next/link'
import { RegisterButton } from '@/components/s2/Shell'
import { SEASON1_WINNERS, pointsAfter, type Winner } from '@/data/season2/winners'

export const metadata: Metadata = {
  title: 'Season I winners | Telegraph Hackathon',
  description: 'The Miners, Evaluation WASMs and apps that won Telegraph Hackathon Season I.',
}

const PLACE = { 1: '1st', 2: '2nd', 3: '3rd' } as const

function WinnerCard({ w }: { w: Winner }) {
  const listAt = pointsAfter(w)
  return (
    <li className={`s2-card wn-card${w.place === 1 ? ' wn-first' : ''}`}>
      <div className="wn-top">
        <span className="wn-place">{PLACE[w.place]}</span>
        {w.score && <span className="wn-score">Score <strong>{w.score}</strong></span>}
      </div>
      {w.project && <h3 className="wn-project">{w.project}</h3>}
      <a className="wn-handle" href={`https://x.com/${w.handle}`} target="_blank" rel="noopener noreferrer">@{w.handle}</a>
      {w.about.map((para, i) => (
        <div key={i}>
          <p className="s2-card-body">{para}</p>
          {i === listAt && w.points && (
            <ul className="wn-points">{w.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
          )}
        </div>
      ))}
    </li>
  )
}

export default function WinnersPage() {
  return (
    <>
      <section className="s2-page-hero">
        <div className="s2-inner">
          <p className="s2-eyebrow">Season I / Winners</p>
          <h1 className="s2-title">Season I winners.</h1>
          <p className="s2-sub">
            Three tracks ran in Season I: Miners supplying intelligence, Evaluation WASMs deciding how that
            intelligence is scored, and apps built on top. More details about the winners of each are below.
          </p>
        </div>
      </section>

      {SEASON1_WINNERS.map(t => (
        <section key={t.n} className="s2-block" aria-labelledby={`wn-track-${t.n}`}>
          <div className="s2-inner">
            <p className="s2-eyebrow">Track {t.n}</p>
            <h2 id={`wn-track-${t.n}`} className="s2-h2">{t.name}</h2>
            {t.intro?.map(p => <p key={p} className="s2-sub wn-intro">{p}</p>)}
            <ol className={`s2-grid s2-grid-3 wn-grid${t.winners.every(w => !w.project) ? ' wn-compact' : ''}`}>
              {t.winners.map(w => <WinnerCard key={w.handle} w={w} />)}
            </ol>
          </div>
        </section>
      ))}

      <section className="s2-block s2-cta">
        <div className="s2-inner">
          <p className="s2-eyebrow">Season II</p>
          <h2 className="s2-h2">Build the next one.</h2>
          <p className="s2-sub">Season II runs 16 November to 16 December 2026, with the same three tracks and fifteen commercial missions for app builders.</p>
          <div className="s2-actions">
            <RegisterButton>Register for Season II</RegisterButton>
            <Link className="s2-btn s2-btn-lg" href="/tracks">See the 3 tracks</Link>
          </div>
        </div>
      </section>
    </>
  )
}
