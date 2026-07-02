import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import nodemailer from 'nodemailer'

const secret = new TextEncoder().encode(process.env.OTP_SECRET!)

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? 'smtp.elasticemail.com',
  port: Number(process.env.SMTP_PORT ?? 2525),
  secure: false,
  auth: {
    user: process.env.OUTLOOK_USER!,
    pass: process.env.OUTLOOK_PASS!,
  },
})

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000))

    const token = await new SignJWT({ email, otp })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('10m')
      .sign(secret)

    await transporter.sendMail({
      from: `"Telegraph Hackathon" <${process.env.OUTLOOK_USER}>`,
      to: email,
      subject: 'Your Telegraph Hackathon verification code',
      html: `
        <div style="font-family:monospace;background:#000;color:#fff;padding:40px;max-width:480px;margin:0 auto;">
          <p style="color:rgba(251,191,36,0.9);font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 24px;">
            Telegraph · Hackathon
          </p>
          <p style="font-size:15px;margin:0 0 32px;color:rgba(255,255,255,0.8);">
            Your verification code is:
          </p>
          <p style="font-size:48px;font-weight:700;letter-spacing:0.12em;color:#fbbf24;margin:0 0 32px;">
            ${otp}
          </p>
          <p style="font-size:12px;color:rgba(255,255,255,0.35);margin:0;">
            This code expires in 10 minutes. If you didn't request this, ignore this email.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ token })
  } catch (err) {
    console.error('[send-otp]', err)
    return NextResponse.json({ error: 'Failed to send code. Please try again.' }, { status: 500 })
  }
}
