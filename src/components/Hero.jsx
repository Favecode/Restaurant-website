import Icon from "./Icons";

const featured = [
  { image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=80", name: "Truffle Pasta", price: "₦6,500" },
  { image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80", name: "Wagyu Ribeye", price: "₦18,000" },
  { image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=700&q=80", name: "Sushi Platter", price: "₦12,000" },
];

export default function Hero({ setActiveSection }) {
  return (
    <section className="hero">
      <div className="hero-media" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85"
          alt=""
        />
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-copy">
          <span className="hero-tag"><Icon name="utensils" size={16} /> Modern Lagos Dining</span>
          <h1 className="hero-title">Savoria</h1>
          <p className="hero-subtitle">
            A polished restaurant and delivery experience for bold flavors, beautiful plates, and nights that feel worth dressing up for.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setActiveSection("menu")}>
              View Menu
            </button>
            <button className="btn-outline" onClick={() => setActiveSection("order")}>
              Order Now
            </button>
          </div>
        </div>
        <div className="hero-panel">
          <div className="panel-label">Tonight's Picks</div>
          {featured.map((item) => (
            <div key={item.name} className="featured-row">
              <img src={item.image} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <span>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-stats">
        <div className="stat">
          <span className="stat-num">4.9</span>
          <span className="stat-label">Guest rating</span>
        </div>
        <div className="stat">
          <span className="stat-num">35m</span>
          <span className="stat-label">Avg delivery</span>
        </div>
        <div className="stat">
          <span className="stat-num">22</span>
          <span className="stat-label">Signature dishes</span>
        </div>
      </div>
    </section>
  );
}
