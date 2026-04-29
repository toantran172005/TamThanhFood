import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Card_Food.css";

const Card_Food = ({ id, name, price, description, image, rating }) => {
  const navigate = useNavigate();

  // 1. Hàm xử lý khi click vào bất kỳ đâu trên Card -> Chuyển đến trang Detail
  const handleGoToDetail = () => {
    // food.id là ID thực tế từ database (ví dụ: 1, 2, 3...)
    navigate(`/food/${id}`);
  };

  // 2. Hàm xử lý khi click MUA NGAY -> Thêm vào giỏ, KHÔNG chuyển trang
  const handleAddToCart = (e) => {
    e.stopPropagation(); // QUAN TRỌNG: Ngăn sự kiện click lan ngược lên thẻ cha (handleGoToDetail)
    
    // TODO: Thực hiện logic thêm vào giỏ hàng (gọi API, dispatch Redux...)
    console.log(`Đã thêm món ${name} vào giỏ hàng!`);
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
