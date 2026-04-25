import React from 'react'
import "../../public/fontawesome-free-7.2.0-web/css/all.min.css";
import Card_Notification from '../components/Card_Notification';
import Header_2 from "../components/Header_2";
import { Link } from "react-router-dom";
import "../css/Notification.css";

function Notification() {
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
            <Card_Notification></Card_Notification>
            <Card_Notification></Card_Notification>
            <Card_Notification></Card_Notification>
          </div>

        </div>
    </div>
  )
}

export default Notification