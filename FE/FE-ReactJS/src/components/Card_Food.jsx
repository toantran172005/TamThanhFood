import React from "react";
import "../css/Card_Food.css";

function Card_Food({ id, name, price, description, image, rating }) {
  return (
    <div className="card_Food">
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

        <button className="button_Food">
          <span> + </span> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card_Food;
