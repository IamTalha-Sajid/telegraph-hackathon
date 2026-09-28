// Season II structure: 3 competition tracks, 15 commercial missions (Apps & Agents only),
// one shared Intent network connecting them.

/** Name for the 15 industry directions. Change here to rename them site-wide. */
export const MISSION_TERM = { plural: 'Commercial Missions', singular: 'mission', short: 'Missions' }

export const TAGLINE = '3 tracks. 15 commercial missions. One shared Intent network.'

export const TRACKS = [
  {
    key: 'miner', title: 'Miners',
    body: 'Build or integrate a Miner that serves one or more Intents from the shared catalogue, and compete globally on each Intent. You pick Intents, not industries.',
    pick: 'Pick Intents to serve',
    href: '/intents', cta: 'Browse the Intent catalogue',
  },
  {
    key: 'evaluator', title: 'Evaluators',
    body: 'Build or improve the Evaluator that scores Miners on an Intent, so ranking rewards the answers that were actually right. Also industry-agnostic.',
    pick: 'Pick Intents to evaluate',
    href: '/intents', cta: 'Browse the Intent catalogue',
  },
  {
    key: 'app', title: 'Apps & Agents',
    body: 'Build an app or agent that buys ranked intelligence through Telegraph to solve a real problem inside one of the 15 commercial missions.',
    pick: 'Pick a commercial mission',
    href: '/missions', cta: 'Explore the 15 missions',
  },
] as const

/** The flywheel, in order. */
export const FLYWHEEL = [
  { title: 'Miners supply', body: 'Intelligence for each Intent, from anyone who can serve it.' },
  { title: 'Evaluators score', body: 'How answers for an Intent are judged, so ranking improves.' },
  { title: 'Ranking forms', body: 'Each Intent routes to the Miners ranked best for it.' },
  { title: 'Apps consume', body: 'Apps in every mission buy those Intents, creating real demand for Miners.' },
]
