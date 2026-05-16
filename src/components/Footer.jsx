import Icon from "./Icons";

export default function Footer({ setActiveSection }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-grid compact-footer">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-icon"><Icon name="utensils" size={19} /></span>
            <span className="footer-logo-text">Savoria</span>
          </div>
          <p className="footer-desc">Modern Lagos dining, crafted for dine-in nights and polished delivery.</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {[
            { label: "Menu", id: "menu" },
            { label: "Order", id: "order" },
            { label: "Track", id: "track" },
            { label: "About", id: "about" },
          ].map((link) => (
            <button key={link.id} className="footer-link" onClick={() => setActiveSection(link.id)}>{link.label}</button>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© {year} Savoria Restaurant.</p>
        <p className="footer-copy">Payments powered by Paystack.</p>
      </div>
    </footer>
  );
}
