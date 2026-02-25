import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "../primitives/Button";
import { Input } from "../primitives/Input";
import { Divider } from "../primitives/Divider";
import { useAuth } from "../../hooks/useAuth";
import { useAuthStore } from "../../store/authStore";
import { cn } from "../../utils/cn";

/**
 * Authentication modal with login/signup tabs.
 */
export function AuthModal({ defaultTab = "login", onClose }) {
  const [tab, setTab] = useState(defaultTab);
  const { login, signup, isLoading, error } = useAuth();
  const { setUser } = useAuthStore();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // 🔐 LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(loginForm);

    const data = login(loginForm);

    if (data) {
      // Save real user from backend
      setUser(data.user);

      // Save JWT token
      localStorage.setItem("token", data.token);

      onClose();
    }
  };

  // 🆕 SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();

    const data = await signup(signupForm);

    if (data) {
      setUser(data.user);
      localStorage.setItem("token", data.token);

      onClose();
    }
  };

  return (
    <Modal isOpen onClose={onClose} size="sm">
      {/* Tabs */}
      <div className="flex border-b border-border mb-6 -mt-1">
        {["login", "signup"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 py-2 text-sm font-sans font-medium border-b-2 transition-colors duration-200 ease-out focus-visible:outline-none",
              tab === t
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-text",
            )}
          >
            {t === "login" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>

      {tab === "login" ? (
        <form onSubmit={handleLogin} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-text mb-1"
            >
              Email
            </label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-text mb-1"
            >
              Password
            </label>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              required
            />
          </div>

          {error && <p className="text-danger text-sm">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing in…" : "Sign in"}
          </Button>

          <Divider label="or" />

          <button
            type="button"
            onClick={() => setTab("signup")}
            className="w-full inline-flex items-center justify-center gap-1 text-sm text-muted hover:text-accent transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md"
          >
            New to StackLoop? Create account
            <ArrowRight size={13} aria-hidden="true" />
          </button>
        </form>
      ) : (
        <form onSubmit={handleSignup} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="signup-username"
              className="block text-sm font-medium text-text mb-1"
            >
              Username
            </label>
            <Input
              id="signup-username"
              type="text"
              autoComplete="username"
              placeholder="your_handle"
              value={signupForm.username}
              onChange={(e) =>
                setSignupForm({ ...signupForm, username: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="block text-sm font-medium text-text mb-1"
            >
              Email
            </label>
            <Input
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={signupForm.email}
              onChange={(e) =>
                setSignupForm({ ...signupForm, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="block text-sm font-medium text-text mb-1"
            >
              Password
            </label>
            <Input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={signupForm.password}
              onChange={(e) =>
                setSignupForm({ ...signupForm, password: e.target.value })
              }
              required
            />
          </div>

          {error && <p className="text-danger text-sm">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating account…" : "Create account"}
          </Button>
        </form>
      )}
    </Modal>
  );
}
