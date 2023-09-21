import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../Login/Loginbg.png';
import Inputbox from '../Inputbox/Inputbox';
import Button from '../Button/Button'; // Corrected the import path
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); 

  const navigate = useNavigate();
  const handleForgotPassword = () => {
    navigate('/forgotpassword');
  };
  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex justify-center items-center" style={{ backgroundImage: `url(${bg})` }}>
      <h1 className="absolute text-white text-5xl font-main-font top-[15%] left-[30%]">Welcome back!</h1>
      <h1 className="absolute text-white text-xl font-main-font top-[20%] left-[30.5%]">Keep in trend with new recipes!</h1>
      <h1 className="absolute text-white text-5xl font-main-font top-[31%] left-[37%]">Login:</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
    <label className='text-xl font-main-font text-white'>Nickname or  Email</label>
      <input defaultValue="test" className="flex w-full px-[150px] py-3 my-4 border-2 border-black rounded-md" {...register("example")} />
      <input type="submit" />
    </form>
    </div>
  );
}