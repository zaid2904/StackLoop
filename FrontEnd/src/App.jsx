import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AppLayout } from "./components/layout/AppLayout";
import { Skeleton } from "./components/primitives/Skeleton";

// Eagerly loaded pages
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import PostDetailPage from "./pages/PostDetailPage";
import SubmitPage from "./pages/SubmitPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// Lazy-loaded heavy pages
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function PageLoader() {
  return (
    <div className="space-y-4 py-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-surface border border-border rounded-xl p-4 flex gap-4"
        >
          <Skeleton className="h-8 w-8 rounded-md flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-5 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

function NotFound() {
  return (
    <div className="text-center py-20 space-y-3">
      <p className="font-mono text-3xl font-bold text-text">404</p>
      <p className="text-sm text-muted font-sans">This page doesn't exist.</p>
      <a
        href="/"
        className="inline-flex items-center gap-1 text-accent hover:opacity-80 text-sm transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded"
      >
        <ArrowLeft size={14} aria-hidden="true" />
        Back to home
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/c/:name" element={<CommunityPage />} />
            <Route path="/u/:username" element={<ProfilePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/tag/:tag" element={<ExplorePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppLayout>
    </BrowserRouter>
  );
}
