// One-off: adds manually-collected registrants to the sheet and sends them
// the confirmation email (same template as the live /api/register route).
//
// Usage:
//   node --env-file=.env.local scripts/add-manual-registrants.mjs --dry-run
//   node --env-file=.env.local scripts/add-manual-registrants.mjs

import dns from 'node:dns'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'

dns.setServers(['8.8.8.8', '1.1.1.1'])

const DRY_RUN = process.argv.includes('--dry-run')
const SHEET_ID = process.env.GOOGLE_SHEET_ID
const SHEET_TAB = 'Sheet1'
const EVENT_DATE = new Date('2026-08-17T00:00:00Z')

const HEADERS = [
  'Timestamp', 'Name', 'Email', 'Type', 'Org / Team Name', 'Team Size',
  'Wallet', 'Twitter', 'Discord', 'Level',
  'Project Name', 'Miners', 'Project Description', 'Tech Stack',
]

const REGISTRANTS = [
  { name: "Rafa'ei Tahir", email: 'rafaeitahir@hotmail.com', orgName: 'Founder. Flow.', twitter: 'https://x.com/knalewind' },
  { name: 'Jili', email: '9wuwei9@gmail.com', twitter: 'https://x.com/Bigvguyw' },
  { name: '', email: 'ulwan@live.com' },
]

function daysUntilEvent() {
  const msPerDay = 24 * 60 * 60 * 1000
  return Math.ceil((EVENT_DATE.getTime() - Date.now()) / msPerDay)
}

function buildConfirmationEmailHtml(name, days) {
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

async function getSheets() {
  const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
  const auth = await new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  }).getClient()
  return { auth, sheets: google.sheets({ version: 'v4' }) }
}

async function findRowByEmail(sheets, auth, email) {
  const res = await sheets.spreadsheets.values.get({
    auth, spreadsheetId: SHEET_ID, range: `${SHEET_TAB}!A:N`,
  })
  const rows = res.data.values ?? []
  for (let i = 1; i < rows.length; i++) {
    if ((rows[i][2] ?? '').toLowerCase() === email.toLowerCase()) {
      return { rowIndex: i + 1, row: rows[i] }
    }
  }
  return null
}

async function main() {
  if (!SHEET_ID) throw new Error('GOOGLE_SHEET_ID is not set')
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not set')

  const { auth, sheets } = await getSheets()
  const days = daysUntilEvent()

  const headerRes = await sheets.spreadsheets.values.get({
    auth, spreadsheetId: SHEET_ID, range: `${SHEET_TAB}!A1:N1`,
  })
  const firstRow = headerRes.data.values?.[0]
  if (!firstRow || firstRow[0] !== 'Timestamp') {
    if (!DRY_RUN) {
      await sheets.spreadsheets.values.update({
        auth, spreadsheetId: SHEET_ID, range: `${SHEET_TAB}!A1`,
        valueInputOption: 'RAW', requestBody: { values: [HEADERS] },
      })
    }
    console.log(`${DRY_RUN ? '[dry-run] would add' : 'Added'} header row`)
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.office365.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: { user: process.env.OUTLOOK_USER, pass: process.env.OUTLOOK_PASS },
    tls: { ciphers: 'SSLv3' },
  })

  for (const r of REGISTRANTS) {
    const existing = await findRowByEmail(sheets, auth, r.email)
    if (existing) {
      console.log(`Skipping add (already in sheet): ${r.email} (row ${existing.rowIndex}) -- will still send confirmation email`)
    } else {
      const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'UTC' }) + ' UTC'
      const row = [
        timestamp, r.name || '', r.email, 'Individual',
        r.orgName || '', '', '', r.twitter || '', '', '',
        '', '', '', '',
      ]
      if (DRY_RUN) {
        console.log(`[dry-run] would append row: ${JSON.stringify(row)}`)
      } else {
        await sheets.spreadsheets.values.append({
          auth, spreadsheetId: SHEET_ID, range: `${SHEET_TAB}!A1`,
          valueInputOption: 'RAW', insertDataOption: 'INSERT_ROWS',
          requestBody: { values: [row] },
        })
        console.log(`Added row for ${r.email}`)
      }
    }

    if (DRY_RUN) {
      console.log(`[dry-run] would email ${r.name || '(no name)'} <${r.email}>`)
      continue
    }
    try {
      await transporter.sendMail({
        from: `"Telegraph Hackathon" <${process.env.OUTLOOK_USER}>`,
        to: r.email,
        subject: `You're in! Telegraph Hackathon starts in ${days} day${days === 1 ? '' : 's'}`,
        html: buildConfirmationEmailHtml(r.name, days),
      })
      console.log(`Sent confirmation email to ${r.email}`)
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
