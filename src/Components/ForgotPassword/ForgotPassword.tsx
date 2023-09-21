import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../Login/Loginbg.png';
import Inputbox from '../Inputbox/Inputbox';
import Button from "../Button/Button";


export default function ForgotPassword() {
  const navigate = useNavigate()
  const handleRegister=()=>{navigate("/register")}
  const handleForgotPasswordCode=()=>{navigate("/forgotpasswordcode")}

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
    <h1 className='absolute text-white text-2xl font-main-font top-[36%] left-auto'>Enter the email address of your account and we’ll </h1>
    <h1 className='absolute text-white text-2xl font-main-font top-[39%] left-[34.7%]'>send you a code to reset your password.  </h1>
      <form>
        <label className='text-xl font-main-font text-white'>Email</label>
        <Inputbox type="text" id="fname" name="fname" style="flex w-full px-[150px] py-3 my-4 border-2 border-black rounded-md" children={undefined} />
      </form>
      <Button style='absolute top-[56%] right-[53%] font-main-font text-white' onClick={handleRegister}>Don’t have an account?</Button>
      <Button style='absolute top-[60%] right-auto text-sm uppercase py-4 px-14 rounded-full transition font-main-font duration-500 text-white bg-black hover:bg-33B249 hover:text-black'  onClick={handleForgotPasswordCode}>Continue</Button>
    </div>
  );
}