import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIng: false,
  isUpdatingProfile: false,
  isCheckAuth: true,
  isUpdatingProfile: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/health-check");
      set({ authUser: res.data.info });
      console.log("from store", get().authUser);
    } catch (error) {
      console.log("useAuthStore checkAuth error", error);
    } finally {
      set({ isCheckAuth: false });
    }
  },

  signUp: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data.info });
    } catch (error) {
      console.log("useAuthStore signUp error", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIng: true });
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res?.data.info });
    } catch (error) {
      console.log("useAuthStore login error", error);
    } finally {
      set({ isLoggingIng: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.log("useAuthStore logout error", error);
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/auth/update-profile", data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("useAuthStore updateProfile error", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
