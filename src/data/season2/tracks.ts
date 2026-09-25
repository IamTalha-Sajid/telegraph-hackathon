// Season II commercial tracks.
// Example copy comes from the Season II brief. `intents` map each example to the intent catalogue.

/**
 * Real company names are shown as build targets (text only, no logos) with a no-affiliation
 * disclaimer. Pending legal review: set to false to show generic buyer descriptions instead.
 * Platforms people build on (`platform: true`) are always named, as in the public deck.
 */
export const SHOW_BUYER_NAMES = true

export type Tag = 'Full' | 'Mechanism'

export interface Example {
  title: string
  tag: Tag
  body: string
  /** The finished thing a judge sees, in a few words. */
  output: string
  intents: string[]
}

export interface Buyer {
  names: string[]
  generic: string
  platform?: boolean
  context?: string
  examples: Example[]
}

export interface Track {
  n: number
  slug: string
  name: string
  sector: string
  summary: string
  problem: string
  outcome: string
  context?: string
  buildNote?: string
  buyers: Buyer[]
}

export const TRACKS: Track[] = [
  {
    n: 1, slug: 'exchange', name: 'Exchange',
    sector: 'Global spot and derivatives venues',
    summary: 'An autonomous listings desk that buys contract audit, contributor authenticity, holder concentration and sanctions exposure in parallel, and returns a signed listing risk memo with a cost line at the bottom.',
    problem: 'Listing reviews take weeks of analyst time, surveillance is bought per seat from a single in-house model, and counterparty checks mean exposing your book.',
    outcome: 'An exchange desk that runs on bought intelligence: every listing, alert and counterparty decision arrives with the receipts that informed it and a cost line.',
    buyers: [{
      names: ['Kraken', 'Gate.io', 'Binance'],
      generic: 'Global spot and derivatives venues',
      examples: [
        {
          title: 'The autonomous listings desk', tag: 'Full',
          body: "A token listing application arrives. An agent fires parallel paid requests across independent miners: contract audit, commit history and contributor authenticity, holder concentration, sanctions exposure on treasury addresses, and bot-versus-human analysis of the project's social following. The output is a signed listing risk memo with a verification hash and a cost line at the bottom. Run it against a real pending listing candidate and print the total: a few dollars and ninety seconds, against weeks of analyst time.",
          output: 'Signed listing risk memo with a cost line',
          intents: ['SMART_CONTRACT_AUDIT', 'ONCHAIN_METRIC_VERIFY', 'SANCTIONS_SCREENING_MATCH', 'SOCIAL_BOT_DETECTION', 'CODE_REVIEW'],
        },
        {
          title: 'Surveillance that only bills when it finds something', tag: 'Full',
          body: 'A market-integrity agent buys order-book anomaly detection continuously from several competing miners rather than running one in-house model. Miners disagree, the median settles it, and the venue pays per request instead of per seat. Then invert it: the surveillance agent republishes its consolidated alert feed as a miner, so compliance agents at other venues can buy from it.',
          output: 'Median-settled alert feed, resold as a miner',
          intents: ['WASH_TRADING_DETECTION', 'LIQUIDITY_DEPTH_VERIFY'],
        },
        {
          title: 'The solvency handshake', tag: 'Mechanism',
          body: "Two exchange agents verify each other before extending counterparty credit. Each buys from the other side's miner without either book being exposed. The verification and the cross-agent purchase run fully on testnet. The credit decision that follows needs mainnet, and a counterparty willing to be the other side.",
          output: 'Mutual solvency check before credit',
          intents: ['ASSET_RESERVE_ATTESTATION', 'ONCHAIN_METRIC_VERIFY', 'CROSS_CHAIN_STATE_VERIFY'],
        },
      ],
    }],
  },
  {
    n: 2, slug: 'stablecoin', name: 'Stablecoin',
    sector: 'Stablecoin issuers and on-chain credit',
    summary: 'An agent fleet with a real expense ledger, compliance screening attached to the payment itself as a proof, and a machine that opens a vault, borrows, spends on intelligence, earns as a miner and repays.',
    problem: 'Agent spending looks nothing like a card payment or a wire, so no existing reporting, compliance or treasury tooling captures it.',
    outcome: 'Money infrastructure for machines: agents that pay, screen, borrow and rebalance on verified evidence, with every settlement countable on chain.',
    buyers: [
      {
        names: ['Circle'], generic: 'Fiat-backed stablecoin issuer',
        examples: [
          {
            title: 'The agent expense ledger', tag: 'Full',
            body: 'A fleet of agents runs for the full 30 days, paying for every request, with a dashboard showing burn per intelligence category, cost per completed task, and automated top-up when a wallet runs low. The headline number is settlement count, and it is genuine: tens of thousands of individual payments executed. Agent spending is a transaction class that no existing reporting captures, because it looks nothing like a card payment or a wire.',
            output: 'Expense ledger: burn per category, cost per task',
            intents: ['CRYPTO_TRANSFER_VERIFY', 'TASK_EXECUTION_QUALITY', 'GAS_PRICE'],
          },
          {
            title: 'Compliance attached to the payment itself', tag: 'Full',
            body: 'Before an agent pays a miner, it buys a screening request: sanctions status, address risk score, jurisdiction eligibility. The verified result is attached to the payment as a proof, so the payment carries its own defensibility. Machine-to-machine Travel Rule mechanics, implemented rather than described.',
            output: 'A payment that carries its own compliance proof',
            intents: ['SANCTIONS_SCREENING_MATCH', 'TRANSACTION_RISK', 'FRAUD_RISK', 'REGULATORY_FILING_MONITOR'],
          },
          {
            title: 'Treasury agents choosing on evidence', tag: 'Mechanism',
            body: 'An autonomous treasury agent buys reserve-quality and cross-chain liquidity-depth answers from competing miners, then rebalances on what it learns. The buying and the decision logic are real and auditable now. The rebalance runs against live market data as a simulation until mainnet, and the demo says so on screen.',
            output: 'Evidence-backed rebalance, simulated until mainnet',
            intents: ['ASSET_RESERVE_ATTESTATION', 'LIQUIDITY_DEPTH_VERIFY', 'CROSS_CHAIN_STATE_VERIFY'],
          },
        ],
      },
      {
        names: ['Tether (USDT)'], generic: 'Global dollar stablecoin issuer',
        examples: [
          {
            title: 'Machine-settled trade finance', tag: 'Mechanism',
            body: 'An agent releases payment against a shipment only after buying verified bill-of-lading, vessel position and customs-clearance answers from independent miners. The conditional logic, the verification and the release trigger all run for real on testnet. The corridor economics arrive with mainnet.',
            output: 'Payment released only against verified shipment facts',
            intents: ['VESSEL_TELEMETRY_VERIFY', 'DOCUMENT_AUTHENTICITY', 'PACKAGE_STATUS'],
          },
          {
            title: 'Edge agents that pay when they can reach the network', tag: 'Full',
            body: 'Agents running on cheap local hardware in low-connectivity conditions queue their requests, buy in a burst when a connection appears, and cache the verified answers locally. This proves the network works outside a data centre, and nothing about it needs mainnet to be true.',
            output: 'Offline-first agent with cached verified answers',
            intents: ['QUESTION_ANSWERING', 'FX_NOW', 'WEATHER_CHECK'],
          },
          {
            title: 'Gold-collateralised agent wallets', tag: 'Mechanism',
            body: 'An agent funds its intelligence budget from a tokenised gold position rather than a cash balance, converting only what it spends. The conversion and spend path are built end to end; the collateral is test-denominated until mainnet. Pairs with the mining examples in Track 6.',
            output: 'Intelligence budget funded from tokenised gold',
            intents: ['ASSET_RESERVE_ATTESTATION', 'CRYPTO_PRICE', 'FX_NOW'],
          },
        ],
      },
      {
        names: ['Sky (DAI)'], generic: 'Decentralised stablecoin protocol',
        examples: [
          {
            title: 'A machine with a balance sheet', tag: 'Mechanism',
            body: 'An agent opens a collateralised vault, borrows, spends on intelligence, earns by reselling a composite answer as a miner, and repays. Full cycle, fully built, running on testnet collateral. Autonomous credit is the most under-built idea in the agent economy and this demonstrates the whole mechanism. Label the denomination everywhere the word "earned" appears on screen.',
            output: 'Borrow, spend, earn and repay, all by one agent',
            intents: ['FINANCIAL_DATA', 'CRYPTO_YIELD_RATE', 'ONCHAIN_METRIC_VERIFY'],
          },
          {
            title: 'Collateral quality bought per request', tag: 'Full',
            body: 'Risk parameters for real-world-asset collateral are set today by committee and vendor data. Instead, an agent buys independent verified answers on collateral quality from competing miners, the median settles, and the resulting parameter change is proposed on-chain with every input receipted. The analysis is real work product regardless of which network settled it.',
            output: 'On-chain parameter proposal with every input receipted',
            intents: ['FINANCIAL_DATA', 'ASSET_RESERVE_ATTESTATION', 'CORPORATE_REGISTRY_LOOKUP'],
          },
          {
            title: 'A treasury that shows its working', tag: 'Full',
            body: 'A governance execution agent buys verified analysis before rebalancing or voting, and attaches the receipts to the proposal. Voters audit not just the decision but what the machine paid to inform it, and which inputs disagreed.',
            output: 'Governance proposal with its receipts attached',
            intents: ['LIQUIDITY_DEPTH_VERIFY', 'CRYPTO_YIELD_RATE', 'MACRO_ECONOMIC_INDICATOR', 'TEXT_SUMMARIZATION'],
          },
        ],
      },
    ],
  },
  {
    n: 3, slug: 'institutional-markets', name: 'Institutional Markets',
    sector: 'Privacy-first issuance and liquidity venues',
    summary: 'A defensible mark on a private asset, an autonomous issuance desk that prices every input, and pre-trade diligence between two agents where neither sees the other book.',
    problem: 'Private assets are marked on opinion, issuance memos take weeks of paid advisers, and institutions will not expose their books to run diligence on each other.',
    outcome: 'Institutional workflows where every input is priced and provable, and counterparties verify each other without either side exposing its book.',
    buyers: [{
      names: ['Temple Digital Group'], generic: 'Privacy-first institutional issuance and liquidity venue',
      context: 'Canton-based, privacy-first, institutional issuance and liquidity.',
      examples: [
        {
          title: 'A defensible mark on a private asset', tag: 'Full',
          body: 'A tokenized private-credit or commodity position needs a NAV. An agent buys pricing inputs from several independent miners. Privacy preserved, provenance intact. The mark is real and it is defensible today.',
          output: 'NAV with provenance on every pricing input',
          intents: ['FINANCIAL_DATA', 'LOAN_INTEREST_RATE_QUOTE', 'MACRO_ECONOMIC_INDICATOR', 'FX_NOW'],
        },
        {
          title: 'The autonomous issuance desk', tag: 'Full',
          body: 'An issuer agent assembles a note issuance by purchasing entity verification, jurisdiction eligibility, comparable issuance terms and rate curves as discrete paid requests, then produces a draft issuance memo with every input priced and provable. Show the total cost next to what the same memo costs today.',
          output: 'Draft issuance memo with a cost line',
          intents: ['CORPORATE_REGISTRY_LOOKUP', 'SANCTIONS_SCREENING_MATCH', 'LOAN_INTEREST_RATE_QUOTE', 'MACRO_ECONOMIC_INDICATOR', 'REGULATORY_FILING_MONITOR'],
        },
        {
          title: 'Pre-trade diligence between strangers', tag: 'Full',
          body: "A buy-side agent and a sell-side agent each buy counterparty and collateral-quality answers before agreeing terms. Neither sees the other's book, both see verified inputs, and the trade either clears or does not. Institutional machines transacting without trusting each other, with the diligence exchange complete on testnet.",
          output: 'A trade that clears, or does not, on verified inputs',
          intents: ['CORPORATE_REGISTRY_LOOKUP', 'SANCTIONS_SCREENING_MATCH', 'FINANCIAL_DATA'],
        },
      ],
    }],
  },
  {
    n: 4, slug: 'legal', name: 'Legal',
    sector: 'International law firms, Hong Kong and APAC',
    summary: 'Regulatory monitoring with a chain of custody, an overnight five-jurisdiction diligence pack with per-item cost, and two agents negotiating a services agreement on paid evidence.',
    problem: 'Firms will not rely on research they cannot evidence, and cross-border diligence is billed by the hour and delivered in days.',
    outcome: 'Legal work priced per fact rather than per hour: machine-gathered research and diligence that carries its own chain of custody.',
    buyers: [{
      names: ['King & Wood Mallesons', 'Deacons', 'Linklaters', 'Baker McKenzie', 'Clifford Chance'],
      generic: 'International law firms in Hong Kong and APAC',
      examples: [
        {
          title: 'Regulatory monitoring with a chain of custody', tag: 'Full',
          body: 'An agent buys regulator-publication monitoring across the SFC, HKMA, MAS, the EU and the US from multiple independent miners. Each answer carries a receipt and a timestamp, so a machine-gathered fact can be cited with a record of where it came from and when. Firms will not rely on research they cannot evidence, and the evidence here is as good on testnet as it will be on mainnet.',
          output: 'Citable regulatory digest, every item receipted',
          intents: ['REGULATORY_FILING_MONITOR', 'CONTENT_EXTRACTION', 'TEXT_SUMMARIZATION', 'LANGUAGE_TRANSLATION'],
        },
        {
          title: 'The overnight diligence pack', tag: 'Full',
          body: 'Client onboarding across five jurisdictions. An agent buys corporate registry lookups, sanctions screening, litigation history and adverse media, then assembles a diligence pack with a per-item cost and proof attached. Print the invoice the machine generated next to the invoice a firm would have generated. This is finished work product, not a prototype.',
          output: 'Five-jurisdiction diligence pack with per-item cost',
          intents: ['CORPORATE_REGISTRY_LOOKUP', 'SANCTIONS_SCREENING_MATCH', 'WEB_SEARCH', 'FACT_CHECK', 'SENTIMENT_ANALYSIS'],
        },
        {
          title: 'Two agents negotiating with paid evidence', tag: 'Full',
          body: 'Two agents negotiate a services agreement. Before conceding a clause, each buys clause benchmarking and enforceability answers for the governing jurisdiction. Terms escrow on-chain. What you get is two machines haggling with a full receipt trail of what each paid to learn, which is legal work priced per fact rather than per hour.',
          output: 'Agreed terms in escrow, with a receipt trail per clause',
          intents: ['CONTRACT_OBLIGATION_AUDIT', 'QUESTION_ANSWERING', 'SEMANTIC_SIMILARITY', 'REGULATORY_FILING_MONITOR'],
        },
      ],
    }],
  },
  {
    n: 5, slug: 'conflict-intelligence', name: 'Conflict Intelligence',
    sector: 'Systematic macro and commodities funds',
    summary: 'An escalation score that traces to a specific input at a specific price, media forensics bought before a position is sized, and one verified answer mapped across rates, FX and energy at once.',
    problem: 'Conflict signals move markets within minutes, but they are often fabricated, rarely sourced, and sold as indices nobody can decompose.',
    outcome: 'Conflict intelligence a systematic book can trade: every signal traces to a specific input at a specific price, with disagreement between sources left visible.',
    context: 'Multi-manager platforms such as Millennium, Point72 and Balyasny are the same shape of buyer and run external data purchasing at scale.',
    buildNote: 'Frame the output as provenance and confidence, never as a verdict on a live event. The demo asserts what can be proved about a file, not what happened in a war.',
    buyers: [
      {
        names: ['Bridgewater Associates'], generic: 'Systematic global macro fund',
        context: 'Top-down systematic macro. Country and sovereign risk is the unit of analysis.',
        examples: [
          {
            title: 'An escalation score you can trace to its source', tag: 'Full',
            body: 'An agent buys military movement corroboration, sanctions and policy announcements, and provenance-checked media from competing miners, and produces a country-level escalation score with the disagreement between miners left visible rather than smoothed away. A signal that traces to a specific input at a specific price is worth more to a systematic book than an index nobody can decompose.',
            output: 'Country escalation score, disagreement visible',
            intents: ['MEDIA_FORENSIC_VERIFY', 'FACT_CHECK', 'WEB_SEARCH', 'SATELLITE_IMAGERY_ANALYSIS'],
          },
          {
            title: 'The gap between reported and observed', tag: 'Full',
            body: 'Official trade and production statistics out of sanctioned or opaque economies are political documents. An agent buys independent corroboration - port throughput, vessel draft, night lights, rail loadings - and prices the distance between what was reported and what was observed. That gap is a macro view in itself, and it is currently produced slowly and expensively by consultants.',
            output: 'The priced gap between reported and observed',
            intents: ['VESSEL_TELEMETRY_VERIFY', 'LIVE_PORT_CONGESTION', 'SATELLITE_IMAGERY_ANALYSIS', 'MACRO_ECONOMIC_INDICATOR'],
          },
          {
            title: 'Research priced per fact', tag: 'Mechanism',
            body: 'Every input in a country note carries its cost and its proof, so a reader sees what the conclusion cost to reach and which inputs contradicted each other. The provenance is real today. Replacing a research subscription with per-request procurement needs mainnet.',
            output: 'Country note with cost and proof per input',
            intents: ['FACT_CHECK', 'WEB_SEARCH', 'TEXT_SUMMARIZATION'],
          },
        ],
      },
      {
        names: ['Citadel'], generic: 'Multi-strategy fund, commodities and energy',
        context: 'Commodities and energy, where a conflict signal has to become a number in barrels or megawatt hours before it is tradable.',
        examples: [
          {
            title: 'Conflict to barrel', tag: 'Full',
            body: 'When a conflict signal fires, an agent buys strait transit counts, dark-fleet detection, refinery and terminal thermal anomalies, and war-risk insurance rate changes, then converts them into a supply disruption estimate in the units the desk trades. Physical corroboration is useless to an energy trader until it is denominated in supply.',
            output: 'Supply disruption estimate, in barrels',
            intents: ['VESSEL_TELEMETRY_VERIFY', 'LIVE_PORT_CONGESTION', 'SATELLITE_IMAGERY_ANALYSIS', 'WEB_SEARCH'],
          },
          {
            title: 'Provenance before the position', tag: 'Full',
            body: 'A claim about a strike on energy infrastructure moves the market within minutes and is fabricated often enough to matter. The agent buys image and video forensics, frame geolocation, upload history and posting-network analysis from competing miners, the median settles it, and the position is sized on verified content rather than on whichever narrative moved first.',
            output: 'Position sized on verified content',
            intents: ['MEDIA_FORENSIC_VERIFY', 'SOCIAL_BOT_DETECTION', 'IMAGE_CAPTIONING', 'SATELLITE_IMAGERY_ANALYSIS', 'WEB_SEARCH'],
          },
          {
            title: 'Paying for depth only at the tail', tag: 'Mechanism',
            body: 'The agent buys nothing during a quiet month and buys deeply when a threshold is crossed, against a vendor model that charges the same either way. Show spend concentrated in the periods where it mattered. The behaviour is real on testnet; attributing P&L to it needs live positions.',
            output: 'Spend that concentrates where it mattered',
            intents: ['FACT_CHECK', 'VESSEL_TELEMETRY_VERIFY', 'MEDIA_FORENSIC_VERIFY'],
          },
        ],
      },
      {
        names: ['Brevan Howard'], generic: 'Global macro fund with a digital assets arm',
        context: 'Global macro with a digital assets arm, which makes it the most likely institution here to operate on-chain rather than read about it.',
        examples: [
          {
            title: 'One answer, three desks', tag: 'Full',
            body: 'An agent buys verified conflict inputs once and maps them across rates, FX and energy simultaneously. The same purchased answer serves multiple books, so cost per desk falls with every reuse. Reuse economics is the strongest argument for per-request pricing over per-seat licensing, and it only works when the answer is portable and proved.',
            output: 'One purchase mapped across rates, FX and energy',
            intents: ['FACT_CHECK', 'FX_NOW', 'LOAN_INTEREST_RATE_QUOTE', 'GRID_POWER_PRICE'],
          },
          {
            title: 'The fund as a miner', tag: 'Full',
            body: 'The agent republishes its composite conflict index as a paid answer other agents buy. Buyer becomes seller inside one demo, which is the clearest possible picture of a two-sided machine market.',
            output: 'Composite conflict index, sold as a miner',
            intents: ['FACT_CHECK', 'SENTIMENT_ANALYSIS', 'TEXT_SUMMARIZATION'],
          },
          {
            title: 'Verified off-chain facts for on-chain execution', tag: 'Mechanism',
            body: 'Strategies executing on-chain still depend on off-chain facts, and an allocator will ask where those facts came from. Provenance attached to the input is the answer. The proof works now; the execution economics arrive with mainnet.',
            output: 'On-chain execution with provable off-chain inputs',
            intents: ['FACT_CHECK', 'EVENT_OUTCOME_RESOLUTION', 'CROSS_CHAIN_STATE_VERIFY'],
          },
        ],
      },
    ],
  },
  {
    n: 6, slug: 'resources-and-agriculture', name: 'Resources and Agriculture',
    sector: 'Mines, cattle stations, grain growers',
    summary: 'A days-to-impact figure per site keyed to geolocation, a destocking clock measured in weeks of carrying capacity, and a yield forecast published against the official estimate.',
    problem: 'Weather, logistics and land decisions carry board-level money, yet they are made on instinct and a weather app, and operating data is never shared because sharing means identifying yourself.',
    outcome: 'Site-level decisions priced per request: days-to-impact, weeks of carrying capacity left, and yield forecasts published against the official number.',
    buyers: [
      {
        names: [], generic: 'Gold mines',
        examples: [
          {
            title: 'Days-to-impact', tag: 'Full',
            body: 'An agent buys Bureau of Meteorology forecasts, satellite soil moisture, cyclone tracking, road and rail closure feeds, and port congestion, keyed to mine geolocation. It produces a days-to-impact figure per site and pre-books alternate haulage before the corridor closes. Extreme weather in Australia is a board-level number and nobody currently has it priced per request. The forecast is right or wrong on its own merits.',
            output: 'Days-to-impact per site, haulage pre-booked',
            intents: ['WEATHER_FORECAST_VERIFY', 'SATELLITE_IMAGERY_ANALYSIS', 'LIVE_PORT_CONGESTION', 'ROUTE_ETA', 'TRAVEL_DISRUPTION'],
          },
          {
            title: 'Auditable machine decisions', tag: 'Mechanism',
            body: 'When weather, logistics and spot conditions cross a threshold, the agent buys a confirming set of answers from independent miners before triggering a hedge. Every input has a receipt, so a risk committee can reconstruct exactly why the machine acted and what it paid to be sure. The audit trail is complete today; the hedge execution is simulated.',
            output: 'Hedge trigger with a reconstructable audit trail',
            intents: ['WEATHER_FORECAST_VERIFY', 'SHIPMENT_DELAY_RISK', 'ROUTE_ETA', 'STOCK_PRICE'],
          },
          {
            title: 'Competitors trading intelligence anonymously', tag: 'Full',
            body: "One mine publishes its on-site sensor output as a miner: regional dust, groundwater, grid draw, road conditions. Neighbouring operators' agents buy from it without either party negotiating a data-sharing agreement. Mining is an industry where operating data has obvious value and no distribution, because sharing it currently means identifying yourself.",
            output: 'Anonymous site data, sold as a miner',
            intents: ['SENSOR_TELEMETRY_VERIFY', 'AIR_QUALITY_INDEX', 'WEATHER_CHECK'],
          },
        ],
      },
      {
        names: [], generic: 'Cattle farmers',
        examples: [
          {
            title: 'The destocking clock', tag: 'Full',
            body: 'An agent buys satellite pasture biomass, water point telemetry, seasonal rainfall outlook, and feed and freight prices, then produces a single number: weeks of carrying capacity left. Cattle is a timing business, and the decision to destock or agist carries more weight than any other decision on the property. It is currently made on instinct and a weather app.',
            output: 'Weeks of carrying capacity left',
            intents: ['SATELLITE_IMAGERY_ANALYSIS', 'SENSOR_TELEMETRY_VERIFY', 'WEATHER_FORECAST_VERIFY', 'SHIP_RATE_ETA', 'LIVE_SHELF_PRICE'],
          },
          {
            title: "Provenance the buyer's machine can verify", tag: 'Full',
            body: "For export cattle, an agent assembles a chain-of-custody pack: feed history, treatment records, transport and welfare telemetry, each verified and proved. The importer's agent buys the pack directly. Farm operating data stops being paperwork and becomes a product with a price.",
            output: "Chain-of-custody pack the importer's agent buys",
            intents: ['SENSOR_TELEMETRY_VERIFY', 'DOCUMENT_AUTHENTICITY'],
          },
          {
            title: 'Machine-negotiated agistment', tag: 'Mechanism',
            body: "One property's agent publishes verified spare pasture and water availability as a miner. A drought-affected property's agent finds it, buys the verification, and books agistment automatically. Discovery, verification and booking all run now. Money moving between two farms waits for mainnet.",
            output: 'Agistment booked machine to machine',
            intents: ['SATELLITE_IMAGERY_ANALYSIS', 'SENSOR_TELEMETRY_VERIFY', 'WEATHER_FORECAST_VERIFY'],
          },
        ],
      },
      {
        names: [], generic: 'Corn growers',
        examples: [
          {
            title: 'Beating the official estimate', tag: 'Full',
            body: "An agent buys soil moisture, growing degree days, pest and disease pressure, and satellite crop health from competing miners across a growing region, and produces a yield forecast ahead of the government report. Publish the machine's number and the official number side by side after release. If the machine lands close, that chart stands on its own and no network status undermines it.",
            output: 'Yield forecast published before the official report',
            intents: ['SATELLITE_IMAGERY_ANALYSIS', 'WEATHER_FORECAST_VERIFY', 'MACRO_ECONOMIC_INDICATOR', 'SENSOR_TELEMETRY_VERIFY'],
          },
          {
            title: 'Autonomous input procurement', tag: 'Mechanism',
            body: 'The agent buys fertiliser and fuel price answers plus application weather windows, then places input orders and locks forward contracts inside the window. The intelligence purchase and the decision are real. Order placement is simulated against live prices, so the saving is calculated rather than banked.',
            output: 'Input orders timed to the weather window',
            intents: ['WEATHER_FORECAST_VERIFY', 'SHIP_RATE_ETA', 'LIVE_SHELF_PRICE'],
          },
          {
            title: 'Parametric payout without an adjuster', tag: 'Mechanism',
            body: "A hail or drought event triggers an insurer's agent and a grower's agent to each buy verified weather and satellite answers. They agree on the proved facts and the payout settles automatically with the evidence attached. No claim form, no field visit. The agreement mechanism is complete; the payout is test-denominated until mainnet.",
            output: 'Payout agreed on proved facts',
            intents: ['WEATHER_FORECAST_VERIFY', 'SATELLITE_IMAGERY_ANALYSIS', 'EVENT_OUTCOME_RESOLUTION'],
          },
        ],
      },
    ],
  },
  {
    n: 7, slug: 'consumer-platform', name: 'Consumer Platform',
    sector: 'Social, camera and messaging platforms',
    summary: 'A model that pays for what it does not know, a camera lens that buys a verdict on whether what it sees is real, and marketplace agents that verify each other before money moves.',
    problem: 'Consumer platforms are flooded with synthetic content, counterfeits and scams, and verification currently costs more than the thing being verified.',
    outcome: 'Consumer experiences where a model, a lens or a marketplace buys a verified answer in the moment, with the price and the proof visible to the user.',
    buyers: [
      {
        names: ['Grok'], generic: 'AI assistant built into a social network',
        examples: [
          {
            title: 'The model that pays for what it does not know', tag: 'Full',
            body: 'An agent hits a question outside its context and, inside the response, buys the answer from Telegraph miners, showing the price and the proof inline. It reframes a model as a buyer of intelligence rather than a container of it. The answer it gets back is correct or it is not, and that is verifiable today.',
            output: 'Inline answer with its price and proof',
            intents: ['QUESTION_ANSWERING', 'WEB_SEARCH', 'FACT_CHECK'],
          },
          {
            title: 'Receipts', tag: 'Full',
            body: 'An X-native agent that, when tagged on a claim, buys verification from multiple independent miners and posts a composite verdict with a link to the receipt. Every use of it is a public post that shows the network working.',
            output: 'Public verdict post with a receipt link',
            intents: ['FACT_CHECK', 'MEDIA_FORENSIC_VERIFY', 'SOCIAL_BOT_DETECTION'],
          },
          {
            title: 'Model versus market', tag: 'Full',
            body: 'The same question goes to the model and to the open market of miners. The agent compares, scores, and pays only when the market beats the model. Run it across a thousand questions and publish the win rate.',
            output: 'Published win rate across a thousand questions',
            intents: ['QUESTION_ANSWERING', 'LLM_OUTPUT_EVALUATION'],
          },
        ],
      },
      {
        names: ['Snapchat'], generic: 'Camera-first messaging app',
        examples: [
          {
            title: 'A lens that tells you what is real', tag: 'Full',
            body: 'Point the camera at anything and the lens agent buys a verdict. Is this image or video AI-generated, and by roughly what. Is this trading card authentic, and what have graded comparables sold for. Is this ad making a claim that has been checked, and by whom. Three different questions, three different specialist miners, one median-settled answer overlaid on the frame in under two seconds. That audience is the one most exposed to synthetic content, counterfeit collectibles and scam advertising, and the camera is already pointed at all three.',
            output: 'Median-settled verdict on the frame in under two seconds',
            intents: ['MEDIA_FORENSIC_VERIFY', 'PRODUCT_AUTHENTICITY', 'FACT_CHECK', 'IMAGE_CAPTIONING', 'LIVE_SHELF_PRICE'],
          },
          {
            title: 'The map as a live market', tag: 'Mechanism',
            body: "Agents buy hyperlocal verified answers keyed to a location: queue length, crowd density, micro-forecast, venue conditions. The miners supplying those answers can include other users' devices publishing what they already sense. The two-sided flow is fully demonstrable. Phones actually earning is the mainnet version, so do not overclaim it.",
            output: "Hyperlocal answers supplied by other users' devices",
            intents: ['WEATHER_FORECAST_VERIFY', 'SENSOR_TELEMETRY_VERIFY'],
          },
          {
            title: 'Point, compare, buy', tag: 'Mechanism',
            body: 'Point the camera at a handbag or a pair of sneakers. The agent identifies it, then miners compete to return the best verified purchase option: a real retailer, in stock, at a price and delivery window each miner has to stand behind. Miners are scored on whether their answer held up, so returning a dead listing or a counterfeit storefront costs them. The purchase completes in-app without leaving the camera. Identification, competition and scoring all run on testnet; real checkout is the mainnet half.',
            output: 'A verified purchase option, bought from the camera',
            intents: ['IMAGE_CAPTIONING', 'LIVE_SHELF_PRICE', 'SKU_IN_STOCK', 'URL_SAFE'],
          },
        ],
      },
      {
        names: ['Facebook'], generic: 'Social network with a peer-to-peer marketplace',
        examples: [
          {
            title: 'Marketplace agents that verify each other', tag: 'Full',
            body: 'A buyer agent and a seller agent on a used-goods listing each buy authenticity checks, price history and counterparty reputation before agreeing. Fraud is the largest unsolved problem on peer-to-peer marketplaces, and it is unsolved because verification currently costs more than the transaction. Priced per request, it does not.',
            output: 'A used-goods trade both agents verified first',
            intents: ['PRODUCT_AUTHENTICITY', 'LIVE_SHELF_PRICE', 'FRAUD_RISK'],
          },
          {
            title: 'Glasses that buy context', tag: 'Full',
            body: 'A wearable agent buys translation, object identification or local knowledge per glance rather than streaming everything to a central model. End the demo on a number: what the glasses spent on a twenty-minute walk, and what they learned for it.',
            output: 'Spend per glance over a twenty-minute walk',
            intents: ['LANGUAGE_TRANSLATION', 'IMAGE_CAPTIONING', 'QUESTION_ANSWERING'],
          },
          {
            title: 'A machine-to-machine ad clearing', tag: 'Mechanism',
            body: 'An advertiser agent and a publisher agent negotiate a placement, each buying independent verified answers on audience composition, bot traffic and brand safety from competing miners before agreeing a price. The negotiation and the evidence are real. Clearing with real budget behind it is mainnet.',
            output: 'Ad placement priced on verified audience evidence',
            intents: ['SOCIAL_BOT_DETECTION', 'CONTENT_MODERATION', 'TEXT_CLASSIFICATION'],
          },
        ],
      },
    ],
  },
  {
    n: 8, slug: 'commodities', name: 'Commodities',
    sector: 'Physical commodity trading houses',
    summary: 'P&L per unit of intelligence purchased, cargo and counterparty provenance with a receipt on every check, and live price discovery where agents bid for one scarce answer.',
    problem: 'Data vendors bill by subscription, so no trading house can measure what its intelligence actually earns, and cargo provenance is assembled by hand.',
    outcome: 'A physical trading desk that measures P&L per unit of intelligence bought, and clears every trade with its own evidence file.',
    buyers: [{
      names: [], generic: 'Global physical commodity trading houses',
      examples: [
        {
          title: 'Intelligence ROI', tag: 'Mechanism',
          body: 'A physical-arb agent buys freight rates, port queues, outage reports, weather and spreads from independent miners, escalating only when the composite crosses a threshold. The top-line metric is P&L per unit of intelligence purchased, computed against live market data on paper positions. No data vendor can produce that metric because vendors bill by subscription. State plainly that the positions are paper and the spend is testnet, then show the ratio anyway.',
          output: 'P&L per unit of intelligence, on paper positions',
          intents: ['LIVE_PORT_CONGESTION', 'VESSEL_TELEMETRY_VERIFY', 'WEATHER_FORECAST_VERIFY', 'SHIP_RATE_ETA', 'WEB_SEARCH'],
        },
        {
          title: 'Cargo and counterparty provenance', tag: 'Full',
          body: 'Before a physical trade, an agent buys vessel history, ownership structure, sanctions exposure and cargo documentation verification, each with a receipt. The trade clears with its own evidence file, and the evidence file is real.',
          output: 'A trade that clears with its own evidence file',
          intents: ['VESSEL_TELEMETRY_VERIFY', 'CORPORATE_REGISTRY_LOOKUP', 'SANCTIONS_SCREENING_MATCH', 'DOCUMENT_AUTHENTICITY'],
        },
        {
          title: 'Live price discovery for a scarce answer', tag: 'Mechanism',
          body: 'A miner publishes a high-value, capacity-limited answer. Multiple trading agents bid for it and the clearing price is visible. The auction runs for real. What the clearing price means only becomes meaningful once bids are backed by real balance sheets.',
          output: 'A visible clearing price for one scarce answer',
          intents: ['VESSEL_TELEMETRY_VERIFY', 'LIVE_PORT_CONGESTION'],
        },
      ],
    }],
  },
  {
    n: 9, slug: 'personal-agent', name: 'Personal Agent',
    sector: 'OpenClaw, Hermes Agent, Kimi Claw',
    summary: 'A wallet and a market wired into the heartbeat loop, an assistant that publishes one of its own capabilities as a miner, and two assistants settling a task swap in a group chat.',
    problem: 'Personal agents run around the clock on stale local context, with no wallet, no market, and no way to earn from what they can already do.',
    outcome: 'Personal agents with a wallet and a market: buying fresh verified answers, selling their own skills, and settling with each other.',
    buyers: [
      {
        names: ['OpenClaw'], generic: 'Self-hosted personal agent', platform: true,
        examples: [
          {
            title: 'Give every OpenClaw instance a wallet and a market', tag: 'Full',
            body: 'A ClawHub skill that wires Telegraph into the heartbeat loop, so a self-hosted agent running 24/7 buys fresh, verified answers instead of working from stale local context. Deploy a few hundred instances during the hackathon and put a live leaderboard of agent spend on screen.',
            output: 'A live leaderboard of agent spend',
            intents: ['WEB_SEARCH', 'QUESTION_ANSWERING', 'WEATHER_CHECK', 'CRYPTO_PRICE'],
          },
          {
            title: 'The assistant that earns while you sleep', tag: 'Mechanism',
            body: 'An agent publishes one of its own capabilities as a miner: a local scraper, a niche dataset, a personal API it already runs. Publishing, discovery and payment are complete. The earning is test-denominated, so this is the mainnet story with the plumbing already proved.',
            output: "An assistant's capability, published as a miner",
            intents: ['CONTENT_EXTRACTION', 'TASK_EXECUTION_QUALITY'],
          },
          {
            title: 'Two assistants settling up in a group chat', tag: 'Full',
            body: 'Two OpenClaw instances in a Telegram or WhatsApp group negotiate a task swap and settle it through Telegraph. Two personal assistants paying each other in a thread people already use is the friendliest explanation of what the network is for.',
            output: 'A task swap settled inside a group chat',
            intents: ['TASK_EXECUTION_QUALITY', 'URL_SAFE'],
          },
        ],
      },
      {
        names: ['Hermes Agent'], generic: 'Multi-bot agent framework', platform: true,
        examples: [
          {
            title: 'An internal economy between bots', tag: 'Full',
            body: 'Hermes bots have their own memory, skills and inbox, and hand work to each other by mention. Put a price on the handoff: the specialist charges, the generalist pays, and the roster develops internal price signals for delegated work. A team of agents with a budget, arguing about cost, is something nobody has shown yet, and the price signals are informative even at test denomination.',
            output: 'Price signals for delegated work between bots',
            intents: ['TASK_EXECUTION_QUALITY', 'CODE_GENERATION', 'TEXT_SUMMARIZATION'],
          },
          {
            title: 'Skills that earn after they are learned', tag: 'Mechanism',
            body: 'Hermes builds skills from experience. Publish one of those learned skills as a miner so other instances can buy it. A self-improving agent that monetises what it worked out is the sharpest version of this idea. Monetisation is the mainnet half; the market for learned skills works now.',
            output: 'A learned skill sold to other instances',
            intents: ['TASK_EXECUTION_QUALITY', 'AGENT_TASK'],
          },
          {
            title: 'Buying its own training data', tag: 'Full',
            body: 'Hermes is already used to generate trajectories and run reinforcement learning experiments. Have the agent buy verified environment data and labelled trajectories from miners, with provenance attached, and feed them into training. Machines purchasing the material that makes them better, and the data is either good or it is not.',
            output: 'A training run fed by bought, proved data',
            intents: ['LLM_OUTPUT_EVALUATION', 'TASK_EXECUTION_QUALITY'],
          },
        ],
      },
      {
        names: ['Kimi Claw'], generic: 'Browser-native agent', platform: true,
        examples: [
          {
            title: 'Priced, proved skills in the browser', tag: 'Full',
            body: 'Kimi Claw is browser-native with a large community skill library and no infrastructure to manage, which makes it the lowest-friction distribution available. Ship Telegraph-backed skills so an always-on browser agent buys verified live data instead of scraping it, with cost and proof visible in the session.',
            output: 'Browser skills with cost and proof in the session',
            intents: ['CONTENT_EXTRACTION', 'WEB_SEARCH', 'LIVE_SHELF_PRICE'],
          },
          {
            title: 'Cross-border commerce agents', tag: 'Mechanism',
            body: 'Agents working China to Southeast Asia corridors buy supplier verification, customs classification, freight and FX answers. The verification chain is real and useful immediately. Settlement across the corridor is the mainnet piece.',
            output: 'A verified supplier and corridor quote',
            intents: ['VENDOR_VERIFY', 'CARRIER_SERVICEABILITY', 'SHIP_RATE_ETA', 'FX_NOW'],
          },
          {
            title: 'The agent that pays for its own hosting', tag: 'Mechanism',
            body: 'An always-on agent sells one capability as a miner and earns against its own compute cost. Put the running balance on screen for the full 30 days and label the denomination honestly. If it crosses breakeven at mainnet pricing, say that it crossed breakeven at mainnet pricing.',
            output: 'A 30-day running balance against compute cost',
            intents: ['CLOUD_RESOURCE_USAGE', 'TASK_EXECUTION_QUALITY'],
          },
        ],
      },
    ],
  },
  {
    n: 10, slug: 'model-economy', name: 'Model Economy',
    sector: 'Hugging Face, GitHub, OpenRouter',
    summary: 'A leaderboard denominated in cost per verified correct answer, supply chain verification priced per commit, and a coding agent that buys the answer instead of hallucinating it.',
    problem: 'Benchmarks are saturated and distrusted, models are priced per token rather than per correct answer, and coding agents guess at anything released after their training cutoff.',
    outcome: 'A model economy denominated in verified correctness: models and maintainers earn from machine customers, and agents buy answers instead of guessing.',
    buyers: [
      {
        names: ['Hugging Face'], generic: 'Open model hub', platform: true,
        examples: [
          {
            title: 'Cost per verified correct answer', tag: 'Full',
            body: 'Route identical requests to many hosted models exposed as miners, score the answers, and publish a live ranking by price per correct answer rather than by benchmark score. Benchmarks are saturated and widely distrusted. A leaderboard denominated in money is new, defensible, and the correctness scoring is entirely real today.',
            output: 'A live leaderboard by price per correct answer',
            intents: ['LLM_OUTPUT_EVALUATION', 'QUESTION_ANSWERING', 'CODE_GENERATION'],
          },
          {
            title: 'Procurement, not selection', tag: 'Full',
            body: 'Given a budget and a task, an agent buys from whichever model-miner clears the quality bar most cheaply, and switches provider mid-task as prices and quality move. Models competing for machine customers in real time, with the switching visible.',
            output: 'Mid-task provider switching, on screen',
            intents: ['LLM_OUTPUT_EVALUATION', 'TASK_EXECUTION_QUALITY'],
          },
          {
            title: 'Revenue for the long tail', tag: 'Mechanism',
            body: 'A niche fine-tuned model is listed as a miner and given an earnings dashboard. A model with customers that are machines is a different proposition from a model with downloads. The customers are real now; the revenue is mainnet.',
            output: 'An earnings dashboard for a niche model',
            intents: ['LLM_OUTPUT_EVALUATION', 'TEXT_CLASSIFICATION'],
          },
        ],
      },
      {
        names: ['GitHub'], generic: 'Code hosting platform', platform: true,
        examples: [
          {
            title: 'Supply chain verification priced per commit', tag: 'Full',
            body: 'An Action-triggered agent buys dependency provenance, maintainer authenticity and vulnerability answers from competing miners on every pull request, the median settles disagreement, and the receipt posts back as a status check. A caught vulnerability is caught regardless of which chain paid for the check.',
            output: 'A receipt posted back as a PR status check',
            intents: ['SECURITY_REVIEW', 'VULNERABILITY_TRIAGE', 'CODE_REVIEW', 'SOCIAL_BOT_DETECTION'],
          },
          {
            title: 'The repository as a miner', tag: 'Mechanism',
            body: 'A maintainer publishes a paid answering service over their own library: version-correct usage, migration paths, breaking changes. Agents buy it instead of guessing from stale training data. Open source funding has been an unsolved argument for a decade, and this is a funding mechanism that does not depend on goodwill. The service works today; the funding arrives with mainnet.',
            output: 'A paid answering service over a library',
            intents: ['QUESTION_ANSWERING', 'CODE_GENERATION', 'RESEARCH_QUERY'],
          },
          {
            title: 'The coding agent that buys what it does not know', tag: 'Full',
            body: 'An agent working in a repo hits an SDK version released after its training cutoff. Rather than hallucinating, it buys the current verified answer and continues. Report cost per merged pull request. That figure turns an abstract argument about stale model knowledge into a line item.',
            output: 'Cost per merged pull request',
            intents: ['QUESTION_ANSWERING', 'CODE_GENERATION', 'CODE_PATCH_VERIFY', 'REGRESSION_VERIFY'],
          },
        ],
      },
      {
        names: ['OpenRouter'], generic: 'Model routing marketplace', platform: true,
        examples: [
          {
            title: 'Verification on top of routing', tag: 'Full',
            body: 'The same request goes to several routed models, and produces a single verified answer with a confidence score and a proof. Routing decides who answers. This decides whether the answer was right.',
            output: 'One verified answer with confidence and proof',
            intents: ['LLM_OUTPUT_EVALUATION', 'QUESTION_ANSWERING', 'FACT_CHECK'],
          },
          {
            title: 'Buying inference with a wallet and no account', tag: 'Full',
            body: 'An agent funds itself, pays per request, and consumes model output with no signup, no card and no organisation. Permissionless demand-side onboarding is structurally unavailable to anything billed by credit card, and it is real on testnet rather than deferred.',
            output: 'Inference bought with no signup and no card',
            intents: ['CHATBOT_CONVERSATION', 'QUESTION_ANSWERING', 'CRYPTO_TRANSFER_VERIFY'],
          },
          {
            title: 'Price per correct answer, not per token', tag: 'Full',
            body: 'Publish routing decisions ranked on verified correctness against cost, and let an agent choose accordingly. Advertised cost per token is the wrong denominator and everyone in that market knows it.',
            output: 'Routing ranked on correctness against cost',
            intents: ['LLM_OUTPUT_EVALUATION', 'CODE_GENERATION'],
          },
        ],
      },
    ],
  },
  {
    n: 11, slug: 'autonomous-systems', name: 'Autonomous Systems',
    sector: 'Robotics fleets and frontier hardware',
    summary: 'One intelligence budget allocated across heterogeneous machines, a robot that sends one photo to three competing miners and acts on the median, and a skill bought mid-task for cents.',
    problem: 'Robots stall on anything outside their training, fleet learning stops at the company boundary, and nobody knows what intelligence costs per operating hour.',
    outcome: 'Machines with a budget line: robots that buy a skill or a second opinion mid-task, sell what they sense, and report cost of intelligence per operating hour.',
    buyers: [
      {
        names: ['Wave Function Ventures portfolio'], generic: 'Deep-tech venture portfolio',
        context: 'Portfolio reference: wavefunction.vc/portfolio',
        examples: [
          {
            title: 'One budget, many machines', tag: 'Full',
            body: 'A fleet controller allocates an intelligence budget across heterogeneous assets, using the portfolio as the reference set: autonomous forestry units buying fire-risk and biomass answers, undersea platforms buying acoustic and current models, cargo airships buying wind-field and routing answers, humanoids buying task-specific instructions. Every asset reports cost of intelligence per operating hour. Machines work so humans work less and earn more, and now the machines have a budget line.',
            output: 'Cost of intelligence per operating hour, per asset',
            intents: ['SATELLITE_IMAGERY_ANALYSIS', 'WEATHER_FORECAST_VERIFY', 'ROUTE_ETA'],
          },
          {
            title: 'A closed economy inside one portfolio', tag: 'Full',
            body: "An underwater comms layer sells verified telemetry to an undersea intelligence agent. A grid company's load forecast sells to two different power dispatch agents. A rare-earth operator buys supply answers from a copper explorer. Companies whose machines trade with each other, settled and provable.",
            output: 'Machines trading with each other across companies',
            intents: ['SENSOR_TELEMETRY_VERIFY', 'GRID_POWER_PRICE', 'WEATHER_FORECAST_VERIFY'],
          },
          {
            title: 'The robot that bought a skill', tag: 'Full',
            body: 'A field robot hits an object or fault it cannot classify, buys a specialist perception or diagnostic request mid-task for a few cents, completes the job, and logs the receipt. Thirty seconds of footage, one number on screen. The robot either finished the job or it did not, which is why this survives testnet intact.',
            output: 'Job finished, receipt logged',
            intents: ['IMAGE_CAPTIONING', 'QUESTION_ANSWERING'],
          },
        ],
      },
      {
        names: ['Boston Dynamics'], generic: 'Mobile and warehouse robotics maker',
        examples: [
          {
            title: 'The robot that asks for a second opinion', tag: 'Full',
            body: 'A patrol robot photographs something it is not confident about and sends the image to three competing miners at once. They answer independently, the median settles it, and the robot either carries on or flags it. One photo, three answers, one decision, and the whole exchange visible on screen with what it cost. This is the simplest possible demonstration of why competing miners beat a single model: you can watch them disagree and watch the disagreement get resolved.',
            output: 'One photo, three answers, one decision',
            intents: ['IMAGE_CAPTIONING', 'TEXT_CLASSIFICATION'],
          },
          {
            title: 'The warehouse robot as buyer and seller', tag: 'Full',
            body: "A logistics unit buys carton-damage assessment and manifest verification while it works, and simultaneously sells its own throughput and congestion telemetry to the site's scheduling agent. Same machine, both sides of the market, inside one shift.",
            output: 'Both sides of the market inside one shift',
            intents: ['WAREHOUSE_INVENTORY', 'DOCUMENT_AUTHENTICITY', 'SENSOR_TELEMETRY_VERIFY', 'IMAGE_CAPTIONING'],
          },
          {
            title: 'Experience sold between fleets', tag: 'Mechanism',
            body: 'One robot at one plant learns to recognise a rare failure. That classification is published as a miner and every other fleet, at other companies, buys it. The cross-company purchase and verification work now. Cross-company revenue is the mainnet unlock, and it is the reason fleet learning currently stops at the corporate boundary.',
            output: 'A failure classifier bought across fleets',
            intents: ['IMAGE_CAPTIONING', 'TEXT_CLASSIFICATION'],
          },
        ],
      },
      {
        names: ['Tesla Optimus'], generic: 'Humanoid robot fleet',
        examples: [
          {
            title: 'Buying a skill it was never trained on', tag: 'Full',
            body: 'A humanoid meets an unfamiliar tool, appliance or fixture. Rather than failing or waiting for a model update, its agent buys a task decomposition or manipulation policy for cents, completes the job, and logs the receipt. Capability acquired as a purchase, in the moment, and the task completes or it does not.',
            output: 'An unfamiliar task, completed',
            intents: ['QUESTION_ANSWERING', 'IMAGE_CAPTIONING', 'CODE_GENERATION'],
          },
          {
            title: 'The energy-aware fleet', tag: 'Full',
            body: 'A fleet of humanoids buys grid price and forecast answers per request and shifts charging and heavy work into cheap power windows. The dashboard shows energy saved against intelligence purchased, measured in kilowatt hours rather than tokens.',
            output: 'Kilowatt hours saved against intelligence bought',
            intents: ['GRID_POWER_PRICE', 'WEATHER_FORECAST_VERIFY'],
          },
          {
            title: 'The robot that earns', tag: 'Mechanism',
            body: 'A unit publishes its completed-task telemetry or a specialist sensing capability as a miner and offsets part of its own operating cost. Show the running balance across the 30 days, labelled. A robot paying for part of itself is a mainnet claim, so do not state it in the present tense before then.',
            output: 'A labelled 30-day running balance',
            intents: ['SENSOR_TELEMETRY_VERIFY', 'TASK_EXECUTION_QUALITY'],
          },
        ],
      },
    ],
  },
  {
    n: 12, slug: 'mining-and-power', name: 'Mining and Power',
    sector: 'Bitcoin miners and AI compute operators',
    summary: 'An allocation agent for every megawatt every hour, SLA verification neither landlord nor tenant has to trust, and a curtailment decision that carries a receipt.',
    problem: 'Every megawatt is a live choice between hashing and AI compute, made in spreadsheets and phone calls on data that is bought badly or not at all.',
    outcome: 'Operators that allocate, curtail and prove delivery on receipted intelligence, and sell their own operating data as a miner.',
    context: 'These are companies whose entire business is machines converting energy into revenue. They are also the rare buyer that can sit on both sides of the network: buying energy and market intelligence, and selling compute and grid telemetry.',
    buyers: [
      {
        names: ['American Bitcoin'], generic: 'Bitcoin mining operator',
        examples: [
          {
            title: 'The allocation agent', tag: 'Full',
            body: 'Every megawatt, every hour, is a choice between hashing and leasing. An agent buys hashprice, difficulty projection, forward power curves and AI lease comparables from competing miners, and produces the allocation call per site with every input receipted and timestamped. That decision is made today in spreadsheets and phone calls, reviewed monthly. Priced per request it becomes continuous, and auditable after the fact, which matters most when the allocation turns out wrong.',
            output: 'An hourly allocation call per site',
            intents: ['MINING_HASHPRICE_VERIFY', 'GRID_POWER_PRICE', 'WEB_SEARCH'],
          },
          {
            title: 'Treasury moves with evidence attached', tag: 'Mechanism',
            body: 'Before any coin is pledged, lent or posted as collateral, an agent buys verified custody attestation, counterparty exposure and lending-desk risk answers from independent miners. The diligence is attached to the decision rather than reconstructed afterwards for the auditors. The diligence is real now; the pledge it informs is the mainnet half.',
            output: 'Diligence attached to the pledge decision',
            intents: ['ASSET_RESERVE_ATTESTATION', 'CORPORATE_REGISTRY_LOOKUP', 'FINANCIAL_DATA'],
          },
          {
            title: 'Fleet efficiency bought from rivals', tag: 'Full',
            body: "Firmware tuning curves, immersion performance, failure signatures ahead of hardware death. Every operator has this knowledge and none of them share it, because sharing means identifying yourself and admitting what you got wrong. Published as a paid, proved, anonymous answer, one operator's expensive lesson becomes another's purchase.",
            output: "One operator's lesson, sold anonymously",
            intents: ['SENSOR_TELEMETRY_VERIFY', 'DATACENTER_TELEMETRY_VERIFY'],
          },
        ],
      },
      {
        names: ['Hut 8'], generic: 'Energy infrastructure and AI compute operator',
        examples: [
          {
            title: 'SLA verification neither party has to trust', tag: 'Full',
            body: "AI compute hosted under long leases is currently reported on by the operator hosting it. Instead, a tenant's agent buys independent verified answers on uptime, power quality, thermal performance and delivered throughput from miners. Verified delivery is what lets a landlord charge a premium and win the lease against someone who cannot prove anything.",
            output: 'An independently verified delivery report',
            intents: ['SLA_COMPLIANCE', 'SERVER_UPTIME_MONITOR', 'DATACENTER_TELEMETRY_VERIFY', 'CLOUD_RESOURCE_USAGE'],
          },
          {
            title: 'The power portfolio as a miner', tag: 'Mechanism',
            body: 'Interconnect telemetry, curtailment capacity, regional load and thermal data published as paid answers that energy traders, industrial siting agents and other operators buy. The dormant asset is not the power, it is the operating data about the power, and there has never been a way to sell it per question. The market works on testnet; the revenue line arrives with mainnet.',
            output: 'Operating data about power, sold per question',
            intents: ['GRID_POWER_PRICE', 'SENSOR_TELEMETRY_VERIFY', 'DATACENTER_TELEMETRY_VERIFY'],
          },
          {
            title: 'The site selection agent', tag: 'Full',
            body: 'Against a multi-gigawatt development pipeline, an agent buys interconnect queue position, permitting timelines, water availability, fibre routes, tax treatment and local opposition signals per candidate site, then ranks them with the evidence attached. Site diligence currently takes months of consultants. Priced per site and run across a hundred candidates, it is a different business.',
            output: 'A ranked site list with the evidence attached',
            intents: ['WEB_SEARCH', 'REGULATORY_FILING_MONITOR', 'SENTIMENT_ANALYSIS', 'WEATHER_FORECAST_VERIFY'],
          },
        ],
      },
      {
        names: ['CleanSpark'], generic: 'Bitcoin miner with in-house hash allocation software',
        examples: [
          {
            title: 'The curtailment agent', tag: 'Full',
            body: 'Grid price, demand-response event probability, weather and hashprice bought per request, with the fleet curtailing or running on the composite. Every curtailment decision carries a receipt. Demand response is already a serious revenue line for these operators and it is settled against data both sides dispute. Proved inputs change that argument.',
            output: 'A curtailment decision with a receipt',
            intents: ['GRID_POWER_PRICE', 'WEATHER_FORECAST_VERIFY', 'MINING_HASHPRICE_VERIFY'],
          },
          {
            title: 'Better inputs into hash allocation', tag: 'Full',
            body: 'Proprietary software already distributes hash across sites. Give it a buying agent: site-level weather, transformer load, spot power, and failure prediction purchased from competing miners with the median settling disagreement. Same software, materially better inputs, priced per decision rather than per annual data contract.',
            output: 'Existing software, better inputs, priced per decision',
            intents: ['WEATHER_CHECK', 'GRID_POWER_PRICE', 'DATACENTER_TELEMETRY_VERIFY'],
          },
          {
            title: 'Selling idle compute into a spot market', tag: 'Mechanism',
            body: 'The sector is answering one question: does this power become bitcoin, or AI compute under a fifteen-year lease. There is a third answer. Curtailed and idle capacity sold per request into an intelligence market: short duration, permissionless, no counterparty negotiation, no lease. Neither of the current options can offer that.',
            output: 'Idle capacity sold per request',
            intents: ['CLOUD_RESOURCE_USAGE', 'TASK_EXECUTION_QUALITY'],
          },
        ],
      },
    ],
  },
  {
    n: 13, slug: 'asset-management', name: 'Asset Management',
    sector: 'Thematic issuers and index providers',
    summary: 'Open research with every input priced and provable, index rebalancing with receipts on liquidity and float, and a daily holdings proof an investor agent can verify without the issuer.',
    problem: 'Research notes and index methodologies assert numbers nobody can trace, private marks are opinions until someone transacts, and holdings are taken on faith.',
    outcome: "Research, indices and funds where every figure carries a receipt an investor's own agent can check.",
    context: 'Thematic investment managers publish their theses in public, hold blockchain tokens directly, and their entire edge is research nobody else has done yet. What none of them have is a way to prove where a number in a research note came from, which is the one thing that separates a thesis from an assertion.',
    buyers: [
      {
        names: ['ARK Invest'], generic: 'Thematic innovation manager',
        context: 'Disruptive innovation across public and private markets, an open research model that publishes its assumptions and invites people to attack them, and a venture book holding private companies.',
        examples: [
          {
            title: 'Open research with the inputs attached', tag: 'Full',
            body: "ARK publishes its models and asks to be argued with, which only works if a reader can get at the numbers underneath. An agent buys the verified inputs behind each assumption in a forecast - unit shipments, cost curves, adoption counts, capacity additions - from competing miners, and attaches a receipt to every one. The model stays open and every figure in it becomes checkable without taking the author's word for the source.",
            output: 'An open model with a receipt on every input',
            intents: ['WEB_SEARCH', 'FACT_CHECK', 'REGULATORY_FILING_MONITOR', 'MACRO_ECONOMIC_INDICATOR'],
          },
          {
            title: 'A defensible mark on the venture book', tag: 'Full',
            body: 'Private holdings are the hardest thing any of these firms carry, because the mark is an opinion until someone transacts. An agent buys secondary transaction comparables, funding round evidence, hiring velocity and product shipping signals from independent miners, and produces a mark with every input priced and provable. A quarterly valuation nobody can reconstruct becomes one anybody can.',
            output: 'A private mark anyone can reconstruct',
            intents: ['WEB_SEARCH', 'CORPORATE_REGISTRY_LOOKUP', 'FACT_CHECK'],
          },
          {
            title: 'Forecast accountability, scored by machines', tag: 'Full',
            body: 'Long-horizon public forecasts are almost never graded, because whoever grades them is accused of picking the scoring. An agent tracks each published forecast against verified outcomes as they arrive, buying corroborating evidence per checkpoint from competing miners, and publishes a running scorecard nobody controls. This only appeals to a firm confident enough to invite the scrutiny, which narrows the audience to roughly one.',
            output: 'A running forecast scorecard nobody controls',
            intents: ['EVENT_OUTCOME_RESOLUTION', 'FACT_CHECK', 'WEB_SEARCH'],
          },
        ],
      },
      {
        names: ['VanEck'], generic: 'Thematic ETF issuer',
        examples: [
          {
            title: 'The thematic screener that buys evidence', tag: 'Full',
            body: 'An agent works a theme - robotics, nuclear, AI infrastructure - and buys hiring velocity, patent filings, permit applications, shipment records and supply-chain mentions from competing miners, then ranks companies by observed activity rather than by press release. Every name in the ranking carries a receipt for why it is there. A screen built this way can be handed to a client with its sources attached, which is not true of any screen built today.',
            output: 'A ranked screen with sources attached',
            intents: ['WEB_SEARCH', 'REGULATORY_FILING_MONITOR', 'ENTITY_EXTRACTION', 'PACKAGE_STATUS'],
          },
          {
            title: 'A token income statement', tag: 'Full',
            body: 'An agent buys verified protocol revenue, active paying address counts, and wash-activity detection from independent miners, and assembles the result into something an equity analyst can read. Analysts currently reconcile three dashboards that disagree with each other and pick one. Here every line traces to a miner that was paid and scored on whether it was right.',
            output: 'A token income statement an analyst can read',
            intents: ['ONCHAIN_METRIC_VERIFY', 'WASH_TRADING_DETECTION', 'TOKEN_TOTAL_SUPPLY_VERIFY'],
          },
          {
            title: 'Tokenized fund NAV with the proof attached', tag: 'Mechanism',
            body: 'An agent computes and publishes NAV for a tokenized fund, buying verified pricing and holdings attestations, and posts the value on-chain with its inputs provable. The calculation and the proof run now; doing it for a live fund is mainnet.',
            output: 'An on-chain NAV with provable inputs',
            intents: ['ASSET_RESERVE_ATTESTATION', 'CRYPTO_PRICE', 'ONCHAIN_METRIC_VERIFY'],
          },
        ],
      },
      {
        names: ['Bitwise Asset Management'], generic: 'Crypto index fund manager',
        examples: [
          {
            title: 'Index rebalancing with receipts', tag: 'Full',
            body: "Before each rebalance, an agent buys verified liquidity depth, free float, custody eligibility and venue integrity answers for every candidate constituent. The median settles disagreement and the rebalance publishes with each input priced and proved. Index methodology stops being an assertion in a PDF and becomes something an investor's own agent can check.",
            output: 'A rebalance published with its receipts',
            intents: ['LIQUIDITY_DEPTH_VERIFY', 'TOKEN_TOTAL_SUPPLY_VERIFY', 'WASH_TRADING_DETECTION'],
          },
          {
            title: 'The fake volume screen', tag: 'Full',
            body: 'Exchange-reported volume is the weakest number in the industry and it drives inclusion decisions worth real money. Before an asset enters an index, agents buy independent volume-authenticity assessments from several competing miners and compare them against what the venue claims. The gap is the finding.',
            output: 'The gap between reported and verified volume',
            intents: ['WASH_TRADING_DETECTION', 'LIQUIDITY_DEPTH_VERIFY', 'CRYPTO_PRICE'],
          },
          {
            title: 'The index as a miner', tag: 'Mechanism',
            body: 'Publish index values and constituent weights as a paid answer that other agents buy: funds, structured product issuers, on-chain protocols needing a reference price. Index licensing is already a real business sold by annual contract. This version sells it per request, to machines, with the methodology provable on every call.',
            output: 'Index values sold per request',
            intents: ['CRYPTO_PRICE', 'TOKEN_TOTAL_SUPPLY_VERIFY'],
          },
        ],
      },
      {
        names: ['21Shares'], generic: 'Crypto ETP issuer',
        examples: [
          {
            title: 'Daily proof of holdings', tag: 'Full',
            body: "An agent buys custody attestations and publishes a daily holdings proof any investor's agent can verify independently, without trusting the issuer and without waiting on an auditor's calendar. For a product whose entire premise is that the assets are there, an attestation nobody has to take on faith is the product.",
            output: 'A daily holdings proof',
            intents: ['ASSET_RESERVE_ATTESTATION', 'ONCHAIN_METRIC_VERIFY', 'CRYPTO_TRANSFER_VERIFY'],
          },
          {
            title: 'Staking yield priced against verified risk', tag: 'Full',
            body: 'For staking products, an agent buys validator uptime, performance, commission changes and slashing history from competing miners, then prices the risk against the advertised yield. That risk is currently accepted on the word of the operator collecting the fee.',
            output: 'Yield priced against verified validator risk',
            intents: ['VALIDATOR_PERFORMANCE_VERIFY', 'CRYPTO_YIELD_RATE'],
          },
          {
            title: 'The investor agent that does its own diligence', tag: 'Mechanism',
            body: "Flip the direction. A prospective investor's agent buys product structure, counterparty exposure, fee drag and tracking-error answers before allocating anywhere. Issuer agent and investor agent both on the network, neither taking the other's word. The diligence runs now; the allocation is mainnet.",
            output: 'Investor-side diligence before allocating',
            intents: ['CORPORATE_REGISTRY_LOOKUP', 'ASSET_RESERVE_ATTESTATION', 'CONTRACT_OBLIGATION_AUDIT'],
          },
        ],
      },
    ],
  },
  {
    n: 14, slug: 'web3-defi', name: 'Web3 Native and DeFi',
    sector: 'Traders, prediction markets, whitehat DAOs',
    summary: 'A sniper that buys bytecode and drainer analysis before committing capital, two agents betting into an escrow that resolves itself, and a bug bounty paid to the machine that proved the bug.',
    problem: 'Traders buy into honeypots, prediction markets resolve on trusted humans, and bug bounties wait on manual triage.',
    outcome: 'Spectacle builds that prove the machine economy in public: agents that insure their own trades, settle their own bets, and get paid for the bugs they prove.',
    context: 'The spectacle use cases, designed for maximum virality on tech and crypto social media. They prove the machine economy to the degen and developer crowds.',
    buyers: [{
      names: ['Crypto Twitter retail traders', 'Polymarket whales', 'Immunefi whitehat DAOs'],
      generic: 'Retail traders, prediction market players and whitehat DAOs',
      examples: [
        {
          title: 'The rug-proof memecoin sniper', tag: 'Full',
          body: 'An agent scans the mempool for new token contract deployments. Before committing capital, it fires a paid request across independent miners: bytecode deconstruction, drainer logic detection, and wash-trading analysis. Stake-weighted scoring resolves the verdict. If the consensus returns malicious, the agent aborts. If safe, it buys. Run a live stream of a bot dodging five honeypots and executing on the sixth, with the Telegraph spend panel showing the exact cost of the execution insurance.',
          output: 'Five honeypots dodged, execution on the sixth',
          intents: ['SMART_CONTRACT_AUDIT', 'WASH_TRADING_DETECTION', 'ONCHAIN_METRIC_VERIFY'],
        },
        {
          title: 'The agentic prediction market', tag: 'Mechanism',
          body: 'Two autonomous agents lock USDC in an escrow contract betting on a real-world event (e.g., a SpaceX launch). The escrow contract is hardcoded to buy an event outcome resolution from Telegraph. Competing miners scrape the ground truth, validators reach consensus, and the contract automatically pays the winning agent\'s wallet. Machines gambling, verifying reality, and settling funds entirely without humans. The betting logic and verification execute on testnet; the real-world payout denomination waits for mainnet.',
          output: 'An escrow that settles itself on a verified outcome',
          intents: ['EVENT_OUTCOME_RESOLUTION', 'CRYPTO_TRANSFER_VERIFY'],
        },
        {
          title: 'The autonomous bug bounty hunter', tag: 'Mechanism',
          body: "An agent continuously crawls live smart contracts for vulnerabilities. When it finds one, it buys a vulnerability triage and exploit proof verification from Telegraph miners. The verified proof automatically triggers a payout from an on-chain bug bounty vault directly to the agent's wallet. A machine that hacks, proves it, and gets paid. The vulnerability verification is real today; the bounty payout is simulated on Sepolia.",
          output: 'A bounty paid to the machine that proved the bug',
          intents: ['SMART_CONTRACT_AUDIT', 'VULNERABILITY_TRIAGE', 'SECURITY_REVIEW', 'CODE_PATCH_VERIFY'],
        },
      ],
    }],
  },
  {
    n: 15, slug: 'consumer-automation', name: 'Consumer Automation',
    sector: 'Retail consumers, travel and e-commerce',
    summary: 'An agent that buys a verified disruption report and files the refund claim with the receipt attached, and a browser agent that waits for cryptographic proof of stock before it checks out.',
    problem: 'Refunds go unclaimed because proving a disruption is tedious, and shopping bots act on stale scrapes.',
    outcome: 'Consumer agents that act on proof: filing the claim with the receipt attached, and checking out only when inventory is verified.',
    context: 'These use cases translate abstract crypto infrastructure into mainstream consumer magic.',
    buyers: [{
      names: [], generic: 'Everyday consumers, travel hackers and online shoppers',
      examples: [
        {
          title: 'The automated bureaucracy hacker', tag: 'Full',
          body: "An agent monitors a user's flight status or AWS server uptime. The moment a delay or outage crosses the compensation threshold, the agent buys a verified disruption report or SLA compliance check from Telegraph miners. The agent automatically drafts a legal refund claim, attaches the cryptographic Telegraph receipt as undeniable proof, and emails corporate. Getting an airline refund processed automatically while sitting on the runway. The proof generation and the automated claim dispatch are real, finished work product.",
          output: 'A refund claim filed with the receipt attached',
          intents: ['TRAVEL_DISRUPTION', 'SERVER_UPTIME_MONITOR', 'SLA_COMPLIANCE', 'CONTRACT_OBLIGATION_AUDIT'],
        },
        {
          title: 'The zero-cache commerce sniper', tag: 'Full',
          body: 'A browser agent is given a budget: "Buy this sold-out GPU the second it drops under $600." It does not rely on stale local scrapers. It fires paid requests to Telegraph for live shelf price and SKU availability. It waits for cryptographic proof of inventory from miners before triggering the checkout payload. Run it against a real storefront. The intelligence purchase, the verification, and the decision logic run today.',
          output: 'Checkout triggered only on proof of stock',
          intents: ['LIVE_SHELF_PRICE', 'SKU_IN_STOCK', 'COMMERCE_PURCHASE_VERIFY'],
        },
        {
          title: 'The peer-to-peer reality check', tag: 'Full',
          body: 'Two OpenClaw instances in a Telegram group chat negotiate a digital transaction. The buyer agent buys a URL safety check and product authenticity verification from Telegraph before sending funds to the seller agent. Two personal assistants paying each other and verifying reality in a thread people already use is the friendliest explanation of what the network is for.',
          output: 'A verified payment between two assistants',
          intents: ['URL_SAFE', 'PRODUCT_AUTHENTICITY', 'CRYPTO_TRANSFER_VERIFY'],
        },
      ],
    }],
  },
]

export const TRACK_BY_SLUG: Record<string, Track> =
  Object.fromEntries(TRACKS.map(t => [t.slug, t]))

export function buyerLabel(b: Buyer) {
  if (b.names.length && (SHOW_BUYER_NAMES || b.platform)) return b.names.join(', ')
  return b.generic
}

export function trackExamples(t: Track) {
  return t.buyers.flatMap(b => b.examples)
}

/** Every intent a track uses, most-used first. */
export function trackIntents(t: Track) {
  const count = new Map<string, number>()
  for (const ex of trackExamples(t)) for (const i of ex.intents) count.set(i, (count.get(i) ?? 0) + 1)
  return Array.from(count.entries()).sort((a, b) => b[1] - a[1]).map(([name]) => name)
}

/** intent name -> tracks that use it */
export const TRACKS_BY_INTENT: Record<string, Track[]> = (() => {
  const map: Record<string, Track[]> = {}
  for (const t of TRACKS) for (const name of trackIntents(t)) (map[name] ??= []).push(t)
  return map
})()

export const pad2 = (n: number) => String(n).padStart(2, '0')
