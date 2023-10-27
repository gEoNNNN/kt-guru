{/*import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../../assets/Loginbg.png';
import Inputbox from '../Inputbox/Inputbox';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useParams } from "react-router-dom";
import NewPassword from '../../Components/ForgotPassword/NewPassword';
import { Buffer } from "buffer";

export default function ForgotPassword() {
  type linkData = {
    email: string;
    link: string;
  };
  const navigate = useNavigate()
  const [message, setMessage] = useState('');
  const { register, handleSubmit } = useForm();
  const [succesMessage, setSuccesMessage] = useState('');
  const b64 = "SGVsbG8sIFdvcmxkIQ==";
  const [data, setData] = useState("");
  const [code, setCode] = useState("122321");
  const handleButton = (data) => {
    axios.post("http://127.0.0.1:8000/api/auth/password-recovery-request", data)
    .then((response) => {
        console.log("Response from password-recovery-request:", response.data);

        if (response.status === 200) {
            const code = response.data.code;
            const encodedData = Buffer.from(data.email + code, 'utf8').toString('base64');
            const link = `http://localhost:5173/newpassword/${encodedData}`;
            setSuccesMessage('The email has been sent succesfully !')

            const jsonData = {
                email: data.email,
                link: link
            };

            return axios.post("http://127.0.0.1:8000/api/auth/send-email", jsonData);
        }
    })
    .then((response) => {
        if (response) {
            console.log("Response from send-email:", response.data);
        }
    })
    .catch((error) => {
        if (error.response) {
            console.log("Error:", error.response.data.message);
            setMessage(error.response.data.message);
        } else {
            console.log("Error:", error.message);
        }
    });
};

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
    <h1 className='absolute text-white text-2xl font-main-font top-[36%] left-auto'>Enter the email address of your account and we’ll </h1>
    <form onSubmit={handleSubmit(handleButton)}>
        <label className='text-xl font-main-font text-white'>Email</label>
        <Inputbox type="text" register={register("email")} id="fname" name="fname" style="flex w-[500px] px-4 py-3 my-4 border-2 border-black rounded-md" children={undefined} />
        <button type='submit' className='absolute top-[62%] left-[45%] right-auto text-sm uppercase py-4 px-14 rounded-full transition font-main-font duration-500 text-white bg-black hover:bg-33B249 hover:text-black'>Submit</button>
      </form>
      {message && <pre className="absolute font-main-font text-base text-white bg-red-500 p-2 top-[55%] right-38%] rounded-lg">
    Error: {message}
</pre>
}
{succesMessage && <pre className="absolute font-main-font text-base text-black bg-gray-300 p-4 top-[55.5%] right-[42%] rounded-lg">
     {succesMessage}
</pre>
}
    </div>
  );
}
*/}