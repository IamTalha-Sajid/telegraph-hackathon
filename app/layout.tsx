import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Telegraph Hackathon',
  description: 'Build on Telegraph\'s verified inference layer. USDC prizes across two tracks.',
  metadataBase: new URL('https://hackathon.telegraphprotocol.com'),
  icons: {
    icon: [
      { url: '/Telegraoh-Logo.png', type: 'image/png' },
    ],
    shortcut: '/Telegraoh-Logo.png',
    apple: '/Telegraoh-Logo.png',
  },
  openGraph: {
    title: 'Telegraph Hackathon',
    description: 'Build on Telegraph\'s verified inference layer. USDC prizes across two tracks.',
    url: 'https://hackathon.telegraphprotocol.com',
    siteName: 'Telegraph Hackathon',
    images: [
      {
        url: '/telegraph-social-card.jpg',
        width: 1200,
        height: 630,
        alt: 'Telegraph Protocol',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telegraph Hackathon',
    description: 'Build on Telegraph\'s verified inference layer. USDC prizes across two tracks.',
    images: ['/telegraph-social-card.jpg'],
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
