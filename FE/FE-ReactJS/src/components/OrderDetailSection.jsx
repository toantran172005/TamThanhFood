import React from 'react';

const OrderDetailSection = ({ items = [], summary = {} }) => {
  const SHIPPING_FEE = 15000;

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

  const shippingFee = SHIPPING_FEE;
  const discount = Number(summary.discount || 0);
  const total = Number(summary.total || 0);

  return (
    <div className="order-card detail-section-card">
      <h3 className="section-title">Detail</h3>

      <div className="order-items-list">
        {items.map((item, index) => (
          <div key={item.id || item.foodId || index} className="order-item">
            <img
              src={getImageUrl(item.image)}
              alt={item.name}
              className="item-image"
            />

            <div className="item-info">
              <h4 className="item-name">{item.name}</h4>

              <p className="item-desc">
                {item.desc || item.description || 'Món ăn ngon mỗi ngày'}
              </p>

              <p className="item-size">
                Size: {item.size}
              </p>
            </div>

            <div className="item-price-qty">
              <p className="item-price">
                {formatVND(Number(item.price || 0) * Number(item.quantity || 1))}
              </p>

              <p className="item-qty">
                x {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="summary-divider"></div>

      <div className="summary-list">
        <div className="summary-row">
          <span>Phí vận chuyển</span>
          <span>{formatVND(shippingFee)}</span>
        </div>

        <div className="summary-row">
          <span>Giảm giá</span>
          <span>{formatVND(discount)}</span>
        </div>

        <div className="summary-row summary-total">
          <span>Tổng cộng</span>
          <span className="total-price">
            {formatVND(total)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSection;