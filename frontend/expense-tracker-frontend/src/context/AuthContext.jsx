import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import * as authService from '../services/authService';
import { decodeJwt, isTokenExpired } from '../utils/jwt';

export const AuthContext = createContext(null);

const readStoredUser = (token) => {
  const stored = localStorage.getItem('user');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      /* fall through to JWT claims */
    }
  }
  const claims = decodeJwt(token);
  if (!claims) return null;
  return {
    email: claims.sub || claims.email || '',
    name: claims.name || (claims.sub ? claims.sub.split('@')[0] : 'User'),
  };
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem('token');
    return t && !isTokenExpired(t) ? readStoredUser(t) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    }
  }, [token]);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const jwt = await authService.login(credentials);
      localStorage.setItem('token', jwt);
      const claims = decodeJwt(jwt);
      const nextUser = {
        email: claims?.sub || credentials.email,
        name: claims?.name || credentials.email.split('@')[0],
      };
      localStorage.setItem('user', JSON.stringify(nextUser));
      setToken(jwt);
      setUser(nextUser);
      return nextUser;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setLoading(true);
    try {
      const created = await authService.register(payload);
      return created;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }, []);

  const updateStoredUser = useCallback((patch) => {
    setUser((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem('user', JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: !!token,
      loading,
      login,
      register,
      logout,
      updateStoredUser,
    }),
    [token, user, loading, login, register, logout, updateStoredUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
