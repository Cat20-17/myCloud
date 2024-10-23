import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { logoutUser } from '../../redux/reducers/authSlice';

const ProtectedRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleError = () => {
      dispatch(logoutUser());
    };

    window.addEventListener('authError', handleError);

    return () => window.removeEventListener('authError', handleError);
  }, [dispatch]);

  return isAuthenticated ? <Outlet /> : <Navigate to={ '/login' } />
};

export default ProtectedRoutes;