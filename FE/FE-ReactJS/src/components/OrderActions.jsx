import React from 'react';

const OrderActions = () => {
  return (
    <div className="order-actions">
      <button 
        className="btn-action btn-review"
        onClick={() => { /* TODO: handle review */ }}
      >
        Đánh giá
      </button>
      <button 
        className="btn-action btn-reorder"
        onClick={() => { /* TODO: handle reorder */ }}
      >
        Đặt lại
      </button>
    </div>
  );
};

export default OrderActions;