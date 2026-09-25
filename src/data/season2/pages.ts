// Season II site pages, in reading order. Nav tabs and the "next page" links follow this list.
export const PAGES = [
  { href: '/',             label: 'Overview' },
  { href: '/why',          label: 'Why' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/tracks',       label: 'Tracks' },
  { href: '/rules',        label: 'Rules' },
  { href: '/timeline',     label: 'Timeline' },
  { href: '/judging',      label: 'Judging' },
  { href: '/build',        label: 'Build' },
] as const

export type PageHref = typeof PAGES[number]['href']

export function pageIndex(href: PageHref) {
  return PAGES.findIndex(p => p.href === href)
}
