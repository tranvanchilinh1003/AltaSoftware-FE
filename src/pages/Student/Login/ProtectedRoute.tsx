import React, { useContext } from 'react';
import Loading from '../../../components/Loading';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

interface ProtectedRouteTypes {
  allowRole: number | null;
}
const ProtectedRoute: React.FC<ProtectedRouteTypes> = ({ allowRole }) => {
  const { role, loading } = useContext(AuthContext);
  if (loading) {
    return <Loading isLoading={loading}/>
  }

  if (role === null || allowRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={{ role }} />;
};

export default ProtectedRoute;
