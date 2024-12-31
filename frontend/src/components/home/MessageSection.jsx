import React from "react";
import MessageHeader from "./MessageHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

function MessageSection() {
  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] w-full md:px-6 ">
      <div className="flex-none w-full">
        <MessageHeader />
        <div className="divider divider-neutral"></div>
      </div>
      <div className="flex flex-col flex-1 w-full min-h-0">
        <Messages />
      </div>
      <div className="flex-none w-full">
        <MessageInput />
      </div>
    </div>
  );
}

export default MessageSection;
