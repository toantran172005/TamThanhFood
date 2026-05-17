import React from 'react';

const OrderInfo = ({ data = {}, orderId }) => {
  return (
    <div className="order-card info-card">
      <h3 className="section-title">Thông tin đơn hàng</h3>

      <div className="info-list">
        <div className="info-row">
          <span className="info-label">Ghi chú</span>
          <span className="info-value">{data.note || 'Empty'}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Mã đơn hàng</span>
          <span className="info-value">#{orderId}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Thời gian đặt hàng</span>
          <span className="info-value">{data.orderTime || ''}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Phương thức thanh toán</span>
          <span className="info-value">{data.paymentMethod || 'QRCode'}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;