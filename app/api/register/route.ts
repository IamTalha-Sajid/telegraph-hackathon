import { NextRequest, NextResponse } from 'next/server'
import { getSheets, findRowByEmail, ensureS2Tab, SHEET_ID, S2_TAB, S2_LAST_COL } from '@/lib/sheets'
import { sendConfirmationEmail } from '@/lib/email'
import { TRACK_BY_SLUG } from '@/data/season2/tracks'

const CONFIRMATION_COL = 'R' // "Confirmation Sent At" -- keep in sync with S2_HEADERS in src/lib/sheets.ts
const ROLES = ['App / Agent', 'Miner', 'Evaluator']

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name, email, type, orgName, teamSize,
      wallet, twitter, discord, track, buyer, roles,
      projectName, projectDesc, techStack, github,
    } = body

    const roleList = Array.isArray(roles) ? roles.filter((r: unknown) => ROLES.includes(r as string)) : []
    if (!name || !email || !discord || roleList.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    const trackName = track ? TRACK_BY_SLUG[track]?.name : 'Undecided'
    if (!trackName) {
      return NextResponse.json({ error: 'Unknown track' }, { status: 400 })
    }

    const { sheets, auth } = await getSheets()
    await ensureS2Tab(sheets, auth)

    const seasonOne = await findRowByEmail(sheets, auth, email)

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
      trackName,
      buyer       || '',
      roleList.join(', '),
      projectName || '',
      projectDesc || '',
      techStack   || '',
      github      || '',
      seasonOne ? 'Yes' : 'No',
    ]

    const found = await findRowByEmail(sheets, auth, email, S2_TAB, S2_LAST_COL)
    let newRowNumber: number | null = null

    if (found) {
      await sheets.spreadsheets.values.update({
        auth,
        spreadsheetId: SHEET_ID,
        range: `'${S2_TAB}'!A${found.rowIndex}:Q${found.rowIndex}`,
        valueInputOption: 'RAW',
        requestBody: { values: [row] },
      })
    } else {
      const appendRes = await sheets.spreadsheets.values.append({
        auth,
        spreadsheetId: SHEET_ID,
        range: `'${S2_TAB}'!A1`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: [row] },
      })
      const match = appendRes.data.updates?.updatedRange?.match(/!A(\d+):/)
      newRowNumber = match ? Number(match[1]) : null
    }

    // Only email brand-new registrants, not people updating their entry.
    if (!found) {
      try {
        await sendConfirmationEmail(email, name, trackName)
        if (newRowNumber) {
          await sheets.spreadsheets.values.update({
            auth,
            spreadsheetId: SHEET_ID,
            range: `'${S2_TAB}'!${CONFIRMATION_COL}${newRowNumber}`,
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
