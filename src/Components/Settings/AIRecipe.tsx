import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AIRecipe() {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [aiRecipes, setAIRecipes] = useState<
    {
      id: string | number;
      key: string | number;
      title: string;
      message: string;
      image_url: string;
    }[]
  >([]);

  const extractTitleFromMessage = (message: string) => {
    const titleMatch = message.match(/^Title: (.+)$/m);
    return titleMatch ? titleMatch[1] : "";
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/users/profile",
          { headers }
        );
        console.log(response.data);
        setUsername(response.data.username);
        setAvatar(response.data.profile.avatar);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchFavoriteRecipes = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/recipes/create-ai-recipes",
          { headers }
        );
        console.log(response.data);

        const recipes = response.data.results.map(
          (recipe: any, index: any) => ({
            key: index,
            title: extractTitleFromMessage(recipe.message),
            message: recipe.message,
            image_url: recipe.image,
            id: recipe.id,
          })
        );

        setAIRecipes(recipes);
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      }
    };

    fetchUserProfile();
    fetchFavoriteRecipes();
  }, []);

  return (
    <div className="flex flex-col gap-[30px] mt-[5%]">
      <div className="flex flex-row items-center gap-[20px] mb-[5%]">
        <img
          className="w-[200px] h-[200px] rounded-full"
          src={avatar}
          alt="Avatar"
        />
        <span className="ml-[20px] font-main-font text-3xl">{username}</span>
      </div>
      <div className="">
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {aiRecipes.map((recipe) => (
            <Link
              to={`/airecipedisplay/${recipe.id}`} // Update this line to include the recipe ID
              key={recipe.key} // Assuming each recipe has a unique 'key' property
              style={{ zIndex: 10 }}
            >
              <div className="relative group w-[310px] h-[220px] rounded-md ">
                <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-md w-full ">
                  {recipe.image_url && (
                    <img
                      src={recipe.image_url}
                      alt={recipe.title}
                      className="w-full h-[150px] object-cover rounded-[18px]"
                    />
                  )}
                  <div className="mt-4 text-center">{recipe.title}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
