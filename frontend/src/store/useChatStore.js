import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: true,
  isMessageLoading: true,

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
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/user/${id}`);
      set({ messages: res.data.info });
    } catch (error) {
      console.log("useChatStore getMessages error", error);
      toast.error("Something went wrong");
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setSelectedUser: (data) => {
    set({ selectedUser: data, messages: [] });
    if (get().selectedUser) return;
    get().getMessages(get().selectedUser._id);
  },

  sendMessage: async (data) => {
    try {
      const { selectedUser, messages } = get();
      console.log("selectedUser", selectedUser);

      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        data
      );
      console.log(res.data);

      set({ messages: [...messages, res.data] });
      return true;
    } catch (error) {
      console.log("useChatStore sendMessage error", error);
      toast.error("Something went wrong");
      return false;
    }
  },
}));
