import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import OrderTracker from '../components/OrderTracker';
import OrderAddress from '../components/OrderAddress';
import OrderDetailSection from '../components/OrderDetailSection';
import OrderInfo from '../components/OrderInfo';
import WaitForOrderAction from '../components/WaitForOrderAction';
import '../css/OrderDetail.css';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: fetch data from Spring Boot API using orderId
    // const fetchOrder = async () => { ... }
    
    // Mock data based on the design
    const mockData = {
      id: "0D34987",
      status: "Complete",
      supportText: "If you need further assistance, please visit our Support Center.",
      currentStep: 4, // 1 to 4
      to: {
        name: "T3 Food",
        address: "200 Vuon Lai, An Phu Dong Ward, HCM City",
        phone: "0987654321"
      },
      from: {
        name: "Tom",
        address: "10 Nguyen Van Dung Street, Hanh Thong Ward, HCM City",
        phone: "0987612345"
      },
      items: [
        {
          id: 1,
          name: "Spring Rolls",
          desc: "Minced meat, Shrimp, Wood ear mushrooms, Vermicelli,...",
          size: "Median",
          price: 20.00,
          quantity: 1,
          image: "https://placehold.co/80x60/orange/white?text=Rolls"
        },
        {
          id: 2,
          name: "Grill Chicken",
          desc: "Chicken breast, Garlic, Honey, Olive oil, Lemon,...",
          size: "Median",
          price: 45.00,
          quantity: 1,
          image: "https://placehold.co/80x60/orange/white?text=Chicken"
        }
      ],
      summary: {
        shippingFee: 5.00,
        discount: 2.00,
        total: 68.00
      },
      info: {
        note: "Empty",
        orderTime: "11:20 AM 11/04/2026",
        paymentMethod: "MoMo"
      }
    };

    setOrderData(mockData);
    setIsLoading(false);
  }, [orderId]);

  if (isLoading) return <div className="order-loading">Loading order details...</div>;
  if (!orderData) return <div className="order-error">Order not found</div>;

  return (
    <div className="order-detail-page">
      <div className="order-header">
        <Link to="/orders_history" className="btn-back">
          <svg className="icon-back" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </Link>
        <h1 className="page-title">Order Detail</h1>
      </div>

      <div className="order-content">
        <OrderTracker 
          status={orderData.status} 
          supportText={orderData.supportText} 
          currentStep={orderData.currentStep} 
        />
        <OrderAddress to={orderData.to} from={orderData.from} />
        <OrderDetailSection items={orderData.items} summary={orderData.summary} />
        <OrderInfo data={orderData.info} orderId={orderData.id} />
        <WaitForOrderAction />
      </div>
    </div>
  );
};

export default OrderDetailPage;