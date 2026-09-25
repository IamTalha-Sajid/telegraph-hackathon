// Season II site pages, in reading order. Nav tabs and the "next page" links follow this list.
export const PAGES = [
  { href: '/',             label: 'Overview',     art: '/Website/season2-mascot.png' },
  { href: '/why',          label: 'Why',          art: '/Website/thinking_robot.png' },
  { href: '/how-it-works', label: 'How it works', art: '/Website/telegraph_web_2.png' },
  { href: '/tracks',       label: 'Tracks',       art: '/Website/telegraph_web_6.png' },
  { href: '/rules',        label: 'Rules',        art: '/Website/IMG_7091.jpeg' },
  { href: '/timeline',     label: 'Timeline',     art: '/Website/telegraph_web_8.png' },
  { href: '/judging',      label: 'Judging',      art: '/Website/IMG_7088.jpeg' },
  { href: '/build',        label: 'Build',        art: '/Website/telegraph_web_7.png' },
] as const

export type PageHref = typeof PAGES[number]['href']

export function pageIndex(href: PageHref) {
  return PAGES.findIndex(p => p.href === href)
}
