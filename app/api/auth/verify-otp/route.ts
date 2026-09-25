import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { getSheets, lookupRegistrant } from '@/lib/sheets'

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

    // Prefill from a Season II registration, or from Season I for returning builders
    const { sheets, auth } = await getSheets()
    const found = await lookupRegistrant(sheets, auth, payload.email)

    return NextResponse.json({
      ok: true,
      email: payload.email,
      existing: found?.existing ?? null,
      season: found?.season ?? null,
    })
  } catch (err) {
    console.error('[verify-otp]', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
