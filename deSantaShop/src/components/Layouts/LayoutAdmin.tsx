import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Views/HFER/Admin/SIdebar";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 min-w-64 flex-shrink-0">
        <SideBar />
      </aside>

      {/* Nội dung chính */}
      <main className="flex-grow p-6 bg-gray-50 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;
