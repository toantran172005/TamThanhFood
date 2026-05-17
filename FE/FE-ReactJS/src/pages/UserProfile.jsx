import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserInfoCard from '../components/UserInfoCard';
import AddressListCard from '../components/AddressListCard';
import '../css/UserProfile.css';
import { useRecoilValue } from 'recoil';
import userApi from '../api/userApi';
import { userState } from '../recoil/userState';

const UserProfilePage = () => {
  
  const currentUser = useRecoilValue(userState);
  const [userInfo, setUserInfo] = useState(
    {
      name: '',
      email: '',
      phone: '',
      address: '',
      img: ''
    }
  );
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ================= EFFECTS =================
  useEffect(() => {
    // Để ông tự kiểm tra xem đăng nhập đã lấy được id chưa nhé:
    console.log("Current User trong Recoil:", currentUser);

    const fetchProfileData = async () => {
      if (!currentUser.userId) {
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const data = await userApi.getUserDetails(currentUser.userId);
        
        console.log("Dữ liệu lấy từ API:", data); 
        
        setUserInfo({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',

          address: (data.address && data.address.length > 0) ? data.address[0] : '',
          avatar: data.image || 'https://i.pravatar.cc/150?img=11' 
        });
        

        if (data.address && Array.isArray(data.address)) {
          const formattedAddresses = data.address.map((addrStr, index) => ({
             id: index,
             name: data.name,     // Lấy tạm tên user
             phone: data.phone,   // Lấy tạm số điện thoại
             address: addrStr     // Chuỗi địa chỉ từ mảng
          }));
          setAddresses(formattedAddresses);
        } else {
          setAddresses([]);
        }

      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [currentUser.userId]);

  // ================= HANDLERS =================
  const handleUpdateProfile = (updatedData) => {
    // TODO: call API update profile (PUT /api/v1/user/profile)
    console.log('API Call - Update User:', updatedData);
    setUserInfo(updatedData);
  };

  const handleAddAddress = () => {
    // TODO: Open modal or redirect to Add Address Form
    console.log('Action - Add Address');
  };

  const handleEditAddress = (addressId) => {
    // TODO: Open modal to edit specific address
    console.log('Action - Edit Address ID:', addressId);
  };

  if (isLoading) return <div className="loading-wrapper"><span className="loader">Loading...</span></div>;

  return (
    <div className="profile-page-wrapper">
      {/* HEADER SECTION */}
      <div className="profile-header-section">
        <Link to="/" className="back-link">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </Link>
        <h1 className="profile-title">THÔNG TIN CỦA BẠN</h1>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="profile-content-grid">
        <UserInfoCard user={userInfo} onUpdate={handleUpdateProfile} />
        <AddressListCard 
          addresses={addresses} 
          onAdd={handleAddAddress} 
          onEdit={handleEditAddress} 
        />
      </div>
    </div>
  );
};

export default UserProfilePage;