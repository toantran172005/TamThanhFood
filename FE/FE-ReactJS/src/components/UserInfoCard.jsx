import React, { useState, useEffect } from 'react';
import '../css/UserInfoCard.css';
import userApi from '../api/userApi'; 
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../recoil/userState';


const UserInfoCard = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const userId = useRecoilValue(userState)?.userId; // Lấy userId từ Recoil
  
  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.[0] || ''
  });

  useEffect(() => {
    setFormData({
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address?.[0] || ''
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAction = async(e) => {
    e.preventDefault();
    if (isEditing) {

      try {

        const updateUserData = {
          userId: user.userId,
          name: user.name,
          email: formData.email,
          phone: formData.phone,
          image: user.avatar,
          address: formData.address ? [formData.address] : []
        };            chat
        const updateUserReponse = await userApi.updateUser(updateUserData);
        console.log("DATA GUI DI:", JSON.stringify(updateUserData, null, 2));

        onUpdate(updateUserReponse);
        setIsEditing(false);

      } catch (error) {
        console.error("Error updating user info:", error);
        alert("Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại.");
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem('isLogin'); 
    window.location.href = '/Auth'; 
  };

  return (
    <div className="profile-card user-info-card">
      <button type="button" className="icon-btn logout-btn" onClick={handleLogout} title="Logout">
         <svg width="28" height="28" viewBox="0 0 24 24" fill="#ff4d4f">
             <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z"/>
         </svg>
      </button>

      <div className="user-avatar-section">
        <div className="avatar-wrapper">
          <img src={user.avatar} alt="User" className="avatar-img" />
          <button type="button" className="icon-btn camera-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          </button>
        </div>
        <h2 className="user-name-display">
          {user.name}
          <button type="button" className="icon-btn text-edit-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </button>
        </h2>
      </div>

      <form className="user-details-form">
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            disabled={!isEditing} 
          />
        </div>
        <div className="form-control">
          <label htmlFor="phone">Phone:</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className="form-control">
          <label htmlFor="address">Adress:</label>
          <input 
            type="text" 
            id="address" 
            name="address" 
            value={formData.address} 
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn-primary pill-btn" onClick={handleAction}>
            {isEditing ? (
              // Icon Save khi đang Edit
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                Lưu
              </>
            ) : (
              // Icon Edit mặc định
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                Chỉnh sửa
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfoCard;