import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('careerflow_token') || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await api.getMe();
        if (res.success && res.user) {
          setUser(res.user);
        } else {
          // Token expired or invalid
          localStorage.removeItem('careerflow_token');
          setToken(null);
          setUser(null);
        }
      } catch (err) {
        console.error('Session validation error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, [token]);

  const handleLoginSuccess = (res) => {
    if (res.token) {
      localStorage.setItem('careerflow_token', res.token);
      setToken(res.token);
      setUser(res.user);
    }
  };

  const login = async (email, password) => {
    const res = await api.login(email, password);
    if (res.success) {
      handleLoginSuccess(res);
    }
    return res;
  };

  const register = async (data) => {
    const res = await api.register(data);
    if (res.success) {
      handleLoginSuccess(res);
    }
    return res;
  };

  const demoLogin = async () => {
    const res = await api.demoLogin();
    if (res.success) {
      handleLoginSuccess(res);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('careerflow_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        demoLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
