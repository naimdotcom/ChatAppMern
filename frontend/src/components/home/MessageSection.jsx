import React from "react";
import MessageHeader from "./MessageHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

function MessageSection() {
  return (
    <div className="flex flex-col w-full px-4">
      <MessageHeader />
      <div className="divider divider-neutral"></div>
      <div className="h-full">
        <Messages />
      </div>
      <div className="items-end">
        <MessageInput />
      </div>
    </div>
  );
}

export default MessageSection;
