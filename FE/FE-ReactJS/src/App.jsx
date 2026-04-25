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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route cha*/}
        <Route path="/" element={<HomePage />}>
          
          {/* index: Nghĩa là đường dẫn mặc định "/" (trang chủ) */}
          <Route index element={<List_Card_Food />} />
          
          <Route path="orders_history" element={<Order_History/>}/>
          
          <Route path="categorys" />

          <Route path="vouchers" />

          <Route path="notifications" element={<Notification/>}/>

          <Route path="settings" />

          <Route path="cart_detail" element={<Cart_Detail/>}/>

          <Route path="information_user" />
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
