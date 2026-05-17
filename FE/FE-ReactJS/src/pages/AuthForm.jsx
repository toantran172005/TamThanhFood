import React, { useState } from 'react';
import '../css/AuthForm.css';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; 
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../recoil/userState';
import authApi from '../api/userApi'; // Đảm bảo bạn đang import đúng đường dẫn

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userState);

  // --- STATE CHO ĐĂNG NHẬP ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- STATE CHO ĐĂNG KÝ ---
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ================= HÀM XỬ LÝ ĐĂNG NHẬP =================
  const handleSignIn = async(e) => {
    e.preventDefault();
    try {
      const response = await authApi.login(email.trim(), password.trim());
      const realUserId = response.userId || response.data?.userId;

      if (!realUserId) {
        alert("Lỗi: Đăng nhập thành công nhưng không tìm thấy ID của User từ Backend!");
        return; 
      }

      localStorage.setItem("isLogin", "true");
      localStorage.setItem("userId", realUserId);

      setUserInfo({
        userId: realUserId,
        isLogin: true,
      });

      navigate("/");
    } catch (error) {
      console.error('Login failed:', error);
      alert('Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.');
    }
  };

  // ================= HÀM XỬ LÝ ĐĂNG KÝ =================
  const handleSignUp = async(e) => {
    e.preventDefault();

    // 1. Kiểm tra dữ liệu rỗng
    if (!signUpName || !signUpEmail || !signUpPassword || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // 2. Kiểm tra mật khẩu khớp nhau
    if (signUpPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      // 3. Gói dữ liệu gửi lên API
      const payload = {
        name: signUpName.trim(),
        email: signUpEmail.trim(),
        password: signUpPassword.trim(),
      };

      // 4. Gọi API đăng ký (Hãy chắc chắn file userApi.js đã có hàm register này)
      await authApi.register(payload);

      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      
      // 5. Xóa form và tự động chuyển sang tab Đăng nhập
      setSignUpName('');
      setSignUpEmail('');
      setSignUpPassword('');
      setConfirmPassword('');
      setIsSignUp(false);

    } catch (error) {
      console.error('Sign up failed:', error);
      alert('Đăng ký thất bại! Email có thể đã được sử dụng.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className={`container ${isSignUp ? 'sign-up-mode' : ''}`}>
        
        {/* ================= FORM SIGN UP (Trái) ================= */}
        <div className="form-container sign-up-container">
          {/* Đã đổi onSubmit thành handleSignUp */}
          <form action="#" onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#/" className="social"><FaFacebookF /></a>
              <a href="#/" className="social"><FaXTwitter /></a>
              <a href="#/" className="social"><FaGoogle /></a>
            </div>
            <input 
              type="text" 
              placeholder="Username" 
              value={signUpName} 
              onChange={(e) => setSignUpName(e.target.value)} 
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={signUpEmail} 
              onChange={(e) => setSignUpEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={signUpPassword} 
              onChange={(e) => setSignUpPassword(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Confirm password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            <button className="submit-btn" type="submit">SIGN UP</button>
          </form>
        </div>

        {/* ================= FORM SIGN IN (Phải) ================= */}
        <div className="form-container sign-in-container">
          <form action="#" onSubmit={handleSignIn}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#/" className="social"><FaFacebookF /></a>
              <a href="#/" className="social"><FaXTwitter /></a>
              <a href="#/" className="social"><FaGoogle /></a>
            </div>
            <span className="subtitle">Use your account?</span>
            <input 
              type="email" 
              placeholder="Email or username" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <a href="#/" className="forgot-password">Forgot your password?</a>
            <button className="submit-btn" type="submit">SIGN IN</button>
          </form>
        </div>

        {/* ================= LỚP PHỦ OVERLAY ================= */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome to<br/>3T-Food</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="ghost-btn" onClick={() => setIsSignUp(true)}>
                SIGN UP
              </button>
            </div>
            
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