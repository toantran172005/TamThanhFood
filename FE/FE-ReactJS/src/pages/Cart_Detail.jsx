import React from "react";
import Cart_Product from "../components/Cart_Product";
import "../../public/fontawesome-free-7.2.0-web/css/all.min.css";
import "../css/Cart_Detail.css";
import Header_2 from "../components/Header_2";
import { Link } from "react-router-dom";

function Cart_Detail() {
  return (
    <div className="cart_detail">

        <div className="cart_detail_content">
          <Header_2></Header_2>
          <div className="cart_detail_header">
            <div className="back">
              <Link to="/">
                <i className="fa-solid fa-arrow-left"></i>
                <span>Quay lại</span>
              </Link>
            </div>

            <div className="title">
              <p>CHI TIẾT GIỎ HÀNG</p>
            </div>
          </div>

          <div className="list_cart_product">
            <Cart_Product></Cart_Product>
            <Cart_Product></Cart_Product>
            <Cart_Product></Cart_Product>
          </div>

          <div className="cart_detail_footer">
            <div className="total">
              <span>Tổng tiền: </span>
              <span>$0.00</span>
            </div>
            <button>Đặt hàng</button>
          </div>
        </div>
    </div>
  );
}

export default Cart_Detail;
