import { useNavigate } from "react-router-dom";
import bg from "../../assets/Loginbg.png";
import Inputbox from "../Inputbox/Inputbox";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

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
        setMessage(error.response.data.non_field_errors);
      });
  };
  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col justify-center items-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="text-center mt-8">
        <h1 className="text-white text-xl lg:text-[60px] font-main-font mb-2">
          Welcome
        </h1>
        <h2 className="text-white text-lg lg:text-xl font-main-font mb-2">
          To the best app for the best cooks!
        </h2>
        <h3 className="text-white text-lg lg:text-xl font-main-font mb-4">
          Fill all the spaces to continue navigation
        </h3>
        <h4 className="text-white text-2xl lg:text-3xl font-main-font mb-8">
          Registration:
        </h4>
      </div>

      <form
        onSubmit={handleSubmit(handleButton)}
        className="w-full max-w-lg flex flex-col items-start"
      >
        {/* Nickname */}
        <label className="text-xl font-main-font text-white mb-2">
          Nickname:
        </label>
        <Inputbox
          register={register("username")}
          type="text"
          id="nickname"
          name="nickname"
          style="w-full px-2.5 py-1 mb-4 border-2 border-black rounded-md"
        />

        {/* Email */}
        <label className="text-xl font-main-font text-white mb-2">Email:</label>
        <Inputbox
          register={register("email")}
          type="email"
          id="email"
          name="email"
          style="w-full px-2.5 py-1 mb-4 border-2 border-black rounded-md"
        />

        {/* Password */}
        <label className="text-xl font-main-font text-white mb-2">
          Password:
        </label>
        <Inputbox
          register={register("password")}
          type="password"
          id="password"
          name="password"
          style="w-full px-2.5 py-1 mb-4 border-2 border-black rounded-md"
        />

        {/* Repeat Password */}
        <label className="text-xl font-main-font text-white mb-2">
          Repeat Password:
        </label>
        <Inputbox
          register={register("confirm_password")}
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          style="w-full px-2.5 py-1 mb-4 border-2 border-black rounded-md"
        />

        <Button
          style="mt-4 font-main-font text-white text-lg hover:underline"
          onClick={handleLogin}
        >
          Login instead
        </Button>
        <div className="lg:ml-[70%] ml-[35%] mb-[2%]">
          <input
            type="submit"
            className="text-base uppercase py-4 px-8 rounded-full transition font-main-font duration-500 text-white bg-black hover:bg-33B249 hover:text-black"
            value="Register"
          />
        </div>
      </form>
      {message && (
        <pre className="mt-4 font-main-font text-base text-white bg-red-500 p-4 rounded-lg">
          Error: {message}
        </pre>
      )}
    </div>
  );
}
