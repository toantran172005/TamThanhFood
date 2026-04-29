import React, { useState } from 'react';
import '../css/AuthForm.css';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; 
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    
    // Giả lập đăng nhập thành công
    localStorage.setItem("isLogin", "true");

    // Chuyển hướng về trang chủ sau khi đăng nhập thành công
    navigate("/");
  };

  return (
    <div className="auth-wrapper">
      <div className={`container ${isSignUp ? 'sign-up-mode' : ''}`}>
        
        {/* ================= FORM SIGN UP (Trái) ================= */}
        <div className="form-container sign-up-container">
          <form action="#" onSubmit={handleSignIn}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social"><FaFacebookF /></a>
              <a href="#" className="social"><FaXTwitter /></a>
              <a href="#" className="social"><FaGoogle /></a>
            </div>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm password" />
            <button className="submit-btn">SIGN UP</button>
          </form>
        </div>

        {/* ================= FORM SIGN IN (Phải) ================= */}
        <div className="form-container sign-in-container">
          <form action="#" onSubmit={handleSignIn}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social"><FaFacebookF /></a>
              <a href="#" className="social"><FaXTwitter /></a>
              <a href="#" className="social"><FaGoogle /></a>
            </div>
            <span className="subtitle">Use your account?</span>
            <input type="email" placeholder="Email or username" />
            <input type="password" placeholder="Password" />
            <a href="#" className="forgot-password">Forgot your password?</a>
            <button className="submit-btn">SIGN IN</button>
          </form>
        </div>

        {/* ================= LỚP PHỦ OVERLAY ================= */}
        <div className="overlay-container">
          <div className="overlay">
            
            {/* Nội dung Overlay hiển thị ở màn hình Sign In (Bên trái) */}
            <div className="overlay-panel overlay-left">
              <h1>Welcome to<br/>3T-Food</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="ghost-btn" onClick={() => setIsSignUp(true)}>
                SIGN UP
              </button>
            </div>
            
            {/* Nội dung Overlay hiển thị ở màn hình Sign Up (Bên phải) */}
            <div className="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="ghost-btn" onClick={() => setIsSignUp(false)}>
                SIGN IN
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;