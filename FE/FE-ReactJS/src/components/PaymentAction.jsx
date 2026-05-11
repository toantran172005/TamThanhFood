import React from 'react';

const PaymentAction = ({ onConfirm, isLoading }) => {
  return (
    <div className="payment-action-section">
      <p className="confirm-instruction">Xác nhận nếu thanh toán thành công</p>
      <button 
        className={`btn-confirm-payment ${isLoading ? 'loading' : ''}`}
        onClick={onConfirm}
        disabled={isLoading}
      >
        {isLoading ? 'Đang xử lý...' : 'Xác nhận thanh toán'}
      </button>
    </div>
  );
};

export default PaymentAction;