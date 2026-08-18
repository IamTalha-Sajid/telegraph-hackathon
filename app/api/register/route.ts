import { NextRequest, NextResponse } from 'next/server'
import { getSheets, findRowByEmail, ensureHeaders, SHEET_ID, SHEET_TAB } from '@/lib/sheets'
import { sendConfirmationEmail } from '@/lib/email'
import { google } from 'googleapis'

const REMINDER_TRACKING_COL = 'P' // "Reminder Sent At" -- keep in sync with scripts/send-reminder-emails.mjs

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, email, type, orgName, teamSize,
      wallet, twitter, discord, level,
      projectName, projectDesc, subnets, techStack, github,
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
      github      || '',
    ]

    const found = await findRowByEmail(sheets, auth, email)
    let newRowNumber: number | null = null

    if (found) {
      // Update existing row
      await sheets.spreadsheets.values.update({
        auth,
        spreadsheetId: SHEET_ID,
        range: `${SHEET_TAB}!A${found.rowIndex}:O${found.rowIndex}`,
        valueInputOption: 'RAW',
        requestBody: { values: [row] },
      })
    } else {
      // Append new row
      const appendRes = await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId: SHEET_ID,
        range: `${SHEET_TAB}!A1`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: [row] },
      })
      const updatedRange = appendRes.data.updates?.updatedRange // e.g. "Sheet1!A123:N123"
      const match = updatedRange?.match(/!A(\d+):/)
      newRowNumber = match ? Number(match[1]) : null
    }

    // Only email brand-new registrants, not people re-submitting/updating their entry.
    if (!found) {
      try {
        await sendConfirmationEmail(email, name)
        if (newRowNumber) {
          await sheets.spreadsheets.values.update({
            auth,
            spreadsheetId: SHEET_ID,
            range: `${SHEET_TAB}!${REMINDER_TRACKING_COL}${newRowNumber}`,
            valueInputOption: 'RAW',
            requestBody: { values: [[new Date().toISOString()]] },
          })
        }
      } catch (emailErr) {
        // Registration already succeeded -- don't fail the request over email delivery.
        console.error('[register] confirmation email failed', emailErr)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[register]', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
