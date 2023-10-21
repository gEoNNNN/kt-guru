import { useState } from 'react';
import bg from '../../assets/Loginbg.png';
import Inputbox from '../Inputbox/Inputbox';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function ForgotPassword() {
  const [message, setMessage] = useState('');
  const { register, handleSubmit } = useForm();
  const [succesMessage, setSuccesMessage] = useState('');

  const handleButton = (data: { email: any; }) => {
    axios.post("http://127.0.0.1:8000/api/auth/password-recovery-request", data)
      .then((response) => {
        console.log("Response from password-recovery-request:", response.data);

        if (response.status === 200) {
          const code = response.data.code;
          const encodedData = global.Buffer.from(data.email + code, 'utf8').toString('base64');
          const link = `http://localhost:5173/newpassword/${encodedData}`;
          setSuccesMessage('The email has been sent succesfully !');

          const jsonData = {
            email: data.email,
            link: link
          };

          return axios.post("http://127.0.0.1:8000/api/auth/send-email", jsonData);
        }
      })
      .then((response) => {
        if (response && response.data) {
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
      className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className='text-white text-2xl font-main-font mb-4'>Enter the email address of your account and we’ll </h1>
      <form onSubmit={handleSubmit(handleButton)} className="w-full max-w-md text-center">
        <label className='text-xl font-main-font text-white'>Email</label>
        <Inputbox type="text" register={register("email")} id="fname" name="fname" style={{ width: 500, padding: '12px 16px', marginBottom: 16, border: '2px solid black', borderRadius: '4px' }} />
        <button type='submit' className='text-sm uppercase py-4 px-14 rounded-full transition font-main-font duration-500 text-white bg-black hover:bg-33B249 hover:text-black'>Submit</button>
      </form>
      {message && <pre className="font-main-font text-base text-white bg-red-500 p-2 mt-4 rounded-lg">
        Error: {message}
      </pre>
      }
      {succesMessage && <pre className="font-main-font text-base text-black bg-gray-300 p-4 mt-4 rounded-lg">
        {succesMessage}
      </pre>
      }
    </div>
  );
}
