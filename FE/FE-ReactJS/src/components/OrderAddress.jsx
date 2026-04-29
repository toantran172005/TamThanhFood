import React from 'react';

const OrderAddress = ({ to, from }) => {
  return (
    <div className="order-card address-card">
      <div className="address-block to-block">
        <div className="address-header">
          <span className="dot dot-red"></span>
          <h3>To</h3>
        </div>
        <div className="address-content">
          <p className="address-name">{to.name}</p>
          <p className="address-text">{to.address}</p>
          <p className="address-phone">{to.phone}</p>
        </div>
      </div>

      <div className="address-divider"></div>

      <div className="address-block from-block">
        <div className="address-header">
          <span className="dot dot-green"></span>
          <h3>From</h3>
        </div>
        <div className="address-content">
          <p className="address-name">{from.name}</p>
          <p className="address-text">{from.address}</p>
          <p className="address-phone">{from.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderAddress;