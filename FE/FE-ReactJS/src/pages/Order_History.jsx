import React, { useState, useEffect } from 'react';
import Card_Order from '../components/Card_Order';
import "../../public/fontawesome-free-7.2.0-web/css/all.min.css";
import "../css/Order_History.css";
import Header_2 from "../components/Header_2";
import { Link } from "react-router-dom";
import orderApi from '../api/orderHistoryApi'; 

function Order_History() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        console.error("Không tìm thấy userId. Vui lòng đăng nhập.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await orderApi.getHistory(userId);
        setOrders(response.content || response);
      } catch (error) {
        console.error("Lỗi khi lấy lịch sử đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div className="order_history">
      <div className="order_history_content">
        <Header_2 />
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
          {loading ? (
            <p style={{ textAlign: 'center', marginTop: '20px' }}>Đang tải lịch sử...</p>
          ) : orders && orders.length > 0 ? (
            orders.map((order) => (
              <Card_Order 
                key={order.id || order.orderId} 
                orderData={order}
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>Bạn chưa có đơn hàng nào.</p>
                <Link to="/" style={{color: 'orange'}}>Đặt món ngay!</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order_History;