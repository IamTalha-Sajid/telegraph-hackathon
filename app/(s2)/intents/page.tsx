import type { Metadata } from 'next'
import { Suspense } from 'react'
import IntentExplorer from '@/components/s2/IntentExplorer'

export const metadata: Metadata = {
  title: 'Intent catalogue | Telegraph Hackathon Season II',
  description: 'Every kind of intelligence Telegraph can rank and route, and which Season II tracks use it.',
}

export default function IntentsPage() {
  return (
    <Suspense>
      <IntentExplorer />
    </Suspense>
  )
}
