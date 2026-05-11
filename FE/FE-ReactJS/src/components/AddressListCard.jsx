import React from 'react';
import '../css/AddressListCard.css';

const AddressListCard = ({ addresses, onAdd, onEdit }) => {
  return (
    <div className="profile-card address-list-card">
      <h2 className="card-heading">List Address</h2>
      
      <div className="address-items-container">
        {addresses.map((item, index) => (
          <div key={item.id} className="address-item">
            <h3 className="address-index-title">Address {index + 1}:</h3>
            
            <div className="address-details-box">
              <div className="address-grid-info">
                <div className="info-row">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{item.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{item.phone}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Adress:</span>
                  <span className="info-value">{item.address}</span>
                </div>
              </div>
              
              <button 
                className="icon-btn edit-address-btn" 
                onClick={() => onEdit(item.id)}
                aria-label="Edit address"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="form-actions mt-auto">
        <button className="btn-primary pill-btn" onClick={onAdd}>
          + Add
        </button>
      </div>
    </div>
  );
};

export default AddressListCard;