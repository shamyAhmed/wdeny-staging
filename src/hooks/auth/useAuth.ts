import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";

type TokenType = "user" | "admin";

export const useAuth = (tokenType: TokenType = "user") => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const accessTokenName = tokenType === "admin" ? "AdminToken" : "UserToken";
  const refreshTokenName =
    tokenType === "admin" ? "AdminRefreshToken" : "RefreshToken";

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = getCookie(accessTokenName);
      const refreshToken = getCookie(refreshTokenName);
      // User/Admin is authenticated if EITHER token exists
      setIsAuthenticated(!!(accessToken || refreshToken));
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage events (when cookies change in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);

    // Re-check when tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkAuth();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [tokenType]);

  return { isAuthenticated, isLoading };
};
