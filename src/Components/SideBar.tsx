import React, { useState } from "react";
import avatar from "../assets/profile.png";
import favorite from "../assets/favorite_profile.png";
import history from "../assets/history.png";
import logout from "../assets/logout.png";
import settingsImage from "../assets/settings.png";
import { useNavigate } from "react-router-dom";

interface ISidebar {
  onSelectionChange?:any
}

function Sidebar({ onSelectionChange } : ISidebar) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };
  return (
    <div className="w-screen h-screen flex">
      <div className="flex flex-col font-main-font grid content-center ml-[8%] gap-[20px]">
        <button
          className="flex items-center pt-[50%] space-x-2 "
          onClick={() => onSelectionChange("profile")}
        >
          <img
            className="w-[50px] h-[50px]"
            src={avatar}
            alt="User Info Icon"
          />
          <span className="text-2xl">User info</span>
        </button>
        <button
          className="flex items-center mb-3 space-x-2"
          onClick={() => onSelectionChange("favorites")}
        >
          <img
            className="w-[50px] h-[50px]"
            src={favorite}
            alt="Favorites Icon"
          />
          <span className="text-2xl">Favorites</span>
        </button>
        <button
          className="flex items-center mb-3 space-x-2"
          onClick={() => onSelectionChange("history")}
        >
          <img className="w-[50px] h-[50px]" src={history} alt="Watchlist Icon" />
          <span className="text-2xl">History</span>
        </button>
        <button
          className="flex items-center mb-3 space-x-2"
          onClick={() => onSelectionChange("settings")}
        >
          <img
            className="w-[50px] h-[50px]"
            src={settingsImage}
            alt="Settings Icon"
          />
          <span className="text-2xl">Settings</span>
        </button>
        <button
          className="flex items-center mb-3 space-x-2 pt-[100px]"
          onClick={handleLogout}
        >
          <img className="w-[50px] h-[50px]" src={logout} alt="Logout Icon" />
          <span className="text-2xl">Log out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;