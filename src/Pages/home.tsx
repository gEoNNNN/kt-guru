import React from "react";
import Navbar from "../Components/Navbar";
import fork from '/Users/Eugen Ostafi/Desktop/project/project/src/helpers/bg.png';
import plate from '/Users/Eugen Ostafi/Desktop/project/project/src/helpers/homapageplate.png';

function HomePage() {
  return (
    <>
      <Navbar className="fixed top-0 left-0 w-full z-10" />
      <div className="h-screen flex justify-center items-center transform -translate-y-[80px]">
        <div className="relative flex items-center justify-center w-[700px] h-[750px] bg-33B249 opacity-50 rounded-custom1">
          <img src={fork} className="absolute object-cover w-[800px] h-[800px]" />
        </div>
        <div className="relative flex items-center justify-center w-[700px] h-[750px] bg-33B249 opacity-80 rounded-custom1">
          <img src={fork} className="absolute object-cover w-[800px] h-[800px]" />
        </div>
        <div className="absolute top-0 right-[480px] w-full h-[85%] flex flex-col justify-center items-center text-center px-8">
          <div className=" text-black font-main-font text-3xl whitespace-pre">
            <h1>                                      Lack of imagination?</h1> 
            <h1 className="mb-16">                           Want to try new food?</h1>
            <h1>            Welcome to the best cooking </h1>
            <h1 className="mb-16">                   site for the best cooks!</h1>
            <h1>                      Here you can find over</h1>
            <h1>                                        13000+ recipes</h1>
          </div>
        </div>
        <div className="absolute top-0 w-full h-[95%] flex justify-center items-center">
          <img src={plate} className="w-[23%]" />
        </div>
        <div className="absolute top-0 left-[170px] w-full h-[95%] flex flex-col justify-center items-center text-center px-8">
          <div className=" text-black font-main-font text-[100px] whitespace-pre">
            <h1>READY</h1>
            <h1>   TO COOK</h1>
          </div>
        </div>
        <button className="absolute top-[70%] right-[58%] inline-block text-xl uppercase no-underline py-6 px-16 rounded-full transition font-main-font duration-200 text-white ease-in-out bg-black hover:bg-33B249 hover:text-black"> Let's cook!</button>
      </div>
    </>
  );
}

export default HomePage;
