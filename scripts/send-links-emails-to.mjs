// One-off: sends the "links" email (Discord + rules/docs/boilerplate) to a
// fixed list of addresses, without touching the sheet's tracking column.
//
// Usage:
//   node --env-file=.env.local scripts/send-links-emails-to.mjs --dry-run
//   node --env-file=.env.local scripts/send-links-emails-to.mjs

import dns from 'node:dns'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'

dns.setServers(['8.8.8.8', '1.1.1.1'])

const DRY_RUN = process.argv.includes('--dry-run')
const SHEET_ID = process.env.GOOGLE_SHEET_ID
const SHEET_TAB = 'Sheet1'
const EVENT_DATE = new Date('2026-08-17T00:00:00Z')

const RECIPIENTS = [
  { name: "Rafa'ei Tahir", email: 'rafaeitahir@hotmail.com' },
  { name: 'Jili', email: '9wuwei9@gmail.com' },
  { name: '', email: 'ulwan@live.com' },
]

const DISCORD_URL = 'https://discord.com/invite/telegraphprotocol'
const BUILD_LINKS = [
  { label: 'Rules & Judging Criteria', desc: 'Tracks, scoring, and submission requirements', url: 'https://hackathon.telegraphprotocol.com/rules' },
  { label: 'API Reference Docs', desc: 'Build reference and API docs', url: 'https://docs.telegraphprotocol.com' },
  { label: 'Boilerplate Repo', desc: 'Fork this to get your setup running fast', url: 'https://github.com/telegraphprotocol/telegraph-usecases' },
  { label: 'Whitepaper', desc: 'Protocol design and mechanics', url: 'https://telegraphprotocol.com/Whitepapers%20-%20Telegraph%20Protocol.pdf' },
]
const MORE_LINKS = [
  { label: 'Main Site', url: 'https://telegraphprotocol.com' },
  { label: 'Alexandria', url: 'https://alexandria.telegraphprotocol.com' },
]

function daysUntilEvent() {
  const msPerDay = 24 * 60 * 60 * 1000
  return Math.ceil((EVENT_DATE.getTime() - Date.now()) / msPerDay)
}

function buildEmailHtml(name, days, registrantCount) {
  const firstName = (name || '').trim().split(/\s+/)[0] || 'there'
  const dayLabel = days === 1 ? '1 Day' : `${days} Days`

  const buildLinkCards = BUILD_LINKS.map(
    ({ label, desc, url }) => `
      <tr>
        <td style="padding:0 0 12px;">
          <table style="width:100%;border-collapse:collapse;border:1px solid rgba(251,191,36,0.25);border-radius:8px;">
            <tr>
              <td style="padding:16px 18px;">
                <p style="font-size:14px;font-weight:700;color:#fff;margin:0 0 4px;">
                  ${label}
                </p>
                <p style="font-size:12px;color:rgba(255,255,255,0.5);margin:0 0 10px;">
                  ${desc}
                </p>
                <a href="${url}" style="font-size:13px;color:#fbbf24;text-decoration:none;word-break:break-all;">
                  ${url.replace(/^https?:\/\//, '')} &rarr;
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `
  ).join('')

  const moreLinks = MORE_LINKS.map(
    ({ label, url }) => `
      <a href="${url}" style="font-size:12px;color:rgba(255,255,255,0.55);text-decoration:none;margin-right:20px;">
        ${label} &rarr;
      </a>
    `
  ).join('')

  return `
    <div style="font-family:monospace;background:#000;color:#fff;padding:40px;max-width:480px;margin:0 auto;">
      <p style="color:rgba(251,191,36,0.9);font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 24px;">
        Telegraph · Hackathon
      </p>
      <p style="font-size:15px;margin:0 0 16px;color:rgba(255,255,255,0.85);">
        Hey ${firstName},
      </p>
      <p style="font-size:15px;margin:0 0 20px;color:rgba(255,255,255,0.8);line-height:1.6;">
        We're <strong style="color:#fbbf24;">${dayLabel}</strong> away from August 17th, when Track 1 (Miners) and
        Track 2 (Script Authors) officially open for Season I.
      </p>
      <p style="font-size:15px;margin:0 0 28px;color:rgba(255,255,255,0.8);line-height:1.6;">
        With <strong style="color:#fbbf24;">${registrantCount}+ builders</strong> already registered and
        <strong style="color:#fbbf24;">$15,000</strong> on the line, competition across all three tracks is
        going to be tight. Here's what you need to hit the ground running.
      </p>

      <p style="font-size:13px;font-weight:700;color:#fff;margin:0 0 4px;letter-spacing:0.02em;">
        Join the Developer Discord <span style="color:#fbbf24;">(Crucial)</span>
      </p>
      <p style="font-size:13px;margin:0 0 14px;color:rgba(255,255,255,0.55);line-height:1.5;">
        This is where our core team is hanging out, where task specs drop first, and where you'll get direct
        technical support. If you're not in the Discord, you'll be a step behind when the tracks open.
      </p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 28px;">
        <tr>
          <td style="background:#fbbf24;border-radius:8px;text-align:center;">
            <a href="${DISCORD_URL}" style="display:block;padding:16px;font-size:14px;font-weight:700;color:#000;text-decoration:none;letter-spacing:0.02em;">
              Join the Telegraph Discord &rarr;
            </a>
          </td>
        </tr>
      </table>

      <p style="font-size:13px;font-weight:700;color:#fff;margin:0 0 4px;letter-spacing:0.02em;">
        Rules, Docs &amp; Boilerplate are Live
      </p>
      <p style="font-size:13px;margin:0 0 14px;color:rgba(255,255,255,0.55);line-height:1.5;">
        Don't spend Day 1 figuring out the rules or the architecture &mdash; read up and fork these now.
      </p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">
        ${buildLinkCards}
      </table>

      <p style="font-size:15px;margin:0 0 8px;color:rgba(255,255,255,0.8);line-height:1.6;">
        Get in the Discord, drop an intro in <strong>#hackathon</strong>, and take a look through the docs before kickoff.
      </p>
      <p style="font-size:13px;margin:0 0 28px;color:rgba(255,255,255,0.5);line-height:1.6;">
        We'll send another update in a few days with judging and scoring details.
      </p>

      <p style="font-size:12px;margin:0 0 24px;">
        ${moreLinks}
      </p>

      <p style="font-size:12px;color:rgba(255,255,255,0.35);margin:0;">
        You're receiving this because you registered for the Telegraph Hackathon.
      </p>
    </div>
  `
}

async function getRegistrantCount() {
  const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
  const auth = await new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  }).getClient()
  const sheets = google.sheets({ version: 'v4' })
  const res = await sheets.spreadsheets.values.get({
    auth, spreadsheetId: SHEET_ID, range: `${SHEET_TAB}!C:C`,
  })
  const rows = res.data.values ?? []
  const uniqueValidEmails = new Set()
  for (let i = 1; i < rows.length; i++) {
    const email = (rows[i][0] ?? '').trim().toLowerCase()
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) uniqueValidEmails.add(email)
  }
  return Math.floor(uniqueValidEmails.size / 50) * 50
}

async function main() {
  if (!SHEET_ID) throw new Error('GOOGLE_SHEET_ID is not set')
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not set')

  const days = daysUntilEvent()
  const registrantCount = await getRegistrantCount()
  console.log(`Days remaining: ${days} · Registrant count for copy: ${registrantCount}+`)

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.office365.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: { user: process.env.OUTLOOK_USER, pass: process.env.OUTLOOK_PASS },
    tls: { ciphers: 'SSLv3' },
  })

  for (const r of RECIPIENTS) {
    if (DRY_RUN) {
      console.log(`[dry-run] would email ${r.name || '(no name)'} <${r.email}>`)
      continue
    }
    try {
      await transporter.sendMail({
        from: `"Telegraph Hackathon" <${process.env.OUTLOOK_USER}>`,
        to: r.email,
        subject: `⏳ ${days} Days: Discord Invite + Rules & Docs (Telegraph Hackathon)`,
        html: buildEmailHtml(r.name, days, registrantCount),
      })
      console.log(`Sent links email to ${r.email}`)
    } catch (err) {
      console.error(`Failed to email ${r.email}:`, err.message)
    }
    await new Promise((res) => setTimeout(res, 1000))
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
