import React, { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore";
import SidebarMessageSkeleton from "./SidebarMessageSkeleton";

function Sidebar() {
  const { getUsers, users, setSelectedUser, isUserLoading, selectedUser } =
    useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="w-full">
      <ul className="w-full md:w-64 lg:w-80 h-[calc(100vh-7rem-20px)] space-y-3 overflow-y-scroll px-2 pt-6  bg-base-200 rounded-xl">
        <li className="menu-title">Chats</li>

        {isUserLoading
          ? [...Array(10)].map((_, i) => (
              <li key={i}>
                <SidebarMessageSkeleton />
              </li>
            ))
          : users.map((user) => (
              <li
                className={`cursor-pointer py-3 px-5 rounded-xl ${
                  selectedUser?._id === user._id
                    ? "bg-base-300"
                    : "hover:bg-base-100 "
                }`}
                key={user._id}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 avatar online">
                    <div className="rounded-full ">
                      <img src={user.profilePicture} />
                    </div>
                  </div>
                  <div>
                    <h1>{user.name}</h1>
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default Sidebar;
