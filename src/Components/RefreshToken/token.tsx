import { useEffect } from "react";
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import axios from "axios";

export default function Token() {
  useEffect(() => {
    const token:any = localStorage.getItem("access_token");
    const decodedToken:any = jwt_decode(token);
    const expDate = new Date(decodedToken.exp * 1000);
    const expFormatted = moment(expDate).format('MM/DD/YYYY HH:mm');
    const currentTime = moment();
    const timeDifference = moment(expFormatted, 'MM/DD/YYYY HH:mm').diff(currentTime, 'minutes');    
    if (timeDifference < 2) {
      const refreshToken = async () => {
        try {
          const response = await axios.put("https://kitchenguru.onrender.com/api/auth/token-refresh", {}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.status === 200) {
            localStorage.setItem("access_token", response.data.access_token);
          }
        } catch (error) {
          console.log(error);
        }
      };

      refreshToken();
    }
  }, []);
  return <div> </div>;
}
