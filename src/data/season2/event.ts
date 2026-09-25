// Season II event content. Structure and copy follow the Season II deck;
// judging weights follow the updated criteria (mainnet readiness leads).

export const START = new Date('2026-11-16T00:00:00Z')
export const END   = new Date('2026-12-16T23:59:59Z')

export const STATS = {
  testnet: [
    { value: '1,500',   label: 'miners supplying intelligence' },
    { value: '45',      label: 'use cases live' },
    { value: '2,000',   label: 'developers registered for Season I' },
    { value: '125,000', label: 'transactions on testnet' },
    { value: '$13B',    label: 'institution running a node, 8 others secured, 56 of 64 remaining' },
  ],
  soon: [
    { value: '1,000+',   label: 'models for machines to query' },
    { value: '30 days',  label: 'Season II, 16 November to 16 December' },
    { value: 'Dec - Jan', label: 'mainnet, December 2026 to January 2027' },
  ],
}

export const WHY = [
  { title: 'Mainnet is the deadline', body: 'Same contracts, same settlement path, same proof format, so nothing you build is rewritten later.' },
  { title: 'Miners need machines', body: 'Ranked intelligence needs demand. Every build creates real requests for miners.' },
  { title: 'Machines need a market', body: 'Each track is a real industry with a problem solved slowly, expensively, or not at all.' },
]

export const GET = [
  { title: 'A real product, not a demo', body: 'It runs on the contracts that ship at mainnet.' },
  { title: 'A specific use case', body: 'You build against a real problem, not a hypothetical one.' },
  { title: 'Proof, not a pitch', body: 'Settled transactions a stranger can click through.' },
  { title: 'An audience', body: 'Six weeks of daily posts built on the winners.' },
]

export const ANATOMY_STEPS = [
  { title: 'The agent fires parallel paid requests', body: 'One request per piece of intelligence it needs, all at once.' },
  { title: 'Each request routes to a ranked miner', body: 'Telegraph sends each intent to a miner already ranked for it. If miners disagree, you see several receipts, not a hidden debate.' },
  { title: 'The answer arrives with a receipt', body: 'Who produced it, what they rank for that intent, and at what confidence. Every input is timestamped and provable after the fact.' },
  { title: 'The app turns answers into an outcome', body: 'A finished result with a verification hash and a cost line at the bottom.' },
]

export const ROLES = [
  {
    key: 'app', title: 'Apps and agents',
    body: 'Build the end-user product for the industry: the agent that buys intelligence through Telegraph and turns it into an outcome.',
  },
  {
    key: 'miner', title: 'Miners',
    body: 'Supply the specialised intelligence those apps buy. Serve an intent, get ranked against other miners, and get paid per request.',
  },
  {
    key: 'evaluator', title: 'Evaluators',
    body: 'Build or improve the evaluator that scores miners for an intent, so the ranking rewards the answers that were actually right.',
  },
] as const

export type RoleKey = typeof ROLES[number]['key']

export const RULES = [
  { title: 'The agent buys', body: 'The app cannot call an API directly. It routes a paid request through Telegraph and consumes the verified, ranked answer, in the app or in a dashboard.' },
  { title: 'The money is visible', body: 'Request, miner, amount, Sepolia transaction hash and network label, on screen. If a judge cannot click through to the transaction, the submission does not score.' },
  { title: 'Machines transact', body: 'At least one leg is an autonomous system buying from, or selling to, another autonomous system, with no human in the loop on that leg.' },
]

export const TAGS = {
  Full: 'Everything in the example is real on testnet apart from the denomination. Build it and show it as-is.',
  Mechanism: 'Routing, ranking, verification and settlement are real, but the economic claim only becomes true at mainnet. Build it, and put one line on screen naming the part that is waiting.',
}

export const PHASES = [
  { dates: 'Before 16 Nov', from: null,         to: '2026-11-15', title: 'Starter kit ships', body: 'Spend panel, faucet flow, reference miners, a worked example and the mainnet-flip config, published before anyone writes a line.' },
  { dates: '16 - 22 Nov',   from: '2026-11-16', to: '2026-11-22', title: 'Pick a track and start building', body: 'Teams form, pick a track and a use case, and start building.' },
  { dates: '23 - 29 Nov',   from: '2026-11-23', to: '2026-11-29', title: 'Build to the checkpoint', body: 'One settled transaction on the board by the end of week two, or the team is cut from prize eligibility.' },
  { dates: '30 Nov - 6 Dec', from: '2026-11-30', to: '2026-12-06', title: 'Build and integrate', body: 'Office hours with the core engineering team. Miners tune against real requests coming off real builds.' },
  { dates: '7 - 16 Dec',    from: '2026-12-07', to: '2026-12-16', title: 'Submission and demo day', body: 'Judging against the published weights, one winner per track, runners-up named per use case.' },
]

export const SHIP = [
  { title: 'A live demo URL', body: 'Running, reachable, and working when a judge opens it cold.' },
  { title: 'Sepolia transaction hashes', body: 'A set of them, clickable through to the explorer.' },
  { title: 'The spend panel, with its boundary line', body: 'On screen, unprompted, naming what is real and what is standing in.' },
  { title: 'A video, 60 seconds maximum', body: 'What it does, the problem it solves, and why Telegraph gave it an edge. Clear English audio or subtitles. It may be used in Telegraph ads on X.' },
  { title: 'A half-page commercial summary', body: 'Who buys this, what it replaces, and what that thing costs today.' },
]

export const JUDGING = [
  { weight: 35, title: 'Mainnet readiness', body: 'Build quality on par with mainnet. Same contracts, same settlement path, same proof format, and chain ID, token address and price source are configuration, not code. It works when opened cold.' },
  { weight: 30, title: 'Commercial viability', body: 'A specific use case, a problem someone has today, and a plain answer to what this replaces and what that costs now. This is what decides whether anyone will buy it.' },
  { weight: 20, title: 'Verifiable transaction volume', body: 'Settled requests on chain, not a screenshot. Volume a judge can count.' },
  { weight: 10, title: 'Network usage', body: 'The agent buys through Telegraph and consumes the ranked, verified answer rather than shortcutting to a direct API call.' },
  { weight: 5, title: 'Novelty', body: 'Something nobody has shown before, rather than a familiar app with a payment bolted on.' },
]

export const PRIZES = [
  { title: 'One winner per track', body: 'Judged inside the track, against the other teams working that use case. A strong second team on a different use case is still named.' },
  { title: 'A product live on mainnet', body: 'What you built runs on the same contracts at launch, so the day the network opens your product is already live.' },
  { title: 'Put in front of the industry', body: 'Your commercial summary goes to a company that has this problem today.' },
  { title: 'A demo the network shows off', body: 'Winning builds anchor six weeks of daily posts, each with its transaction hashes, its cost and the use case it was built for.' },
]

export const STARTER_KIT = [
  { title: 'The spend panel', body: 'A drop-in component showing request, miner, amount, transaction hash, latency and network label. Every demo shares it, so judges read yours like everyone else\'s.' },
  { title: 'A funded faucet flow', body: 'Sepolia funding wired up, so nobody spends day one working out how to pay for anything.' },
  { title: 'Three reference miners', body: 'Live on the leaderboard from the start, so a request has something to route between.' },
  { title: 'One worked example', body: 'A complete end-to-end build, from request to settled transaction to receipt.' },
  { title: 'The mainnet-flip config', body: 'Chain ID, token address and price source as configuration, so nobody hardcodes a chain.' },
]

export const LINKS = {
  docs: 'https://docs.telegraphprotocol.com/',
  alexandria: 'https://alexandria.telegraphprotocol.com/',
  protocol: 'https://telegraphprotocol.com/',
  email: 'info@telegraphprotocol.com',
}
