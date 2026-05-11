import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentHeader from '../components/PaymentHeader';
import QRCodeDisplay from '../components/QRCodeDisplay';
import PaymentAction from '../components/PaymentAction';
import '../css/PaymentQRCode.css';

const PaymentQRCodePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Lấy dữ liệu được truyền từ trang Checkout/Xác nhận
  // Cú pháp gửi từ trang trước: navigate('/payment-qr', { state: { orderId: '0D123', amount: 68.00 } })
  const paymentData = location.state || { orderId: 'UNKNOWN', amount: 0 };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    
    try {
      // TODO: call API to Spring Boot backend to verify payment status
      // const response = await axios.post(`/api/v1/payments/verify`, { orderId: paymentData.orderId });
      
      console.log(`Đang kiểm tra thanh toán cho đơn: ${paymentData.orderId}, số tiền: $${paymentData.amount}`);
      
      // Giả lập delay gọi API
      setTimeout(() => {
        setIsProcessing(false);
        alert('Thanh toán thành công!');
        // Chuyển hướng về trang lịch sử đơn hàng hoặc trang thành công
        // navigate('/orders');
      }, 1500);

    } catch (error) {
      setIsProcessing(false);
      console.error("Lỗi xác nhận thanh toán", error);
    }
  };

  return (
    <div className="payment-qr-page">
      <div className="payment-qr-container">
        <PaymentHeader />
        
        <div className="payment-qr-content">
          <p className="instruction-text">Vui lòng quét mã bên dưới để thanh toán</p>
          
          <QRCodeDisplay 
            orderId={paymentData.orderId} 
            amount={paymentData.amount} 
          />
          
          <PaymentAction 
            onConfirm={handleConfirmPayment} 
            isLoading={isProcessing} 
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentQRCodePage;