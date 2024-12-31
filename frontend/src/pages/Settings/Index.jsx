import React from "react";
import { THEMES } from "../../constants/theme";
import { useThemeStore } from "../../store/useThemeStore";
import { Send } from "lucide-react";

function Settings() {
  const PREVIEW_MESSAGES = [
    { id: 1, content: "Hey! How's it going?", isSent: false },
    {
      id: 2,
      content: "I'm doing great! Just working on some new features.",
      isSent: true,
    },
  ];
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="min-h-screen space-y-7 lg:space-y-20">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme for your chat interface
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
              `}
              onClick={() => setTheme(t)}
            >
              <div
                className="relative w-full h-8 overflow-hidden rounded-md"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/*  */}

      <div>
        <div className="border mockup-window border-base-300 bg-base-200">
          <div className="flex flex-col w-2/5 px-4 py-5 mx-auto rounded-lg bg-base-100">
            {/* message header */}
            <div className="flex w-full gap-5">
              {/* avatar */}
              <div className="avatar placeholder">
                <div className="w-12 rounded-full bg-neutral text-neutral-content">
                  <span>SY</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Syed Yaseen</h3>
                <h3>online</h3>
              </div>
            </div>
            <div className="divider divider-neutral"></div>
            {/* messages */}
            <div>
              {PREVIEW_MESSAGES.map((item, i) => {
                return (
                  <div
                    key={i}
                    className={`chat ${
                      item.isSent ? "chat-end" : "chat-start"
                    }`}
                  >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                      </div>
                    </div>
                    <div className="chat-header">
                      Obi-Wan Kenobi
                      <time className="px-2 text-xs opacity-50">12:45</time>
                    </div>
                    <div
                      className={`chat-bubble rounded-xl ${
                        item.isSent
                          ? "bg-primary text-primary-content"
                          : "bg-base-200 text-primary"
                      } `}
                    >
                      {item.content}
                    </div>
                    <div className="opacity-50 chat-footer">Delivered</div>
                  </div>
                );
              })}
            </div>
            <div className="divider divider-neutral"></div>
            {/* input */}
            <div className="flex items-center w-full gap-2">
              <input
                type="text"
                placeholder="Type here"
                className="w-full rounded-full input input-bordered"
              />
              <div className="px-3 py-3 rounded-full bg-neutral text-neutral-content">
                <Send />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
