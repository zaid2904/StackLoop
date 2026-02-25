import { PostComposer } from "../components/post/PostComposer";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { mockPosts } from "../data/mockPosts";
import { useAuthStore } from "../store/authStore";
import { useUiStore } from "../store/uiStore";

/**
 * SubmitPage — standalone post composer page.
 */
export default function SubmitPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { openAuthModal } = useUiStore();

  const handleSubmit = ({ title, community, blocks }) => {
    // In production this would call an API; for now just navigate home
    navigate("/");
  };

  if (!user) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="font-mono text-xl text-text">Sign in to post</p>
        <p className="text-sm text-muted font-sans">
          You need an account to contribute to StackLoop.
        </p>
        <button
          onClick={() => openAuthModal("signup")}
          className="inline-flex items-center gap-1 text-accent hover:opacity-80 text-sm transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded"
        >
          Create account
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="font-mono text-xl font-bold text-text">Create Post</h1>
      <PostComposer onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
    </div>
  );
}
