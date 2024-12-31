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
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      {!selectedUser ? <NoChat /> : <MessageSection />}
    </div>
  );
}

export default Home;
