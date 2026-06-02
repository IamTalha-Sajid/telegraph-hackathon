import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

const SHEET_ID  = process.env.GOOGLE_SHEET_ID!
const SHEET_TAB = 'Sheet1'

const HEADERS = [
  'Timestamp', 'Name', 'Email', 'Type', 'Org / Team Name', 'Team Size',
  'Wallet', 'Twitter', 'Discord', 'Level',
  'Project Name', 'Subnets', 'Project Description', 'Tech Stack', 'GitHub',
]

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON!
  const creds = JSON.parse(raw)
  return new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

async function ensureHeaders(sheets: ReturnType<typeof google.sheets>, auth: Awaited<ReturnType<typeof getAuth>>) {
  const res = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: SHEET_ID,
    range: `${SHEET_TAB}!A1:O1`,
  })
  const firstRow = res.data.values?.[0]
  if (!firstRow || firstRow[0] !== 'Timestamp') {
    await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId: SHEET_ID,
      range: `${SHEET_TAB}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [HEADERS] },
    })
  }
}

async function isDuplicate(sheets: ReturnType<typeof google.sheets>, auth: Awaited<ReturnType<typeof getAuth>>, email: string): Promise<boolean> {
  const res = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: SHEET_ID,
    range: `${SHEET_TAB}!C:C`,
  })
  const emails = (res.data.values ?? []).flat().map(e => e.toLowerCase())
  return emails.includes(email.toLowerCase())
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, email, type, orgName, teamSize,
      wallet, twitter, discord, level,
      projectName, projectDesc, subnets, github, techStack,
    } = body

    if (!name || !email || !projectName || !github) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const auth  = await getAuth().getClient()
    const sheets = google.sheets({ version: 'v4' })

    await ensureHeaders(sheets, auth as never)

    const duplicate = await isDuplicate(sheets, auth as never, email)
    if (duplicate) {
      return NextResponse.json({ error: 'This email is already registered.' }, { status: 409 })
    }

    const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'UTC' }) + ' UTC'
    const row = [
      timestamp,
      name,
      email,
      type,
      orgName    || '',
      teamSize   || '',
      wallet     || '',
      twitter    || '',
      discord    || '',
      level,
      projectName,
      Array.isArray(subnets) ? subnets.join(', ') : '',
      projectDesc,
      techStack  || '',
      github,
    ]

    await sheets.spreadsheets.values.append({
      auth: auth as never,
      spreadsheetId: SHEET_ID,
      range: `${SHEET_TAB}!A1`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [row] },
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[register]', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
