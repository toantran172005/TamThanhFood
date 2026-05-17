import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FoodDetailInfo from '../components/FoodDetailInfo';
import FoodReviews from '../components/FoodReview';
import foodApi from '../api/foodApi';
import '../css/FoodDetail.css';

const FoodDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [foodData, setFoodData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFoodDetail = async () => {
      try {
        setIsLoading(true);

        const response = await foodApi.getById(id);

        console.log("Food detail response:", response);

        setFoodData(response);

        setReviews([
          { id: 1, name: 'John', rating: 5, comment: 'Very delicious.' },
          { id: 2, name: 'Tom', rating: 5, comment: 'Good and special.' },
          { id: 3, name: 'Alice', rating: 4, comment: 'Tastes great, fast delivery!' },
          { id: 4, name: 'Mike', rating: 5, comment: 'Will order again.' }
        ]);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết món ăn:", error);
        setFoodData(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchFoodDetail();
    }
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const getImageUrl = (image) => {
    if (!image) return "/Bison_Burger.png";

    if (image.startsWith("http")) {
      return image;
    }

    return `/${image}`;
  };

  if (isLoading) {
    return (
      <div className="loading-state">
        Loading food details...
      </div>
    );
  }

  if (!foodData) {
    return (
      <div className="error-state">
        Food not found.
      </div>
    );
  }

  return (
    <div className="food-detail-page">
      <button className="back-btn" onClick={handleGoBack}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1f2937"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>

        <span className="back-text">Quay lại</span>
      </button>

      <div className="detail-main-grid">
        <div className="left-column">
          <div className="food-image-wrapper">
            <img
              src={getImageUrl(foodData.image)}
              alt={foodData.name}
              className="food-main-image"
            />
          </div>

          <FoodReviews reviews={reviews} />
        </div>

        <div className="right-column">
          <FoodDetailInfo food={foodData} />
        </div>
      </div>
    </div>
  );
};

export default FoodDetailPage;