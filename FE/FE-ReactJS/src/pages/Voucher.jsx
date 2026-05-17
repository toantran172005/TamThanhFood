import React from "react";
import "../../public/fontawesome-free-7.2.0-web/css/all.min.css";
import Header_2 from "../components/Header_2";
import { Link } from "react-router-dom";
import "../css/Voucher.css";
import Card_Notification from "../components/Card_Notification";
import voucherApi from "../api/voucherApi";
import { useState, useEffect } from "react";

function Voucher() {
  const [listVoucher, setListVoucher] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        setLoading(true);
        const response = await voucherApi.getAllVouchers();
        setListVoucher(response);
      } catch (error) {
        console.error("Lỗi khi lấy voucher:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const formatVoucherData = (item) => ({
    id: item.id,
    title: `Mã: ${item.code}`,
    description:
      item.discountType === "PERCENT"
        ? `Giảm ${item.value}% cho đơn hàng từ ${item.minOrder.toLocaleString()}đ`
        : `Giảm trực tiếp ${item.value.toLocaleString()}đ`,
    time: "Hạn dùng:",
    date: item.expiredAt,
    image: item.image || (item.code === "FREESHIP" ? "/freeship.png" : "/discount.png"),
    action: item.isActive ? "Dùng ngay" : "Hết hạn",
  });

  return (
    <div className="voucher">
      <div className="voucher_content">
        <Header_2></Header_2>
        <div className="voucher_header">
          <div className="back">
            <Link to="/">
              <i className="fa-solid fa-arrow-left"></i>
              <span>Quay lại</span>
            </Link>
          </div>

          <div className="title">
            <p>MÃ GIẢM GIÁ</p>
          </div>
        </div>

        <div className="list_voucher">
          {loading ? (
            <p style={{ textAlign: "center" }}>Đang tải danh sách voucher...</p>
          ) : listVoucher.length > 0 ? (
            listVoucher.map((item) => (
              <Card_Notification key={item.id} {...formatVoucherData(item)} />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>
              Hiện không có mã giảm giá nào.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Voucher;
