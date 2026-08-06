// Sends a "you're registered, get ready" reminder email to everyone in the
// registration sheet who hasn't been emailed yet, and stamps column O
// (Reminder Sent At) so re-running the script only reaches new registrants.
//
// Usage:
//   node --env-file=.env.local scripts/send-reminder-emails.mjs --dry-run
//   node --env-file=.env.local scripts/send-reminder-emails.mjs
//   node --env-file=.env.local scripts/send-reminder-emails.mjs --to=someone@example.com   (test send, ignores/does not touch tracking column)

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
const TRACKING_COL = 'P' // "Reminder Sent At" -- column O is already used for "GitHub"
const TRACKING_HEADER = 'Reminder Sent At'
const SEND_DELAY_MS = 1000 // stay well under SMTP rate limits

function daysUntilEvent() {
  const now = new Date()
  const msPerDay = 24 * 60 * 60 * 1000
  return Math.ceil((EVENT_DATE.getTime() - now.getTime()) / msPerDay)
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

function buildEmailHtml(name, days) {
  const dayLabel = days === 1 ? '1 day' : `${days} days`
  const firstName = (name || '').trim().split(/\s+/)[0] || 'there'
  return `
    <div style="font-family:monospace;background:#000;color:#fff;padding:40px;max-width:480px;margin:0 auto;">
      <p style="color:rgba(251,191,36,0.9);font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 24px;">
        Telegraph · Hackathon
      </p>
      <p style="font-size:15px;margin:0 0 16px;color:rgba(255,255,255,0.85);">
        Hey ${firstName},
      </p>
      <p style="font-size:15px;margin:0 0 24px;color:rgba(255,255,255,0.8);">
        You're confirmed for the Telegraph Hackathon. Get ready &mdash; we start in
      </p>
      <p style="font-size:40px;font-weight:700;letter-spacing:0.05em;color:#fbbf24;margin:0 0 24px;">
        ${dayLabel}
      </p>
      <p style="font-size:15px;margin:0 0 32px;color:rgba(255,255,255,0.8);">
        Kickoff: <strong>August 17</strong>. Keep an eye on your inbox for further details.
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

  const days = daysUntilEvent()
  console.log(`Event date: 2026-08-17 · Days remaining: ${days}`)

  const { auth, sheets } = await getSheets()

  const res = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: SHEET_ID,
    range: `${SHEET_TAB}!A:P`,
  })
  const rows = res.data.values ?? []
  if (rows.length < 2) {
    console.log('No registrants found.')
    return
  }

  const header = rows[0]
  if (header[15] !== TRACKING_HEADER) {
    if (!DRY_RUN) {
      await sheets.spreadsheets.values.update({
        auth,
        spreadsheetId: SHEET_ID,
        range: `${SHEET_TAB}!P1`,
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
    const alreadySent = (row[15] ?? '').trim()

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
        subject: `You're in! Telegraph Hackathon starts in ${days} day${days === 1 ? '' : 's'}`,
        html: buildEmailHtml(name, days),
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
