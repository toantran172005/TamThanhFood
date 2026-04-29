import React from 'react';
import { Link } from 'react-router-dom';

const PaymentHeader = () => {
  return (
    <div className="payment-header">
      <Link to={-1} className="payment-back-btn">
        <svg className="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back</span>
      </Link>
      <h1 className="payment-title">Thanh toán</h1>
      {/* Thẻ div rỗng để cân bằng flexbox, giúp Title luôn nằm ở giữa */}
      <div className="header-spacer"></div>
    </div>
  );
};

export default PaymentHeader;