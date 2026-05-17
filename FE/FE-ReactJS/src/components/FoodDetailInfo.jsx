import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cartApi from '../api/cartApi';
import '../css/FoodDetailInfo.css';

const FoodDetailInfo = ({ food }) => {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const foodId = food.foodId || food.id;
  const foodName = food.name || '';
  const foodImage = food.image || '';
  const foodRating = Number(food.rating || 0);

  const sizes = Array.isArray(food.size) ? food.size : [];
  const prices = Array.isArray(food.price) ? food.price : [];

  const selectedSize = sizes[selectedIndex] || '';
  const selectedPrice = Number(prices[selectedIndex] || 0);

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Vui lòng đăng nhập để thêm vào giỏ hàng!");
      navigate("/Auth");
      return;
    }

    try {
      const payload = {
        userId: userId,
        foodId: foodId,
        foodName: foodName,
        image: foodImage,
        quantity: quantity,
        price: selectedPrice,
        size: selectedSize,
        note: ""
      };

      console.log("Add to cart payload:", payload);

      await cartApi.addToCart(payload);

      alert(`Đã thêm ${foodName} vào giỏ hàng thành công!`);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Thêm vào giỏ hàng thất bại!");
    }
  };

  const handleBuyNow = () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Vui lòng đăng nhập để mua hàng!");
      navigate("/Auth");
      return;
    }

    const buyNowItem = {
      userId: userId,
      foodId: foodId,
      foodName: foodName,
      name: foodName,
      image: foodImage,
      quantity: quantity,
      price: selectedPrice,
      size: selectedSize,
      note: ""
    };

    console.log("Buy now item:", buyNowItem);

    navigate("/checkout", {
      state: {
        selectedItems: [buyNowItem]
      }
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`star-icon ${i < Math.floor(rating) ? 'filled' : ''}`}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  return (
    <div className="food-info-container">
      <h1 className="food-title">{foodName}</h1>

      <div className="food-rating-row">
        <div className="stars-wrapper">
          {renderStars(foodRating)}
        </div>

        <span className="rating-text">
          {foodRating.toFixed(1)}
        </span>
      </div>

      <div className="food-price">
        {selectedPrice.toLocaleString("vi-VN")} đ
      </div>

      <p className="food-description">
        {food.description}
      </p>

      <p className="food-ingredients">
        <strong>Category:</strong> {food.category || 'No category'}
      </p>

      <div className="quantity-selector">
        <button className="qty-btn" onClick={decreaseQty}>
          -
        </button>

        <div className="qty-display">
          {quantity}
        </div>

        <button className="qty-btn" onClick={increaseQty}>
          +
        </button>
      </div>

      <div className="actions-section">
        <div className="size-selector-wrapper">
          <label className="size-label">Chọn size</label>

          <div className="custom-select-wrapper">
            <select
              className="size-select"
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(Number(e.target.value))}
            >
              {sizes.map((size, index) => (
                <option key={index} value={index}>
                  {size}
                </option>
              ))}
            </select>

            <svg
              className="select-arrow"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div className="action-buttons-wrapper">
          <button
            className="btn-primary btn-add-cart"
            onClick={handleAddToCart}
          >
            + Thêm giỏ hàng 
          </button>

          <button
            className="btn-primary btn-buy-now"
            onClick={handleBuyNow}
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailInfo;