import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import OrderTracker from '../components/OrderTracker';
import OrderAddress from '../components/OrderAddress';
import OrderDetailSection from '../components/OrderDetailSection';
import OrderInfo from '../components/OrderInfo';
import OrderActions from '../components/OrderActions';
import orderApi from '../api/orderHistoryApi';
import '../css/OrderDetail.css';

const OrderDetailPage = () => {
  const { orderId } = useParams();

  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentStep = (status) => {
    switch (status) {
      case 'PENDING':
      case 'CONFIRMED':
        return 1;
      case 'PREPARING':
        return 2;
      case 'DELIVERING':
        return 3;
      case 'COMPLETE':
        return 4;
      case 'CANCELED':
        return 1;
      default:
        return 1;
    }
  };

  const getSupportText = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Đơn hàng của bạn đang chờ xác nhận.';
      case 'CONFIRMED':
        return 'Đơn hàng đã được xác nhận.';
      case 'PREPARING':
        return 'Đơn hàng đang được chuẩn bị.';
      case 'DELIVERING':
        return 'Đơn hàng đang được giao.';
      case 'COMPLETE':
        return 'If you need further assistance, please visit our Support Center.';
      case 'CANCELED':
        return 'Đơn hàng đã được hủy.';
      default:
        return 'If you need further assistance, please visit our Support Center.';
    }
  };

  const formatOrderData = (order) => {
    const status = order.status || 'PENDING';

    return {
      id: order.id || order.orderId || orderId,
      status: status,
      supportText: getSupportText(status),
      currentStep: getCurrentStep(status),

      to: {
        name: 'T3 Food',
        address: '200 Vuon Lai, An Phu Dong Ward, HCM City',
        phone: '0987654321'
      },

      from: {
        name: 'Khách hàng',
        address: order.address || 'Chưa có địa chỉ',
        phone: ''
      },

      items: (order.items || []).map((item, index) => ({
        id: item.id || item.foodId || index,
        foodId: item.foodId,
        name: item.foodName || item.name,
        desc: item.note || item.description || 'Món ăn ngon mỗi ngày',
        size: item.size,
        price: Number(item.price || 0),
        quantity: Number(item.quantity || 1),
        image: item.image
      })),

      summary: {
        subtotal: Number(order.subtotal || 0),
        shippingFee: Number(order.shippingFee || 0),
        discount: Number(order.discount || 0),
        total: Number(order.totalPrice || order.total || 0)
      },

      info: {
        note: order.note || 'Empty',
        orderTime: order.createdAt || '',
        paymentMethod: order.payment || ''
      }
    };
  };

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setIsLoading(true);

        const response = await orderApi.getById(orderId);

        console.log('Chi tiết đơn hàng từ DB:', response);

        const formattedOrder = formatOrderData(response);

        setOrderData(formattedOrder);
      } catch (error) {
        console.error('Lỗi lấy chi tiết đơn hàng:', error);
        setOrderData(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetail();
    }
  }, [orderId]);

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

        <h1 className="page-title">Order Detail</h1>
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

        <OrderActions orderData={orderData} />
      </div>
    </div>
  );
};

export default OrderDetailPage;