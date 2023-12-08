import { useNavigate } from "react-router-dom";
import bg from "../../assets/Loginbg.png";
import Inputbox from "../Inputbox/Inputbox";
import Button from "../Button/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const handleButton = (data: any) => {
    axios
      .post("https://kitchenguru.onrender.com/api/auth/login", data)
      .then((response: any) => {
        if (response.status === 200) {
          navigate("/main");
          localStorage.setItem("access_token", response.data.access_token);
        }
      })
      .catch((error: any) => {
        setMessage(error.response.data.message);
      });
  };
  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col justify-center items-center p-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className="text-white text-5xl font-main-font mb-2 sm:text-3xl md:text-4xl lg:text-5xl">
        Welcome back!
      </h1>
      <h1 className="text-white text-xl font-main-font mb-6 sm:text-sm md:text-lg lg:text-xl">
        Keep in trend with new recipes!
      </h1>

      <form className="w-full max-w-lg" onSubmit={handleSubmit(handleButton)}>
        <label className="text-xl font-main-font text-white block mb-2">
          Nickname or Email
        </label>
        <Inputbox
          type="text"
          style="w-full px-4 py-3 mb-4 border-2 border-black rounded-md"
          register={register("username_email")}
        />

        <label className="text-xl font-main-font text-white block mb-2">
          Password
        </label>
        <Inputbox
          type="password"
          style="w-full px-4 py-3 mb-4 border-2 border-black rounded-md"
          register={register("password")}
        />
        <div className="flex mt-4 space-x-4 ml-[15%]">
          <a
            href="/forgotpassword"
            className="font-main-font text-white z-200 hover:underline p-2"
          >
            Forgot password?
          </a>
          <a
            href="/register"
            className="font-main-font text-white hover:underline p-2"
          >
            Don’t have an account?
          </a>
        </div>

        <Button style="lg:ml-[70%] mt-[3%] ml-[35%] text-sm uppercase py-4 px-14 rounded-full transition font-main-font duration-500 text-white bg-black hover:bg-gray-300 hover:text-black mt-4">
          <input type="submit" value="Login" />
        </Button>
      </form>
      {message && (
        <pre className="mt-4 font-main-font text-base text-white bg-red-500 p-4 rounded-lg">
          Error: {message}
        </pre>
      )}
    </div>
  );
}
