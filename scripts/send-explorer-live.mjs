// Sends the "Telegraph Explorer is live" email — announces the Explorer
// (registered Miners/Evaluation WASMs, failed Miner registrations with reason, epoch
// details, miner ranking status, leaderboards, signal details) plus the Track 2 Evaluation WASM
// baseline repo. Stamps column T (Explorer Live Sent At) so re-running only
// reaches new people.
//
// Usage:
//   node --env-file=.env.local scripts/send-explorer-live.mjs --dry-run
//   node --env-file=.env.local scripts/send-explorer-live.mjs
//   node --env-file=.env.local scripts/send-explorer-live.mjs --to=someone@example.com   (test send, ignores/does not touch tracking column)

import dns from 'node:dns'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'

dns.setServers(['8.8.8.8', '1.1.1.1'])

const DRY_RUN = process.argv.includes('--dry-run')
const TO_ARG = process.argv.find((a) => a.startsWith('--to='))
const TEST_EMAIL = TO_ARG ? TO_ARG.slice('--to='.length).trim().toLowerCase() : null
const SHEET_ID = process.env.GOOGLE_SHEET_ID
const SHEET_TAB = 'Sheet1'
const TRACKING_COL = 'T' // "Explorer Live Sent At" -- S is "Day 1 Kickoff Sent At"
const TRACKING_HEADER = 'Explorer Live Sent At'
const SEND_DELAY_MS = 1000

const EXPLORER_URL = 'https://explorer.telegraphprotocol.com/'
const WASM_BASELINE_URL = 'https://github.com/telegraphprotocol/telegraph-wasm-baseline'
const DOCS_URL = 'https://docs.telegraphprotocol.com/'
const DISCORD_URL = 'https://discord.com/invite/telegraphprotocol'

const EXPLORER_FEATURES = [
  'Registered Miners/Evaluation WASMs — browse everything submitted to the network',
  'Failed Miner registrations with reason — see exactly why a submission failed',
  'Epoch details — track current and past epochs',
  'Miner ranking status — check whether a given miner is ranked or not',
  'Leaderboard for Miners/Evaluation WASMs — filterable by intent',
  'Signal details — full visibility into all signals on the network',
]

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

function buildEmailHtml(name) {
  const firstName = (name || '').trim().split(/\s+/)[0] || 'there'

  const featureRows = EXPLORER_FEATURES.map(
    (feature) => `
      <tr><td style="padding:0 0 8px;font-size:13px;color:rgba(255,255,255,0.6);line-height:1.55;">&bull;&nbsp; ${feature}</td></tr>
    `
  ).join('')

  return `
    <div style="font-family:monospace;background:#000;color:#fff;padding:40px;max-width:480px;margin:0 auto;">
      <p style="color:rgba(251,191,36,0.9);font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 24px;">
        Telegraph &middot; Hackathon
      </p>

      <p style="font-size:15px;margin:0 0 16px;color:rgba(255,255,255,0.85);">
        Hey ${firstName},
      </p>

      <p style="font-size:15px;margin:0 0 28px;color:rgba(255,255,255,0.8);line-height:1.6;">
        The Telegraph Explorer is live now &mdash; you can inspect everything happening on the network in real time.
      </p>

      <p style="font-size:13px;font-weight:700;color:#fff;margin:0 0 14px;letter-spacing:0.02em;">
        What you can see
      </p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 28px;">
        ${featureRows}
      </table>

      <table style="width:100%;border-collapse:collapse;margin:0 0 28px;">
        <tr>
          <td style="background:#fbbf24;border-radius:8px;text-align:center;">
            <a href="${EXPLORER_URL}" style="display:block;padding:16px;font-size:14px;font-weight:700;color:#000;text-decoration:none;letter-spacing:0.02em;">
              Open the Explorer &rarr;
            </a>
          </td>
        </tr>
      </table>

      <table style="width:100%;border-collapse:collapse;border:1px solid rgba(251,191,36,0.35);border-radius:8px;margin:0 0 28px;">
        <tr>
          <td style="padding:18px 20px;">
            <p style="font-size:14px;font-weight:700;color:#fbbf24;margin:0 0 8px;">
              Track 2: Evaluation WASM baseline repo
            </p>
            <p style="font-size:13px;color:rgba(255,255,255,0.65);line-height:1.6;margin:0 0 16px;">
              We've open-sourced our Evaluation WASM champion &mdash; the reference model used to rank Miners per intent category.
              Fork it, extend it, and beat it.
            </p>
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="background:#fbbf24;border-radius:8px;text-align:center;">
                  <a href="${WASM_BASELINE_URL}" style="display:block;padding:14px;font-size:13px;font-weight:700;color:#000;text-decoration:none;letter-spacing:0.02em;">
                    View the Evaluation WASM Baseline Repo &rarr;
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <p style="font-size:15px;margin:0 0 32px;color:rgba(255,255,255,0.8);line-height:1.6;">
        Use the Explorer to debug your submissions, benchmark against other builders, and keep an eye on your ranking
        as the hackathon progresses. If you get stuck, we're in the Discord all day.
      </p>

      <p style="font-size:14px;margin:0 0 2px;color:rgba(255,255,255,0.85);">
        Ahmed
      </p>
      <p style="font-size:12px;margin:0 0 24px;color:rgba(255,255,255,0.4);">
        Co-Founder &amp; CTO, Telegraph Protocol
      </p>

      <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">
        <tr><td style="padding:0 0 6px;"><a href="${EXPLORER_URL}" style="font-size:12px;color:rgba(255,255,255,0.55);text-decoration:none;">Explorer &rarr;</a></td></tr>
        <tr><td style="padding:0 0 6px;"><a href="${DOCS_URL}" style="font-size:12px;color:rgba(255,255,255,0.55);text-decoration:none;">Docs &rarr;</a></td></tr>
        <tr><td style="padding:0 0 6px;"><a href="${WASM_BASELINE_URL}" style="font-size:12px;color:rgba(255,255,255,0.55);text-decoration:none;">Evaluation WASM &rarr;</a></td></tr>
        <tr><td style="padding:0;"><a href="${DISCORD_URL}" style="font-size:12px;color:rgba(255,255,255,0.55);text-decoration:none;">Discord &rarr;</a></td></tr>
      </table>

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
    range: `${SHEET_TAB}!A:T`,
  })
  const rows = res.data.values ?? []
  if (rows.length < 2) {
    console.log('No registrants found.')
    return
  }

  const header = rows[0]
  if (header[19] !== TRACKING_HEADER) {
    if (!DRY_RUN) {
      await sheets.spreadsheets.values.update({
        auth,
        spreadsheetId: SHEET_ID,
        range: `${SHEET_TAB}!T1`,
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
    const alreadySent = (row[19] ?? '').trim()

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
        subject: 'Telegraph Explorer is live + Track 2 Evaluation WASM baseline repo',
        html: buildEmailHtml(name),
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
