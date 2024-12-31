import React, { useEffect, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import moment from "moment";

function Messages() {
  const {
    messages,
    getMessages,
    selectedUser,
    subscribeMessage,
    unsubscribeMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageRef = useRef();

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeMessage();
    // console.log("messages", messages);
    return () => unsubscribeMessage();
  }, [getMessages, subscribeMessage, unsubscribeMessage]);

  useEffect(() => {
    if (messageRef.current && messages) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="h-full px-6 overflow-y-scroll">
      {/* messages */}

      {messages?.map((item, i) => {
        return (
          <div
            ref={messageRef}
            key={i}
            className={`chat ${
              item.receiver === selectedUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="avatar placeholder">
                <div className="w-8 rounded-full md:w-12 bg-neutral text-neutral-content">
                  <img
                    src={
                      item.receiver !== selectedUser._id
                        ? selectedUser.profilePicture
                        : authUser.profilePicture
                    }
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="chat-header">
              {item.receiver !== selectedUser._id
                ? selectedUser.name
                : authUser.name}
              <time className="px-2 text-xs opacity-50">
                {moment(item.createdAt).format("LT")}
              </time>
            </div>
            {item.image && (
              <div
                className={`chat-bubble w-3/4 rounded-xl flex flex-col justify-end items-end  ${
                  item.receiver === selectedUser?._id
                    ? "bg-primary text-primary-content"
                    : "bg-base-300 text-base-content"
                } `}
              >
                <div className="">
                  <img src={item.image} alt="" className="object-cover " />
                </div>
              </div>
            )}
            {item.text && (
              <div
                className={`chat-bubble rounded-xl  flex flex-col justify-end items-end  ${
                  item.receiver === selectedUser?._id
                    ? "bg-primary text-primary-content"
                    : "bg-base-300 text-base-content"
                } `}
              >
                <p>{item.text}</p>
              </div>
            )}
            <div className="opacity-50 chat-footer">Delivered</div>
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
