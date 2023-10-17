import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/Loginbg.png";
import Inputbox from "../Inputbox/Inputbox";
import Button from "../Button/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState();
  const handleButton = (data: any) => {
    axios
      .post("http://127.0.0.1:8000/api/auth/registration", data)
      .then((response: any) => {
        if (response.status === 201) {
          navigate("/login");
        }
      })
      .catch((error: any) => {
          setMessage(error.response.data.non_field_errors)});
  };
  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className="absolute text-white text-[60px] font-main-font top-[9.5%] left-[29.5%]">
        Welcome
      </h1>
      <h1 className="absolute text-white text-xl font-main-font top-[16%] left-[29.9%]">
        To the best app for the best cooks!{" "}
      </h1>
      <h1 className="absolute text-white text-xl font-main-font top-[18%] left-[30%]">
        Fill all the spaces to continue navigation{" "}
      </h1>
      <h1 className="absolute text-white text-3xl font-main-font top-[27%] left-[37%]">
        Registration:
      </h1>
      <form
        onSubmit={handleSubmit(handleButton)}
        className="flex flex-col items-start"
      >
        <label className="flex text-xl font-main-font text-white mb-2">
          Nickname:
        </label>
        <Inputbox
          register={register("username")}
          type="text"
          id="nickname"
          name="nickname"
          style="w-[400px] px-2.5 py-1 mb-4 border-2 border-black rounded-md"
        />
        <label className="flex text-xl font-main-font text-white mb-2">
          Email:
        </label>
        <Inputbox
          register={register("email")}
          type="email"
          id="email"
          name="email"
          style="w-full px-2.5 py-1 mb-2 border-2 border-black rounded-md"
        />
        <label className="flex text-xl font-main-font text-white mb-2">
          Password:
        </label>
        <Inputbox
          register={register("password")}
          type="password"
          id="password"
          name="password"
          style="w-full px-2.5 py-1 mb-2 border-2 border-black rounded-md"
        />

        <label className="flex text-xl font-main-font text-white mb-2">
          Repeat Password:
        </label>
        <Inputbox
          register={register("confirm_password")}
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          style="w-full px-2.5 py-1 mb-2 border-2 border-black rounded-md"
        />

        <input
          type="submit"
          className="absolute top-[74%] right-[45%] text-base uppercase py-4 px-8 rounded-full transition font-main-font duration-500 text-white bg-black hover:bg-33B249 hover:text-black"
          value="Register"
        />
      </form>

      <Button
        style="absolute top-[69.5%] right-[56%] font-main-font text-white text-lg"
        onClick={handleLogin}
      >
        Login instead
      </Button>
      {message && <pre className="absolute font-main-font text-base text-white bg-red-500 p-4 top-[67.5%] right-[39%] rounded-lg">
    Error: {message}
</pre>
}
    </div>
  );
}
