// One-off: stamps column Q (Links Email Sent At) for rows whose links email
// was already sent manually via send-links-emails-to.mjs, so the bulk
// send-links-emails.mjs script skips them.

import { google } from 'googleapis'

const SHEET_ID = process.env.GOOGLE_SHEET_ID
const SHEET_TAB = 'Sheet1'

const EMAILS = [
  'rafaeitahir@hotmail.com',
  '9wuwei9@gmail.com',
  'ulwan@live.com',
]

async function main() {
  if (!SHEET_ID) throw new Error('GOOGLE_SHEET_ID is not set')
  const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
  const auth = await new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  }).getClient()
  const sheets = google.sheets({ version: 'v4' })

  const res = await sheets.spreadsheets.values.get({
    auth, spreadsheetId: SHEET_ID, range: `${SHEET_TAB}!A:Q`,
  })
  const rows = res.data.values ?? []

  for (const email of EMAILS) {
    let found = false
    for (let i = 1; i < rows.length; i++) {
      if ((rows[i][2] ?? '').trim().toLowerCase() === email.toLowerCase()) {
        found = true
        const rowNumber = i + 1
        await sheets.spreadsheets.values.update({
          auth, spreadsheetId: SHEET_ID, range: `${SHEET_TAB}!Q${rowNumber}`,
          valueInputOption: 'RAW', requestBody: { values: [[new Date().toISOString()]] },
        })
        console.log(`Marked row ${rowNumber} (${email}) as sent`)
      }
    }
    if (!found) console.log(`WARNING: no row found for ${email}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
