import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import SearchBar from "./SearchBar";
import ProfileInfo from "./cards/ProfileInfo";  // Import ProfileInfo

const Navbar = ({ userInfo, onSearchNote, handleClearSearch, showSearchIcon }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSearch = () => {
    if (searchQuery) onSearchNote(searchQuery);
    else handleClearSearch();
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const toggleSearchBar = () => {
    setShowSearchBar(true);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setShowSearchBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={navbarRef}
      className="bg-gray-800 h-20 flex items-center justify-between px-4 py-2 drop-shadow mb-10 text-white fixed top-0 left-0 w-full"
      style={{ position: 'fixed', top: '0', left: '0', right: '0', zIndex: 50 }}
    >
      {/* Conditionally Render Logo */}
      {!showSearchBar && (
        <h2 className="site-name flex flex-row items-center text-lg sm:text-xl font-medium py-2">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/clouds/200/apple-notes.png"
            alt="apple-notes"
          />
          My-memos
        </h2>
      )}

      {/* Main Navbar Section */}
      <div className="flex items-center space-x-4">
        {!showSearchBar && showSearchIcon && (
          <MdSearch
            className="text-xl cursor-pointer"
            onClick={toggleSearchBar}
          />
        )}

        {/* Profile Info */}
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />

        {/* Show Search Bar when toggled */}
        {showSearchBar && (
          <div className="absolute left-0 right-0 mx-auto w-full flex justify-center">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => {
                setSearchQuery(target.value);
                handleSearch();
              }}
              onClearSearch={onClearSearch}
              handleSearch={handleSearch}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
