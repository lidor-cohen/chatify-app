import React from "react";
import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div role="tablist" className="tabs tabs-boxed p-2 m-2 bg-transparent">
      <a
        role="tab"
        className={`tab ${
          activeTab === "chats"
            ? "bg-cyan-500/20 text-cyan-400"
            : "text-slate-400"
        }`}
        onClick={() => {
          setActiveTab("chats");
        }}>
        Chats
      </a>
      <a
        role="tab"
        className={`tab ${
          activeTab === "contacts"
            ? "bg-cyan-500/20 text-cyan-400"
            : "text-slate-400"
        }`}
        onClick={() => {
          setActiveTab("contacts");
        }}>
        Contacts
      </a>
    </div>
  );
}

export default ActiveTabSwitch;
