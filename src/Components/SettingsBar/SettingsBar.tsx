import React, { useState } from "react";
import avatar from "../../assets/image 25.png"
import favorite from "../../assets/Favorite1.png"
import wlist from "../../assets/Book.png"
import friends from "../../assets/Group.png"
import logout from "../../assets/Sign_out_squre.png"
import settings from "../../assets/Setting_line.png"
import Button from "../Button/Button";
import UserInfo from "../Settings/Favorite";
import Favorite from "../Settings/Favorite";
import Settings from "../Settings/Settings";
import History from "../Settings/Settings";

function SettingsBar() {
  const [selectedSetting, setSelectedSetting] = useState("UserInfo");

  return (
    <div className="flex">
      <div className="w-1/4 flex flex-col font-main-font text-3xl ml-[5%] mt-[7%]">
        <ul className="inline-flex">
          <li>
            <div>
              <div className="absolute h-[70%] w-[10px] rounded-full bg-ECF0F1 ml-[13%] mt-[0%]"></div>
              <div className="absolute h-[7%] w-[12px] rounded-full bg-33B249 ml-[13%] mt-[7%]"></div>
            </div>
          </li>
          <li>
            <div>
              <ul className="mt-2 space-y-24">
                <li><span className="ml-[2.5%]">User profile</span></li>
                <li>
                  <div>
                    <ul className="mt-2 space-y-8 align-middle">
                      <li className="flex items-center align-middle">
                        <img src={avatar} className="w-[50px]" alt="Avatar" />
                        <span className="mt-[0.5%] ml-[1%]">
                          <Button onClick={() => setSelectedSetting("UserInfo")}>User info</Button>
                        </span>
                      </li>
                      <li className="flex items-center align-middle">
                        <img src={favorite} className="w-[50px]" alt="Favorite" />
                        <span className="mt-[0.5%] ml-[1%]">
                          <Button onClick={() => setSelectedSetting("Favorites")}>Favorites</Button>
                        </span>
                      </li>
                      <li className="flex items-center align-middle">
                        <img src={wlist} className="w-[50px]" alt="Watch" />
                        <span className="mt-[0.5%] ml-[1%]">
                          <Button onClick={() => setSelectedSetting("History")}>History</Button>
                        </span>
                      </li>
                      <li className="flex items-center align-middle">
                        <img src={friends} className="w-[50px]" alt="Friends" />
                        <span className="mt-[0.5%] ml-[1%]">
                          <Button onClick={() => setSelectedSetting("Friends")}>Friends</Button>
                        </span>
                      </li>
                      <li className="flex items-center align-middle">
                        <img src={settings} className="w-[50px]" alt="Settings" />
                        <span className="mt-[0.5%] ml-[1%]">
                          <Button onClick={() => setSelectedSetting("Settings")}>Settings</Button>
                        </span>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-center align-middle">
                  <img src={logout} className="w-[60px]" alt="Settings" />
                  <span className="ml-[1%]">Log Out</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div className="relative font-main-font text-4xl w-3/4">
          <div className="flex">
            <img className="w-[330px] mt-[45%]" src={avatar} alt="Profile" />
            <span className="mt-[63%]">Nickname</span>
          </div>
        </div>
        <div>
          <span></span>
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
