import Icon from "./Icons";

export default function Navbar({ activeSection, setActiveSection, cartCount, setCartOpen }) {
  const links = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu" },
    { id: "order", label: "Order" },
    { id: "track", label: "Track" },
    { id: "about", label: "About" },
  ];

  return (
    <nav className="navbar">
      <button className="nav-logo" onClick={() => setActiveSection("home")} aria-label="Go home">
        <span className="nav-logo-icon"><Icon name="utensils" size={19} /></span>
        <span className="nav-logo-text">Savoria</span>
      </button>
      <div className="nav-links">
        {links.map((l) => (
          <button key={l.id} className={`nav-link ${activeSection === l.id ? "active" : ""}`} onClick={() => setActiveSection(l.id)}>
            {l.label}
          </button>
        ))}
      </div>
      <button className="cart-btn" onClick={() => setCartOpen(true)}>
        <Icon name="shoppingBag" size={18} />
        <span>Cart</span>
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </button>
    </nav>
  );
}
