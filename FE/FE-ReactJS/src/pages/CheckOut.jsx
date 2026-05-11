import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderSummaryList from '../components/OrderSummaryList';
import PaymentDetails from '../components/PaymentDetail';
import PaymentMethods from '../components/PaymentMethod';
import '../css/CheckOut.css';

const CheckoutPage = () => {
  const navigate = useNavigate();

  // ================= STATE =================
  const [orderItems, setOrderItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shippingFee: 15000,
    discount: 50000,
    total: 0
  });
  const [selectedPayment, setSelectedPayment] = useState('qrcode');
  const [voucher, setVoucher] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // ================= EFFECTS =================
  useEffect(() => {
    // TODO: fetch order details from Spring Boot API (Cart or Checkout Session)
    // axios.get('/api/v1/checkout/session').then(...)
    
    // Mock Data
    setTimeout(() => {
      const mockItems = [
        { id: 1, name: 'Bison Burger', size: 'Median', quantity: 1, price: 105000, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80' },
        { id: 2, name: 'Grill Chicken', size: 'Median', quantity: 1, price: 95000, image: 'https://images.unsplash.com/photo-1598515022228-51bb68ceb20c?auto=format&fit=crop&w=200&q=80' },
        { id: 3, name: 'Pan-Fried Tofu', size: 'Median', quantity: 1, price: 50000, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80' }
      ];
      setOrderItems(mockItems);
      
      const sub = mockItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setOrderSummary(prev => ({
        ...prev,
        subtotal: sub,
        total: sub + prev.shippingFee - prev.discount
      }));
      setIsLoading(false);
    }, 300);
  }, []);

  // ================= HANDLERS =================
  const handleApplyVoucher = (e) => {
    e.preventDefault();
    // TODO: Call API to validate voucher
    console.log('Apply voucher:', voucher);
  };

  const handleCheckout = () => {
    // TODO: POST request to Spring Boot API to create Order
    const payload = {
      items: orderItems,
      paymentMethod: selectedPayment,
      voucherCode: voucher,
      note: note,
      totalAmount: orderSummary.total
    };
    console.log('Submit Checkout:', payload);
    alert('Đặt hàng thành công!');
  };

  if (isLoading) return <div className="checkout-loading">Loading order details...</div>;

  return (
    <div className="checkout-page-container">
      {/* Header Area */}
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          <span className="back-text">Back</span>
        </button>
        <h1 className="checkout-title">Confirm your order</h1>
        <div className="spacer"></div> {/* Để cân bằng flexbox */}
      </div>

      {/* Top Section: Order Items */}
      <OrderSummaryList items={orderItems} />

      {/* Bottom Section: Details & Payment Methods */}
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