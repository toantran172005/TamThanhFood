import React from 'react';

const OrderDetailSection = ({ items, summary }) => {
  return (
    <div className="order-card detail-section-card">
      <h3 className="section-title">Detail</h3>
      
      <div className="order-items-list">
        {items.map((item) => (
          <div key={item.id} className="order-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-info">
              <h4 className="item-name">{item.name}</h4>
              <p className="item-desc">{item.desc}</p>
              <p className="item-size">Size: {item.size}</p>
            </div>
            <div className="item-price-qty">
              <p className="item-price">$ {item.price.toFixed(2)}</p>
              <p className="item-qty">x {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="summary-divider"></div>

      <div className="summary-list">
        <div className="summary-row">
          <span>Shipping fee</span>
          <span>$ {summary.shippingFee.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Discount</span>
          <span>$ {summary.discount.toFixed(2)}</span>
        </div>
        <div className="summary-row summary-total">
          <span>Total</span>
          <span className="total-price">$ {summary.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSection;