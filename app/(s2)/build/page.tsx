import type { Metadata } from 'next'
import Link from 'next/link'
import { RegisterButton } from '@/components/s2/Shell'
import { NextPage, PageHero, Section } from '@/components/s2/Page'
import { LINKS, STARTER_KIT } from '@/data/season2/event'

export const metadata: Metadata = { title: 'Build | Telegraph Hackathon Season II' }

export default function BuildPage() {
  return (
    <>
      <PageHero
        page="/build"
        title="Start building."
        sub="The starter kit ships before day one, so no team starts from zero and every demo reads the same way to a judge."
      >
        <ul className="s2-grid s2-grid-3">
          {STARTER_KIT.map((k, i) => (
            <li key={k.title} className="s2-card">
              <span className="s2-idx">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="s2-card-title">{k.title}</h3>
              <p className="s2-card-body">{k.body}</p>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section label="Get going" className="s2-cta">
        <h2 className="s2-h2">Thirty days. Fifteen tracks. One winner in each.</h2>
        <p className="s2-sub">Register now, pick a track in week one, and have one settled transaction on the board by the end of week two.</p>
        <div className="s2-actions">
          <RegisterButton>Register for Season II</RegisterButton>
          <Link className="s2-btn s2-btn-lg" href="/tracks">Pick a track</Link>
          <a className="s2-btn s2-btn-lg" href={LINKS.docs} target="_blank" rel="noopener noreferrer">Read the docs ↗</a>
        </div>
        <p className="s2-note">Questions? <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a></p>
      </Section>

      <NextPage page="/build" />
    </>
  )
}
