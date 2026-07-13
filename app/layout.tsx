import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Telegraph Hackathon',
  description: 'Build on Telegraph\'s verified inference layer. USDC prizes across three tracks.',
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
    description: 'Build on Telegraph\'s verified inference layer. USDC prizes across 3 tracks.',
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
    description: 'Build on Telegraph\'s verified inference layer. USDC prizes across 3 tracks.',
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WGFNWJ6K');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WGFNWJ6K"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  )
}
