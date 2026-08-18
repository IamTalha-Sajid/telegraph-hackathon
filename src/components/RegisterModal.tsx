'use client'
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'

declare global {
  interface Window { twq?: (...args: unknown[]) => void }
}

interface Props { onClose: () => void }

type ParticipantType = 'individual' | 'team'
type Level           = 'beginner' | 'intermediate' | 'advanced'
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
  level:       Level
  projectName: string
  projectDesc: string
  subnets:     string[]
  techStack:   string
  github:      string
}

type Errors = Partial<Record<keyof FormData, string>>

const EMPTY: FormData = {
  name: '', email: '', type: 'individual', orgName: '', teamSize: '2 – 5',
  wallet: '', twitter: '', discord: '', level: 'intermediate',
  projectName: '', projectDesc: '', subnets: [], techStack: '', github: '',
}

const MINERS     = [
  'Financial Data', 'Weather & Climate', 'Social Sentiment',
  'On-chain Analytics', 'AI / LLM Inference', 'Sports & Events',
  'News & Media', 'Custom / Other',
]
const TEAM_SIZES = ['2 – 5', '6 – 10', '11 – 20', '20+']
const LEVELS: { v: Level; label: string }[] = [
  { v: 'beginner',     label: 'Beginner'     },
  { v: 'intermediate', label: 'Intermediate' },
  { v: 'advanced',     label: 'Advanced'     },
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

export default function RegisterModal({ onClose }: Props) {
  const [step,          setStep]          = useState<Step>('email')
  const [email,         setEmail]         = useState('')
  const [emailErr,      setEmailErr]      = useState('')
  const [sending,       setSending]       = useState(false)
  const [token,         setToken]         = useState('')
  const [otp,           setOtp]           = useState(['', '', '', '', '', ''])
  const [otpErr,        setOtpErr]        = useState('')
  const [verifying,     setVerifying]     = useState(false)
  const [isReturning,   setIsReturning]   = useState(false)
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

  const toggleMiner = useCallback((s: string) =>
    setForm(f => ({
      ...f,
      subnets: f.subnets.includes(s)
        ? f.subnets.filter(x => x !== s)
        : [...f.subnets, s],
    })), [])

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
        setForm({ ...EMPTY, ...data.existing })
        setIsReturning(true)
      } else {
        setForm({ ...EMPTY, email: data.email })
        setIsReturning(false)
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
    if (!form.projectName.trim()) e.projectName = 'Required'
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

              <Field label="Experience Level">
                <div className="radio-row">
                  {LEVELS.map(({ v, label }) => (
                    <button
                      key={v}
                      type="button"
                      className={`radio-opt${form.level === v ? ' radio-on' : ''}`}
                      onClick={() => set('level', v)}
                    >
                      <span className="radio-pip" />
                      {label}
                    </button>
                  ))}
                </div>
              </Field>

              <div className="two-col">
                <Field label="Base Wallet Address" id="r-wallet" optional>
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


              <p className="form-section-label" style={{ marginTop: '24px' }}>Your Project</p>

              <Field
                label="Project Name"
                id="r-pname"
                error={errors.projectName}
                hint="What's your project called? It doesn't have to be final — you can change it later."
              >
                <input
                  id="r-pname"
                  className={`mi${errors.projectName ? ' mi-e' : ''}`}
                  placeholder="e.g. AlphaSignal, WeatherOracle, TruthNet"
                  value={form.projectName}
                  onChange={e => set('projectName', e.target.value)}
                />
              </Field>

              <Field
                label="Miners you plan to use"
                optional
                hint="Miners are Telegraph's data providers — each one serves a different type of verified data feed. Select the ones relevant to your project. Not sure yet? Pick your best guess."
              >
                <div className="subnet-grid">
                  {MINERS.map(s => (
                    <button
                      key={s}
                      type="button"
                      className={`subnet-chip${form.subnets.includes(s) ? ' subnet-on' : ''}`}
                      onClick={() => toggleMiner(s)}
                    >
                      <span className="subnet-chk">{form.subnets.includes(s) ? '✓' : ''}</span>
                      {s}
                    </button>
                  ))}
                </div>
              </Field>

              <Field
                label="Project Description"
                id="r-desc"
                optional
                error={errors.projectDesc}
                hint="Briefly describe what you're building and how it uses Telegraph's verified data. 2–3 sentences is enough."
              >
                <textarea
                  id="r-desc"
                  className={`mi mi-ta${errors.projectDesc ? ' mi-e' : ''}`}
                  placeholder="e.g. A trading bot that pulls verified price feeds from Telegraph miners and only executes when signal confidence exceeds 95%. Built with Python and deployed on Base."
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
