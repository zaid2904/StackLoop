import { create } from "zustand";

/**
 * @typedef {'hot' | 'new' | 'top' | 'rising'} FeedFilter
 */

export const useFeedStore = create((set) => ({
  /** @type {FeedFilter} */
  filter: "hot",

  setFilter: (filter) => set({ filter }),
}));
