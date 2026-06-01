export default function Footer() {
  return (
    <footer className="footer">
      <a href="https://telegraphprotocol.com/" target="_blank" rel="noopener noreferrer" className="footer-logo">
        <img src="/Telegraoh-Logo.png" alt="" className="nav-logo-img" aria-hidden="true" />
        TELEGRAPH
      </a>
      <p className="footer-copy">© 2026 Telegraph Protocol · Built on Base</p>
      <div className="footer-links">
        <a href="https://telegraph-2.gitbook.io/telegraph" target="_blank" rel="noopener noreferrer" className="footer-protocol">Docs ↗</a>
        <a href="https://github.com/telegraphprotocol/telegraph-usecases" target="_blank" rel="noopener noreferrer" className="footer-protocol">GitHub ↗</a>
        <a href="https://telegraphprotocol.com/" target="_blank" rel="noopener noreferrer" className="footer-protocol">Protocol ↗</a>
      </div>
    </footer>
  )
}
