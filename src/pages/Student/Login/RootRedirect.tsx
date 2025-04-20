// RootRedirect.tsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Loading from '../../../components/Loading';

const RootRedirect: React.FC = () => {
  const { role, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading isLoading/>;
  }

  if (role === 1) return <Navigate to="/leadership" replace />;
  if (role === 2) return <Navigate to="/teacher" replace />;
  if (role === 3) return <Navigate to="/student" replace />;
  return <Navigate to="/login" replace />;
};

export default RootRedirect;
