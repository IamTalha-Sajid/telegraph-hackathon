import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { getSheets, findRowByEmail } from '@/lib/sheets'

const secret = new TextEncoder().encode(process.env.OTP_SECRET!)

export async function POST(req: NextRequest) {
  try {
    const { token, otp } = await req.json()
    if (!token || !otp) {
      return NextResponse.json({ error: 'Missing token or code' }, { status: 400 })
    }

    let payload: { email: string; otp: string }
    try {
      const result = await jwtVerify(token, secret)
      payload = result.payload as { email: string; otp: string }
    } catch {
      return NextResponse.json({ error: 'Code expired. Please request a new one.' }, { status: 401 })
    }

    if (String(payload.otp) !== String(otp)) {
      return NextResponse.json({ error: 'Incorrect code. Please try again.' }, { status: 401 })
    }

    // Look up existing registration in Google Sheets
    const { sheets, auth } = await getSheets()
    const found = await findRowByEmail(sheets, auth, payload.email)

    let existing = null
    if (found) {
      const r = found.row
      existing = {
        name:        r[1]  ?? '',
        email:       r[2]  ?? '',
        type:        (r[3] ?? 'individual') as 'individual' | 'team',
        orgName:     r[4]  ?? '',
        teamSize:    r[5]  ?? '2 – 5',
        wallet:      r[6]  ?? '',
        twitter:     r[7]  ?? '',
        discord:     r[8]  ?? '',
        level:       (r[9] ?? 'intermediate') as 'beginner' | 'intermediate' | 'advanced',
        projectName: r[10] ?? '',
        subnets:     r[11] ? r[11].split(', ').filter(Boolean) : [],
        projectDesc: r[12] ?? '',
        techStack:   r[13] ?? '',
        github:      r[14] ?? '',
      }
    }

    return NextResponse.json({ ok: true, email: payload.email, existing })
  } catch (err) {
    console.error('[verify-otp]', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
