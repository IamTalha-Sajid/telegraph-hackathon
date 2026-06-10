import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Telegraph Hackathon',
  description: 'Build on Telegraph\'s verified inference layer. USDC prizes across two tracks.',
  icons: {
    icon: [
      { url: '/Telegraoh-Logo.png', type: 'image/png' },
    ],
    shortcut: '/Telegraoh-Logo.png',
    apple: '/Telegraoh-Logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
