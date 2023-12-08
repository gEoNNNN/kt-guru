import { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../SideBar";
import Favorite from "../Settings/Favorite";
import History from "../Settings/History";
import Settings from "../Settings/Settings";
import UserInfo from "../Settings/UserInfo";
import UserProfilePage from "../Settings/UserProfilePage";

import AIRecipe from "../Settings/AIRecipe";

function SettingsBar() {
  const { username } = useParams<{ username?: string }>();
  const defaultPage = username ? "user_profile" : "profile";
  const [currentPage, setCurrentPage] = useState(defaultPage);

  return (
    <div className="flex flex-row">
      <div className="w-1/4 h-screen">
        <Sidebar onSelectionChange={setCurrentPage} />
      </div>
      <div className="flex w-3/4 h-screen ">
        {currentPage === "profile" && <UserInfo />}
        {currentPage === "favorites" && <Favorite />}
        {currentPage === "airecipe" && <AIRecipe />}
        {currentPage === "history" && <History />}
        {currentPage === "settings" && <Settings />}
        {currentPage === "user_profile" && <UserProfilePage />}
      </div>
    </div>
  );
}
export default SettingsBar;
