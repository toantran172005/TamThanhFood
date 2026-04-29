import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cart_Product from "../components/Cart_Product";
import "../../public/fontawesome-free-7.2.0-web/css/all.min.css";
import "../css/Cart_Detail.css";
import Header_2 from "../components/Header_2";

const Cart_Detail = () => {
  const navigate = useNavigate();

  // 1. Tạo Mock Data (Dữ liệu giả) cho giỏ hàng
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Bison Burger', price: 105000, quantity: 1, size: 'median' },
    { id: 2, name: 'Grill Chicken', price: 95000, quantity: 1, size: 'median' },
    { id: 3, name: 'Pan-Fried Tofu', price: 50000, quantity: 1, size: 'median' },
  ]);

  // 2. State lưu danh sách ID của các món được tick chọn
  const [selectedIds, setSelectedIds] = useState([]);

  // Hàm xử lý tick/bỏ tick ô checkbox
  const handleToggleSelect = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id); // Đã tick -> Bỏ tick
      } else {
        return [...prev, id]; // Chưa tick -> Tick
      }
    });
  };

  // 3. Xử lý logic khi bấm nút "Giao hàng"
  const handleGoToCheckout = () => {
    if (selectedIds.length === 0) {
      alert("Vui lòng chọn ít nhất 1 món hàng để tiếp tục!");
      return;
    }

    // Lọc ra đúng những món đã được tick chọn
    const itemsToCheckout = cartItems.filter(item => selectedIds.includes(item.id));

    // Chuyển qua trang Checkout (Lưu ý: thay đổi '/checkout' thành đúng route của bạn)
    navigate('/checkout', { 
      state: { checkoutItems: itemsToCheckout } 
    });
  };

  // [Bonus] Tính tổng tiền của NHỮNG MÓN ĐÃ ĐƯỢC TICK
  const selectedTotal = cartItems
    .filter(item => selectedIds.includes(item.id))
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="cart_detail">
        <div className="cart_detail_content">
          <Header_2 />
          
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
            {/* Dùng .map() để render danh sách thay vì hardcode 3 cái Cart_Product */}
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="cart-item-row" 
                style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}
              >
                {/* Ô Checkbox nằm bên trái */}
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleToggleSelect(item.id)}
                  style={{ width: '22px', height: '22px', cursor: 'pointer' }}
                />

                {/* Truyền data item xuống cho Component con để nó hiển thị Tên, Giá, Ảnh... */}
                <div style={{ flex: 1 }}>
                  <Cart_Product item={item} />
                </div>
              </div>
            ))}
          </div>

          <div className="cart_detail_footer">
            <div className="total">
              <span>Tổng cộng: </span>
              {/* Hiển thị tổng tiền tự động format sang định dạng VNĐ */}
              <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
                {new Intl.NumberFormat('vi-VN').format(selectedTotal)} VNĐ
              </span>
            </div>
            {/* Gắn sự kiện onClick vào nút Giao hàng */}
            <button onClick={handleGoToCheckout} style={{ cursor: 'pointer' }}>
              Giao hàng
            </button>
          </div>
        </div>
    </div>
  );
}

export default Cart_Detail;