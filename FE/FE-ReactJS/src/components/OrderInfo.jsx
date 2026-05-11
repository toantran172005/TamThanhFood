import React from 'react';

const OrderInfo = ({ data, orderId }) => {
  return (
    <div className="order-card info-card">
      <h3 className="section-title">Order information</h3>
      
      <div className="info-list">
        <div className="info-row">
          <span className="info-label">Note</span>
          <span className="info-value">{data.note}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Order ID</span>
          <span className="info-value">#{orderId}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Order time</span>
          <span className="info-value">{data.orderTime}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Payment methods</span>
          <span className="info-value">{data.paymentMethod}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;