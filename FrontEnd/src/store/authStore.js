// import { create } from "zustand";

// /**
//  * @typedef {object} User
//  * @property {string} id
//  * @property {string} username
//  * @property {string} displayName
//  * @property {string} avatarUrl
//  * @property {number} karma
//  */

// export const useAuthStore = create((set) => ({
//   /** @type {User | null} */
//   user: null,
//   isAuthenticated: false,

//   setUser: (user) => set({ user, isAuthenticated: !!user }),
//   logout: () => set({ user: null, isAuthenticated: false }),
// }));

import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // LOGIN
  login: async (email, password) => {
    try {
      set({ loading: true, error: null });

      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(res);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save user in store
      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // SIGNUP
  signup: async (username, email, password) => {
    try {
      set({ loading: true, error: null });

      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // logout: () => {
  //   set({ user: null, isAuthenticated: false });
  // },
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
