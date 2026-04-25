import React from "react";
import "../css/Card_Notification.css";

function Card_Notification({id, title, description, time, date, image, action}) {
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

        <div className="card_notification_actions">
          <button className="trash">{action}</button>
        </div>
      </div>
    </div>
  );
}

export default Card_Notification;
