import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Favorite() {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

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
          "http://127.0.0.1:8000/api/recipes/get-favorites",
          { headers }
        );
        console.log(response.data);

        setFavoriteRecipes(response.data.results);
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      }
    };

    fetchUserProfile();
    fetchFavoriteRecipes();
  }, []);

  return (
    <div className="mt-[5%]">
      <div className="flex flex-row items-center gap-[5%] pb-[5%]">
        <img
          className="w-[200px] h-[200px] rounded-full"
          src={avatar}
          alt="Avatar"
        />
        <span className="mt-[6%] font-main-font text-3xl">{username}</span>
      </div>
      <div>
        <div className="absolute h-[7%] w-[12px] rounded-full bg-33B249 ml-[-1.85%] mt-[6.8%]"></div>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {favoriteRecipes.map((recipe: any) => {
            const ingredientTagsArray = recipe.ingredient_tags
              ? recipe.ingredient_tags.split(", ")
              : [];
            const matchingIngredientsArray = recipe.matching_ingredients
              ? recipe.matching_ingredients.split(", ")
              : [];
            const matchingIngredients = ingredientTagsArray.filter(
              (ingredient: any) => matchingIngredientsArray.includes(ingredient)
            );
            const notMatchingIngredients = ingredientTagsArray.filter(
              (ingredient: any) =>
                !matchingIngredientsArray.includes(ingredient)
            );
            return (
              <Link
                to={`/recipedisplay/${recipe.id}`}
                key={recipe.id}
                style={{ zIndex: 10 }}
              >
                <div className="relative group w-[310px] h-[220px] rounded-md ">
                  <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-md w-full transition-opacity duration-300 group-hover:opacity-0 ">
                    {recipe.images && recipe.images[0] && (
                      <img
                        src={decodeURIComponent(
                          recipe.images[0].image.slice(1)
                        )}
                        alt={recipe.title}
                        className="w-full h-[150px] object-cover rounded-[18px]"
                      />
                    )}
                    <div className="mt-4 text-center">{recipe.title}</div>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="text-center font-bold mb-2">
                      Ingredients:
                    </div>
                    <div className="mt-2 text-sm max-h-[150px] overflow-y-auto">
                      {matchingIngredients.length > 0 && (
                        <>
                          <div className="text-green-500">
                            {matchingIngredients.join(", ")}
                          </div>
                        </>
                      )}
                      {notMatchingIngredients.length > 0 && (
                        <>
                          <div className="text-red-500 mt-2">
                            {notMatchingIngredients.join(", ")}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
