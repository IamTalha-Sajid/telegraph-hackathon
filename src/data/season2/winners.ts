// Season I winners, shown on /winners.

export interface Winner {
  place: 1 | 2 | 3
  project?: string
  handle: string
  score?: string
  /** Miner page on the Telegraph explorer. */
  explorer?: string
  /** Live app, for Apps / Use Cases winners. */
  app?: string
  /** Paragraphs, in order. */
  about: string[]
  /** Optional list shown after the first paragraph. */
  points?: string[]
}

export interface WinnerTrack {
  n: number
  name: string
  intro?: string[]
  winners: Winner[]
}

export const SEASON1_WINNERS: WinnerTrack[] = [
  {
    n: 1,
    name: 'Miners / Intelligence Providers',
    winners: [
      {
        place: 1, project: 'TXlens', handle: 'sireadell', score: '97.9',
        explorer: 'https://explorer.telegraphprotocol.com/miners/txlens',
        about: [
          'TXlens takes a specific blockchain transaction reference and returns structured transaction intelligence, including confirmed, reverted, pending or not-found status, sender and recipient, value in wei and ETH, block number and block hash, receipt status, and decoded contract method where calldata permits it.',
          'It turns raw blockchain transaction data into a machine-callable intelligence service that other applications and agents can consume through Telegraph.',
        ],
      },
      {
        place: 2, project: 'Chainsight Oracle', handle: 'shadrakbsh', score: '86.9',
        explorer: 'https://explorer.telegraphprotocol.com/miners/chainsight-oracle',
        about: [
          'Chainsight Oracle provides a broad source of real-time onchain and market intelligence, including crypto prices, market capitalization and volume, DeFi TVL, fiat exchange rates, network gas prices, wallet balances, and Ethereum/Base transaction lookups.',
          'It demonstrates the broader definition of a Telegraph Miner: not simply an AI model, but any useful machine-callable intelligence service that can participate in an Intent and be ranked against alternatives.',
        ],
      },
      {
        place: 3, project: 'Oathcast Weather', handle: 'fexx_off', score: '85.4',
        explorer: 'https://explorer.telegraphprotocol.com/miners/oathcast-weather',
        about: [
          "Oathcast Weather serves Telegraph's WEATHER_FORECAST Intent, providing location-based forecast intelligence to applications and autonomous agents through Telegraph.",
          'It shows the core model clearly: the application asks for the intelligence it needs, while Telegraph routes that demand through ranked providers rather than forcing the application to hardcode a single weather source.',
        ],
      },
    ],
  },
  {
    n: 2,
    name: 'Evaluation WASMs',
    intro: [
      "The Evaluation track focused on the other side of Telegraph's ranking system: determining how Miner performance should be measured.",
      'Evaluation is a core part of Telegraph because an open intelligence market only works if the method used to measure competing intelligence can itself improve. Season I participants helped build that layer rather than Telegraph defining every evaluation internally.',
    ],
    winners: [
      { place: 1, handle: 'zkasuran', about: [] },
      { place: 2, handle: 'hyadav42774', about: [] },
      { place: 3, handle: 'BangDropID', about: [] },
    ],
  },
  {
    n: 3,
    name: 'Apps / Use Cases',
    winners: [
      {
        place: 1, project: 'Scam Shield', handle: 'mshoaibfiaz47', score: '0.69 / 1',
        app: 'https://scam-shield-rouge.vercel.app/',
        about: [
          'Scam Shield detects potential scams across messages, emails and other communication.',
          'What made the project stand out was that it extended beyond a standalone demo into multiple real user surfaces. The team built:',
          'The result is a practical example of ranked machine intelligence being embedded directly where users already encounter risk.',
        ],
        points: [
          'A browser extension that works directly inside Gmail and can scan an opened email for scam indicators with one click',
          'A mobile application that scans incoming SMS messages for potential scams',
          'Telegraph-powered intelligence underneath the experience',
        ],
      },
      {
        place: 2, project: 'Truvian Shield', handle: 'encrypt_wizard', score: '0.59 / 1',
        app: 'https://truvian.xyz/',
        about: [
          'Truvian Shield acts as an execution-safety checkpoint for autonomous onchain agents.',
          'Before an agent signs a transaction, Shield purchases four separate pieces of intelligence from live Telegraph Miners:',
          'It then combines those inputs into a SAFE / CAUTION / BLOCK decision with the supporting evidence attached.',
          'Instead of allowing an autonomous agent to rely on a single hardcoded data provider, Shield demonstrates how a machine can buy multiple pieces of ranked intelligence before making an irreversible decision.',
        ],
        points: [
          'Current gas conditions',
          "Whether the counterparty's referenced transaction actually succeeded",
          'The dollar value at risk',
          'Protocol liquidity',
        ],
      },
      {
        place: 3, project: 'ProofPact', handle: 'DefiPreacherr', score: '0.45 / 1',
        app: 'https://proofpact.vercel.app/app',
        about: [
          'ProofPact is a verified settlement layer connecting work environments with payment rails.',
          "It freezes acceptance criteria before funding, collects signed delivery evidence, purchases independent intelligence through Telegraph's ranked Miner network, and applies deterministic settlement policy to determine whether payment conditions have been met.",
          'The project shows how Telegraph can sit inside a larger autonomous workflow rather than existing as an isolated query layer.',
        ],
      },
    ],
  },
]

/** Index of the paragraph the bullet list follows (the one that introduces it). */
export function pointsAfter(w: Winner) {
  return w.points ? w.about.findIndex(p => p.endsWith(':')) : -1
}
