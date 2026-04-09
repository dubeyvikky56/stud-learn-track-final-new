import { useState, useEffect, useContext, createContext } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load user from localStorage on refresh
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  // 🔥 LOGIN with OTP only (no password)
  const login = async (email, otp = '', role = 'STUDENT') => {
    try {
      const payload = { email };
      if (otp) {
        payload.otp = otp;
      }
      if (role) {
        payload.role = role;
      }
      
      console.log('Sending login request:', payload);
      const res = await authAPI.login(payload);

      console.log("LOGIN RESPONSE:", res.data);

      const { partial, token, name, role: userRole, email: userEmail } = res.data;

      if (partial) {
        throw { message: 'OTP_REQUIRED', data: { email: userEmail, name, role: userRole } };
      }

      if (!token) throw new Error("Token not received");

      // Save to localStorage
      localStorage.setItem('token', token);
      const userData = { email: userEmail, name, role: userRole };
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log('User data saved to localStorage:', userData);
      console.log('User role:', userRole);
      
      setUser(userData);

      return userData;
    } catch (error) {
      console.error('Login error:', error);
      if (error.message === 'OTP_REQUIRED') {
        throw error;
      }
      throw error.response?.data?.message || error.message || 'Login failed';
    }
  };

  // 🔥 REGISTER (FIXED)
  const register = async (data) => {
    try {
      const registerData = { ...data, role: data.role.toUpperCase() };

      const res = await authAPI.register(registerData);

      const { token, name, email, role } = res.data;

      if (!token) throw new Error("Token not received");

      // ✅ Save token
      localStorage.setItem('token', token);

      // ✅ Save user
      const userData = { email, name, role };
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);

      return userData;

    } catch (error) {
      console.error('Register error:', error);
      throw error.response?.data?.message || error.message || 'Registration failed';
    }
  };

  // 🔥 LOGOUT
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  // 🔹 Update user
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};