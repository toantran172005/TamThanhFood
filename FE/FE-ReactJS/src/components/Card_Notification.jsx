import React from "react";
import "../css/Card_Notification.css";
import { useNavigate } from "react-router-dom";

function Card_Notification({id, title, description, time, date, image, action}) {
  const navigate = useNavigate();

  const handleActionClick = () => {
    if (action === "Dùng ngay") {
      navigate("/cart_detail"); 
    }
  };

  return (
    <div className="card_notification">
      <div className="card_notification_info">
        <div className="card_notification_image">
          <img src={image} alt="" />
        </div>

        <div className="card_notification_description">
          <h2>{title}</h2>
          <p>
            {description}
          </p>

          <div>
            <div className="time">{time}</div>
            <div className="date">{date}</div>
          </div>
        </div>

        {action && (
          <div className="card_notification_actions">
            <button 
              className="trash" 
              onClick={handleActionClick}
              disabled={action === "Hết hạn"} 
              style={{
                cursor: action === "Hết hạn" ? "not-allowed" : "pointer",
                opacity: action === "Hết hạn" ? 0.5 : 1 
              }}
            >
              {action}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card_Notification;
