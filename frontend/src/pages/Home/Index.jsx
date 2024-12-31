import React, { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

import Sidebar from "../../components/home/Sidebar";
import NoChat from "../../components/home/NoChat";
import { useChatStore } from "../../store/useChatStore";
import MessageSection from "../../components/home/MessageSection";

function Home() {
  const { authUser } = useAuthStore();
  const { selectedUser } = useChatStore();

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full">
      {/* Mobile View (< 768px) */}
      <div className="flex w-full md:hidden">
        {!selectedUser ? (
          <div className="w-full">
            <Sidebar />
          </div>
        ) : (
          <MessageSection />
        )}
      </div>

      {/* Desktop View (≥ 768px) */}
      <div className="hidden w-full md:flex">
        <div className="flex-shrink-0 w-80">
          <Sidebar />
        </div>
        <div className=" flex-1">
          {Object.keys(selectedUser).length ? <MessageSection /> : <NoChat />}
        </div>
      </div>
    </div>
  );
}

export default Home;
