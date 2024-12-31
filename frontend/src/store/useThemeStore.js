import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
  theme: localStorage.getItem("chat-app-theme") || "coffee",
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("chat-app-theme", theme);
  },
}));
