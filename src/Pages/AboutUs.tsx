import React from "react";
import Navbar from "../Components/Navbar";
import template from "../assets/Renat.png";
import food from "../assets/food.png";
import contactUs from "../assets/contactUs.png";
import CommentForm from "../Components/CommentForm";

export default function AboutUs() {
  return (
    <div className="font-main-font">
      <Navbar />
      <div className="w-full h-full text-center text-xl top-[12%] left-[34%] pt-[7%] pb-[3%]">
        <span className="text-6xl">About us</span>
        <span className="line-clamp-4">
          Recipes are like a map, guiding us through the flavors, textures, and
          traditions of the world.
        </span>
      </div>
      <div
        className="border-4 w-full flex flex-wrap gap-[15%] top-[32%] bg-url(${bg}) place-content-between pl-[120px] pr-[120px] p-[25px] place-items-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${food})` }}
      >
        <div className="w-[40%] text-center p-[20px]">
          <span className="text-6xl text-white">Our Mission</span>
          <span className="line-clamp-none text-xl text-justify text-white">
            One of the most iconic forms of coking is grilling, where food is
            placed directly over an open flame or hot coals. This method imparts
            a smoky, charred flavor to ingredients like meat, vegetables, and
            even fruits. The sizzle of food hitting the grill and the
            tantalizing aroma of smoke wafting through the air create an
            irresistible sensory experience.
          </span>
        </div>
        <div className="w-[535px] flex flex-wrap gap-[10px]">
          <img src={template} className="w-[262px] h-[193px] rounded-lg"></img>
          <img src={template} className="w-[262px] h-[193px] rounded-lg"></img>
          <img src={template} className="w-[535px] h-[344px] rounded-lg"></img>
        </div>
      </div>
      <div className="text-center p-[7%]">
        <span className="text-6xl">Meet our team</span>
      </div>
      <div className="pb-[7%] pl-[17.2%] flex flex-wrap h-full w-[1250px] gap-[25px]">
        <img
          src={template}
          className="flex-none w-[650px] h-[500px] rounded-[7%]"
        ></img>
        <img
          src={template}
          className="flex-none w-[313px] h-[238px] rounded-[7%] absolute right-[228px] top-[1372px]"
        ></img>
        <img
          src={template}
          className="flex-none w-[313px] h-[238px] rounded-[7%] "
        ></img>
        <img
          src={template}
          className="flex-none w-[313px] h-[238px] rounded-[7%] "
        ></img>
        <img
          src={template}
          className="flex-none w-[313px] h-[238px] rounded-[7%]"
        ></img>
        <img
          src={template}
          className="flex-none w-[313px] h-[238px] rounded-[7%]"
        ></img>
      </div>
      <div
        className="w-full h-[600px] bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${contactUs})` }}
      >
        <div className="h-[600px] w-[] text-center p-[4%]">
          <span className="text-6xl ">Contact Us</span>
          <br />
          <CommentForm
            style="mt-[60px] h-[300px] w-[43%] rounded-[10px] border-[1px] border-black px-[10px] py-[10px] resize-none"
            placeholder="Send us a message..."
            name="feedback"
            buttonstyle="bg-33B249 border-black border-1 shadow-lg rounded-full w-[150px] h-[40px] text-white"
          />
        </div>
      </div>
    </div>
  );
}
