import { Navbar } from "./Navbar";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { BottomNav } from "./BottomNav";
import { PageContainer } from "./PageContainer";
import { AuthModal } from "../modal/AuthModal";
import { useUiStore } from "../../store/uiStore";

/**
 * Root app layout — composes navbar, sidebars, main content area.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function AppLayout({ children }) {
  const { authModalOpen, closeAuthModal, authModalTab } = useUiStore();

  return (
    <div className="min-h-screen bg-bg text-text font-sans">
      <Navbar />

      <PageContainer>
        <div className="flex gap-6 py-6 pb-20 md:pb-6">
          <LeftSidebar />

          <main className="flex-1 min-w-0 max-w-2xl" role="main">
            {children}
          </main>

          <RightSidebar />
        </div>
      </PageContainer>

      <BottomNav />

      {authModalOpen && (
        <AuthModal defaultTab={authModalTab} onClose={closeAuthModal} />
      )}
    </div>
  );
}
