import { Image, Send, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";

function MessageInput() {
  const [imagePreview, setImagePreview] = useState("");
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);
  const formData = new FormData();
  const { sendMessage, isMessageSend } = useChatStore();

  const handleImagePreview = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    formData.append("image", e.target.files[0]);
  };

  const handleRemoveImg = (e) => {
    e.preventDefault();
    setImagePreview("");
    formData.delete("image");
  };

  const handleOnsubmit = (e) => {
    e.preventDefault();
    if (!text && !imagePreview) return;
    sendMessage(formData);
  };

  useEffect(() => {
    formData.append("text", text);
  }, [text]);

  return (
    <div>
      <div className="divider divider-neutral"></div>
      <div className="mb-3">
        <div className="">
          {imagePreview && (
            <div className="relative w-fit">
              <img
                className="object-fill w-20 h-20 mb-3 border rounded-lg border-zinc-700"
                src={imagePreview}
                alt=""
              />
              <button
                className="absolute px-1 py-1 rounded-full -top-2 -right-2 bg-zinc-700 text-zinc-100"
                onClick={(e) => handleRemoveImg(e)}
              >
                <X size={10} />
              </button>
            </div>
          )}
        </div>
        {/* input */}
        <form action="">
          <div className="flex items-center w-full gap-2">
            <input
              type="text"
              value={text}
              placeholder="Type here"
              className="w-full rounded-full input input-bordered"
              onChange={(e) => setText(e.target.value)}
            />
            <div>
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImagePreview}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  fileInputRef.current.click();
                }}
              >
                <Image />
              </button>
            </div>
            <button
              onClick={handleOnsubmit}
              type="submit"
              className="px-3 py-3 rounded-full bg-neutral text-neutral-content"
            >
              <Send />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MessageInput;
