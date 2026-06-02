'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

interface Props { onClose: () => void }

const SECTIONS = [
  {
    num: '01',
    label: 'Eligibility',
    rules: [
      'Open to all developers and teams — no size limit.',
      'All participants must register before the deadline.',
      'No age or location restrictions apply.',
    ],
  },
  {
    num: '02',
    label: 'Submission',
    rules: [
      'Must integrate at least one Telegraph inference subnet API.',
      'Must use x402 for payment flows within the app.',
      'Project must be deployed and demo-able — not just a mockup.',
      'Source code must be in a public GitHub repo before the deadline.',
      'Must be built during the hackathon window. Pre-built projects are disqualified.',
    ],
  },
  {
    num: '03',
    label: 'Judging',
    rules: [
      'Real, meaningful use of Telegraph\'s verified inference layer.',
      'Product completeness — a working demo beats a polished idea.',
      'Technical execution and code quality.',
      'Innovation and originality of the concept.',
    ],
  },
  {
    num: '04',
    label: 'Prizes & IP',
    rules: [
      'Teams retain full intellectual property of their project.',
      'Prize pool paid in USDC and / or MACHINA token.',
      'Judges\' decisions are final and non-negotiable.',
    ],
  },
  {
    num: '05',
    label: 'Conduct',
    rules: [
      'No plagiarism or reuse of prior / third-party projects.',
      'One submission per team — duplicates will be disqualified.',
    ],
  },
]

export default function RulesModal({ onClose }: Props) {
  const [closing, setClosing] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, 220)
  }, [onClose])

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [close])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => { panelRef.current?.focus() }, [])

  return (
    <div
      className={`modal-bd${closing ? ' modal-bd-out' : ''}`}
      onClick={close}
    >
      <div
        className={`modal-panel rules-modal-panel${closing ? ' modal-panel-out' : ''}`}
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Hackathon Rules"
        onClick={e => e.stopPropagation()}
      >

        {/* Header */}
        <div className="rules-modal-hd">
          <div className="rules-modal-hd-left">
            <img src="/Telegraoh-Logo.png" alt="" className="modal-sigma" aria-hidden="true" />
            <div>
              <p className="modal-hd-title">Hackathon Rules</p>
              <p className="modal-hd-sub">Telegraph · Season I · 2026</p>
            </div>
          </div>
          <button className="modal-x" onClick={close} aria-label="Close">✕</button>
        </div>

        {/* Body */}
        <div className="modal-body rules-modal-body-wrap">
          <div className="rules-grid-layout">
            {SECTIONS.map(section => (
              <div key={section.num} className="rules-card">
                <div className="rules-card-header">
                  <span className="rules-card-num">{section.num}</span>
                  <span className="rules-card-label">{section.label}</span>
                </div>
                <ul className="rules-card-list">
                  {section.rules.map((rule, i) => (
                    <li key={i} className="rules-card-item">
                      <span className="rules-card-dash">—</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-ft rules-modal-ft">
          <p className="rules-modal-note">By submitting you agree to all rules above.</p>
          <button className="btn-fill" onClick={close}>Got it</button>
        </div>

      </div>
    </div>
  )
}
