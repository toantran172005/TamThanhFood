import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FoodDetailInfo from '../components/FoodDetailInfo';
import FoodReviews from '../components/FoodReview';
import '../css/FoodDetail.css';

const FoodDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // TODO: Lấy ID từ URL để fetch data

  // ================= STATE & MOCK DATA =================
  const [foodData, setFoodData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ================= EFFECTS =================
  useEffect(() => {
    // TODO: fetch food details and reviews from Spring Boot API
    // Ví dụ: axios.get(`/api/v1/foods/${id}`).then(...)
    
    // Mocking API
    setTimeout(() => {
      setFoodData({
        id: 1,
        name: 'Grill Sandwich',
        rating: 5.0,
        numReviews: 180,
        price: 30.00,
        description: 'A warm and crispy grilled sandwich featuring savory layers of ham and melted cheese, finished with fresh tomato. Perfectly golden-brown and satisfying.',
        ingredients: 'Slices of sandwich bread, butter, slices of cheese, slices of ham, tomato slices',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        sizes: [
          { id: 'small', label: 'Small' },
          { id: 'median', label: 'Median (default)' },
          { id: 'large', label: 'Large' }
        ]
      });

      setReviews([
        { id: 1, name: 'John', rating: 5, comment: 'Very delicious.' },
        { id: 2, name: 'Tom', rating: 5, comment: 'Good and special.' },
        { id: 3, name: 'Alice', rating: 4, comment: 'Tastes great, fast delivery!' },
        { id: 4, name: 'Mike', rating: 5, comment: 'Will order again.' }
      ]);
      setIsLoading(false);
    }, 400);
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) return <div className="loading-state">Loading food details...</div>;
  if (!foodData) return <div className="error-state">Food not found.</div>;

  return (
    <div className="food-detail-page">
      {/* Nút Back */}
      <button className="back-btn" onClick={handleGoBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span className="back-text">Back</span>
      </button>

      {/* Main Content Grid */}
      <div className="detail-main-grid">
        {/* Cột trái (Image + Reviews) */}
        <div className="left-column">
          <div className="food-image-wrapper">
            <img src={foodData.image} alt={foodData.name} className="food-main-image" />
          </div>
          
          <FoodReviews reviews={reviews} />
        </div>

        {/* Cột phải (Thông tin & Action) */}
        <div className="right-column">
          <FoodDetailInfo food={foodData} />
        </div>
      </div>
    </div>
  );
};

export default FoodDetailPage;