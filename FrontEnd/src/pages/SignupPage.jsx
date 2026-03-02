import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/primitives/Button";
import { Input } from "../components/primitives/Input";
import { Divider } from "../components/primitives/Divider";
import { useAuthStore } from "../store/authStore";

export default function SignupPage() {
  const navigate = useNavigate();
  const [signupForm, setSignupForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const { signup, loading, error, user } = useAuthStore();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(
      signupForm.name,
      signupForm.username,
      signupForm.email,
      signupForm.password,
    );
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <div className="bg-surface border border-border rounded-xl p-6">
        <h1 className="font-mono text-lg font-semibold text-text mb-6">Create account</h1>

        <form onSubmit={handleSignup} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="signup-name"
              className="block text-sm font-medium text-text mb-1"
            >
              Name
            </label>
            <Input
              id="signup-name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={signupForm.name}
              onChange={(e) =>
                setSignupForm({ ...signupForm, name: e.target.value })
              }
              required
            />
          </div>

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
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create account"}
          </Button>

          <Divider label="or" />

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full inline-flex items-center justify-center gap-1 text-sm text-muted hover:text-accent transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-md"
          >
            Already have an account? Sign in
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
