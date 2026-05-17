import React from 'react';
import '../css/OrderSummaryList.css';

const OrderSummaryList = ({ items }) => {
  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN').format(Number(price || 0)) + ' VNĐ';
  };

  const getImageUrl = (image) => {
    if (!image) return "/Bison_Burger.png";

    if (image.startsWith("http")) {
      return image;
    }

    return `/${image}`;
  };

  return (
    <div className="order-list-card">
      {items.map((item, index) => (
        <div
          key={item.id || item.foodId || index}
          className={`order-item-row ${index !== items.length - 1 ? 'border-bottom' : ''}`}
        >
          <div className="item-info-col">
            <img
              src={getImageUrl(item.image)}
              alt={item.foodName || item.name}
              className="item-image"
            />

            <div className="item-details">
              <h3 className="item-name">
                {item.foodName || item.name}
              </h3>

              <span className="item-size">
                {item.size}
              </span>
            </div>
          </div>

          <div className="item-price-col">
            <span className="item-qty">
              SL: {item.quantity}
            </span>

            <span className="item-price-text">
              {formatVND(Number(item.price || 0) * Number(item.quantity || 1))}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSummaryList;