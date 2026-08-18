import { google } from 'googleapis'

export const SHEET_ID  = process.env.GOOGLE_SHEET_ID!
export const SHEET_TAB = 'Sheet1'

export const HEADERS = [
  'Timestamp', 'Name', 'Email', 'Type', 'Org / Team Name', 'Team Size',
  'Wallet', 'Twitter', 'Discord', 'Level',
  'Project Name', 'Miners', 'Project Description', 'Tech Stack', 'GitHub',
]

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

/** Returns [rowIndex (1-based), rowData] or null if not found */
export async function findRowByEmail(
  sheets: ReturnType<typeof google.sheets>,
  auth: never,
  email: string,
): Promise<{ rowIndex: number; row: string[] } | null> {
  const res = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: SHEET_ID,
    range: `${SHEET_TAB}!A:O`,
  })
  const rows = (res.data.values ?? []) as string[][]
  for (let i = 1; i < rows.length; i++) {
    if ((rows[i][2] ?? '').toLowerCase() === email.toLowerCase()) {
      return { rowIndex: i + 1, row: rows[i] }
    }
  }
  return null
}

export async function ensureHeaders(
  sheets: ReturnType<typeof google.sheets>,
  auth: never,
) {
  const res = await sheets.spreadsheets.values.get({
    auth,
    spreadsheetId: SHEET_ID,
    range: `${SHEET_TAB}!A1:O1`,
  })
  const firstRow = res.data.values?.[0]
  if (!firstRow || firstRow[0] !== 'Timestamp' || firstRow[14] !== 'GitHub') {
    await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId: SHEET_ID,
      range: `${SHEET_TAB}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [HEADERS] },
    })
  }
}
