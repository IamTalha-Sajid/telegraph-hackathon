import nodemailer from 'nodemailer'

export const EVENT_DATE = new Date('2026-08-17T00:00:00Z')

export function daysUntilEvent(): number {
  const msPerDay = 24 * 60 * 60 * 1000
  return Math.ceil((EVENT_DATE.getTime() - Date.now()) / msPerDay)
}

export function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.office365.com',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.OUTLOOK_USER!,
      pass: process.env.OUTLOOK_PASS!,
    },
    tls: { ciphers: 'SSLv3' },
  })
}

export function buildConfirmationEmailHtml(name: string, days: number) {
  const dayLabel = days === 1 ? '1 day' : `${days} days`
  const firstName = (name || '').trim().split(/\s+/)[0] || 'there'
  return `
    <div style="font-family:monospace;background:#000;color:#fff;padding:40px;max-width:480px;margin:0 auto;">
      <p style="color:rgba(251,191,36,0.9);font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 24px;">
        Telegraph · Hackathon
      </p>
      <p style="font-size:15px;margin:0 0 16px;color:rgba(255,255,255,0.85);">
        Hey ${firstName},
      </p>
      <p style="font-size:15px;margin:0 0 24px;color:rgba(255,255,255,0.8);">
        You're confirmed for the Telegraph Hackathon. Get ready &mdash; we start in
      </p>
      <p style="font-size:40px;font-weight:700;letter-spacing:0.05em;color:#fbbf24;margin:0 0 24px;">
        ${dayLabel}
      </p>
      <p style="font-size:15px;margin:0 0 32px;color:rgba(255,255,255,0.8);">
        Kickoff: <strong>August 17</strong>. Keep an eye on your inbox for further details.
      </p>
      <p style="font-size:12px;color:rgba(255,255,255,0.35);margin:0;">
        You're receiving this because you registered for the Telegraph Hackathon.
      </p>
    </div>
  `
}

export async function sendConfirmationEmail(to: string, name: string) {
  const transporter = getTransporter()
  const days = daysUntilEvent()
  await transporter.sendMail({
    from: `"Telegraph Hackathon" <${process.env.OUTLOOK_USER}>`,
    to,
    subject: `You're in! Telegraph Hackathon starts in ${days} day${days === 1 ? '' : 's'}`,
    html: buildConfirmationEmailHtml(name, days),
  })
}
