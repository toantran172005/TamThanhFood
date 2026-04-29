import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserInfoCard from '../components/UserInfoCard';
import AddressListCard from '../components/AddressListCard';
import '../css/UserProfile.css';

const UserProfilePage = () => {
  // ================= STATE & MOCK DATA =================
  const [userInfo, setUserInfo] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ================= EFFECTS =================
  useEffect(() => {
    // TODO: fetch data from Spring Boot API
    // const fetchProfile = async () => {
    //   const response = await axios.get('/api/v1/user/profile');
    //   setUserInfo(response.data.user);
    //   setAddresses(response.data.addresses);
    // }
    
    // Mock data for UI development
    setTimeout(() => {
      setUserInfo({
        id: 1,
        name: 'John Smith',
        email: 'john@gmail.com',
        phone: '0987654321',
        address: '10 Nguyen Van Bao Street, Hanh Thong Ward, HCM City',
        avatar: 'https://i.pravatar.cc/150?img=11'
      });

      setAddresses([
        { id: 1, name: 'John', phone: '0987654321', address: '10 Nguyen Van Bao Street, Hanh Thong Ward, HCM City' },
        { id: 2, name: 'Tom', phone: '0987612345', address: '10 Nguyen Van Dung Street, Hanh Thong Ward, HCM City' }
      ]);
      setIsLoading(false);
    }, 300);
  }, []);

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
        <h1 className="profile-title">YOUR INFORMATION</h1>
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