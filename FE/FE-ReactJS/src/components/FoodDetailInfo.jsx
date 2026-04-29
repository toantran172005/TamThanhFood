import React, { useState } from 'react';
import '../css/FoodDetailInfo.css';

const FoodDetailInfo = ({ food }) => {
  // ================= STATE =================
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('median');

  // ================= HANDLERS =================
  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    // TODO: Call API to add item to cart (POST /api/v1/cart)
    const orderData = { foodId: food.id, quantity, size: selectedSize };
    console.log('Add to cart:', orderData);
    alert('Added to cart!');
  };

  const handleBuyNow = () => {
    // TODO: Call API and navigate to checkout
    console.log('Buy now:', { foodId: food.id, quantity, size: selectedSize });
  };

  // Helper render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className={`star-icon ${i < Math.floor(rating) ? 'filled' : ''}`} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  return (
    <div className="food-info-container">
      <h1 className="food-title">{food.name}</h1>
      
      <div className="food-rating-row">
        <div className="stars-wrapper">{renderStars(food.rating)}</div>
        <span className="rating-text">{food.rating.toFixed(1)} ({food.numReviews} reviews)</span>
      </div>

      <div className="food-price">${food.price.toFixed(2)}</div>

      <p className="food-description">{food.description}</p>
      
      <p className="food-ingredients">
        <strong>Ingredients:</strong> {food.ingredients}
      </p>

      {/* Quantity Selector - Lưu ý thiết kế ảnh gốc để dấu [+] bên trái, [-] bên phải */}
      <div className="quantity-selector">
        <button className="qty-btn" onClick={increaseQty}>+</button>
        <div className="qty-display">{quantity}</div>
        <button className="qty-btn" onClick={decreaseQty}>−</button>
      </div>

      {/* Size & Actions Grid */}
      <div className="actions-section">
        <div className="size-selector-wrapper">
          <label className="size-label">Select Size</label>
          <div className="custom-select-wrapper">
            <select 
              className="size-select" 
              value={selectedSize} 
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {food.sizes.map(size => (
                <option key={size.id} value={size.id}>{size.label}</option>
              ))}
            </select>
            {/* Custom arrow for select */}
            <svg className="select-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>

        <div className="action-buttons-wrapper">
          <button className="btn-primary btn-add-cart" onClick={handleAddToCart}>
            + Add to Cart
          </button>
          <button className="btn-primary btn-buy-now" onClick={handleBuyNow}>
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailInfo;