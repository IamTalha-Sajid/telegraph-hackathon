'use client'
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { TRACKS, TRACK_BY_SLUG, buyerLabel, pad2 } from '@/data/season2/tracks'

declare global {
  interface Window { twq?: (...args: unknown[]) => void }
}

interface Props { onClose: () => void; initialTrack?: string }

type ParticipantType = 'individual' | 'team'
type Step            = 'email' | 'otp' | 'form' | 'done'

interface FormData {
  name:        string
  email:       string
  type:        ParticipantType
  orgName:     string
  teamSize:    string
  wallet:      string
  twitter:     string
  discord:     string
  track:       string
  buyer:       string
  roles:       string[]
  projectName: string
  projectDesc: string
  techStack:   string
  github:      string
}

type Errors = Partial<Record<keyof FormData, string>>

const EMPTY: FormData = {
  name: '', email: '', type: 'individual', orgName: '', teamSize: '2 – 5',
  wallet: '', twitter: '', discord: '', track: '', buyer: '', roles: [],
  projectName: '', projectDesc: '', techStack: '', github: '',
}

const TEAM_SIZES = ['2 – 5', '6 – 10', '11 – 20', '20+']
const ROLE_OPTS = [
  { v: 'App / Agent', hint: 'Build the end-user agent or app' },
  { v: 'Miner',       hint: 'Supply intelligence the apps buy' },
  { v: 'Evaluator',   hint: 'Improve how miners are scored' },
]

const STEP_LABELS: Record<Step, string> = {
  email: 'Verify your email',
  otp:   'Enter your code',
  form:  'Registration',
  done:  '',
}

function Field({
  label, id, optional, error, hint, children,
}: {
  label: string; id?: string; optional?: boolean; error?: string; hint?: string; children: ReactNode
}) {
  return (
    <div className="mf">
      <label className="mf-label" htmlFor={id}>
        {!optional && <span className="mf-req">* </span>}
        {label}
        {optional && <span className="mf-opt">optional</span>}
      </label>
      {hint && <p className="mf-hint">{hint}</p>}
      {children}
      {error && <p className="mf-err">{error}</p>}
    </div>
  )
}

export default function RegisterModal({ onClose, initialTrack = '' }: Props) {
  const [step,          setStep]          = useState<Step>('email')
  const [email,         setEmail]         = useState('')
  const [emailErr,      setEmailErr]      = useState('')
  const [sending,       setSending]       = useState(false)
  const [token,         setToken]         = useState('')
  const [otp,           setOtp]           = useState(['', '', '', '', '', ''])
  const [otpErr,        setOtpErr]        = useState('')
  const [verifying,     setVerifying]     = useState(false)
  const [isReturning,   setIsReturning]   = useState(false)
  const [fromSeasonOne, setFromSeasonOne] = useState(false)
  const [form,          setForm]          = useState<FormData>(EMPTY)
  const [errors,        setErrors]        = useState<Errors>({})
  const [submitting,    setSubmitting]    = useState(false)
  const [submitErr,     setSubmitErr]     = useState('')
  const [closing,       setClosing]       = useState(false)

  const panelRef = useRef<HTMLDivElement>(null)
  const otpRefs  = useRef<(HTMLInputElement | null)[]>([])

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

  const set = useCallback(<K extends keyof FormData>(k: K, v: FormData[K]) =>
    setForm(f => ({ ...f, [k]: v })), [])

  const toggleRole = useCallback((r: string) =>
    setForm(f => ({
      ...f,
      roles: f.roles.includes(r)
        ? f.roles.filter(x => x !== r)
        : [...f.roles, r],
    })), [])

  const trackBuyers = form.track ? TRACK_BY_SLUG[form.track]?.buyers ?? [] : []

  /* ── Email step ── */
  const handleSendOtp = async (emailOverride?: string) => {
    const target = emailOverride ?? email
    if (!target.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(target)) {
      setEmailErr('Please enter a valid email address')
      return
    }
    setEmailErr('')
    setSending(true)
    try {
      const res  = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: target }),
      })
      const data = await res.json()
      if (!res.ok) { setEmailErr(data.error ?? 'Failed to send code'); return }
      setToken(data.token)
      setOtp(['', '', '', '', '', ''])
      setOtpErr('')
      setStep('otp')
      setTimeout(() => otpRefs.current[0]?.focus(), 80)
    } catch {
      setEmailErr('Network error. Please try again.')
    } finally {
      setSending(false)
    }
  }

  /* ── OTP step ── */
  const handleOtpInput = (i: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1)
    const next  = [...otp]
    next[i] = digit
    setOtp(next)
    if (digit && i < 5) otpRefs.current[i + 1]?.focus()
  }

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus()
  }

  const handleVerify = async () => {
    const code = otp.join('')
    if (code.length < 6) { setOtpErr('Please enter the full 6-digit code'); return }
    setOtpErr('')
    setVerifying(true)
    try {
      const res  = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, otp: code }),
      })
      const data = await res.json()
      if (!res.ok) { setOtpErr(data.error ?? 'Verification failed'); return }
      if (data.existing) {
        const existingTrack = TRACKS.find(t => t.name === data.existing.track)?.slug
        setForm({ ...EMPTY, ...data.existing, track: existingTrack ?? initialTrack })
        setIsReturning(data.season === 2)
        setFromSeasonOne(data.season === 1)
      } else {
        setForm({ ...EMPTY, email: data.email, track: initialTrack })
        setIsReturning(false)
        setFromSeasonOne(false)
      }
      setErrors({})
      setStep('form')
    } catch {
      setOtpErr('Network error. Please try again.')
    } finally {
      setVerifying(false)
    }
  }

  /* ── Form step ── */
  const validateForm = () => {
    const e: Errors = {}
    if (!form.name.trim())        e.name        = 'Required'
    if (form.type === 'team' && !form.orgName.trim()) e.orgName = 'Required'
    if (!form.discord.trim())     e.discord     = 'Required'
    if (form.roles.length === 0)  e.roles       = 'Pick at least one'
    if (form.projectDesc.trim().length > 0 && form.projectDesc.trim().length < 20)
      e.projectDesc = 'Please describe your project (min 20 characters)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    setSubmitting(true)
    setSubmitErr('')
    try {
      const res  = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setSubmitErr(data.error ?? 'Something went wrong. Please try again.')
      } else {
        setStep('done')
        window.twq?.('event', 'tw-rcv9y-re0ue', { email_address: form.email })
      }
    } catch {
      setSubmitErr('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const progressPct = step === 'email' ? 25 : step === 'otp' ? 50 : step === 'form' ? 75 : 100

  return (
    <div
      className={`modal-bd${closing ? ' modal-bd-out' : ''}`}
      onClick={close}
    >
      <div
        className={`modal-panel${closing ? ' modal-panel-out' : ''}`}
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Register for Telegraph Hackathon"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-hd">
          <div className="modal-hd-left">
            <img src="/Telegraoh-Logo.png" alt="" className="modal-sigma" aria-hidden="true" />
            <div>
              <p className="modal-hd-title">Register</p>
              {step !== 'done' && (
                <p className="modal-hd-sub">{STEP_LABELS[step]}</p>
              )}
            </div>
          </div>
          <button className="modal-x" onClick={close} aria-label="Close">✕</button>
        </div>

        {/* Progress bar */}
        {step !== 'done' && (
          <div className="modal-prog-wrap">
            <div className="modal-prog-track">
              <div className="modal-prog-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="modal-body">

          {/* ── Done ── */}
          {step === 'done' && (
            <div className="modal-done" key="done">
              <img src="/Telegraoh-Logo.png" alt="" className="done-sigma" />
              <p className="done-title">{isReturning ? 'Registration updated.' : "You're registered."}</p>
              <p className="done-sub">
                We'll reach out to <strong>{form.email}</strong> with next steps.<br />
                Build something incredible.
              </p>
              <button className="btn-fill" onClick={close}>Close</button>
            </div>
          )}

          {/* ── Email step ── */}
          {step === 'email' && (
            <div className="modal-fields" key="email">
              <p className="otp-hint">Enter your email and we'll send you a verification code so we can detect spam and keep the hackathon fair.</p>
              <Field label="Email Address" id="r-email" error={emailErr}>
                <input
                  id="r-email"
                  type="email"
                  className={`mi${emailErr ? ' mi-e' : ''}`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                  autoFocus
                />
              </Field>
            </div>
          )}

          {/* ── OTP step ── */}
          {step === 'otp' && (
            <div className="modal-fields" key="otp">
              <p className="otp-hint">
                We sent a 6-digit code to <strong>{email}</strong>. Enter it below.
              </p>
              <div className="otp-spam-notice">
                <span>📬</span>
                <span>Can't find it? Check your <strong>spam or junk</strong> folder — it may have been filtered.</span>
              </div>
              <div className="otp-boxes">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => { otpRefs.current[i] = el }}
                    className={`otp-box${otpErr ? ' otp-box-err' : ''}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpInput(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    onPaste={i === 0 ? e => {
                      e.preventDefault()
                      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
                      const next = [...otp]
                      pasted.split('').forEach((c, j) => { if (j < 6) next[j] = c })
                      setOtp(next)
                      otpRefs.current[Math.min(pasted.length, 5)]?.focus()
                    } : undefined}
                  />
                ))}
              </div>
              {otpErr && <p className="mf-err" style={{ textAlign: 'center' }}>{otpErr}</p>}
              <p className="otp-resend">
                Didn't receive it?{' '}
                <button
                  className="otp-resend-btn"
                  onClick={() => handleSendOtp(email)}
                  disabled={sending}
                >
                  {sending ? 'Sending…' : 'Resend code'}
                </button>
              </p>
            </div>
          )}

          {/* ── Form step ── */}
          {step === 'form' && (
            <div className="modal-fields" key="form">

              {isReturning && (
                <div className="reg-returning-banner">
                  <span className="reg-returning-icon">✓</span>
                  Welcome back! Your previous registration has been pre-filled. You can update any details below.
                </div>
              )}

              {fromSeasonOne && (
                <div className="reg-returning-banner">
                  <span className="reg-returning-icon">✓</span>
                  Welcome back from Season I. We've pre-filled your details; pick a track and role for Season II.
                </div>
              )}

              <p className="form-section-label">About You</p>

              <Field label="Full Name" id="r-name" error={errors.name}>
                <input
                  id="r-name"
                  className={`mi${errors.name ? ' mi-e' : ''}`}
                  placeholder="Satoshi Nakamoto"
                  value={form.name}
                  onChange={e => set('name', e.target.value)}
                />
              </Field>

              <Field label="Participating as">
                <div className="radio-row">
                  {(['individual', 'team'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      className={`radio-opt${form.type === t ? ' radio-on' : ''}`}
                      onClick={() => set('type', t)}
                    >
                      <span className="radio-pip" />
                      {t === 'individual' ? 'Individual' : 'Organization / Team'}
                    </button>
                  ))}
                </div>
              </Field>

              {form.type === 'team' && (
                <div className="two-col">
                  <Field label="Organization / Team Name" id="r-org" error={errors.orgName}>
                    <input
                      id="r-org"
                      className={`mi${errors.orgName ? ' mi-e' : ''}`}
                      placeholder="Acme Labs"
                      value={form.orgName}
                      onChange={e => set('orgName', e.target.value)}
                    />
                  </Field>
                  <Field label="Number of Developers">
                    <div className="chip-row">
                      {TEAM_SIZES.map(s => (
                        <button
                          key={s}
                          type="button"
                          className={`sm-chip${form.teamSize === s ? ' sm-chip-on' : ''}`}
                          onClick={() => set('teamSize', s)}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              )}

              <div className="two-col">
                <Field label="EVM Wallet Address" id="r-wallet" optional>
                  <input
                    id="r-wallet"
                    className="mi"
                    placeholder="0x…"
                    value={form.wallet}
                    onChange={e => set('wallet', e.target.value)}
                  />
                </Field>
                <Field label="X / Twitter" id="r-twitter" optional>
                  <input
                    id="r-twitter"
                    className="mi"
                    placeholder="@handle"
                    value={form.twitter}
                    onChange={e => set('twitter', e.target.value)}
                  />
                </Field>
              </div>

              <Field label="Discord Handle" id="r-discord" error={errors.discord}>
                <input
                  id="r-discord"
                  className={`mi${errors.discord ? ' mi-e' : ''}`}
                  placeholder="username"
                  value={form.discord}
                  onChange={e => set('discord', e.target.value)}
                />
              </Field>


              <p className="form-section-label" style={{ marginTop: '24px' }}>Season II</p>

              <Field
                label="Track"
                id="r-track"
                hint="Your best guess is fine. Teams confirm their track and use case in week one."
              >
                <select
                  id="r-track"
                  className="mi"
                  value={form.track}
                  onChange={e => setForm(f => ({ ...f, track: e.target.value, buyer: '' }))}
                >
                  <option value="">Not decided yet</option>
                  {TRACKS.map(t => <option key={t.slug} value={t.slug}>{pad2(t.n)} {t.name}</option>)}
                </select>
              </Field>

              {trackBuyers.length > 1 && (
                <Field label="Buyer" id="r-buyer" optional hint="Which buyer in this track you plan to build for.">
                  <select id="r-buyer" className="mi" value={form.buyer} onChange={e => set('buyer', e.target.value)}>
                    <option value="">Not decided yet</option>
                    {trackBuyers.map(b => <option key={b.generic} value={buyerLabel(b)}>{buyerLabel(b)}</option>)}
                  </select>
                </Field>
              )}

              <Field label="How you'll take part" error={errors.roles} hint="Pick all that apply.">
                <div className="subnet-grid">
                  {ROLE_OPTS.map(r => (
                    <button
                      key={r.v}
                      type="button"
                      title={r.hint}
                      className={`subnet-chip${form.roles.includes(r.v) ? ' subnet-on' : ''}`}
                      onClick={() => toggleRole(r.v)}
                    >
                      <span className="subnet-chk">{form.roles.includes(r.v) ? '✓' : ''}</span>
                      {r.v}
                    </button>
                  ))}
                </div>
              </Field>

              <Field
                label="Project Name"
                id="r-pname"
                optional
                hint="Working title. You can change it later."
              >
                <input
                  id="r-pname"
                  className="mi"
                  placeholder="e.g. ListingDesk, CurtailBot"
                  value={form.projectName}
                  onChange={e => set('projectName', e.target.value)}
                />
              </Field>

              <Field
                label="Project Description"
                id="r-desc"
                optional
                error={errors.projectDesc}
                hint="What you're building, who would buy it, and which intelligence it buys through Telegraph. 2–3 sentences is enough."
              >
                <textarea
                  id="r-desc"
                  className={`mi mi-ta${errors.projectDesc ? ' mi-e' : ''}`}
                  placeholder="e.g. An exchange listings agent that buys contract audit, sanctions and holder-concentration answers in parallel and returns a signed risk memo with a cost line."
                  rows={4}
                  value={form.projectDesc}
                  onChange={e => set('projectDesc', e.target.value)}
                />
              </Field>

              <Field
                label="Tech Stack"
                id="r-stack"
                optional
                hint="Languages, frameworks, or tools you plan to use. Helps us tailor support during the hackathon."
              >
                <input
                  id="r-stack"
                  className="mi"
                  placeholder="e.g. Python, Next.js, Solidity, Hardhat, FastAPI"
                  value={form.techStack}
                  onChange={e => set('techStack', e.target.value)}
                />
              </Field>

              <Field
                label="GitHub Repo"
                id="r-github"
                optional
                hint="Link to your project's repository. Doesn't need to be public or final yet — you can add or update it later."
              >
                <input
                  id="r-github"
                  className="mi"
                  placeholder="https://github.com/you/project"
                  value={form.github}
                  onChange={e => set('github', e.target.value)}
                />
              </Field>

            </div>
          )}
        </div>

        {/* Footer */}
        {step !== 'done' && (
          <div className="modal-ft" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '10px' }}>
            {submitErr && <p className="mf-err" style={{ textAlign: 'center' }}>{submitErr}</p>}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {step === 'otp'
                ? <button className="modal-back" onClick={() => setStep('email')}>← Back</button>
                : step === 'form'
                ? <button className="modal-back" onClick={() => setStep('otp')}>← Back</button>
                : <span />
              }
              {step === 'email' && (
                <button className="btn-register" onClick={() => handleSendOtp()} disabled={sending}>
                  {sending ? 'Sending…' : 'Send Code →'}
                </button>
              )}
              {step === 'otp' && (
                <button className="btn-register" onClick={handleVerify} disabled={verifying}>
                  {verifying ? 'Verifying…' : 'Verify →'}
                </button>
              )}
              {step === 'form' && (
                <button className="btn-register" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? 'Submitting…' : isReturning ? 'Update Registration' : 'Submit Registration'}
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
