import React from "react";
import "../css/Card_Order.css";
import { useNavigate } from "react-router-dom";

function Card_Order({ orderData }) {
  const navigate = useNavigate();

  if (!orderData) return null;

  const orderId = orderData.id || orderData.orderId;

  const getImageUrl = (image) => {
    if (!image) return "/Bison_Burger.png";

    if (image.startsWith("http")) {
      return image;
    }

    return `/${image}`;
  };

  const handleToDetail = () => {
    if (!orderId) {
      alert("Không tìm thấy mã đơn hàng!");
      return;
    }

    navigate(`/orderdetail/${orderId}`);
  };

  const formatVND = (price) => {
    return new Intl.NumberFormat("vi-VN").format(Number(price || 0)) + " VNĐ";
  };

  return (
    <div className="cart_order">
      <div className="cart_order_left">
        <div className="cart_order_info">
          <p>
            Mã đơn hàng:{" "}
            <span className="order_id">
              #{orderId}
            </span>

            <span className="order_date">
              {" "}
              {orderData.createdAt || orderData.date || ""}
            </span>
          </p>
        </div>

        <div className="cart_order_image">
          {orderData.items && orderData.items.length > 0 ? (
            orderData.items.slice(0, 2).map((item, index) => (
              <img
                key={index}
                src={getImageUrl(item.image)}
                alt={item.foodName || item.name || "food"}
              />
            ))
          ) : (
            <img
              src={getImageUrl(orderData.image)}
              alt="img_food"
            />
          )}
        </div>
      </div>

      <div className="cart_order_right">
        <div className="status_price">
          <p className={`status ${orderData.status?.toLowerCase()}`}>
            {orderData.status || "Processing"}
          </p>

          <h4>
            {formatVND(orderData.totalPrice || orderData.total || orderData.price)}
          </h4>
        </div>

        <div className="cart_order_actions">
          <button className="detail" onClick={handleToDetail}>
            Chi tiết
          </button>

          <button className="re_order">
            Đặt lại
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card_Order;