import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import OrderTracker from '../components/OrderTracker';
import OrderAddress from '../components/OrderAddress';
import OrderDetailSection from '../components/OrderDetailSection';
import OrderInfo from '../components/OrderInfo';
import WaitForOrderAction from '../components/WaitForOrderAction';
import orderApi from '../api/orderHistoryApi';
import cartApi from '../api/cartApi';
import '../css/OrderDetail.css';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canCancel, setCanCancel] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setIsLoading(true);

        const orderDataFromState = location.state?.orderData;

        if (orderDataFromState) {
          const realOrderId = orderDataFromState.id || orderId;

          console.log('Order data nhận từ Payment QR:', orderDataFromState);
          console.log('Order ID dùng cho giả lập:', realOrderId);

          setOrderData({
            ...orderDataFromState,
            id: realOrderId,
            status: 'PENDING',
            currentStep: 1,
            supportText: 'Đơn hàng của bạn đã được tạo. Vui lòng chờ giao hàng.'
          });

          setCanCancel(true);
          setIsCompleted(false);
          return;
        }

        const response = await orderApi.getById(orderId);

        console.log('Order data lấy từ DB:', response);

        const realOrderId = response.id || response.orderId || orderId;

        const status = response.status || 'PENDING';

        setOrderData({
          id: realOrderId,
          status: status,
          supportText:
            status === 'DELIVERING'
              ? 'Đơn hàng đang được giao. Bạn không thể hủy đơn lúc này.'
              : status === 'COMPLETE'
                ? 'Đơn hàng đã hoàn tất.'
                : 'Đơn hàng của bạn đã được tạo. Vui lòng chờ giao hàng.',
          currentStep:
            status === 'COMPLETE'
              ? 4
              : status === 'DELIVERING'
                ? 3
                : 1,

          to: {
            name: 'T3 Food',
            address: '200 Vuon Lai, An Phu Dong Ward, HCM City',
            phone: '0987654321'
          },

          from: {
            name: 'Khách hàng',
            address: response.address || 'Chưa có địa chỉ',
            phone: ''
          },

          items: response.items || [],

          summary: {
            subtotal: response.subtotal || 0,
            shippingFee: response.shippingFee || 0,
            discount: response.discount || 0,
            total: response.totalPrice || response.total || 0
          },

          info: {
            note: response.note || 'Empty',
            orderTime: response.createdAt || '',
            paymentMethod: response.payment || ''
          }
        });

        if (status === 'DELIVERING') {
          setCanCancel(false);
        }

        if (status === 'COMPLETE') {
          setCanCancel(false);
          setIsCompleted(true);
        }

      } catch (error) {
        console.error('Lỗi lấy chi tiết đơn:', error);
        setOrderData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrder();
  }, [orderId, location.state]);

  const removeCompletedItemsFromCart = async (items) => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('Không tìm thấy userId để xóa giỏ hàng');
      return;
    }

    if (!items || items.length === 0) {
      return;
    }

    try {
      await Promise.all(
        items.map((item) => {
          const foodId = item.foodId || item.id;
          return cartApi.removeFromCart(userId, foodId);
        })
      );

      console.log('Đã xóa các món đã thanh toán khỏi giỏ hàng');
    } catch (error) {
      console.error('Lỗi khi xóa món khỏi giỏ hàng:', error);
    }
  };

  useEffect(() => {
    if (!orderData) return;

    const realOrderId = orderData.id || orderId;

    if (!realOrderId) {
      console.error('Không có orderId nên không chạy giả lập giao hàng');
      return;
    }

    if (orderData.status === 'COMPLETE' || orderData.status === 'CANCELLED') {
      return;
    }

    console.log('Bắt đầu giả lập giao hàng cho đơn:', realOrderId);

    const deliveringTimer = setTimeout(async () => {
      console.log('Sau 10 giây: chuyển sang DELIVERING');

      setCanCancel(false);

      setOrderData((prev) => ({
        ...prev,
        id: realOrderId,
        status: 'DELIVERING',
        currentStep: 3,
        supportText: 'Đơn hàng đang được giao. Bạn không thể hủy đơn lúc này.'
      }));

      try {
        await orderApi.updateStatus(realOrderId, 'DELIVERING');
        console.log('Đã cập nhật DB: DELIVERING');
      } catch (error) {
        console.error('Lỗi cập nhật trạng thái DELIVERING:', error);
      }
    }, 10000);

    const completeTimer = setTimeout(async () => {
      console.log('Sau 25 giây: chuyển sang COMPLETE');

      setCanCancel(false);
      setIsCompleted(true);

      const completedAt = new Date().toLocaleString('vi-VN');

      setOrderData((prev) => ({
        ...prev,
        id: realOrderId,
        status: 'COMPLETE',
        currentStep: 4,
        supportText: 'Đơn hàng đã hoàn tất.',
        completedAt: completedAt
      }));

      try {
        await orderApi.updateStatus(realOrderId, 'COMPLETE');

        await removeCompletedItemsFromCart(orderData.items);

        alert('Đơn hàng đã hoàn tất, đã lưu vào lịch sử và đã xóa món khỏi giỏ hàng!');
        console.log('Đã cập nhật DB: COMPLETE');
      } catch (error) {
        console.error('Lỗi khi hoàn tất đơn hàng:', error);
        alert('Đơn đã hoàn tất nhưng có lỗi khi cập nhật DB hoặc xóa giỏ hàng!');
      }
    }, 25000);

    return () => {
      clearTimeout(deliveringTimer);
      clearTimeout(completeTimer);
    };
  }, [orderData?.id, orderId]);

  const handleCancelOrder = async () => {
    if (!canCancel) {
      alert('Đơn hàng đang được giao, bạn không thể hủy!');
      return;
    }

    const isConfirm = window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?');

    if (!isConfirm) return;

    try {
      const realOrderId = orderData.id || orderId;

      await orderApi.updateStatus(realOrderId, 'CANCELLED');

      alert('Đơn hàng đã được hủy!');
      navigate('/');
    } catch (error) {
      console.error('Lỗi hủy đơn:', error);
      alert('Hủy đơn thất bại!');
    }
  };

  if (isLoading) {
    return <div className="order-loading">Loading order details...</div>;
  }

  if (!orderData) {
    return <div className="order-error">Order not found</div>;
  }

  return (
    <div className="order-detail-page">
      <div className="order-header">
        <Link to="/orders_history" className="btn-back">
          <svg className="icon-back" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Quay lại
        </Link>

        <h1 className="page-title">Chi tiết đơn hàng</h1>
      </div>

      <div className="order-content">
        <OrderTracker
          status={orderData.status}
          supportText={orderData.supportText}
          currentStep={orderData.currentStep}
        />

        <OrderAddress
          to={orderData.to}
          from={orderData.from}
        />

        <OrderDetailSection
          items={orderData.items}
          summary={orderData.summary}
        />

        <OrderInfo
          data={orderData.info}
          orderId={orderData.id}
        />

        {orderData.status === 'DELIVERING' && (
          <div className="order-delivering-message">
            Đơn hàng đang được giao. Bạn không thể hủy đơn lúc này.
          </div>
        )}

        {isCompleted && (
          <div className="order-complete-message">
            Đơn hàng đã hoàn tất và đã được lưu vào lịch sử.
          </div>
        )}

        <WaitForOrderAction
          canCancel={canCancel}
          isCompleted={isCompleted}
          onCancel={handleCancelOrder}
        />
      </div>
    </div>
  );
};

export default OrderDetailPage;