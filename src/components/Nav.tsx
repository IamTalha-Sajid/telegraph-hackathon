interface Props { onRegister: () => void }

export default function Nav({ onRegister }: Props) {
  return (
    <nav className="nav">
      <div className="nav-left">
        <a href="https://telegraphprotocol.com/" target="_blank" rel="noopener noreferrer" className="nav-logo">
          <img src="/Telegraoh-Logo.png" alt="" className="nav-logo-img" aria-hidden="true" />
          TELEGRAPH
        </a>
        <span className="nav-badge">Hackathon</span>
      </div>
      <div className="nav-right">
        <a href="#how"    className="nav-link">How It Works</a>
        <a href="#apis"   className="nav-link">Tracks</a>
        <a href="#prizes" className="nav-link">Prizes</a>
        <a href="https://telegraph-2.gitbook.io/telegraph" target="_blank" rel="noopener noreferrer" className="nav-link">Docs ↗</a>
        <a href="https://github.com/telegraphprotocol" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub ↗</a>
        <button className="nav-btn" onClick={onRegister}>Register Now</button>
      </div>
    </nav>
  )
}
