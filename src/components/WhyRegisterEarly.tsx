const BENEFITS = [
  {
    num: '00',
    title: 'Early Track Access',
    body: 'Get submission details and task specs before the public launch — more time to plan your approach.',
  },
  {
    num: '01',
    title: 'More Time to Build',
    body: 'Extra runway means more iterations, better models, and a higher chance of winning.',
  },
  {
    num: '02',
    title: 'Direct Core Team Support',
    body: 'Early registrants get access to a private Discord channel with direct support from the Telegraph team.',
  },
  {
    num: '03',
    title: 'Protocol Head Start',
    body: 'Get familiar with the Telegraph protocol before the full launch — understand the system others will be learning on day one.',
  },
]

export default function WhyRegisterEarly() {
  return (
    <section className="why-section">
      <img
        src="/Website/thinking_robot.png"
        className="why-bg"
        alt=""
        aria-hidden="true"
      />
      <div className="why-inner">
        <div className="sec-label">Step 00</div>
        <h2 className="sec-title">Why register early?</h2>
        <p className="sec-sub">Early registrants get an unfair advantage. Here&apos;s why.</p>

        <div className="why-grid">
          {BENEFITS.map((b, i) => (
            <div
              key={b.num}
              className="why-card"
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="why-card-num">{b.num}</div>
              <div className="why-card-title">{b.title}</div>
              <div className="why-card-body">{b.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
