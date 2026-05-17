import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cart_Product from "../components/Cart_Product";
import "../../public/fontawesome-free-7.2.0-web/css/all.min.css";
import "../css/Cart_Detail.css";
import Header_2 from "../components/Header_2";
import cartApi from "../api/cartApi";

const Cart_Detail = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await cartApi.getCartByUserId(userId);
        setCartItems(response.items || response || []);
      } catch (error) {
        console.error("Lỗi lấy giỏ hàng:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [userId]);

  const updateQty = async (item, newQty) => {
    if (newQty < 1) return;
    try {
      const payload = {
        userId: userId,
        foodId: item.foodId,
        foodName: item.foodName,
        quantity: newQty,
        price: item.price,
        size: item.size || "M",
        note: item.note || "",
      };

      await cartApi.updateQuantity(payload);

      setCartItems((prev) =>
        prev.map((i) =>
          i.foodId === item.foodId ? { ...i, quantity: newQty } : i
        )
      );
    } catch (error) {
      console.error("Lỗi cập nhật số lượng:", error);
    }
  };

  const handleRemove = async (foodId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa món này?")) {
      try {
        await cartApi.removeFromCart(userId, foodId);

        setCartItems((prev) => prev.filter((item) => item.foodId !== foodId));

        setSelectedIds((prev) => prev.filter((id) => id !== foodId));
      } catch (error) {
        alert("Lỗi khi xóa món ăn");
      }
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectedTotal = cartItems
    .filter((item) => selectedIds.includes(item.foodId))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleGoToCheckout = () => {
    if (selectedIds.length === 0) return alert("Vui lòng chọn món!");

    const itemsToCheckout = cartItems.filter((item) =>
      selectedIds.includes(item.foodId)
    );

    navigate("/checkout", { 
      state: { 
        selectedItems: itemsToCheckout 
      } 
    });
  };

  if (loading) return <div className="loading">Đang tải giỏ hàng...</div>;

  return (
    <div className="cart_detail">
      <div className="cart_detail_content">
        <Header_2 />
        <div className="cart_detail_header">
          <div className="back">
            <Link to="/">
              <i className="fa-solid fa-arrow-left"></i> <span>Quay lại</span>
            </Link>
          </div>
          <div className="title">
            <p>CHI TIẾT GIỎ HÀNG</p>
          </div>
        </div>

        <div className="list_cart_product">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.foodId}
                className="cart-item-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.foodId)} 
                  onChange={() => handleToggleSelect(item.foodId)}
                  style={{ width: "22px", height: "22px", cursor: "pointer" }}
                />
                <div style={{ flex: 1 }}>
                  <Cart_Product
                    item={item}
                    onIncrease={() => updateQty(item, item.quantity + 1)}
                    onDecrease={() => updateQty(item, item.quantity - 1)}
                    onRemove={() => handleRemove(item.foodId)}              
                  />
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>Giỏ hàng trống</p>
          )}
        </div>

        <div className="cart_detail_footer">
          <div className="total">
            <span>Tổng cộng: </span>
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>
              {new Intl.NumberFormat("vi-VN").format(selectedTotal)} VNĐ
            </span>
          </div>
          <button onClick={handleGoToCheckout}>Giao hàng</button>
        </div>
      </div>
    </div>
  );
};

export default Cart_Detail;