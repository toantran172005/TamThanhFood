import React from "react";
import { Link } from "react-router-dom";
import "../../public/fontawesome-free-7.2.0-web/css/all.min.css";
import "../css/Header.css";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
      </div>

      <div className="card-user">
        <Link to="/cart_detail">
          <i className="fa-solid fa-shopping-cart"></i>
        </Link>
        
        <Link to="/information_user">
          <i className="fa-solid fa-user"></i>
        </Link>
      </div>
    </div>
  );
}

export default Header;
