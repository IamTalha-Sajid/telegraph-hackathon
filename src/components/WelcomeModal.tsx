'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

interface Props { onClose: () => void; onRegister: () => void }

export default function WelcomeModal({ onClose, onRegister }: Props) {
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
        className={`modal-panel welcome-modal-panel${closing ? ' modal-panel-out' : ''}`}
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Welcome to the Telegraph Hackathon"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-hd">
          <div className="modal-hd-left">
            <img src="/Telegraoh-Logo.png" alt="" className="modal-sigma" aria-hidden="true" />
            <div>
              <p className="modal-hd-title">Telegraph Hackathon</p>
              <p className="modal-hd-sub">Season I · 2026</p>
            </div>
          </div>
          <button className="modal-x" onClick={close} aria-label="Close">✕</button>
        </div>

        <div className="modal-body welcome-modal-body">
          <p className="welcome-modal-prize">$15,000 USDC prize pool</p>
          <p className="welcome-modal-desc">
            Build on Telegraph — a verifiable intelligence layer for autonomous agents. Wrap an API, write an evaluation script, or ship an app on top of live miners. Three tracks, open to any developer.
          </p>
        </div>

        <div className="modal-ft welcome-modal-ft">
          <button className="btn-fill" onClick={close}>Maybe later</button>
          <button className="btn-register" onClick={() => { close(); onRegister() }}>Register Now</button>
        </div>
      </div>
    </div>
  )
}
