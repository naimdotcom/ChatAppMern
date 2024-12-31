import React, { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";

function Messages() {
  const { messages, getMessages, selectedUser } = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
    console.log("messages", messages);
  }, []);
  return <div className="overflow-y-scroll max-h-[53vh] "></div>;
}

export default Messages;
