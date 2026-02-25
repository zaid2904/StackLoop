import { create } from "zustand";

export const useUiStore = create((set) => ({
  /** Controls global AuthModal visibility */
  authModalOpen: false,
  authModalTab: "login",

  openAuthModal: (tab = "login") =>
    set({ authModalOpen: true, authModalTab: tab }),
  closeAuthModal: () => set({ authModalOpen: false }),

  /** Left sidebar collapsed state (mobile) */
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
}));
