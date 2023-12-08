import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function UserProfilePage() {
  const { username } = useParams<{ username: string }>();
  console.log(username);

  const [avatar, setAvatar] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log(username);
      try {
        const response = await axios.get(
          `https://kitchenguru.onrender.com/api/users/profile?username=${username}`
        );
        console.log(response.data);
        setAvatar(response.data.profile.avatar);
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [username]);

  return (
    <div className="w-screen h-screen flex flex-grow w-full p-4 mt-[3%] font-main-font">
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-row items-center gap-[20px] mb-[5%]">
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
            {recipes.map((recipe: any) => {
              console.log(recipe);
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
                        src={`https://kitchenguru.onrender.com${recipe.images[0]?.image}`}
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
