import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; 
import { useRecoilValue } from 'recoil'; 
import { userState } from '../recoil/userState';

const ProtectRoutes = () => {
  const currentUser = useRecoilValue(userState);

  if (!currentUser || !currentUser.isLogin) {
    return <Navigate to="/Auth" replace />;
  }

  return <Outlet />;
};

export default ProtectRoutes;