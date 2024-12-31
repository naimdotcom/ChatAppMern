import React, { useEffect, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { MessageSquareMore, X } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

function MessageHeader() {
  const [user, setUser] = useState(null);
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="px-4 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex w-full gap-5">
          {/* avatar */}
          <div className="avatar placeholder">
            <div className="w-12 rounded-full bg-neutral text-neutral-content">
              <img
                src={selectedUser ? selectedUser.profilePicture : ""}
                alt=""
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold">
              {selectedUser ? selectedUser.name : ""}
            </h3>
            <h3>
              {selectedUser && onlineUsers.includes(selectedUser._id)
                ? "online"
                : "offline"}
            </h3>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setSelectedUser(null);
          }}
          className="flex items-center rounded-xl btn md:hidden"
        >
          <MessageSquareMore size={30} />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setSelectedUser({});
          }}
          className="items-center hidden md:flex"
        >
          <X size={30} />
        </button>
      </div>
    </div>
  );
}

export default MessageHeader;
