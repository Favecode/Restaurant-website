import { useState } from "react";
import Icon from "./Icons";

const menuItems = [
  { id: 1, name: "Burrata Bruschetta", category: "Starters", price: 4500, image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=900&q=80", desc: "Creamy burrata on sourdough toast with heirloom tomatoes and basil oil.", time: "10 min", calories: "320 cal", badge: "Popular" },
  { id: 2, name: "Spiced Suya Skewers", category: "Starters", price: 3800, image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=80", desc: "Tender beef skewers marinated in our house suya spice blend.", time: "15 min", calories: "280 cal", badge: "Spicy" },
  { id: 3, name: "Lobster Bisque", category: "Starters", price: 6200, image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80", desc: "Velvety lobster bisque finished with cream, herbs, and brandy.", time: "12 min", calories: "410 cal", badge: null },
  { id: 4, name: "Garden Mezze Plate", category: "Starters", price: 3200, image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=900&q=80", desc: "Hummus, falafel, olives, pita, and seasonal dips.", time: "8 min", calories: "380 cal", badge: "Vegan" },
  { id: 5, name: "Wagyu Ribeye Steak", category: "Mains", price: 18000, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80", desc: "A4 ribeye with truffle butter, roasted garlic, and sea salt.", time: "25 min", calories: "680 cal", badge: "Chef's Pick" },
  { id: 6, name: "Truffle Pasta", category: "Mains", price: 6500, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80", desc: "Tagliatelle, black truffle cream, Parmigiano Reggiano, wild mushrooms.", time: "20 min", calories: "520 cal", badge: "Popular" },
  { id: 7, name: "Jollof Risotto", category: "Mains", price: 5800, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80", desc: "Smoky jollof tomato risotto with charred prawns and herbs.", time: "22 min", calories: "490 cal", badge: "Signature" },
  { id: 8, name: "Herb-Roasted Salmon", category: "Mains", price: 9500, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80", desc: "Atlantic salmon with lemon-herb crust and beurre blanc.", time: "18 min", calories: "460 cal", badge: null },
  { id: 9, name: "Pepper Chicken", category: "Mains", price: 7200, image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80", desc: "Free-range chicken in Nigerian pepper sauce with plantain.", time: "20 min", calories: "540 cal", badge: "Spicy" },
  { id: 10, name: "Mushroom Wellington", category: "Mains", price: 7800, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80", desc: "Portobello and mushroom duxelles wrapped in golden puff pastry.", time: "30 min", calories: "490 cal", badge: "Veggie" },
  { id: 11, name: "Rainbow Sushi Platter", category: "Sushi", price: 12000, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=900&q=80", desc: "12-piece chef's choice nigiri and maki with wasabi and ginger.", time: "15 min", calories: "380 cal", badge: "Popular" },
  { id: 12, name: "Tiger Prawn Tempura", category: "Sushi", price: 8500, image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=900&q=80", desc: "Crisp tempura prawns with sweet ponzu and micro greens.", time: "12 min", calories: "340 cal", badge: null },
  { id: 13, name: "Spicy Tuna Rolls", category: "Sushi", price: 5500, image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=900&q=80", desc: "Fresh tuna, sriracha aioli, cucumber, and avocado.", time: "10 min", calories: "280 cal", badge: "Spicy" },
  { id: 14, name: "Margherita Royale", category: "Pizza", price: 5200, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80", desc: "San Marzano tomato, buffalo mozzarella, basil, olive oil.", time: "18 min", calories: "620 cal", badge: null },
  { id: 15, name: "Smoky BBQ Chicken", category: "Pizza", price: 6000, image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?auto=format&fit=crop&w=900&q=80", desc: "Pulled chicken, house BBQ sauce, red onion, jalapenos, mozzarella.", time: "18 min", calories: "710 cal", badge: "Popular" },
  { id: 16, name: "Truffle & Mushroom", category: "Pizza", price: 6800, image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80", desc: "White base, wild mushrooms, truffle oil, fontina, thyme.", time: "18 min", calories: "640 cal", badge: "Chef's Pick" },
  { id: 17, name: "Chocolate Lava Cake", category: "Desserts", price: 4200, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80", desc: "Warm dark chocolate cake with vanilla ice cream and caramel.", time: "12 min", calories: "520 cal", badge: "Popular" },
  { id: 18, name: "Mango Sorbet", category: "Desserts", price: 2800, image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=900&q=80", desc: "House mango and passion fruit sorbet, light and dairy-free.", time: "5 min", calories: "180 cal", badge: "Vegan" },
  { id: 19, name: "Creme Brulee", category: "Desserts", price: 3600, image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=900&q=80", desc: "French custard with torched caramel crust and berries.", time: "8 min", calories: "390 cal", badge: null },
  { id: 20, name: "Tropical Punch", category: "Drinks", price: 1800, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80", desc: "Pineapple, mango, passion fruit, grenadine, and sparkling water.", time: "5 min", calories: "120 cal", badge: null },
  { id: 21, name: "Iced Hibiscus Tea", category: "Drinks", price: 1500, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80", desc: "Chilled zobo with ginger, lime, and honey.", time: "5 min", calories: "80 cal", badge: "Popular" },
  { id: 22, name: "Espresso Martini", category: "Drinks", price: 3500, image: "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?auto=format&fit=crop&w=900&q=80", desc: "Fresh espresso, vodka, coffee liqueur, and coffee cream.", time: "5 min", calories: "210 cal", badge: null },
];

const categories = ["All", "Starters", "Mains", "Sushi", "Pizza", "Desserts", "Drinks"];

export default function Menu({ addToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = menuItems.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchSearch = `${item.name} ${item.desc}`.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className="menu-section">
      <div className="section-header menu-header">
        <span className="section-tag">Seasonal Menu</span>
        <h2 className="section-title">Food That Looks as Good as It Tastes</h2>
        <p className="section-subtitle">Fine dining polish, Lagos warmth, and delivery-ready comfort on one clean menu.</p>
        <label className="search-wrap" aria-label="Search dishes">
          <Icon name="search" size={18} />
          <input type="text" placeholder="Search pasta, sushi, drinks..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
      </div>
      <div className="category-tabs">
        {categories.map((cat) => (
          <button key={cat} className={`cat-tab ${activeCategory === cat ? "active" : ""}`} onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state">
          <Icon name="utensils" size={44} />
          <p>No dishes found. Try a different search.</p>
        </div>
      ) : (
        <div className="menu-grid">
          {filtered.map((item) => (
            <article key={item.id} className="menu-card">
              <div className="menu-card-img">
                <img src={item.image} alt={item.name} loading="lazy" />
                {item.badge && <span className="menu-badge">{item.badge}</span>}
              </div>
              <div className="menu-card-body">
                <div className="menu-card-top">
                  <h3 className="menu-card-name">{item.name}</h3>
                  <div className="menu-card-price">₦{item.price.toLocaleString()}</div>
                </div>
                <p className="menu-card-desc">{item.desc}</p>
                <div className="menu-card-meta">
                  <span className="meta-tag"><Icon name="clock" size={14} /> {item.time}</span>
                  <span className="meta-tag"><Icon name="flame" size={14} /> {item.calories}</span>
                  <span className="meta-tag"><Icon name="package" size={14} /> {item.category}</span>
                </div>
                <button className="add-btn" onClick={() => addToCart(item)}>
                  <Icon name="plus" size={18} /> Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
