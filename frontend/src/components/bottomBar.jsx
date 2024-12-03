import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaUsers, FaInfoCircle } from "react-icons/fa"; // Import the icons

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveClass = (path) =>
    location.pathname === path ? "bg-gray-600" : "hover:bg-gray-600";

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white md:hidden">
      <div className="flex justify-around p-2">
        <button
          onClick={() => navigate("/dashboard")}
          className={`flex flex-col items-center w-20 ${getActiveClass("/dashboard")}`}
        >
          <FaHome className="text-2xl" />
          <span>Notes</span>
        </button>
        <button
          onClick={() => navigate("/groups")}
          className={`flex flex-col items-center w-20 ${getActiveClass("/groups")}`}
        >
          <FaUsers className="text-2xl" />
          <span>Groups</span>
        </button>
        <button
          onClick={() => navigate("/about")}
          className={`flex flex-col items-center w-20 ${getActiveClass("/about")}`}
        >
          <FaInfoCircle className="text-2xl" />
          <span>About</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavbar;
