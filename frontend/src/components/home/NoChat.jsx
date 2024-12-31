import { MessageSquareQuote } from "lucide-react";
import React from "react";

function NoChat() {
  return (
    <div className=" max-h-[88vh] w-full">
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <div className="px-5 pt-9 rounded-xl btn w-fit h-fit">
          <MessageSquareQuote size={100} className="animate-bounce" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-semibold">No Chats</h1>
          <p className="mt-2">Start a conversation</p>
        </div>
      </div>
    </div>
  );
}

export default NoChat;
