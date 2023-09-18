import React from "react";
import logo from '/Users/Eugen Ostafi/Desktop/project/project/src/helpers/logo.png';

function Navbar() {
  return (
    <div className="h-20 max-w-7xl mx-auto flex items-center justify-between font-main-font ">
        <div className="text-3xl font-bold mr-4 pl-4 "><a href="/Home">Kitchen Guru</a></div> {/* Increased mr-4 and added pl-4 for margin and padding */}
        <ul className="flex gap-16 text-xl">
          <li className="list-none"><a href="" className="no-underline text-white text-base"></a>AI Recipe</li>
          <li className="list-none"><a href="" className="no-underline text-white text-base"></a>Best 100</li>
          <li className="list-none"><a href="" className="no-underline text-white text-base"></a>About us</li>
        </ul>
        <div>
          <a href="" className="bg-33B249 text-white px-4 py-1 mr-8 rounded-lg border-none outline-none font-bold text-base cursor-pointer transition-transform scale-20 ease-in hover:scale-95">Registration</a>
          <a href="" className="bg-33B249 text-white px-4 py-1 rounded-lg border-none outline-none font-bold text-base cursor-pointer transition-transform scale-20 ease-in hover:scale-95">Login</a>
        </div>
        <div className="no-underline text-white list-none text-xl cursor-pointer hidden"></div>
    </div>
  );
}

export default Navbar;