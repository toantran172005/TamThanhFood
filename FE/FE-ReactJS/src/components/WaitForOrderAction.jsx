import React from 'react';

const OrderActions = ({ canCancel, isCompleted, onCancel }) => {
  return (
    <div className="order-actions">
      <button
        className={`btn-action ${
          isCompleted ? 'btn-completed' : 'btn-cancel'
        } ${!canCancel ? 'disabled' : ''}`}
        onClick={onCancel}
        disabled={!canCancel || isCompleted}
      >
        {isCompleted ? 'Completed' : canCancel ? 'Cancel' : 'Delivering...'}
      </button>
    </div>
  );
};

export default OrderActions;