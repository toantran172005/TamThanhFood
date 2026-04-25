import React from "react";
import "../../public/fontawesome-free-7.2.0-web/css/all.min.css";
import "../css/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-column footer-logo">
          <h3>3T-Food Info</h3>
          <p>Easy and delicious meals, delivered from home to home.</p>
          <div className="footer-socials">
            <a href="#">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Categories</h4>
          <ul>
            <li>
              <a href="#">Cơm</a>
            </li>
            <li>
              <a href="#">Bánh mì</a>
            </li>
            <li>
              <a href="#">Nước</a>
            </li>
            <li>
              <a href="#">Đồ ăn vặt</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#">Về chúng tôi</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>@2026 3T-Food. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
