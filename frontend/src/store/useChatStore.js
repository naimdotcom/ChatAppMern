import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: true,

  getUsers: async () => {
    try {
      set({ isUserLoading: true });
      const res = await axiosInstance.get("messages/users");
      set({ users: res.data.info });
    } catch (error) {
      console.log("useChatStore getUsers error", error);
      toast.error("Something went wrong");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (id) => {
    try {
      const res = await axiosInstance.get(`/messages/user/${id}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("useChatStore getMessages error", error);
      toast.error("Something went wrong");
    }
  },

  setSelectedUser: (data) => {
    set({ selectedUser: data });
  },
}));
