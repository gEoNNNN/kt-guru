import React, { useState } from "react";
import avatar from "../../assets/image 25.png";
import favorite from "../../assets/Favorite.png";
import wlist from "../../assets/Book.png";
import logout from "../../assets/Sign_out_squre.png";
import settingsImage from "../../assets/Setting_line.png";
import Button from "../Button/Button";
import UserInfo from "../Settings/UserInfo";
import Favorite from "../Settings/Favorite";
import History from "../Settings/History";
import Settings from "../Settings/Settings";

const settingsOptions = [
  { label: "User info", icon: avatar, data: "UserInfo" },
  { label: "Favorites", icon: favorite, data: "Favorites" },
  { label: "History", icon: wlist, data: "History" },
  { label: "Settings", icon: settingsImage, data: "Settings" },
];

function SettingsBar() {
  const [selectedSetting, setSelectedSetting] = useState("UserInfo");

  return (
    <div className="flex gap-[20px]">
      <div className="w-1/4 flex flex-col font-main-font text-3xl ml-[5%] mt-[7%]">
        <div className="settings-bar">
          <span>User profile</span>
          <ul className="settings-list">
            {settingsOptions.map((option) => (
              <li key={option.data} className="settings-item">
                <img
                  src={option.icon}
                  className="settings-icon"
                  alt={option.label}
                />
                <Button onClick={() => setSelectedSetting(option.data)}>
                  {option.label}
                </Button>
              </li>
            ))}
            <li className="settings-item">
              <img src={logout} className="settings-icon" alt="Logout" />
              <span>Log Out</span>
            </li>
          </ul>
        </div>
      </div>
      {selectedSetting === "UserInfo" && <UserInfo />}
      {selectedSetting === "Favorites" && <Favorite />}
      {selectedSetting === "History" && <History />}
      {selectedSetting === "Settings" && <Settings />}
    </div>
  );
}

export default SettingsBar;
