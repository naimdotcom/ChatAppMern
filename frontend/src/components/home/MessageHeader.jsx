import React, { useEffect, useState } from "react";
import { useChatStore } from "../../store/useChatStore";

function MessageHeader() {
  const [user, setUser] = useState(null);
  const { selectedUser } = useChatStore();

  return (
    <div className="px-4 pt-4">
      <div className="flex w-full gap-5">
        {/* avatar */}
        <div className="avatar placeholder">
          <div className="w-12 rounded-full bg-neutral text-neutral-content">
            <img src={selectedUser ? selectedUser.profilePicture : ""} alt="" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold">
            {selectedUser ? selectedUser.name : ""}
          </h3>
          <h3>online</h3>
        </div>
      </div>
    </div>
  );
}

export default MessageHeader;
