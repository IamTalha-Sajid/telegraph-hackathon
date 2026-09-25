import { google } from 'googleapis'

export const SHEET_ID  = process.env.GOOGLE_SHEET_ID!
export const SHEET_TAB = 'Sheet1'      // Season I registrations
export const S2_TAB    = 'Sheet3'      // Season II registrations (created on first use)

// Keep in sync with app/api/register/route.ts
export const S2_HEADERS = [
  'Timestamp', 'Name', 'Email', 'Type', 'Org / Team Name', 'Team Size',
  'Wallet', 'Twitter', 'Discord', 'Track', 'Buyer', 'Roles',
  'Project Name', 'Project Description', 'Tech Stack', 'GitHub',
  'Season I Registrant', 'Confirmation Sent At',
]
export const S2_LAST_COL = 'R'

type Sheets = ReturnType<typeof google.sheets>

export function getAuth() {
  const creds = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!)
  return new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

export async function getSheets() {
  const auth   = await getAuth().getClient()
  const sheets = google.sheets({ version: 'v4' })
  return { auth: auth as never, sheets }
}

/** Returns [rowIndex (1-based), rowData] or null if not found. Email is column C in both tabs. */
export async function findRowByEmail(
  sheets: Sheets,
  auth: never,
  email: string,
  tab: string = SHEET_TAB,
  lastCol: string = 'O',
): Promise<{ rowIndex: number; row: string[] } | null> {
  const res = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: SHEET_ID,
    range: `'${tab}'!A:${lastCol}`,
  })
  const rows = (res.data.values ?? []) as string[][]
  for (let i = 1; i < rows.length; i++) {
    if ((rows[i][2] ?? '').toLowerCase() === email.toLowerCase()) {
      return { rowIndex: i + 1, row: rows[i] }
    }
  }
  return null
}

/** Creates the Season II tab if it does not exist yet and writes its header row. */
export async function ensureS2Tab(sheets: Sheets, auth: never) {
  const meta = await sheets.spreadsheets.get({ auth, spreadsheetId: SHEET_ID, fields: 'sheets.properties.title' })
  const exists = meta.data.sheets?.some(s => s.properties?.title === S2_TAB)
  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      auth,
      spreadsheetId: SHEET_ID,
      requestBody: { requests: [{ addSheet: { properties: { title: S2_TAB } } }] },
    })
  }
  const res = await sheets.spreadsheets.values.get({ auth, spreadsheetId: SHEET_ID, range: `'${S2_TAB}'!A1:${S2_LAST_COL}1` })
  const firstRow = res.data.values?.[0]
  if (!firstRow || firstRow[0] !== 'Timestamp' || firstRow[S2_HEADERS.length - 1] !== S2_HEADERS[S2_HEADERS.length - 1]) {
    await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId: SHEET_ID,
      range: `'${S2_TAB}'!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [S2_HEADERS] },
    })
  }
}

/**
 * Registration details to prefill the form: the Season II row if one exists,
 * otherwise the shared fields from a Season I row.
 */
export async function lookupRegistrant(sheets: Sheets, auth: never, email: string) {
  const s2 = await findRowByEmail(sheets, auth, email, S2_TAB, S2_LAST_COL).catch(() => null)
  if (s2) {
    const r = s2.row
    return {
      season: 2 as const,
      existing: {
        name: r[1] ?? '', email: r[2] ?? '',
        type: (r[3] || 'individual') as 'individual' | 'team',
        orgName: r[4] ?? '', teamSize: r[5] || '2 – 5',
        wallet: r[6] ?? '', twitter: r[7] ?? '', discord: r[8] ?? '',
        track: r[9] ?? '', buyer: r[10] ?? '',
        roles: r[11] ? r[11].split(', ').filter(Boolean) : [],
        projectName: r[12] ?? '', projectDesc: r[13] ?? '', techStack: r[14] ?? '', github: r[15] ?? '',
      },
    }
  }
  const s1 = await findRowByEmail(sheets, auth, email)
  if (s1) {
    const r = s1.row
    return {
      season: 1 as const,
      existing: {
        name: r[1] ?? '', email: r[2] ?? '',
        type: (r[3] || 'individual') as 'individual' | 'team',
        orgName: r[4] ?? '', teamSize: r[5] || '2 – 5',
        wallet: r[6] ?? '', twitter: r[7] ?? '', discord: r[8] ?? '',
        techStack: r[13] ?? '', github: r[14] ?? '',
      },
    }
  }
  return null
}
