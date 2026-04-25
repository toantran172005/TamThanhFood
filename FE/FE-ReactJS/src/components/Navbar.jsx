import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import "../../public/fontawesome-free-7.2.0-web/css/all.min.css";

function Navbar() {
  return (
    <div>
      <ul className="nav_bar">
        <li>
          <i className="fa-solid fa-border-all"></i>
        </li>
        <li>
          <Link to="/"><i className="fa-solid fa-house"></i></Link>
        </li>
        <li>
          <Link to="/orders_history"><i className="fa-solid fa-file-lines"></i></Link>
        </li>
        <li>
          <Link to="/categorys"><i className="fa-solid fa-list"></i></Link>
        </li>
        <li>
          <Link to="/vouchers"><i className="fa-solid fa-ticket"></i></Link>
        </li>
        <li>
          <Link to="/notifications"><i className="fa-solid fa-bell"></i></Link>
        </li>
        <li>
          <Link to="/settings"><i className="fa-solid fa-gear"></i></Link>
        </li>
        
      </ul>
    </div>
  );
}

export default Navbar;
