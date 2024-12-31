import { MessageSquareQuote } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useState } from "react";

function Navbar() {
  const { pathname } = useLocation();
  const path = pathname.split("/")[pathname.split("/").length - 1];
  const [userInfo, setUserInfo] = useState({});
  const { authUser, logout } = useAuthStore();

  useEffect(() => {
    setUserInfo(authUser);
  }, [authUser, setUserInfo]);

  return (
    <div className="">
      <div className="py-7 navbar bg-base-100">
        <div className="items-center flex-1">
          <Link to={"/"} className="text-xl rounded-full btn btn-primary">
            <MessageSquareQuote size={30} />
            <span>Chat-App</span>
          </Link>
        </div>
        <div className="flex-none">
          {authUser ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle ring-1 ring-primary avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      userInfo?.profilePicture
                        ? userInfo?.profilePicture
                        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl ring-2 ring-primary/50"
              >
                <li className={`${path === "" ? "font-bold" : ""} py-1`}>
                  <Link to={"/"} className="justify-between">
                    Home
                    {/* <span className="badge">New</span> */}
                  </Link>
                </li>
                <li className={`${path === "profile" ? "font-bold" : ""} py-1`}>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                    {/* <span className="badge">New</span> */}
                  </Link>
                </li>
                <li
                  className={`${path === "settings" ? "font-bold" : ""} py-1`}
                >
                  <Link to={"/settings"}>Settings</Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 "
              >
                <li>
                  <Link to={"/settings"}>Settings</Link>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
