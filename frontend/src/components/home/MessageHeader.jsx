import React, { useEffect, useState } from "react";
import { useChatStore } from "../../store/useChatStore";

function MessageHeader() {
  const [user, setUser] = useState(null);
  const { selectedUser, users } = useChatStore();

  useEffect(() => {
    setUser(users.find((user) => user._id === selectedUser));
  }, [selectedUser]);

  console.log(selectedUser);

  return (
    <div>
      <div className="flex w-full gap-5">
        {/* avatar */}
        <div className="avatar placeholder">
          <div className="w-12 rounded-full bg-neutral text-neutral-content">
            <img src={user ? user.profilePicture : ""} alt="" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold">{user ? user.name : ""}</h3>
          <h3>online</h3>
        </div>
      </div>
    </div>
  );
}

export default MessageHeader;
