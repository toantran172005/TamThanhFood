import React from 'react';

const OrderActions = () => {
  return (
    <div className="order-actions">
      <button 
        className="btn-action btn-review"
        onClick={() => { /* TODO: handle review */ }}
      >
        Review
      </button>
      <button 
        className="btn-action btn-reorder"
        onClick={() => { /* TODO: handle reorder */ }}
      >
        Re - Order
      </button>
    </div>
  );
};

export default OrderActions;