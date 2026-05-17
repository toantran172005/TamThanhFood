import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OrderSummaryList from '../components/OrderSummaryList';
import PaymentDetails from '../components/PaymentDetail';
import PaymentMethods from '../components/PaymentMethod';
import '../css/CheckOut.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Nhận món đã tick từ Cart_Detail
  const selectedItemsFromCart = location.state?.selectedItems || [];

  const [orderItems, setOrderItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shippingFee: 15000,
    discount: 0,
    total: 0
  });

  const [selectedPayment, setSelectedPayment] = useState('qrcode');
  const [voucher, setVoucher] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const formatCartItemsForCheckout = (items) => {
    return items.map((item) => ({
      id: item.foodId,
      foodId: item.foodId,
      name: item.foodName || item.name,
      foodName: item.foodName || item.name,
      size: item.size || 'M',
      quantity: Number(item.quantity || 1),
      price: Number(item.price || 0),
      image: item.image,
      description: item.description || item.note || 'Món ăn ngon mỗi ngày'
    }));
  };

  useEffect(() => {
    setIsLoading(true);

    const formattedItems = formatCartItemsForCheckout(selectedItemsFromCart);

    const subtotal = formattedItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    const shippingFee = formattedItems.length > 0 ? 15000 : 0;
    const discount = 0;
    const total = subtotal + shippingFee - discount;

    setOrderItems(formattedItems);

    setOrderSummary({
      subtotal,
      shippingFee,
      discount,
      total
    });

    setIsLoading(false);
  }, []);

  const handleApplyVoucher = (e) => {
    e.preventDefault();

    if (voucher.trim().toUpperCase() === 'GIAM50') {
      const discount = 50000;

      setOrderSummary((prev) => ({
        ...prev,
        discount,
        total: prev.subtotal + prev.shippingFee - discount
      }));

      alert('Áp dụng voucher thành công!');
    } else {
      alert('Voucher không hợp lệ!');
    }
  };

  const handleCheckout = () => {
    if (orderItems.length === 0) {
      alert('Bạn chưa chọn món nào để thanh toán!');
      navigate('/cart_detail');
      return;
    }

    const orderId = `OD${Date.now()}`;

    const checkoutData = {
      orderId,
      items: orderItems,
      summary: orderSummary,
      paymentMethod: selectedPayment,
      voucherCode: voucher,
      note: note,
      amount: orderSummary.total
    };

    console.log('Checkout data gửi sang QR:', checkoutData);

    if (selectedPayment === 'qrcode') {
      navigate('/payment-qr', {
          state: {
          orderId,
          amount: orderSummary.total,
          items: orderItems,
          summary: orderSummary,
          paymentMethod: selectedPayment,
          note: note,
          voucherCode: voucher
        }
      });
      return;
    }

    // Nếu thanh toán không phải QR thì đi thẳng sang waitfororder
    navigate(`/waitfororder/${orderId}`, {
      state: {
        orderData: {
          id: orderId,
          status: 'Confirmed',
          supportText: 'If you need further assistance, please visit our Support Center.',
          currentStep: 1,
          to: {
            name: 'T3 Food',
            address: '200 Vuon Lai, An Phu Dong Ward, HCM City',
            phone: '0987654321'
          },
          from: {
            name: 'Tom',
            address: '10 Nguyen Van Dung Street, Hanh Thong Ward, HCM City',
            phone: '0987612345'
          },
          items: orderItems,
          summary: orderSummary,
          info: {
            note: note || 'Empty',
            orderTime: new Date().toLocaleString('vi-VN'),
            paymentMethod: selectedPayment
          }
        }
      }
    });
  };

  if (isLoading) {
    return <div className="checkout-loading">Loading order details...</div>;
  }

  if (orderItems.length === 0) {
    return (
      <div className="checkout-page-container">
        <div className="checkout-header">
          <button className="back-btn" onClick={() => navigate('/cart_detail')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>

            <span className="back-text">Quay lại</span>
          </button>

          <h1 className="checkout-title">Xác nhận đơn hàng</h1>

          <div className="spacer"></div>
        </div>

        <div style={{ padding: '30px', textAlign: 'center', fontSize: '18px', fontWeight: '600' }}>
          Bạn chưa chọn món nào để thanh toán.
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-container">
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>

          <span className="back-text">Quay lại</span>
        </button>

        <h1 className="checkout-title">Xác nhận đơn hàng</h1>

        <div className="spacer"></div>
      </div>

      <OrderSummaryList items={orderItems} />

      <div className="checkout-bottom-grid">
        <div className="left-column">
          <PaymentDetails
            summary={orderSummary}
            itemCount={orderItems.length}
            voucher={voucher}
            setVoucher={setVoucher}
            onApplyVoucher={handleApplyVoucher}
            note={note}
            setNote={setNote}
          />
        </div>

        <div className="right-column">
          <PaymentMethods
            selected={selectedPayment}
            onChange={setSelectedPayment}
            onSubmit={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;