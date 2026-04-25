import React from 'react'
import Card_Order from '../components/Card_Order'
import "../../public/fontawesome-free-7.2.0-web/css/all.min.css";
import "../css/Order_History.css";
import Header_2 from "../components/Header_2";
import { Link } from "react-router-dom";

function Order_History() {
  return (
    <div className="order_history">

        <div className="order_history_content">
          <Header_2></Header_2>
          <div className="order_history_header">
            <div className="back">
              <Link to="/">
                <i className="fa-solid fa-arrow-left"></i>
                <span>Quay lại</span>
              </Link>
            </div>

            <div className="title">
              <p>LỊCH SỬ ĐƠN HÀNG</p>
            </div>
          </div>

          <div className="list_order">
            <Card_Order></Card_Order>
            <Card_Order></Card_Order>
            <Card_Order></Card_Order>
          </div>

        </div>
    </div>
  )
}

export default Order_History