import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuth: boolean;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuth, redirectPath = '/' }) => {
  // if user is not logged in redirect to login page
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }
  
  // else show children routes
  return <Outlet />;
};

export default ProtectedRoute;