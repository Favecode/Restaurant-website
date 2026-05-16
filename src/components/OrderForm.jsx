import { useState } from "react";
import PaystackPop from "@paystack/inline-js";
import Icon from "./Icons";

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

export default function OrderForm({ cart, placeOrder, setActiveSection }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    notes: "",
  });
  const [deliveryType, setDeliveryType] = useState("delivery");
  const [payment, setPayment] = useState("card");
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paymentError, setPaymentError] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const deliveryFee = deliveryType === "delivery" ? 1500 : 0;
  const grandTotal = total + deliveryFee;

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const confirmOrder = (paymentDetails = {}) => {
    const id = placeOrder({ ...form, deliveryType, payment, deliveryFee, ...paymentDetails });
    setOrderId(id);
    setSubmitted(true);
  };

  const validateOrder = () => {
    setPaymentError("");
    if (!form.firstName || !form.phone || (deliveryType === "delivery" && !form.address)) {
      alert("Please fill in all required fields.");
      return false;
    }
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items from the menu.");
      return false;
    }
    if (payment !== "cash" && !form.email) {
      setPaymentError("Add your email address so Paystack can send your receipt.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateOrder()) return;

    if (payment === "cash") {
      confirmOrder({ paymentStatus: "pending" });
      return;
    }

    if (!PAYSTACK_PUBLIC_KEY) {
      setPaymentError("Add VITE_PAYSTACK_PUBLIC_KEY to your .env file to enable live Paystack checkout.");
      return;
    }

    setIsPaying(true);
    const reference = `SAV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: PAYSTACK_PUBLIC_KEY,
      email: form.email,
      amount: grandTotal * 100,
      currency: "NGN",
      reference,
      channels: payment === "transfer" ? ["bank_transfer", "bank", "ussd"] : ["card", "bank", "ussd", "qr"],
      metadata: {
        customer_name: `${form.firstName} ${form.lastName}`.trim(),
        phone: form.phone,
        delivery_type: deliveryType,
        items: cart.map((item) => `${item.name} x${item.qty}`).join(", "),
      },
      onSuccess: (transaction) => {
        setIsPaying(false);
        confirmOrder({
          paymentStatus: "paid",
          paymentReference: transaction.reference || reference,
        });
      },
      onCancel: () => {
        setIsPaying(false);
        setPaymentError("Payment was cancelled. Your cart is still here.");
      },
    });
  };

  if (submitted) {
    return (
      <section className="order-section">
        <div className="success-card">
          <div className="success-icon"><Icon name="check" size={42} /></div>
          <h2>Order Confirmed</h2>
          <p>Your order <strong>{orderId}</strong> has been received.</p>
          <p>{payment === "cash" ? "Payment will be collected when your order arrives." : "Payment confirmed through Paystack."}</p>
          <p>{deliveryType === "delivery" ? `We will deliver to ${form.address}, ${form.city}.` : "Your food will be ready for pickup in about 25-35 minutes."}</p>
          <button className="btn-primary" onClick={() => setActiveSection("track")}>Track My Order</button>
        </div>
      </section>
    );
  }

  return (
    <section className="order-section">
      <div className="section-header">
        <span className="section-tag">Checkout</span>
        <h2 className="section-title">Complete Your Order</h2>
      </div>
      <div className="order-layout">
        <div>
          <div className="order-form-card">
            <div className="form-title">Delivery Method</div>
            <div className="form-subtitle">Choose how you would like to receive your order.</div>
            <div className="delivery-opts">
              {[
                { id: "delivery", icon: "bike", label: "Home Delivery", time: "30-50 min" },
                { id: "pickup", icon: "store", label: "Pick Up", time: "25-35 min" },
              ].map((opt) => (
                <button key={opt.id} className={`delivery-opt ${deliveryType === opt.id ? "selected" : ""}`} onClick={() => setDeliveryType(opt.id)}>
                  <Icon name={opt.icon} size={24} />
                  <span className="delivery-opt-label">{opt.label}</span>
                  <span className="delivery-opt-time">{opt.time}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="order-form-card">
            <div className="form-title">Personal Information</div>
            <div className="form-subtitle">So we know who to serve and where to send receipts.</div>
            <div className="form-row">
              <label className="form-group"><span className="form-label">First Name *</span><input className="form-input" name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" /></label>
              <label className="form-group"><span className="form-label">Last Name</span><input className="form-input" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" /></label>
            </div>
            <div className="form-row">
              <label className="form-group"><span className="form-label">Phone Number *</span><input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+234 801 234 5678" /></label>
              <label className="form-group"><span className="form-label">Email Address</span><input className="form-input" name="email" value={form.email} onChange={handleChange} placeholder="john@email.com" /></label>
            </div>
          </div>

          {deliveryType === "delivery" && (
            <div className="order-form-card">
              <div className="form-title">Delivery Address</div>
              <div className="form-subtitle">Tell us exactly where to bring your food.</div>
              <label className="form-group"><span className="form-label">Street Address *</span><input className="form-input" name="address" value={form.address} onChange={handleChange} placeholder="12 Victoria Island Crescent" /></label>
              <div className="form-row">
                <label className="form-group"><span className="form-label">City *</span><input className="form-input" name="city" value={form.city} onChange={handleChange} placeholder="Lagos" /></label>
                <label className="form-group"><span className="form-label">State</span><select className="form-select" name="state" value={form.state} onChange={handleChange}><option value="">Select State</option>{["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Enugu", "Other"].map((s) => <option key={s}>{s}</option>)}</select></label>
              </div>
              <label className="form-group"><span className="form-label">Landmark</span><input className="form-input" name="landmark" value={form.landmark} onChange={handleChange} placeholder="Near Shoprite, blue gate" /></label>
            </div>
          )}

          <div className="order-form-card">
            <div className="form-title">Payment Method</div>
            <div className="form-subtitle">Online payments open securely with Paystack.</div>
            <div className="delivery-opts payment-opts">
              {[
                { id: "card", icon: "card", label: "Paystack Card", time: "Card, bank, USSD" },
                { id: "transfer", icon: "bank", label: "Bank Transfer", time: "Paystack transfer" },
                { id: "cash", icon: "cash", label: "Cash", time: "Pay on delivery" },
              ].map((opt) => (
                <button key={opt.id} className={`delivery-opt ${payment === opt.id ? "selected" : ""}`} onClick={() => setPayment(opt.id)}>
                  <Icon name={opt.icon} size={24} />
                  <span className="delivery-opt-label">{opt.label}</span>
                  <span className="delivery-opt-time">{opt.time}</span>
                </button>
              ))}
            </div>
            {paymentError && <p className="payment-error">{paymentError}</p>}
          </div>

          <div className="order-form-card">
            <div className="form-title">Special Instructions</div>
            <div className="form-subtitle">Any dietary requirements or special requests?</div>
            <label className="form-group"><span className="form-label">Notes for Kitchen</span><textarea className="form-textarea" name="notes" value={form.notes} onChange={handleChange} placeholder="No onions, extra spicy, gluten-free..." /></label>
            <button className="submit-order-btn" onClick={handleSubmit} disabled={cart.length === 0 || isPaying}>
              {cart.length === 0 ? "Add items to cart first" : isPaying ? "Opening Paystack..." : payment === "cash" ? `Place Order - ₦${grandTotal.toLocaleString()}` : `Pay ₦${grandTotal.toLocaleString()} Securely`}
            </button>
          </div>
        </div>

        <aside className="order-summary-card">
          <div className="summary-title">Order Summary</div>
          {cart.length === 0 ? (
            <p className="empty-cart-msg">No items in cart yet</p>
          ) : (
            <div className="summary-items">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <span className="summary-item-name">{item.name} x{item.qty}</span>
                  <span className="summary-item-price">₦{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
              <div className="summary-item"><span className="summary-item-name">Subtotal</span><span className="summary-item-price">₦{total.toLocaleString()}</span></div>
              <div className="summary-item"><span className="summary-item-name">Delivery Fee</span><span className="summary-item-price">{deliveryFee === 0 ? "Free" : `₦${deliveryFee.toLocaleString()}`}</span></div>
              <div className="summary-total"><span>Total</span><span>₦{grandTotal.toLocaleString()}</span></div>
            </div>
          )}
          <div className="secure-note"><Icon name="shield" size={16} /> Online payments are handled by Paystack. Savoria never stores card details.</div>
        </aside>
      </div>
    </section>
  );
}
