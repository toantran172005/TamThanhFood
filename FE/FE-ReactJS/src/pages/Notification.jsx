import React from 'react'
import "../../public/fontawesome-free-7.2.0-web/css/all.min.css";
import Card_Notification from '../components/Card_Notification';
import Header_2 from "../components/Header_2";
import { Link } from "react-router-dom";
import "../css/Notification.css";

function Notification() {

  const notifications = [
    {
      id: 1,
      title: "The order has been completed.",
      description: "The order has been completed. Please leave us a review of your order.",
      time: "12:00",
      date: "12/04/2026",
      image: "/Bison_Burger.png",
      action: "Review",
    },
    {
      id: 2,
      title: "New vouchers for you.",
      description: "New vouchers for you. Please check your voucher box and use them now.",
      time: "12:00",
      date: "12/04/2026",
      image: "/Grill_Chicken.png",
      action: "Claim now",
    },
    {
      id: 3,
      title: "Order 12345 has been cancelled.",
      description: "Order has been cancelled by admin. Please check your order details and contact us if you have any questions.",
      time: "12:00",
      date: "12/04/2026",
      image: "/Grill_Shrimp.png",
      action: "Claim now",
    },
  ];

  return (
    <div className="notification">

        <div className="notification_content">
          <Header_2></Header_2>
          <div className="notification_header">
            <div className="back">
              <Link to="/">
                <i className="fa-solid fa-arrow-left"></i>
                <span>Quay lại</span>
              </Link>
            </div>

            <div className="title">
              <p>THÔNG BÁO</p>
            </div>
          </div>

          <div className="list_notification">
            {notifications.map((notification) => (
              <Card_Notification key={notification.id} {...notification} />
            ))}
          </div>

        </div>
    </div>
  )
}

export default Notification