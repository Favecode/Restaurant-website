import { useState } from "react";
import Icon from "./Icons";

export default function Navbar({
  activeSection,
  setActiveSection,
  cartCount,
  setCartOpen,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { id: "home", label: "Home" },
    { id: "menu", label: "Menu" },
    { id: "order", label: "Order" },
    { id: "track", label: "Track" },
    { id: "about", label: "About" },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMenuOpen(false); // close menu on mobile
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <button className="nav-logo" onClick={() => handleNavClick("home")}>
        <span className="nav-logo-icon">
          <Icon name="utensils" size={19} />
        </span>
        <span className="nav-logo-text">Savoria</span>
      </button>

      {/* Links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <button
            key={l.id}
            className={`nav-link ${activeSection === l.id ? "active" : ""}`}
            onClick={() => handleNavClick(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Right actions (Hamburger + Cart) */}
      <div className="nav-actions">
        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Cart */}
        <button className="cart-btn" onClick={() => setCartOpen(true)}>
          <Icon name="shoppingBag" size={18} />
          <span>Cart</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
}