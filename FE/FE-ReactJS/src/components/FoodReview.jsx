import React from 'react';
import '../css/FoodReview.css';

const FoodReviews = ({ reviews }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className={`star-icon-small ${i < rating ? 'filled' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  return (
    <div className="food-reviews-section">
      <h2 className="reviews-title">Reviews</h2>
      
      <div className="reviews-scroll-container">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <span className="reviewer-name">{review.name}</span>
              <div className="reviewer-stars">{renderStars(review.rating)}</div>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodReviews;