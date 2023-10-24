import { useEffect, useState } from "react";
import cameraIcon from "../../assets/add_recipe.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import test from "../../assets/category/general.jpg";

export default function UserInfo() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [recipes, setRecipes] = useState<any>([]);

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
        setAvatar(response.data.profile.avatar);
        setUsername(response.data.username);
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-grow w-full p-4 mt-[3%] font-main-font">
      <div className="flex flex-col ">
        <div className="flex flex-row items-center gap-[5%] pb-[5%]">
          <img
            className="w-[200px] h-[200px] rounded-full"
            src={avatar}
            alt="Avatar"
          />
          <span className="mt-[6%] font-main-font text-3xl">{username}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl"> Created Recipes :</span>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="relative group w-[310px] h-[220px] rounded-md">
              <button className="flex flex-col items-center bg-white shadow-md p-4 rounded-md w-full">
                <img
                  src={cameraIcon}
                  alt="Add Recipe"
                  className="w-full h-[150px] object-cover rounded-[18px]"
                  onClick={() => navigate("/create-recipe")}
                />
                <div className="mt-4 text-center">Add Recipe</div>
              </button>
            </div>

            {recipes.map((recipe: any) => {
              const ingredientTagsArray = recipe.ingredient_tags
                ? recipe.ingredient_tags.split(", ")
                : [];
              const matchingIngredientsArray = recipe.matching_ingredients
                ? recipe.matching_ingredients.split(", ")
                : [];
              const matchingIngredients = ingredientTagsArray.filter(
                (ingredient: any) =>
                  matchingIngredientsArray.includes(ingredient)
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
                      <img
                        //src={`http://127.0.0.1:8000${recipe.images[0].image}`}
                        src={test}
                        alt={recipe.title}
                        className="w-full h-[150px] object-cover rounded-[18px]"
                      />

                      <div className="mt-4 text-center">{recipe.title}</div>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="text-center font-bold mb-2">
                        Ingredients:
                      </div>
                      <div className="mt-2 text-sm max-h-[150px] ">
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
    </div>
  );
}
