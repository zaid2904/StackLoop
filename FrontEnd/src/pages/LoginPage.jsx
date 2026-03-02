import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/primitives/Button";
import { Input } from "../components/primitives/Input";
import { Divider } from "../components/primitives/Divider";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const { login, loading, error, user } = useAuthStore();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin =  async (e) => {
    e.preventDefault();
    await login(loginForm.email, loginForm.password);
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <div className="bg-surface border border-border rounded-xl p-6">
        <h1 className="font-mono text-lg font-semibold text-text mb-6">Sign in</h1>

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
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </Button>

          <Divider label="or" />

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="w-full inline-flex items-center justify-center gap-1 text-sm text-muted hover:text-accent transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md"
          >
            New to StackLoop? Create account
            <ArrowRight size={13} aria-hidden="true" />
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          <Link
            to="/"
            className="text-accent hover:opacity-80 transition-colors duration-200 ease-out"
          >
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
