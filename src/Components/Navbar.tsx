import React from "react";
import Button from "./Button/Button";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate()
  const handlelogin=()=>{navigate("/login")}
  const handleregister=()=>{navigate("/register")}
  return ( 
    <div className=" max-w-7xl flex justify-between font-main-font fixed top-[5%] left-[17%] w-full z-10">
        <div className="text-3xl font-bold "><a href="/">Kitchen Guru</a></div>
        <ul className="flex gap-16 text-xl font-main-font text-black no-underline ">
          <li><a href="/Test">AI Recipe</a></li>
          <li><a href="/Test">Best 100</a></li>
          <li><a href="/Test">About us</a></li>
        </ul>
        <div>
          <Button style="bg-33B249 text-white px-4 py-1 mr-8 rounded-lg cursor-pointer transition duration-1000 hover:bg-black" onClick={handlelogin}>Login</Button>
          <Button style="bg-33B249 text-white px-4 py-1 mr-8 rounded-lg cursor-pointer transition duration-1000 hover:bg-black" onClick={handleregister}>Register</Button>
        </div>
        <div className="no-underline text-white list-none text-xl cursor-pointer hidden"></div>
    </div>
  );
}

export default Navbar;