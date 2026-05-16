import Icon from "./Icons";

export default function Cart({ cart, onClose, removeFromCart, updateQty, onCheckout }) {
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close cart"><Icon name="x" size={18} /></button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <Icon name="shoppingBag" size={48} />
              <p>Your cart is empty</p>
              <span>Add something delicious from the menu.</span>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img className="cart-item-img" src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">₦{(item.price * item.qty).toLocaleString()}</div>
                  <div className="cart-item-controls">
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)} aria-label="Decrease quantity"><Icon name="minus" size={14} /></button>
                    <span className="qty-num">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)} aria-label="Increase quantity"><Icon name="plus" size={14} /></button>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove item"><Icon name="trash" size={17} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
            <p>Delivery fee calculated at checkout</p>
            <button className="checkout-btn" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
