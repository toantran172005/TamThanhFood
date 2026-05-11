import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Card_Food.css";
import cartApi from "../api/cartApi";

const Card_Food = ({ foodId, name, price, description, image, rating }) => {
  const navigate = useNavigate();

  const handleGoToDetail = () => {
    navigate(`/food/${foodId}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation(); 

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
        foodName: name,
        image: image,
        quantity: 1,
        price: price,
        size: "M", 
        note: ""
      };

      await cartApi.addToCart(payload);
      alert(`Đã thêm ${name} vào giỏ hàng thành công!`);
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Thêm vào giỏ hàng thất bại!");
    }
  };


  return (
    <div className="card_Food" onClick={handleGoToDetail}>
      <img className="img_Food" src={image} alt={name} />

      <div className="title_price_Food">
          <h2 className="title_Food">{name}</h2>

          <span className="price_Food">${price.toFixed(2)}</span>
      </div>

      <p className="description_Food">
        {description}
      </p>

      <div className="rating_button_Food">
        <div className="rating_Food_Left">
          <span>
            <img className="star_Food" src="/star.png" alt="Star" />
          </span>
          <span className="poin_rating">{rating.toFixed(1)}</span>
        </div>

        <button className="button_Food" onClick={handleAddToCart}>
          <span> + </span> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card_Food;
