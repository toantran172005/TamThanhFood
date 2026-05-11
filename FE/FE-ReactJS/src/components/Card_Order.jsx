import React from "react";
import "../css/Card_Order.css";
import { useNavigate } from "react-router-dom";

function Card_Order({ orderData }) {
  const navigate = useNavigate();

  if (!orderData) return null;

  const handleToDetail = () => {
    navigate(`/orderdetail/${orderData.id || orderData.orderId}`);
  };

  return (
    <div className="cart_order">
      <div className="cart_order_left">
        <div className="cart_order_info">
          <p>
            Order:{" "}
            <span className="order_id">
              #{orderData.id || orderData.orderId}
            </span>
            <span className="order_date">
              {" "}
              {orderData.createdAt || orderData.date}
            </span>
          </p>
        </div>

        <div className="cart_order_image">
          {orderData.items &&
            orderData.items
              .slice(0, 2)
              .map((item, index) => (
                <img key={index} src={item.image} alt={item.name} />
              ))}
          {!orderData.items && (
            <img src={orderData.image || "/Bison_Burger.png"} alt="img_food" />
          )}
        </div>
      </div>

      <div className="cart_order_right">
        <div className="status_price">
          <p className={`status ${orderData.status?.toLowerCase()}`}>
            {orderData.status || "Processing"}
          </p>
          <h4>
            {new Intl.NumberFormat("vi-VN").format(
              orderData.totalPrice || orderData.price,
            )}{" "}
            VNĐ
          </h4>
        </div>

        <div className="cart_order_actions">
          <button className="detail" onClick={handleToDetail}>
            Detail
          </button>
          <button className="re_order">Re-Order</button>
        </div>
      </div>
    </div>
  );
}

export default Card_Order;
