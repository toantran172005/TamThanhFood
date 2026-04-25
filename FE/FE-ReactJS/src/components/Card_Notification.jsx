import React from "react";
import "../css/Card_Notification.css";

function Card_Notification() {
  return (
    <div className="card_notification">
      <div className="card_notification_info">
        <div className="card_notification_image">
          <img src="/Bison_Burger.png" alt="" />
        </div>

        <div className="card_notification_description">
          <h2>The order has been completed.</h2>
          <p>
            Order #0D34987 has been completed. Please leave us a review of your
            order.
          </p>

          <div>
            <div className="time">12:00</div>
            <div className="date">12/04/2026</div>
          </div>
        </div>

        <div className="card_notification_actions">
          <button className="trash">Review</button>
        </div>
      </div>
    </div>
  );
}

export default Card_Notification;
