import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/HomePage.css";

function HomePage() {
  return (
    <div className="app-container">
      <div className="top">
        <div className="navbar">
          <Navbar />
        </div>

        <div className="header-content">
          <Header />

          <div className="main-content">
            <Outlet />
          </div>

          <div className="footer">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;