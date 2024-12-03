import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveClass = (path) =>
    location.pathname === path ? "bg-gray-600" : "hover:bg-gray-600";

  return (
    <div className="hidden md:flex flex-col bg-gray-800 text-white h-screen w-64 fixed">
      <div className="flex flex-col">
        <button
          onClick={() => navigate("/dashboard")}
          className={`text-white hover:text-gray-300 text-left py-4 px-6 text-xl h-20 ${getActiveClass(
            "/dashboard"
          )}`}
        >
          Notes
        </button>
        <button
          onClick={() => navigate("/groups")}
          className={`text-white hover:text-gray-300 text-left py-4 px-6 text-xl h-20 ${getActiveClass(
            "/groups", "/groupNotes"
          )}`}
        >
          Groups
        </button>
        <button
          onClick={() => navigate("/about")}
          className={`text-white hover:text-gray-300 text-left py-4 px-6 text-xl h-20 ${getActiveClass(
            "/about"
          )}`}
        >
          About
        </button>
      </div>

      {/* Sidebar Footer */}
      <div className="mt-[auto] p-4 mb-2 mr-1 text-center text-sm text-gray-300">
        <p>&copy; My-memos (v: 1.10.00)</p>
        <p>All Rights Reserved</p>
      </div>

      {/* Logout Button */}
      <div className="mt-4">
        <button
          onClick={onLogout}
          className="flex items-center justify-center space-x-2 ml-14 bg-red-600 text-white hover:bg-red-700 rounded-lg px-4 py-2 mt-4 transition duration-300 ease-in-out"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 17l5-5-5-5M21 12H9M4 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
