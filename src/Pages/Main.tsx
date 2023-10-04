import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Image from "../Components/Image/Image";
import profile from "../assets/profile_icon.png";
import Button from "../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import "../index.css";
import fish from "../assets/fish.png";
import cakes from "../assets/cakes.jpg";
import pasta from "../assets/pasta.jpg";
import soups from "../assets/soups.jpg";
import meat from "../assets/meat.jpg";
import salads from "../assets/salads.webp";


export default function MainPage() {
    const [fishHover, setFishHover] = useState(false);
    const [pastaHover, setPastaHover] = useState(false);
    const [meatHover, setMeatHover] = useState(false);
    const [saladsHover, setSaladsHover] = useState(false);
    const [soupsHover, setSoupsHover] = useState(false);
    const [cakesHover, setCakesHover] = useState(false);
    console.log(fishHover)
    const navigate = useNavigate();
    const ProfilePage = () => {
    navigate("/profile");
  };
  return (
    <div className="flex ">
      <Navbar />
      <Button style="fixed top-[10%] right-[5%]" onClick={ProfilePage}>
        <img src={profile}></img>
      </Button>
   <div className="relative h-screen">
      <div className="flex h-screen content-center justify-center relative p-[150px]">
        <Button onClick={console.log}>
  <Image 
    url={fish}  
    style="w-[150px] scale-1 hover:scale-150 z-[999] transition duration-30 ease-in-out absolute top-[100%] left-[30%]"
  ></Image>
</Button>
<Button onClick={console.log}>
  <Image 
    url={pasta} 
    style="w-[150px] scale-1 hover:scale-150 z-[999] transition duration-30 ease-in-out "
  ></Image>
</Button>
<Button onClick={console.log}>
  <Image 
    url={meat} 
    style="w-[150px] scale-1 hover:scale-150 z-[999] transition duration-30 ease-in-out "
  ></Image>
</Button>
<Button onClick={console.log}>
  <Image 
    url={salads} 
    style="w-[150px] scale-1 hover:scale-150 z-[999] transition duration-30 ease-in-out "
  ></Image>
</Button>
<Button onClick={console.log}>
  <Image 
    url={soups} 
    style="w-[150px] scale-1 hover:scale-150 z-[999] transition duration-30 ease-in-out "
  ></Image>
</Button>
<Button onClick={console.log}>
  <Image 
    url={cakes} 
    style="w-[150px] scale-1 hover:scale-150 z-[999] transition duration-30 ease-in-out "
  ></Image>
</Button>

      </div>
      </div>
    </div>
  );
}
