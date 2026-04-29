import React from 'react';

const QRCodeDisplay = ({ orderId, amount }) => {
  // Tạo chuỗi data để mã hóa vào QR. Trong thực tế đây có thể là chuỗi định dạng của VNPay, MoMo hoặc VietQR
  const qrPayload = `PAYMENT_ORDER:${orderId}|AMOUNT:${amount}`;
  
  // Sử dụng API tạo QR động (thay thế bằng API thật của dự án nếu có)
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrPayload)}`;

  return (
    <div className="qr-display-wrapper">
      <div className="qr-border-orange">
        <div className="qr-border-blue">
          <img 
            src={qrImageUrl} 
            alt={`Mã QR thanh toán cho đơn hàng ${orderId}`} 
            className="qr-image"
          />
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;