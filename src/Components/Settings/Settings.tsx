import { useEffect, useState } from "react";
import newAvatar from "../../assets/change_pic.png";
import axios from "axios";

export default function Settings() {
  const [nickname, setNickname] = useState("UserNickname");
  const [newNickname, setNewNickname] = useState("");
  const [showNicknameInput, setShowNicknameInput] = useState(false);
  const [newPhoto, setNewPhoto] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [email, setEmail] = useState("user@example.com");
  const [newEmail, setNewEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await axios.get(
          "https://kitchenguru.onrender.com/api/users/profile",
          { headers }
        );
        setNickname(response.data.username);
        setEmail(response.data.email);
        setNewPhoto(response.data.profile.avatar);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }

    fetchUserProfile();
  }, []);

  const handleNicknameChange = async () => {
    if (newNickname) {
      try {
        const response = await axios.patch(
          "https://kitchenguru.onrender.com/api/users/update-profile",
          {
            username: newNickname,
          },
          { headers }
        );
        console.log(response.data);
        setNickname(newNickname);
        setNewNickname("");
        setShowNicknameInput(false);
      } catch (error) {
        console.error("Error updating username:", error);
      }
    }
  };

  const isValidEmail = (email: any) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleEmailChange = async () => {
    if (newEmail && isValidEmail(newEmail)) {
      try {
        const response = await axios.patch(
          "https://kitchenguru.onrender.com/api/users/update-profile",
          {
            email: newEmail,
          },
          { headers }
        );
        console.log(response.data);
        setEmail(newEmail);
        setNewEmail("");
        setShowEmailInput(false);
      } catch (error) {
        console.error("Error updating email:", error);
      }
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handlePasswordChange = async () => {
    try {
      const response = await axios.put(
        "https://kitchenguru.onrender.com/api/auth/change-password/",
        {
          password: currentPassword,
          new_password: newPassword,
          confirm_new_password: confirmNewPassword,
        },
        { headers }
      );
      console.log(response.data);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowPasswordInput(false);
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const handlePhotoChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setNewPhoto(URL.createObjectURL(selectedFile));

      const formData = { avatar: selectedFile };
      console.log(formData);

      try {
        const response = await axios.patch(
          "https://kitchenguru.onrender.com/api/users/update-profile",
          formData,
          {
            headers: {
              ...headers,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error updating avatar:", error);
      }
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen font-main-font pl-[20%] gap-[30px]">
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
            <div className="flex flex-col gap-[20px]">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border-[1px] border-black rounded-full px-[15px] w-[250px]"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-[1px] border-black rounded-full px-[15px] w-[250px]"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="border-[1px] border-black rounded-full px-[15px] w-[250px]"
              />
              <button
                onClick={handlePasswordChange}
                className="w-[150px] bg-33B249 text-white px-2 md:px-4 py-1 rounded-full cursor-pointer transition duration-200 hover:bg-black"
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
