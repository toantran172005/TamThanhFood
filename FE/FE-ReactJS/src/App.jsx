import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Card_Food from "./components/Card_Food";
import List_Card_Food from "./components/List_Card_Food";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Cart_Product from "./components/Cart_Product";
import Cart_Detail from "./pages/Cart_Detail";
import HomePage from "./pages/HomePage";
import Card_Order from "./components/Card_Order";
import Order_History from "./pages/Order_History";
import Notification from "./pages/Notification";
import Voucher from "./pages/Voucher";
import Setting from "./pages/Setting";
import Auth from "./pages/AuthForm";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfilePage from "./pages/UserProfile";
import FoodDetailPage from "./pages/FoodDetail";
import CheckoutPage from "./pages/CheckOut";
import OrderDetail from "./pages/OrderDetail"
import WaitForOrder from "./pages/WaitForOrder";
import PaymentQRCodePage from "./pages/PaymentQRCode";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Route login (public) */}
        <Route path="/Auth" element={<Auth />} />

        {/* Route cần đăng nhập */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />}>
            
            <Route index element={<List_Card_Food />} />

            <Route path="orders_history" element={<Order_History />} />
            <Route path="vouchers" element={<Voucher />} />
            <Route path="notifications" element={<Notification />} />
            <Route path="settings" element={<Setting />} />
            <Route path="cart_detail" element={<Cart_Detail />} />
            <Route path="information_user" element={<UserProfilePage />} />
            <Route path="foods/:id" element={<FoodDetailPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="orderdetail" element={<OrderDetail/>}/>
            <Route path="waitfororder/:orderId" element={<WaitForOrder />} />
            <Route path="payment-qr" element={<PaymentQRCodePage />} />

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;
