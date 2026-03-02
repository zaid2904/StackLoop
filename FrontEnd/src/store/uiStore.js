import {
  createContext,
  createElement,
  useContext,
  useMemo,
  useState,
} from "react";

const UiStoreContext = createContext(null);

export function UiStoreProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((open) => !open);
  };

  const value = useMemo(
    () => ({
      sidebarOpen,
      setSidebarOpen,
      toggleSidebar,
    }),
    [sidebarOpen],
  );

  return createElement(UiStoreContext.Provider, { value }, children);
}

export function useUiStore() {
  const context = useContext(UiStoreContext);
  if (!context) {
    throw new Error("useUiStore must be used within UiStoreProvider");
  }
  return context;
}
