import {
  createContext,
  createElement,
  useContext,
  useMemo,
  useState,
} from "react";

/**
 * @typedef {'hot' | 'new' | 'top' | 'rising'} FeedFilter
 */

const FeedStoreContext = createContext(null);

export function FeedStoreProvider({ children }) {
  const [filter, setFilter] = useState("hot");

  const value = useMemo(
    () => ({
      filter,
      setFilter,
    }),
    [filter],
  );

  return createElement(FeedStoreContext.Provider, { value }, children);
}

export function useFeedStore() {
  const context = useContext(FeedStoreContext);
  if (!context) {
    throw new Error("useFeedStore must be used within FeedStoreProvider");
  }
  return context;
}
