import React from 'react';

const OrderActions = () => {
  return (
    <div className="order-actions">
      <button 
        className="btn-action btn-cancel"
        onClick={() => { /* TODO: handle reorder */ }}
      >
        Cancel
      </button>
    </div>
  );
};

export default OrderActions;