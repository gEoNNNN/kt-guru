import { useEffect, useState } from "react";
import RecipeCart from "../RecipeCard/RecipeCard";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function Recipe() {
  const [data, setData] = useState([]);
 {/* const handleClick = (title: any) => {
    let id = title;
    // console.log(id);
  };
*/}
  const { id } = useParams();

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    axios
      .post(`http://127.0.0.1:8000/api/recipes/get-recipe?recipe_id=${id}`, {
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
        {data?.map((el: any, _i) => (
          <div className="w-full sm:w-1/3 p-2 space-y-8" key={el.title}>
            <Link to={`/recipedisplay/${id}`}>
              <RecipeCart
                image={el.image}
                title={el.title}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
