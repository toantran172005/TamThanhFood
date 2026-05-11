import React from 'react';
import { useNavigate } from "react-router-dom";
import '../css/PaymentMethod.css';

const PaymentMethods = ({ selected, onChange, onSubmit }) => {

  const navigate = useNavigate();

  const methods = [
    { id: 'momo', name: 'Thanh toán bằng ví momo', icon: 'mo' },
    { id: 'shopee', name: 'Thanh toán bằng ShopeePay', icon: 'S' },
    { id: 'qrcode', name: 'Thanh toán bằng QRCode', icon: 'QR' },
    { id: 'visa', name: 'Thanh toán bằng thẻ', icon: 'VISA' }
  ];

  const handleToPayment = () => {
    navigate('/payment-qr', { state: { orderId: '0D123', amount: '200.000VNĐ' } });
  };

  return (
    <div className="payment-methods-wrapper">
      <h2 className="section-title">Phương thức thanh toán</h2>
      
      <div className="methods-list-box">
        {methods.map((method, index) => (
          <React.Fragment key={method.id}>
            <label className="method-item">
              <div className="method-left">
                <span className={`method-icon ${method.id}`}>{method.icon}</span>
                <span className="method-name">{method.name}</span>
              </div>
              
              <div className="radio-custom">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value={method.id}
                  checked={selected === method.id}
                  onChange={() => onChange(method.id)}
                  className="radio-hidden"
                />
                <div className={`radio-circle ${selected === method.id ? 'checked' : ''}`}>
                  {selected === method.id && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  )}
                </div>
              </div>
            </label>
            {index !== methods.length - 1 && <div className="divider-solid"></div>}
          </React.Fragment>
        ))}
      </div>

      <button className="btn-submit-checkout" onClick={handleToPayment}>
        Thanh toán
      </button>
    </div>
  );
};

export default PaymentMethods;