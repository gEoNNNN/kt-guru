import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import robot_reading from "../assets/giphy3.gif";

interface IRecipe {
  image: string;
  message: string;
}

export default function AIRecipeDisplay() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const accessToken = localStorage.getItem("access_token"); // Retrieve the access token

        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.get(
          `http://127.0.0.1:8000/api/recipes/get-ai-recipes?recipe_id=${id}`,
          { headers }
        );
        console.log(response.data);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-start h-screen overflow-hidden">
      <div className="flex flex-col items-center z-10 h-[70vh]">
        <img
          src={`http://127.0.0.1:8000${recipe.image}`}
          className="rounded-full w-[250px] h-[250px]"
          alt="Recipe"
        />
        <img
          src={robot_reading}
          className="w-[350px] h-[350px]"
          alt="Robot Reading"
        />
      </div>

      <div className="text-left text-xl w-[900px] ml-8 pr-[50px] h-[70vh] overflow-hidden">
        <div className="h-full overflow-y-auto" ref={messageContainerRef}>
          <p className="whitespace-pre-wrap">{recipe.message}</p>
        </div>
        <div className="absolute bottom-[50px] right-[35%] text-gray-500 animate-bounce">
          <span className="mr-2">Scroll down</span>
          <span>&#8595;</span>
        </div>
      </div>
    </div>
  );
}
