import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in auth: " + error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      console.log("data: " + data);
      set({ isSigningUp: true });

      const res = await axiosInstance.post("/auth/signup", data);
      console.log(res);
      set({ authUser: res.data });

      toast.success("Account created successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
