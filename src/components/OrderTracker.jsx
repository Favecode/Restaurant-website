import { useState } from "react";
import Icon from "./Icons";

const STATUSES = ["confirmed", "preparing", "ready", "delivered"];
const STATUS_STEPS = [
  { key: "confirmed", icon: "check", label: "Confirmed" },
  { key: "preparing", icon: "utensils", label: "Preparing" },
  { key: "ready", icon: "package", label: "Ready" },
  { key: "delivered", icon: "bike", label: "Delivered" },
];

function StatusBadge({ status }) {
  return <span className={`order-status-badge status-${status}`}>{status}</span>;
}

function OrderCard({ order, onAdvance }) {
  const stepIndex = STATUSES.indexOf(order.status);

  return (
    <article className="order-card">
      <div className="order-card-header">
        <div>
          <div className="order-id">#{order.id}</div>
          <div className="order-time">Placed at {order.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="delivery-info">
        <div className="delivery-info-row"><Icon name="mapPin" size={16} /><span>{order.deliveryInfo.deliveryType === "delivery" ? `${order.deliveryInfo.address}, ${order.deliveryInfo.city}` : "Pick Up at Restaurant"}</span></div>
        <div className="delivery-info-row"><Icon name="phone" size={16} /><span>{order.deliveryInfo.phone}</span></div>
        <div className="delivery-info-row"><Icon name="card" size={16} /><span>{order.deliveryInfo.payment} payment</span></div>
      </div>

      <div className="tracker-steps">
        {STATUS_STEPS.map((step, i) => {
          const isDone = i <= stepIndex;
          const isActive = i === stepIndex;
          return (
            <div key={step.key} className="tracker-step">
              <div className={`step-circle ${isDone ? "done" : ""} ${isActive ? "active" : ""}`}>
                <Icon name={isDone ? step.icon : "clock"} size={16} />
              </div>
              <div className={`step-label ${isDone ? "done" : ""}`}>{step.label}</div>
              {i < STATUS_STEPS.length - 1 && <div className={`step-line ${isDone && i < stepIndex ? "done" : ""}`} />}
            </div>
          );
        })}
      </div>

      <div className="order-items-list">
        {order.items.map((item) => (
          <div key={item.id} className="order-item-row">
            <span>{item.name} x{item.qty}</span>
            <span>₦{(item.price * item.qty).toLocaleString()}</span>
          </div>
        ))}
        {order.deliveryInfo.deliveryFee > 0 && <div className="order-item-row"><span>Delivery Fee</span><span>₦{order.deliveryInfo.deliveryFee.toLocaleString()}</span></div>}
        <div className="order-total-row"><span>Total Paid</span><span>₦{(order.total + (order.deliveryInfo.deliveryFee || 0)).toLocaleString()}</span></div>
      </div>

      {order.status !== "delivered" && (
        <button className="advance-status-btn" onClick={() => onAdvance(order.id)}>
          <Icon name="refresh" size={16} /> Simulate Status Update
        </button>
      )}
    </article>
  );
}

export default function OrderTracker({ orders, setActiveSection }) {
  const [localOrders, setLocalOrders] = useState(orders);
  const merged = orders.map((o) => localOrders.find((l) => l.id === o.id) || o);

  const handleAdvance = (id) => {
    setLocalOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const i = STATUSES.indexOf(o.status);
        return { ...o, status: STATUSES[Math.min(i + 1, STATUSES.length - 1)] };
      })
    );
  };

  return (
    <section className="tracker-section">
      <div className="section-header">
        <span className="section-tag">Live Tracking</span>
        <h2 className="section-title">Your Orders</h2>
        <p className="section-subtitle">Demo-friendly order updates for every Savoria order you place.</p>
      </div>
      {orders.length === 0 ? (
        <div className="no-orders">
          <Icon name="package" size={54} />
          <h3>No orders yet</h3>
          <p>Place your first order and track it here.</p>
          <button className="btn-primary" onClick={() => setActiveSection && setActiveSection("menu")}>Browse Menu</button>
        </div>
      ) : (
        merged.map((order) => <OrderCard key={order.id} order={order} onAdvance={handleAdvance} />)
      )}
    </section>
  );
}
