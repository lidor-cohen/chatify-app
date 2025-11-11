import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  getAllContacts: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await axios.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await axios.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
}));
