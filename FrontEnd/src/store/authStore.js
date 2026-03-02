import {
  createContext,
  createElement,
  useEffect,
  useContext,
  useMemo,
  useState,
} from "react";

const AuthStoreContext = createContext(null);

export function AuthStoreProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = "http://localhost:3000/api";

  const setUser = (nextUser) => {
    setUserState(nextUser);
    setError(null);
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.status === 200 && data?.token) {
        localStorage.setItem("token", data.token);
      }

        
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      setUserState(data.user);
      return data;
    } catch (err) {
      setError(err.message || "Login failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, username, email, password) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      setUserState(data.user);
      return data;
    } catch (err) {
      setError(err.message || "Signup failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUserState(null);
    setError(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const bootstrapUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE}/profile/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          return;
        }

        const data = await res.json();
        if (data?.user) {
          setUserState(data.user);
        }
      } catch {
        localStorage.removeItem("token");
      }
    };

    bootstrapUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      error,
      login,
      signup,
      setUser,
      logout,
    }),
    [user, loading, error],
  );

  return createElement(AuthStoreContext.Provider, { value }, children);
}

export function useAuthStore() {
  const context = useContext(AuthStoreContext);
  if (!context) {
    throw new Error("useAuthStore must be used within AuthStoreProvider");
  }
  return context;
}
