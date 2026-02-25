import { useState, useCallback } from "react";

// Simulated auth — no real backend
const MOCK_USER = {
  id: "u1",
  username: "zaid_dev",
  displayName: "Zaid Siddiqui",
  avatarUrl: "",
  bio: "Full-stack engineer. TypeScript, React, Go.",
  karma: 4821,
  joinedAt: "2023-03-15",
};

/**
 * Hook for managing authenticated user state.
 * @returns {object}
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async ({ email, password }) => {
    setIsLoading(true);
    setError(null);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));
    if (email && password) {
      setUser(MOCK_USER);
    } else {
      setError("Invalid credentials");
    }
    setIsLoading(false);
  }, []);

  const signup = useCallback(async ({ username, email, password }) => {
    setIsLoading(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 800));
    if (username && email && password) {
      setUser({ ...MOCK_USER, username, displayName: username });
    } else {
      setError("All fields required");
    }
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };
}
