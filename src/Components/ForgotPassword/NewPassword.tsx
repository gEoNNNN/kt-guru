import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/Loginbg.png";
import Inputbox from "../Inputbox/Inputbox";
import { useLocation } from "react-router-dom";
import { Buffer } from "buffer";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function NewPassword() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [errorMessage, setMessage] = useState("");
  const location = useLocation();
  const url = location.pathname;
  const list = url.split("/");
  const encodeMessage = list[2];
  const message = Buffer.from(encodeMessage, "base64").toString("utf8");
  const email = message.slice(0, -6);

  const handleButton = (data: any) => {
    axios
      .put(
        `http://127.0.0.1:8000/api/auth/password-recovery-change?email=${email}`,
        data
      )
      .then((response: any) => {
        console.log(response);
        if (response.data.status === 200) {
          navigate("/login");
        }
      })
      .catch((error: any) => {
        setMessage(error.response.data.message);
      });
  };
  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form onSubmit={handleSubmit(handleButton)}>
        <label className="text-xl font-main-font text-white">
          Enter new password:
        </label>
        <Inputbox
          register={register("new_password")}
          type="password"
          id="fname1"
          name="fname"
          style="flex w-[500px] px-4 py-3 my-4 border-2 border-black rounded-md"
          children={undefined}
        />
        <label className="text-xl font-main-font text-white">
          Repeat new password:
        </label>
        <Inputbox
          register={register("confirm_new_password")}
          type="password"
          id="fname2"
          name="fname"
          style="flex w-[500px] px-4 py-3 my-4 border-2 border-black rounded-md"
          children={undefined}
        />
        <button
          type="submit"
          className="absolute top-[68%] left-[45%] right-auto text-sm uppercase py-4 px-14 rounded-full transition font-main-font duration-500 text-white bg-black hover:bg-33B249 hover:text-black"
        >
          Submit
        </button>
      </form>
      {errorMessage && (
        <pre className="absolute font-main-font text-base text-white bg-red-500 p-4 top-[61%] right-[44%] rounded-lg">
          Error: {errorMessage}
        </pre>
      )}
    </div>
  );
}
