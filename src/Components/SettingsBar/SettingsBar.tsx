import React, { useState } from "react";
import Sidebar from "../SideBar";
import Favorite from "../Settings/Favorite";
import History from "../Settings/History";
import Settings from "../Settings/Settings";
import UserInfo from "../Settings/UserInfo";

function SettingsBar() {
  const [currentPage, setCurrentPage] = useState("profile");

  return (
    <div className="flex flex-row">
      <div className="w-1/4 h-screen">
        <Sidebar onSelectionChange={setCurrentPage} />
      </div>
      <div className="flex w-3/4 h-screen ">
        {currentPage === "profile" && <UserInfo />}
        {currentPage === "favorites" && <Favorite />}
        {currentPage === "history" && <History />}
        {currentPage === "settings" && <Settings />}
      </div>
    </div>
  );
}
export default SettingsBar;