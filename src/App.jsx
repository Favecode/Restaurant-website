import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import OrderTracker from "./components/OrderTracker";
import OrderForm from "./components/OrderForm";
import About from "./components/About";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import "./styles.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
    showNotification(`${item.name} added to cart!`);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((c) => c.id !== id));
  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((c) => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c)
    );
  };

  const placeOrder = (deliveryInfo) => {
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const newOrder = {
      id: orderId,
      items: [...cart],
      deliveryInfo,
      status: "confirmed",
      time: new Date(),
      total: cart.reduce((s, c) => s + c.price * c.qty, 0),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setCartOpen(false);
    showNotification(`Order ${orderId} placed! Track it below.`);
    setActiveSection("track");
    return orderId;
  };

  return (
    <div className="app">
      {notification && <div className="notification">{notification}</div>}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} cartCount={cart.reduce((s, c) => s + c.qty, 0)} setCartOpen={setCartOpen} />
      {cartOpen && <Cart cart={cart} onClose={() => setCartOpen(false)} removeFromCart={removeFromCart} updateQty={updateQty} onCheckout={() => { setCartOpen(false); setActiveSection("order"); }} />}
      <main>
        {activeSection === "home" && <Hero setActiveSection={setActiveSection} />}
        {activeSection === "menu" && <Menu addToCart={addToCart} />}
        {activeSection === "track" && <OrderTracker orders={orders} />}
        {activeSection === "order" && <OrderForm cart={cart} placeOrder={placeOrder} setActiveSection={setActiveSection} />}
        {activeSection === "about" && <About />}
      </main>
      <Footer setActiveSection={setActiveSection} />
    </div>
  );
}
