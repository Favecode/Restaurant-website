import Icon from "./Icons";

export default function Footer({ setActiveSection }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-icon"><Icon name="utensils" size={19} /></span>
            <span className="footer-logo-text">Savoria</span>
          </div>
          <p className="footer-desc">Lagos dining with global flavor, clean presentation, and delivery that still feels restaurant-made.</p>
          <div className="footer-socials">
            {["instagram", "mail", "phone"].map((s) => (
              <button key={s} className="social-btn" aria-label={s}><Icon name={s} size={17} /></button>
            ))}
          </div>
        </div>
        <div className="footer-col">
          <h4>Navigation</h4>
          {[
            { label: "Home", id: "home" },
            { label: "Menu", id: "menu" },
            { label: "Order Online", id: "order" },
            { label: "Track Order", id: "track" },
            { label: "About Us", id: "about" },
          ].map((l) => <button key={l.id} className="footer-link" onClick={() => setActiveSection(l.id)}>{l.label}</button>)}
        </div>
        <div className="footer-col">
          <h4>Menu Highlights</h4>
          {["Starters", "Main Course", "Sushi & Seafood", "Artisan Pizzas", "Desserts", "Cocktails"].map((item) => (
            <button key={item} className="footer-link" onClick={() => setActiveSection("menu")}>{item}</button>
          ))}
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <div className="footer-contact-item"><Icon name="mapPin" size={16} /><span>12 Adeola Odeku St, Victoria Island, Lagos</span></div>
          <div className="footer-contact-item"><Icon name="phone" size={16} /><span>+234 801 234 5678</span></div>
          <div className="footer-contact-item"><Icon name="mail" size={16} /><span>hello@savoria.ng</span></div>
          <div className="footer-contact-item"><Icon name="clock" size={16} /><span>Mon-Sun: 11am - 11pm</span></div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© {year} Savoria Restaurant. All rights reserved.</p>
        <div className="footer-legal"><span>Privacy Policy</span><span>Terms of Service</span></div>
      </div>
    </footer>
  );
}
