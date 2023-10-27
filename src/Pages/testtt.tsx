// import React from "react";
// import { useNavigate } from "react-router-dom";
// import bg from "../../assets/Loginbg.png";
// import Inputbox from "../Inputbox/Inputbox";
// import Button from "../Button/Button";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// export default function CreateRecipe() {
//   const navigate = useNavigate();
//   const handleProfile = () => {
//     navigate("/profile");
//   };

//   const { register, handleSubmit } = useForm();

//   const handleButton = (data: any) => {
//     axios
//       .post("http://127.0.0.1:8000/api/recipes/create-recipe", data)
//       .then((response: any) => {
//         if (response.status === 201) {
//           navigate("/login");
//         }
//       })
//       .catch((error: any) => console.log(error));
//   };
//   return (
//     <div className="container mx-auto p-4">
//       <form
//         onSubmit={handleSubmit(handleButton)}
//         className="flex flex-col items-start"
//       >
//         <label className="flex text-xl font-main-font text-white mb-2">
//           Nickname:
//         </label>
//         <Inputbox
//           register={register("username")}
//           type="text"
//           id="nickname"
//           name="nickname"
//           style="w-[400px] px-2.5 py-1 mb-4 border-2 border-black rounded-md"
//         />
//         <label className="flex text-xl font-main-font text-white mb-2">
//           Email:
//         </label>
//         <Inputbox
//           register={register("email")}
//           type="email"
//           id="email"
//           name="email"
//           style="w-full px-2.5 py-1 mb-2 border-2 border-black rounded-md"
//         />
//         <label className="flex text-xl font-main-font text-white mb-2">
//           Password:
//         </label>
//         <Inputbox
//           register={register("password")}
//           type="password"
//           id="password"
//           name="password"
//           style="w-full px-2.5 py-1 mb-2 border-2 border-black rounded-md"
//         />

//         <label className="flex text-xl font-main-font text-white mb-2">
//           Repeat Password:
//         </label>
//         <Inputbox
//           register={register("confirm_password")}
//           type="password"
//           id="repeatPassword"
//           name="repeatPassword"
//           style="w-full px-2.5 py-1 mb-2 border-2 border-black rounded-md"
//         />

//         <input
//           type="submit"
//           className="absolute top-[74%] right-[45%] text-base uppercase py-4 px-8 rounded-full transition font-main-font duration-500 text-white bg-black hover:bg-33B249 hover:text-black"
//           value="Register"
//         />
//       </form>

//       <Button
//         style="absolute top-[69.5%] right-[56%] font-main-font text-white text-lg"
//         onClick={handleProfile}
//       >
//         Login instead
//       </Button>
//     </div>
//   );
// }
