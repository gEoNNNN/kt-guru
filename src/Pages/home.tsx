import React from "react";
import fork from '../assets/bg.png';
import plate from '../assets/homapageplate.png';
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate()
  const handleRecipe = () => { navigate("/recipe") }
  return (
    <>
    <Navbar />
      <div className="h-screen flex justify-center items-center transform">
        <div className=" w-[700px] h-[750px] bg-33B249 opacity-50 rounded-custom1">
          <img src={fork} className="absolute object-cover w-[800px] h-[800px]" />
        </div>
        <div className=" flex items-center justify-center w-[700px] h-[750px] bg-33B249 opacity-80 rounded-custom1">
          <img src={fork} className="absolute object-cover w-[800px] h-[800px]" />
        </div>
        <div className="absolute top-[25%] right-[25.5%] w-full text-center ">
          <div className=" text-black font-main-font text-3xl whitespace-pre">
            <h1>                                      Lack of imagination?</h1> 
            <h1 className="mb-16">                           Want to try new food?</h1>
            <h1>            Welcome to the best cooking </h1>
            <h1 className="mb-16">                   site for the best cooks!</h1>
            <h1>                      Here you can find over</h1>
            <h1>                                        13000+ recipes</h1>
          </div>
        </div>
        <div className="absolute top-[25%] w-full flex justify-center">
          <img src={plate} className="w-[23%]" />
        </div>
        <div className="absolute top-[32%] left-[9%] w-full text-center">
          <div className=" text-black font-main-font text-[100px] whitespace-pre">
            <h1>READY</h1>
            <h1>   TO COOK</h1>
          </div>
        </div>
        <button className="absolute top-[70%] right-[58%] text-xl uppercase py-6 px-16 rounded-full transition font-main-font duration-500 text-white bg-black hover:bg-33B249 hover:text-black"onClick={handleRecipe}> Let's cook!</button>
      </div>
    </>
  );
}

export default HomePage;