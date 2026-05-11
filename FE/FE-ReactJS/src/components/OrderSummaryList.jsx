import React from 'react';
import '../css/OrderSummaryList.css';

const OrderSummaryList = ({ items }) => {
  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
  };

  return (
    <div className="order-list-card">
      {items.map((item, index) => (
        <div key={item.id} className={`order-item-row ${index !== items.length - 1 ? 'border-bottom' : ''}`}>
          
          {/* Cột trái chứa Ảnh và Tên */}
          <div className="item-info-col">
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-details">
              <h3 className="item-name">{item.name}</h3>
              <span className="item-size">{item.size}</span>
            </div>
          </div>

          {/* Cột phải chứa Số lượng và Giá */}
          <div className="item-price-col">
            <span className="item-qty">SL: {item.quantity}</span>
            <span className="item-price-text">{formatVND(item.price)}</span>
          </div>

        </div>
      ))}
    </div>
  );
};

export default OrderSummaryList;