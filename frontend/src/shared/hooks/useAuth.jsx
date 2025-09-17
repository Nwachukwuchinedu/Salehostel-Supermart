import { useState, useEffect, useContext, createContext } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const userData = await authService.getProfile();
        setUser(userData.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials, userType = "customer") => {
    try {
      let response;

      switch (userType) {
        case "admin":
          response = await authService.adminLogin(credentials);
          break;
        case "staff":
          response = await authService.staffLogin(credentials);
          break;
        case "supplier":
          response = await authService.supplierLogin(credentials);
          break;
        default:
          response = await authService.login(credentials);
      }

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData, userType = "customer") => {
    try {
      let response;

      switch (userType) {
        case "supplier":
          response = await authService.supplierRegister(userData);
          break;
        default:
          response = await authService.register(userData);
      }

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData);
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const isAuthenticatedFn = () => {
    return isAuthenticated;
  };

  const value = {
    user,
    loading,
    isAuthenticated: isAuthenticatedFn,
    hasRole,
    login,
    register,
    logout,
    updateProfile,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
