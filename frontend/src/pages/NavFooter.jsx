import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Index";

function NavFooter() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default NavFooter;
