import React, { createContext, useEffect, useState } from 'react';
import createAxiosInstance from '../../../utils/axiosInstance';

interface AuthContextType {
  role: number | null;
  loading: boolean;
  setRole: (role: number | null) => void;
  name: string | null;
  setName: (name: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  role: null,
  loading: true,
  setRole: () => {},
  name: null,
  setName: () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<number | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const axiosInstance = createAxiosInstance(true);

  useEffect(() => {
    axiosInstance
      .get('api/auth/verify-token')
      .then((response) => {
        setRole(response?.data?.data?.roleId);
        setName(response?.data?.data?.fullName);
      })
      .catch(() => {
        setRole(null);
        setName(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return <AuthContext.Provider value={{ role, loading, setRole, name, setName }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
