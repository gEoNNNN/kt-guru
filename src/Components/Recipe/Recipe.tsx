import React, { useEffect, useState } from "react";
import data from "../../assets/recipes.json";
import Navbar from "../../Components/Navbar";
import RecipeCart from "../RecipeCard/RecipeCard";
import Button from "../Button/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Recipe() {
  const [data, setData] = useState([]);
  const handleClick = (title: any) => {
    let id = title;
    // console.log(id);
  };
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    axios
      .get("http://127.0.0.1:8000/api/recipes/get-recipes?page=1", {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
      .then((response: any) => setData(response.data.results))
      .catch((error: any) => console.log(error));
  }, []);
  return (
    <div className="flex items-center justify-center mt-12 sm:mt-20">
      <div className="flex flex-wrap justify-center">
        {data?.map((el: any, i) => (
          <div className="w-full sm:w-1/3 p-2 space-y-8" key={el.title}>
            <Link to={`/reciepdsiplay/${el.id}`}>
              <RecipeCart
                image={el.image}
                title={el.title}
                onClick={() => handleClick(el.title)}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
