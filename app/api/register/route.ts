import { NextRequest, NextResponse } from 'next/server'
import { getSheets, findRowByEmail, ensureHeaders, SHEET_ID, SHEET_TAB } from '@/lib/sheets'
import { google } from 'googleapis'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, email, type, orgName, teamSize,
      wallet, twitter, discord, level,
      projectName, projectDesc, subnets, techStack,
    } = body

    if (!name || !email || !projectName || !discord) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { sheets, auth } = await getSheets()
    await ensureHeaders(sheets, auth)

    const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'UTC' }) + ' UTC'
    const row = [
      timestamp,
      name,
      email,
      type,
      orgName     || '',
      teamSize    || '',
      wallet      || '',
      twitter     || '',
      discord     || '',
      level,
      projectName,
      Array.isArray(subnets) ? subnets.join(', ') : '',
      projectDesc || '',
      techStack   || '',
    ]

    const found = await findRowByEmail(sheets, auth, email)

    if (found) {
      // Update existing row
      await sheets.spreadsheets.values.update({
        auth,
        spreadsheetId: SHEET_ID,
        range: `${SHEET_TAB}!A${found.rowIndex}:N${found.rowIndex}`,
        valueInputOption: 'RAW',
        requestBody: { values: [row] },
      })
    } else {
      // Append new row
      await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId: SHEET_ID,
        range: `${SHEET_TAB}!A1`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: [row] },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[register]', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
