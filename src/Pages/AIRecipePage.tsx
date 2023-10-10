import React from "react";
import Navbar from "../Components/Navbar";
import CommentForm from "../Components/CommentForm";
import robot from "../assets/giphy.gif";

export default function AIRecipe() {
  return (
    <>
      <div className="absolute top-[10%] left-[33%] w-[500px] h-[500px] font-main-font text-center">
        <iframe src={robot} width="100%" height="100%"></iframe>
        <span className="text-font-main text-xl">Robot is cooking...</span>
      </div>
      <div className="border-4 h-screen text-center flex flex-col justify-end p-[7%]">
        <Navbar />
        <CommentForm
          style="h-[40px] w-[43%] rounded-[10px] border-[1px] border-black px-[10px] py-[10px] resize-none py-[8px] font-main-font"
          placeholder="Enter your message..."
          buttonstyle="bg-white border-black border-[1px] shadow-lg rounded-full w-[50px] h-[40px] text-black font-main-font"
        />
      </div>
    </>
  );
}
