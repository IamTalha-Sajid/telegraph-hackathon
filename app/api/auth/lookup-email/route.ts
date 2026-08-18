import { NextRequest, NextResponse } from 'next/server'
import { getSheets, findRowByEmail } from '@/lib/sheets'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ existing: null })

    const { sheets, auth } = await getSheets()
    const found = await findRowByEmail(sheets, auth, email)

    if (!found) return NextResponse.json({ existing: null })

    const r = found.row
    const existing = {
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

    return NextResponse.json({ existing })
  } catch (err) {
    console.error('[lookup-email]', err)
    return NextResponse.json({ existing: null })
  }
}
