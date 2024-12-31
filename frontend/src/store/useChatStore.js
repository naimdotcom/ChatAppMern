import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: {},
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
    if (!id) return;
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
    if (!Object.keys(get().selectedUser).length > 0) return;
    get().getMessages(get().selectedUser._id);
  },

  subscribeMessage: () => {
    const { selectedUser } = get();
    // if (!selectedUser?._id) return;
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      console.log("newMessage", newMessage);

      const isMessageSentFromSelectedUser =
        newMessage.sender === selectedUser._id;
      console.log(
        "isMessageSentFromSelectedUser",
        isMessageSentFromSelectedUser
      );

      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });

      console.log("messages in store", get().messages);
    });
  },

  unsubscribeMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  sendMessage: async (data) => {
    try {
      const { selectedUser, messages } = get();
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        data
      );
      set({
        messages: [...messages, res.data.info],
      });

      return true;
    } catch (error) {
      console.log("useChatStore sendMessage error", error);
      toast.error("Something went wrong");
      return false;
    }
  },
}));
