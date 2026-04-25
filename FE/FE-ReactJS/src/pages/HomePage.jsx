import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";
import "../css/HomePage.css";

function HomePage() {
  return (
    <div className="app-container">
      <div className="top">
        <div className="navbar">
          <Navbar></Navbar>
        </div>

        <div className="header-content">
          <div className="main-content">
            <Outlet />
          </div>
          
          <div className="footer">
            <Footer></Footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;