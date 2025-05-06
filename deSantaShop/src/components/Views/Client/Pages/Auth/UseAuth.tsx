/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    let userStorage = localStorage.getItem("user");
    let expiresAtStorage = localStorage.getItem("expiresAt");

    if (userStorage && expiresAtStorage) {
      const now = new Date();
      const expiry = new Date(expiresAtStorage);
      if (now.getTime() < expiry.getTime()) {
        setUser(JSON.parse(userStorage));
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("expiresAt");
        localStorage.removeItem("accessToken");
      }
    } else {
      userStorage = sessionStorage.getItem("user");
      expiresAtStorage = sessionStorage.getItem("expiresAt");
      if (userStorage && expiresAtStorage) {
        const now = new Date();
        const expiry = new Date(expiresAtStorage);
        if (now.getTime() < expiry.getTime()) {
          setUser(JSON.parse(userStorage));
        } else {
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("expiresAt");
          sessionStorage.removeItem("accessToken");
        }
      }
    }

    setLoading(false);
  }, [location]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("expiresAt");
    sessionStorage.removeItem("accessToken");
    setUser(null);
  };

  return { user, loading, logout };
};

export default useAuth;