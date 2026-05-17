import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentHeader from '../components/PaymentHeader';
import QRCodeDisplay from '../components/QRCodeDisplay';
import PaymentAction from '../components/PaymentAction';
import orderApi from '../api/orderHistoryApi';
import '../css/PaymentQRCode.css';

const PaymentQRCodePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);

  const paymentData = location.state || {
    orderId: 'UNKNOWN',
    amount: 0,
    items: [],
    summary: {
      subtotal: 0,
      shippingFee: 0,
      discount: 0,
      total: 0
    },
    paymentMethod: 'qrcode',
    note: '',
    voucherCode: '',
    voucherId: '',
    address: ''
  };

  const formatPaymentMethod = (method) => {
    switch (method) {
      case 'qrcode':
        return 'QRCode';
      case 'momo':
        return 'MoMo';
      case 'shopee':
        return 'ShopeePay';
      case 'visa':
        return 'Visa';
      default:
        return method || 'QRCode';
    }
  };

  const handleConfirmPayment = async () => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('Vui lòng đăng nhập!');
      navigate('/Auth');
      return;
    }

    if (!paymentData.items || paymentData.items.length === 0) {
      alert('Không có món ăn nào để tạo đơn!');
      return;
    }

    setIsProcessing(true);

    try {
      const payload = {
        userId: userId,

        voucherId: paymentData.voucherId || '',
        voucherCode: paymentData.voucherCode || '',

        items: paymentData.items.map((item) => ({
          foodId: item.foodId,
          foodName: item.foodName || item.name,
          image: item.image,
          quantity: Number(item.quantity || 1),
          price: Number(item.price || 0),
          size: item.size,
          note: item.note || ''
        })),

        subtotal: Number(paymentData.summary?.subtotal || 0),
        discount: Number(paymentData.summary?.discount || 0),
        totalPrice: Number(paymentData.summary?.total || paymentData.amount || 0),

        address: paymentData.address || 'Chưa có địa chỉ',
        payment: formatPaymentMethod(paymentData.paymentMethod),

        note: paymentData.note || ''
      };

      console.log('Payload tạo order:', payload);

      const createdOrder = await orderApi.createOrder(payload);

      console.log('Order đã tạo trong DB:', createdOrder);

      const orderId = createdOrder.id || createdOrder.orderId || createdOrder._id;

      if (!orderId) {
        console.error('Response tạo order không có id:', createdOrder);
        alert('Backend chưa trả về orderId!');
        return;
      }

      console.log('Order ID:', orderId);

      const orderData = {
        id: orderId,
        status: createdOrder.status || 'PENDING',
        supportText: 'Đơn hàng của bạn đã được tạo. Vui lòng chờ giao hàng.',
        currentStep: 1,

        to: {
          name: 'T3 Food',
          address: '200 Vuon Lai, An Phu Dong Ward, HCM City',
          phone: '0987654321'
        },

        from: {
          name: 'Khách hàng',
          address: payload.address,
          phone: ''
        },

        items: payload.items.map((item) => ({
          id: item.foodId,
          foodId: item.foodId,
          name: item.foodName,
          desc: 'Món ăn ngon mỗi ngày',
          size: item.size,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),

        summary: {
          subtotal: payload.subtotal,
          shippingFee: Number(paymentData.summary?.shippingFee || 0),
          discount: payload.discount,
          total: payload.totalPrice
        },

        info: {
          note: payload.note || 'Empty',
          orderTime: new Date().toLocaleString('vi-VN'),
          paymentMethod: payload.payment
        }
      };

      alert('Thanh toán thành công!');

      navigate(`/waitfororder/${orderId}`, {
        state: {
          orderData
        }
      });

    } catch (error) {
      console.error('Lỗi tạo đơn hàng:', error);
      alert('Tạo đơn hàng thất bại!');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-qr-page">
      <div className="payment-qr-container">
        <PaymentHeader />

        <div className="payment-qr-content">
          <p className="instruction-text">
            Vui lòng quét mã bên dưới để thanh toán
          </p>

          <QRCodeDisplay
            orderId={paymentData.orderId}
            amount={paymentData.amount || paymentData.summary?.total || 0}
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