import { Image, Send, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../../store/useChatStore";
import { toast } from "react-hot-toast";

function MessageInput() {
  const [imagePreview, setImagePreview] = useState("");
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);
  const { sendMessage, isMessageSend } = useChatStore();

  const handleImagePreview = (e) => {
    e.preventDefault();
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleRemoveImg = (e) => {
    e.preventDefault();
    setImagePreview("");
    // formData.delete("image");
  };

  const handleOnsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!text && !imagePreview) return;
    if (!formData) return toast.error("Please upload an image");
    if (text) formData.append("text", text);
    if (file) formData.append("image", file);

    for (let [key, value] of formData.entries()) {
      console.log(key, value); // Logs each key-value pair in the FormData
    }
    // console.log("formData", formData.getAll());

    let res = await sendMessage(formData);
    if (res) {
      setText("");
      setImagePreview("");
    }
  };

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
            <div className="flex items-center">
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
              className="px-2 py-2 rounded-xl bg-neutral text-neutral-content"
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
