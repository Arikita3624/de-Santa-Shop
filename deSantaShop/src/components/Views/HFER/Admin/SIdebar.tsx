import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const menuItems = [
  { path: "/admin", icon: <HomeOutlined />, label: "Dashboard" },
  { path: "/admin/users", icon: <UserOutlined />, label: "Users" },
  { path: "/admin/orders", icon: <ShoppingCartOutlined />, label: "Orders" },
  { path: "/admin/settings", icon: <SettingOutlined />, label: "Settings" },
  { path: "/admin/reports", icon: <BarChartOutlined />, label: "Reports" },
];

const SideBar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-black text-white h-screen flex flex-col shadow-lg flex-shrink-0">
      {/* Tiêu đề Admin */}
      <div className="p-4 text-center text-2xl font-bold">
        Admin Panel
      </div>

      {/* Danh sách menu */}
      <nav className="flex-grow">
        <ul className="space-y-2 ml-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-4 rounded-md transition-all cursor-pointer ${
                  location.pathname === item.path
                    ? "bg-gray-800"
                    : "hover:bg-gray-700"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="ml-4">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
