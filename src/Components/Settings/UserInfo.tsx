import React, { useState } from "react";
import avatar from "../../assets/profile_pic.png";
import cameraIcon from "../../assets/add_recipe.png";
import { useNavigate } from "react-router-dom";
export default function UserInfo() {
  const [nickname, setNickname] = useState("UserNickname");
  const [photo, setPhoto] = useState(avatar);
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-grow w-full p-4 mt-[3%] font-main-font">
      <div className="flex flex-col ">
        <div className="flex flex-row items-center gap-[5%] pb-[5%]">
          <img
            className="w-[200px] h-[200px] rounded-full"
            src={photo}
            alt="Avatar"
          />
          <span className="mt-[6%] font-main-font text-3xl">{nickname}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl"> Created Recipes :</span>
          <button onClick={() => navigate("/create-recipe")}>
            <img
              className="w-[200px] h-[200px] mt-4 cursor-pointer"
              src={cameraIcon}
              alt="Create Recipe"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
