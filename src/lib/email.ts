import nodemailer from 'nodemailer'

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

export function buildConfirmationEmailHtml(name: string) {
  const firstName = (name || '').trim().split(/\s+/)[0] || 'there'
  return `
    <div style="font-family:monospace;background:#000;color:#fff;padding:40px;max-width:480px;margin:0 auto;">
      <p style="color:rgba(251,191,36,0.9);font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 24px;">
        Telegraph · Hackathon · Season II
      </p>
      <p style="font-size:15px;margin:0 0 16px;color:rgba(255,255,255,0.85);">
        Hey ${firstName},
      </p>
      <p style="font-size:15px;margin:0 0 24px;color:rgba(255,255,255,0.8);">
        You're confirmed for Telegraph Hackathon Season II, running November to December 2026.
      </p>
      <p style="font-size:15px;margin:0 0 32px;color:rgba(255,255,255,0.8);">
        Exact dates will be announced soon. You're eligible for all three tracks: Miners, Evaluators, and Apps &amp; Agents. The starter kit ships before day one &mdash; keep an eye on your inbox.
      </p>
      <p style="font-size:12px;color:rgba(255,255,255,0.35);margin:0;">
        You're receiving this because you registered for Telegraph Hackathon Season II.
      </p>
    </div>
  `
}

export async function sendConfirmationEmail(to: string, name: string) {
  const transporter = getTransporter()
  await transporter.sendMail({
    from: `"Telegraph Hackathon" <${process.env.OUTLOOK_USER}>`,
    to,
    subject: "You're in! Telegraph Hackathon Season II",
    html: buildConfirmationEmailHtml(name),
  })
}
