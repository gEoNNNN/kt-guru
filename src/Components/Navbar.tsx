import React, { useState, useEffect } from "react";
import Button from "./Button/Button";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import profile from "../assets/profile_icon.png";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="w-screen flex justify-between items-center font-main-font fixed top-[0%] z-50 pl-[100px] pr-[150px] pt-[30px] pb-[10px] bg-white">
      <div className="flex items-center w-auto">
        <img src={logo} className="w-[17%] hover:animate-spin"></img>
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-center"
        >
          Kitchen Guru
        </button>
      </div>
      <div className="flex justify-center gap-4 lg:gap-16 text-lg md:text-xl font-main-font text-black ">
        <a href="/airecipe">AI Recipe</a>
        <a href="/top">Best 100</a>
        <a href="/AboutUs">About us</a>
      </div>
      <div className="flex gap-4 md:gap-8">
        {!isLoggedIn ? (
          <>
            <Button
              style="bg-33B249 text-white px-2 md:px-4 py-1 rounded-lg cursor-pointer transition duration-500 hover:bg-black"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              style="bg-33B249 text-white px-2 md:px-4 py-1 rounded-lg cursor-pointer transition duration-500 hover:bg-black"
              onClick={handleRegister}
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => navigate("/profile")}>
              <img src={profile} alt="Profile" className="h-[30px] w-[30px]" />
            </Button>
            <Button
              style="bg-red-500 text-white px-2 md:px-4 py-1 rounded-lg cursor-pointer transition duration-500 hover:bg-black"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
