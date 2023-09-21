import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../Login/Loginbg.png';
import Inputbox from '../Inputbox/Inputbox';
import Button from "../Button/Button";

export default function Register() {
  const navigate = useNavigate()
  const handleLogin=()=>{navigate("/login")}
  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className='absolute text-white text-[60px] font-main-font top-[9.5%] left-[29.5%]'>Welcome</h1>
      <h1 className='absolute text-white text-xl font-main-font top-[16%] left-[29.9%]'>To the best app for the best cooks! </h1>
      <h1 className='absolute text-white text-xl font-main-font top-[18%] left-[30%]'>Fill all the spaces to continue navigation </h1>
      <h1 className='absolute text-white text-3xl font-main-font top-[27%] left-[37%]'>Registration:</h1>
      <form>
        <label className='flex text-xl font-main-font text-white'>Nickname:</label>
        <Inputbox type="text" id="fname" name="fname" style="flex w-full px-[150px] py-2 my-4 border-2 border-black rounded-md" children={undefined} />
        <label className='flex text-xl font-main-font text-white'>Email address:</label>
        <Inputbox type="text" id="fname" name="fname" style="w-full px-5 py-2 my-2 border-2 border-black rounded-md" children={undefined} />
        <label className='flex text-xl font-main-font text-white'>Password:</label>
        <Inputbox type="flex text" id="fname" name="fname" style="w-full px-5 py-2 my-2 border-2 border-black rounded-md" children={undefined} />
        <label className='flex text-xl font-main-font text-white'>Repeat Password:</label>
        <Inputbox type="flex text" id="fname" name="fname" style="w-full px-5 py-2 my-2 border-2 border-black rounded-md" children={undefined} />
      </form>
      <Button style='absolute top-[69.5%] right-[56%] font-main-font text-white text-lg' onClick={handleLogin}>Login instead</Button>
      <Button style='absolute top-[72%] right-auto text-base uppercase py-4 px-8 rounded-full transition font-main-font duration-500 text-white bg-black hover:bg-33B249 hover:text-black'>Register</Button>
    </div>
  );
}
