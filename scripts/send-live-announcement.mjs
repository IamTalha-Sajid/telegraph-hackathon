// Sends the "Start building on Telegraph today — ranking is live" announcement
// to everyone in the registration sheet who hasn't been emailed this campaign yet,
// and stamps column R (Live Announcement Sent At) so re-running only reaches new people.
//
// Usage:
//   node --env-file=.env.local scripts/send-live-announcement.mjs --dry-run
//   node --env-file=.env.local scripts/send-live-announcement.mjs
//   node --env-file=.env.local scripts/send-live-announcement.mjs --to=someone@example.com   (test send, ignores/does not touch tracking column)

import dns from 'node:dns'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'

dns.setServers(['8.8.8.8', '1.1.1.1'])

const DRY_RUN = process.argv.includes('--dry-run')
const TO_ARG = process.argv.find((a) => a.startsWith('--to='))
const TEST_EMAIL = TO_ARG ? TO_ARG.slice('--to='.length).trim().toLowerCase() : null
const SHEET_ID = process.env.GOOGLE_SHEET_ID
const SHEET_TAB = 'Sheet1'
const TRACKING_COL = 'R' // "Live Announcement Sent At" -- Q is "Links Email Sent At"
const TRACKING_HEADER = 'Live Announcement Sent At'
const SEND_DELAY_MS = 1000

const DOCS_URL = 'https://docs.telegraphprotocol.com/'
const HACKATHON_URL = 'https://hackathon.telegraphprotocol.com/'
const DISCORD_URL = 'https://discord.com/invite/telegraphprotocol'
const INTENTS_URL = 'https://hackathon.telegraphprotocol.com/supported-intents'
const BUILD_LINKS = [
  { label: 'Supported Intents', desc: 'The finalized list of every intent you can build a Miner or Application for', url: INTENTS_URL },
  { label: 'Rules & Judging Criteria', desc: 'Tracks, scoring, and submission requirements', url: 'https://hackathon.telegraphprotocol.com/rules' },
  { label: 'API Reference Docs', desc: 'Build reference and API docs', url: 'https://docs.telegraphprotocol.com' },
  { label: 'Boilerplate Repo', desc: 'Fork this to get your setup running fast', url: 'https://github.com/telegraphprotocol/telegraph-usecases' },
  { label: 'Whitepaper', desc: 'Protocol design and mechanics', url: 'https://telegraphprotocol.com/Whitepapers%20-%20Telegraph%20Protocol.pdf' },
]
const MORE_LINKS = [
  { label: 'Main Site', url: 'https://telegraphprotocol.com' },
  { label: 'Alexandria', url: 'https://alexandria.telegraphprotocol.com' },
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
        Telegraph &middot; Hackathon
      </p>

      <p style="font-size:15px;margin:0 0 16px;color:rgba(255,255,255,0.85);">
        Hey ${firstName},
      </p>

      <p style="font-size:15px;margin:0 0 20px;color:rgba(255,255,255,0.8);line-height:1.6;">
        Everything is ready. You can start building on Telegraph right now.
      </p>
      <p style="font-size:15px;margin:0 0 28px;color:rgba(255,255,255,0.8);line-height:1.6;">
        Docs, ranking, miner registration, and the core flows are live. Intents are finalized. No more waiting.
      </p>

      <p style="font-size:13px;font-weight:700;color:#fff;margin:0 0 14px;letter-spacing:0.02em;">
        Tracks
      </p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">
        <tr>
          <td style="padding:0 0 12px;">
            <table style="width:100%;border-collapse:collapse;border:1px solid rgba(251,191,36,0.25);border-radius:8px;">
              <tr>
                <td style="padding:16px 18px;">
                  <p style="font-size:14px;font-weight:700;color:#fff;margin:0 0 4px;">Track 1 &mdash; Miners</p>
                  <p style="font-size:12px;color:rgba(255,255,255,0.5);margin:0;">Put your model on the network and compete on the live leaderboard.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 0 12px;">
            <table style="width:100%;border-collapse:collapse;border:1px solid rgba(251,191,36,0.25);border-radius:8px;">
              <tr>
                <td style="padding:16px 18px;">
                  <p style="font-size:14px;font-weight:700;color:#fff;margin:0 0 4px;">Track 2 &mdash; Evaluation Scripts</p>
                  <p style="font-size:12px;color:rgba(255,255,255,0.5);margin:0;">Write the scripts that score miners against real ground truth.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0;">
            <table style="width:100%;border-collapse:collapse;border:1px solid rgba(251,191,36,0.25);border-radius:8px;">
              <tr>
                <td style="padding:16px 18px;">
                  <p style="font-size:14px;font-weight:700;color:#fff;margin:0 0 4px;">Track 3 &mdash; Applications</p>
                  <p style="font-size:12px;color:rgba(255,255,255,0.5);margin:0;">Build products on top of the intelligence (opens after Track 1 &amp; 2).</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <p style="font-size:15px;margin:0 0 8px;color:rgba(255,255,255,0.8);line-height:1.6;">
        Tracks 1 &amp; 2 run until <strong style="color:#fbbf24;">31 August</strong>.
      </p>
      <p style="font-size:15px;margin:0 0 28px;color:rgba(255,255,255,0.8);line-height:1.6;">
        There is a USDC prize pool for top performers in these tracks. After that we move to mainnet rewards with Machina.
      </p>

      <p style="font-size:13px;font-weight:700;color:#fff;margin:0 0 14px;letter-spacing:0.02em;">
        Why starting today matters
      </p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 28px;">
        <tr><td style="padding:0 0 10px;font-size:13px;color:rgba(255,255,255,0.6);line-height:1.55;">&bull;&nbsp; Ranking is already live. Every day you wait is a day someone else is climbing the leaderboard.</td></tr>
        <tr><td style="padding:0 0 10px;font-size:13px;color:rgba(255,255,255,0.6);line-height:1.55;">&bull;&nbsp; Early models and scripts get real usage and visibility first.</td></tr>
        <tr><td style="padding:0 0 10px;font-size:13px;color:rgba(255,255,255,0.6);line-height:1.55;">&bull;&nbsp; 1000+ people registered. Most of them are still sitting. The ones who ship this week will have a clear head start.</td></tr>
        <tr><td style="padding:0;font-size:13px;color:rgba(255,255,255,0.6);line-height:1.55;">&bull;&nbsp; Good miners will get demand from people building applications in Track 3. First useful ones win attention.</td></tr>
      </table>

      <p style="font-size:13px;font-weight:700;color:#fff;margin:0 0 14px;letter-spacing:0.02em;">
        How to start
      </p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 12px;">
        <tr><td style="padding:0 0 8px;font-size:13px;color:rgba(255,255,255,0.6);line-height:1.55;">1.&nbsp; Go through the docs &rarr; <a href="${DOCS_URL}" style="color:#fbbf24;text-decoration:none;">docs.telegraphprotocol.com</a></td></tr>
        <tr><td style="padding:0 0 8px;font-size:13px;color:rgba(255,255,255,0.6);line-height:1.55;">2.&nbsp; Check the <a href="${INTENTS_URL}" style="color:#fbbf24;text-decoration:none;">finalized intents</a></td></tr>
        <tr><td style="padding:0 0 8px;font-size:13px;color:rgba(255,255,255,0.6);line-height:1.55;">3.&nbsp; Register your miner or start writing an evaluation script</td></tr>
        <tr><td style="padding:0;font-size:13px;color:rgba(255,255,255,0.6);line-height:1.55;">4.&nbsp; Use the examples if you need a reference</td></tr>
      </table>

      <table style="width:100%;border-collapse:collapse;margin:8px 0 12px;">
        <tr>
          <td style="background:#fbbf24;border-radius:8px;text-align:center;">
            <a href="${HACKATHON_URL}" style="display:block;padding:16px;font-size:14px;font-weight:700;color:#000;text-decoration:none;letter-spacing:0.02em;">
              Go to the Hackathon Site &rarr;
            </a>
          </td>
        </tr>
      </table>
      <table style="width:100%;border-collapse:collapse;margin:0 0 28px;">
        <tr>
          <td style="border:1px solid rgba(251,191,36,0.35);border-radius:8px;text-align:center;">
            <a href="${DISCORD_URL}" style="display:block;padding:16px;font-size:14px;font-weight:700;color:#fbbf24;text-decoration:none;letter-spacing:0.02em;">
              Join the Telegraph Discord &rarr;
            </a>
          </td>
        </tr>
      </table>

      <p style="font-size:13px;font-weight:700;color:#fff;margin:0 0 4px;letter-spacing:0.02em;">
        Everything Else You Need
      </p>
      <p style="font-size:13px;margin:0 0 14px;color:rgba(255,255,255,0.55);line-height:1.5;">
        Rules, docs, boilerplate, and the whitepaper, all in one place.
      </p>
      <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">
        ${buildLinkCards}
      </table>

      <p style="font-size:13px;margin:0 0 8px;color:rgba(255,255,255,0.6);line-height:1.6;">
        If you get stuck, message us on <a href="${DISCORD_URL}" style="color:#fbbf24;text-decoration:none;">Discord</a>. We're supporting early builders directly.
      </p>
      <p style="font-size:15px;margin:0 0 32px;color:rgba(255,255,255,0.8);line-height:1.6;">
        The people who ship this week will be the ones others build on top of. Don't wait.
      </p>

      <p style="font-size:14px;margin:0 0 2px;color:rgba(255,255,255,0.85);">
        Ahmed
      </p>
      <p style="font-size:12px;margin:0 0 24px;color:rgba(255,255,255,0.4);">
        Co-Founder &amp; CTO, Telegraph Protocol
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
    range: `${SHEET_TAB}!A:R`,
  })
  const rows = res.data.values ?? []
  if (rows.length < 2) {
    console.log('No registrants found.')
    return
  }

  const header = rows[0]
  if (header[17] !== TRACKING_HEADER) {
    if (!DRY_RUN) {
      await sheets.spreadsheets.values.update({
        auth,
        spreadsheetId: SHEET_ID,
        range: `${SHEET_TAB}!R1`,
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
    const alreadySent = (row[17] ?? '').trim()

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
        subject: 'Start building on Telegraph today — ranking is live',
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
