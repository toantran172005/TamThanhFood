import React from 'react';
import '../css/PaymentDetail.css';

const PaymentDetails = ({ summary, itemCount, voucher, setVoucher, onApplyVoucher, note, setNote }) => {
  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'VNĐ';
  };

  return (
    <div className="payment-details-wrapper">
      <h2 className="section-title">Chi tiết thanh toán</h2>
      
      <div className="calc-row">
        <span>Tổng giá món ({itemCount} món)</span>
        <span>{formatVND(summary.subtotal)}</span>
      </div>
      <div className="calc-row">
        <span>Phí giao hàng</span>
        <span>{formatVND(summary.shippingFee)}</span>
      </div>
      <div className="calc-row discount-row">
        <span>Mã khuyến mãi</span>
        <span>-{formatVND(summary.discount)}</span>
      </div>

      <div className="divider-dashed"></div>

      <div className="calc-row total-row">
        <span className="total-label">Tổng thanh toán</span>
        <div className="total-price-wrapper">
          <span className="total-price">{formatVND(summary.total)}</span>
          <span className="tax-note">Đã bao gồm thuế</span>
        </div>
      </div>

      <form className="voucher-form" onSubmit={onApplyVoucher}>
        <input 
          type="text" 
          placeholder="Áp dụng voucher" 
          value={voucher}
          onChange={(e) => setVoucher(e.target.value)}
          className="voucher-input"
        />
        
        <div className="voucher-divider"></div>
        
        <button type="submit" className="voucher-btn" aria-label="Apply Voucher">
          {/* SVG Icon Voucher chuẩn thiết kế (hình vé màu xám đen) */}
          <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8C3.10457 8 4 7.10457 4 6V4C4 2.89543 4.89543 2 6 2H30C31.1046 2 32 2.89543 32 4V6C32 7.10457 32.8954 8 34 8V16C32.8954 16 32 16.8954 32 18V20C32 21.1046 31.1046 22 30 22H6C4.89543 22 4 21.1046 4 20V18C4 16.8954 3.10457 16 2 16V8Z" fill="#5F5F5F"/>
            <path d="M14 16L22 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="15.5" cy="9.5" r="1.5" fill="white"/>
            <circle cx="20.5" cy="14.5" r="1.5" fill="white"/>
          </svg>
        </button>
      </form>

      <textarea 
        className="note-textarea"
        placeholder="Thêm ghi chú ..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows="3"
      ></textarea>
    </div>
  );
};

export default PaymentDetails;