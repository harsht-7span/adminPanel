import NavigationBar from "@/components/navigationBar";
import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="h-screen flex ">
      <div className="h-full bg-gray-200 max-w-60 w-full">
        <NavigationBar />
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
