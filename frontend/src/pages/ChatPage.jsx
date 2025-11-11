import React from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatPage() {
  const { logout, isLoggingOut } = useAuthStore();

  return (
    <div className="z-10">
      <button className="btn btn-secondary" onClick={logout}>
        logout
      </button>
    </div>
  );
}

export default ChatPage;
