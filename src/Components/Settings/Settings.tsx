import React, { useState } from "react";
import avatar from "../../assets/profile_pic.png";
import newAvatar from "../../assets/change_pic.png";

export default function UserInfo() {
  const [nickname, setNickname] = useState("UserNickname");
  const [newNickname, setNewNickname] = useState("");
  const [showNicknameInput, setShowNicknameInput] = useState(false); 
  const [photo, setPhoto] = useState(avatar);
  const [newPhoto, setNewPhoto] = useState(avatar);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("user@example.com");
  const [newEmail, setNewEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false); 
  const [showPasswordInput, setShowPasswordInput] = useState(false); 

  const handleNicknameChange = () => {
    if (newNickname) {
      setNickname(newNickname);
      setNewNickname("");
      setShowNicknameInput(false);
    }
  };

  const handleEmailChange = () => {
    if (newEmail) {
      setEmail(newEmail);
      setNewEmail("");
      setShowEmailInput(false); 
    }
  };

  const handlePasswordChange = () => {
    if (newPassword) {
      setPassword(newPassword);
      setNewPassword("");
      setShowPasswordInput(false); 
    }
  };

  const handlePhotoChange = (e:any) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen font-main-font pl-[20%] gap-[50px]">
      <div className="flex flex-row pt-[10%] gap-[20px]">
        <img
          className="w-[200px] h-[200px] rounded-full "
          src={newPhoto}
          alt="Avatar"
        />
        <label htmlFor="photoInput" className="cursor-pointer">
          <img
            className="w-[200px] h-[200px] rounded-full hover:border-4 border-black"
            src={newAvatar}
            alt="newAvatar"
          />
          <input
            type="file"
            accept="image/*"
            id="photoInput"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </label>
      </div>
      <div className="flex flex-col mt-[5%] gap-[50px] ">
        <div className="flex flex-col">
          <span className="font-main-font">Username</span>
          {showNicknameInput ? (
            <div className="flex gap-[50px]">
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                className="border-[1px] border-black rounded-full px-[15px] w-[250px]"
              />
              <button
                onClick={handleNicknameChange}
                className="bg-33B249 text-white px-2 md:px-4 py-1 rounded-full cursor-pointer transition duration-200 hover:bg-black "
              >
                Change
              </button>
            </div>
          ) : (
            <div className="">
              <span className="text-2xl pr-[5%]">{nickname}</span>
              <button
                onClick={() => setShowNicknameInput(true)}
                className="bg-33B249 text-white px-2 md:px-4 py-1 rounded-full cursor-pointer transition duration-200 hover:bg-black pl-[100px]"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-main-font">Email</span>
          {showEmailInput ? (
            <div className="flex gap-[50px]">
              <input
                type="text"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="border-[1px] border-black rounded-full px-[15px] w-[250px]"
              />
              <button
                onClick={handleEmailChange}
                className="bg-33B249 text-white px-2 md:px-4 py-1 rounded-full cursor-pointer transition duration-200 hover:bg-black"
              >
                Change
              </button>
            </div>
          ) : (
            <div>
              <span className="text-2xl pr-[5%]">{email}</span>
              <button
                onClick={() => setShowEmailInput(true)}
                className="bg-33B249 text-white px-2 md:px-4 py-1 rounded-full cursor-pointer transition duration-200 hover:bg-black"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-main-font">Password</span>
          {showPasswordInput ? (
            <div className="flex gap-[50px]">
              <input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-[1px] border-black rounded-full px-[15px] w-[250px]"
              />
              <button
                onClick={handlePasswordChange}
                className="bg-33B249 text-white px-2 md:px-4 py-1 rounded-full cursor-pointer transition duration-200 hover:bg-black"
              >
                Change
              </button>
            </div>
          ) : (
            <div>
              <span className="text-2xl pr-[5%]">*********</span>
              <button
                onClick={() => setShowPasswordInput(true)}
                className="bg-33B249 text-white px-2 md:px-4 py-1 rounded-full cursor-pointer transition duration-200 hover:bg-black"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
