// Sends a "here are our links" email (Main Site, Alexandria, Docs, Discord)
// to everyone in the registration sheet who hasn't been emailed yet, and
// stamps column Q (Links Email Sent At) so re-running the script only
// reaches new registrants.
//
// Usage:
//   node --env-file=.env.local scripts/send-links-emails.mjs --dry-run
//   node --env-file=.env.local scripts/send-links-emails.mjs
//   node --env-file=.env.local scripts/send-links-emails.mjs --to=someone@example.com   (test send, ignores/does not touch tracking column)

import dns from 'node:dns'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'

// Fall back to public DNS resolvers -- some local/router resolvers flake out
// on smtp.office365.com even though the domain is fine.
dns.setServers(['8.8.8.8', '1.1.1.1'])

const DRY_RUN = process.argv.includes('--dry-run')
const TO_ARG = process.argv.find((a) => a.startsWith('--to='))
const TEST_EMAIL = TO_ARG ? TO_ARG.slice('--to='.length).trim().toLowerCase() : null
const EVENT_DATE = new Date('2026-08-17T00:00:00Z')
const SHEET_ID = process.env.GOOGLE_SHEET_ID
const SHEET_TAB = 'Sheet1'
const TRACKING_COL = 'Q' // "Links Email Sent At" -- O is "GitHub", P is "Reminder Sent At"
const TRACKING_HEADER = 'Links Email Sent At'
const SEND_DELAY_MS = 1000 // stay well under SMTP rate limits

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

function getAuth() {
  const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
  return new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

async function getSheets() {
  const auth = await getAuth().getClient()
  const sheets = google.sheets({ version: 'v4' })
  return { auth, sheets }
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

async function main() {
  if (!SHEET_ID) throw new Error('GOOGLE_SHEET_ID is not set')
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not set')

  const { auth, sheets } = await getSheets()

  const res = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: SHEET_ID,
    range: `${SHEET_TAB}!A:Q`,
  })
  const rows = res.data.values ?? []
  if (rows.length < 2) {
    console.log('No registrants found.')
    return
  }

  const days = daysUntilEvent()

  const uniqueValidEmails = new Set()
  for (let i = 1; i < rows.length; i++) {
    const email = (rows[i][2] ?? '').trim().toLowerCase()
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) uniqueValidEmails.add(email)
  }
  const registrantCount = Math.floor(uniqueValidEmails.size / 50) * 50
  console.log(`Event date: 2026-08-17 · Days remaining: ${days} · Registrants: ${uniqueValidEmails.size} (rounding down to ${registrantCount}+ for copy)`)

  const header = rows[0]
  if (header[16] !== TRACKING_HEADER) {
    if (!DRY_RUN) {
      await sheets.spreadsheets.values.update({
        auth,
        spreadsheetId: SHEET_ID,
        range: `${SHEET_TAB}!Q1`,
        valueInputOption: 'RAW',
        requestBody: { values: [[TRACKING_HEADER]] },
      })
    }
    console.log(`${DRY_RUN ? '[dry-run] would add' : 'Added'} tracking header "${TRACKING_HEADER}" at ${TRACKING_COL}1`)
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.office365.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.OUTLOOK_USER,
      pass: process.env.OUTLOOK_PASS,
    },
    tls: { ciphers: 'SSLv3' },
  })

  const seen = new Set()
  let sent = 0
  let skippedAlreadySent = 0
  let skippedInvalid = 0
  let failed = 0

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i]
    const name = row[1] ?? ''
    const email = (row[2] ?? '').trim()
    const alreadySent = (row[16] ?? '').trim()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      skippedInvalid++
      continue
    }
    const emailKey = email.toLowerCase()

    if (TEST_EMAIL) {
      if (emailKey !== TEST_EMAIL) continue
    } else {
      if (seen.has(emailKey)) continue
      seen.add(emailKey)

      if (alreadySent) {
        skippedAlreadySent++
        continue
      }
    }

    const rowNumber = i + 1
    if (DRY_RUN) {
      console.log(`[dry-run] would email ${name} <${email}> (row ${rowNumber})`)
      sent++
      if (TEST_EMAIL) break
      continue
    }

    try {
      await transporter.sendMail({
        from: `"Telegraph Hackathon" <${process.env.OUTLOOK_USER}>`,
        to: email,
        subject: `⏳ ${days} Days: Discord Invite + Rules & Docs (Telegraph Hackathon)`,
        html: buildEmailHtml(name, days, registrantCount),
      })

      if (!TEST_EMAIL) {
        await sheets.spreadsheets.values.update({
          auth,
          spreadsheetId: SHEET_ID,
          range: `${SHEET_TAB}!${TRACKING_COL}${rowNumber}`,
          valueInputOption: 'RAW',
          requestBody: { values: [[new Date().toISOString()]] },
        })
      }

      console.log(`Sent to ${email} (row ${rowNumber})${TEST_EMAIL ? ' [test send, tracking column NOT updated]' : ''}`)
      sent++
    } catch (err) {
      console.error(`Failed to email ${email} (row ${rowNumber}):`, err.message)
      failed++
    }

    if (TEST_EMAIL) break
    await new Promise((r) => setTimeout(r, SEND_DELAY_MS))
  }

  if (TEST_EMAIL && sent === 0 && failed === 0) {
    console.log(`No row found in the sheet with email ${TEST_EMAIL}`)
  }

  console.log('\n--- Summary ---')
  console.log(`Sent:            ${sent}${DRY_RUN ? ' (dry-run)' : ''}`)
  console.log(`Already sent:    ${skippedAlreadySent}`)
  console.log(`Invalid/skipped: ${skippedInvalid}`)
  console.log(`Failed:          ${failed}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
