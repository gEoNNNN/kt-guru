import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Image from "../Components/Image/Image";
import Button from "../Components/Button/Button";
import "../index.css";
import general from "../assets/category/general.jpg";
import dessert from "../assets/category/dessert.jpeg";
import salads from "../assets/category/salads.jpeg";
import drinks from "../assets/category/drinks.jpeg";
import fast_food from "../assets/category/fast_food.jpeg";
import soups from "../assets/category/soups.png";
import meat from "../assets/category/meat.jpg";
import seafood from "../assets/category/seafood.jpeg";
import Inputbox from "../Components/Inputbox/Inputbox";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MainPage() {
  const [data, setData] = useState<any[]>([]);
  const [nextURL, setNextURL] = useState<string | null>(null);
  const [prevURL, setPrevURL] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState<string>("");
  const [allIngredients, setAllIngredients] = useState<string[]>([]);
  const [filteredIngredients, setFilteredIngredients] = useState<string[]>([]);
  const token = localStorage.getItem("access_token");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentIngredient(e.target.value);
  };

  const fetchRecipes = async (url: string) => {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(response.data.results);
    setNextURL(response.data.next);
    setPrevURL(response.data.previous);
    setIngredients([]);
  };

  const handlePagination = (url: string | null) => {
    if (url) {
      fetchRecipes(url);
    }
  };

  const sendIngredientsToBackend = () => {
    const ingredientsString = ingredients.join(", ");
    const url = `http://127.0.0.1:8000/api/recipes/search?category=${selectedCategory}&ingredients=${ingredientsString}`;
    fetchRecipes(url);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      currentIngredient.trim() &&
      allIngredients.includes(currentIngredient.trim())
    ) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

  const handleDeleteIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const [categorySelected, setCategorySelected] = useState<boolean>(false);
  useEffect(() => {
    setCategorySelected(false);
  }, []);

  const fetchIngredients = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/recipes/get-ingredients"
    );
    if (response.status === 200 && Array.isArray(response.data)) {
      const ingredientNames = response.data.map(
        (ingredient) => ingredient.name
      );
      setAllIngredients(ingredientNames);
    }
  };

  const handleCategorySelection = (category: string) => {
    setSelectedCategory(category);
    setCategorySelected(true);

    const sendCategoriesToBackend = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/recipes/get-recipes?category=${category}`
      );
      if (response.status === 200) {
        console.log(response);
        const recipes = response.data.results;
        setData(recipes);
      }
    };
    sendCategoriesToBackend();
    fetchIngredients();
  };

  useEffect(() => {
    if (currentIngredient) {
      const filtered = allIngredients.filter((ingredient) =>
        ingredient.toLowerCase().includes(currentIngredient.toLowerCase())
      );
      setFilteredIngredients(filtered);
    } else {
      setFilteredIngredients([]);
    }
  }, [currentIngredient, allIngredients]);

  const handleLinkClick = async (recipeId: any) => {
    const token = localStorage.getItem('access_token');
    if (token !== null) {
      try {
        await axios.post(`http://127.0.0.1:8000/api/users/add-to-watch-list?recipe_id=${recipeId}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error("Error adding to watch list:", error);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <Navbar />
      <div className="flex h-screen items-center justify-center pb-[3%]">
        <div className="w-[740px] flex h-[680px] content-center justify-center relative m-[100px] ">
          {!data.length && !categorySelected ? (
            <>
              <span className="absolute top-[15%] text-3xl font-main-font ">
                Select your category:
              </span>
              <Button onClick={() => handleCategorySelection("seafood")}>
                <Image
                  url={seafood}
                  style="w-[120px] rounded-full scale-1 hover:scale-150 z-[0] hover:z-[999] transition duration-30 ease-in-out absolute top-[27%] left-[20%] drop-shadow-2xl"
                ></Image>
              </Button>
              <Button onClick={() => handleCategorySelection("")}>
                <Image
                  url={general}
                  style="w-[270px] rounded-full scale-1 hover:scale-150 z-[0] hover:z-[999] transition duration-30 ease-in-out absolute top-[37%] left-[31%] drop-shadow-2xl"
                ></Image>
              </Button>
              <Button onClick={() => handleCategorySelection("meat")}>
                <Image
                  url={meat}
                  style="w-[160px] rounded-full scale-1 hover:scale-150 z-[0] hover:z-[999] transition duration-30 ease-in-out absolute top-[68%] left-[16%] drop-shadow-2xl"
                ></Image>
              </Button>
              <Button onClick={() => handleCategorySelection("salad")}>
                <Image
                  url={salads}
                  style="w-[110px] rounded-full scale-1 hover:scale-150 z-[0] hover:z-[999] transition duration-30 ease-in-out absolute top-[28%] left-[62%] drop-shadow-2xl"
                ></Image>
              </Button>
              <Button onClick={() => handleCategorySelection("soups")}>
                <Image
                  url={soups}
                  style="w-[200px] rounded-full scale-1 hover:scale-150 z-[0] hover:z-[999] transition duration-30 ease-in-out absolute top-[41%] left-[0%] drop-shadow-2xl"
                ></Image>
              </Button>
              <Button onClick={() => handleCategorySelection("desserts")}>
                <Image
                  url={dessert}
                  style="w-[160px] rounded-full scale-1 hover:scale-150 z-[0] hover:z-[999] transition duration-1500 ease-in-out absolute top-[68%] left-[61%] drop-shadow-2xl"
                ></Image>
              </Button>
              <Button onClick={() => handleCategorySelection("fast_food")}>
                <Image
                  url={fast_food}
                  style="w-[190px] rounded-full scale-1 hover:scale-150 z-[0] hover:z-[999] transition duration-30 ease-in-out absolute top-[41%] left-[71%] drop-shadow-2xl"
                />
              </Button>
              <Button onClick={() => handleCategorySelection("drinks")}>
                <Image
                  url={drinks}
                  style="w-[120px] rounded-full scale-1 hover:scale-150 z-[0] hover:z-[999] transition duration-30 ease-in-out absolute top-[79%] left-[42%] drop-shadow-2xl"
                ></Image>
              </Button>
            </>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {data.map((recipe: any) => {
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
                      onClick={() => handleLinkClick(recipe.id)}
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
              <div className="flex flex-col justify-center h-full gap-4">
                {nextURL && (
                  <Button
                    onClick={() => handlePagination(nextURL)}
                    style="bg-33B249 w-[80px] h-[30px] text-white px-2 md:px-4 py-1 rounded-lg cursor-pointer transition duration-200 hover:bg-black"
                  >
                    Next
                  </Button>
                )}
                {prevURL && (
                  <Button
                    onClick={() => handlePagination(prevURL)}
                    style="bg-33B249 w-[80px] h-[30px] text-white px-2 md:px-4 py-1 rounded-lg cursor-pointer transition duration-200 hover:bg-black"
                  >
                    Back
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {categorySelected && (
        <div className="w-[550px] h-[auto]">
          <span className="absolute top-[26%] text-2xl font-main-font">
            Choose your ingredients:
          </span>
          <Inputbox
            name="Search here"
            value={currentIngredient}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            style="flex w-[300px] px-[13px] py-[0.3%] my-4 border-2 border-black rounded-full absolute top-[30%]"
          />
          <div className="absolute top-[36.5%] bg-white border border-gray-300 rounded-md z-10">
            {filteredIngredients.map((ingredient, index) => (
              <div
                key={index}
                className="cursor-pointer hover:bg-gray-200 px-3 py-1"
                onClick={() => {
                  setIngredients([...ingredients, ingredient]);
                  setCurrentIngredient("");
                  setFilteredIngredients([]);
                }}
              >
                {ingredient}
              </div>
            ))}
          </div>
          <span className="absolute top-[39%] text-2xl font-main-font">
            Selected:
          </span>
          <div className="absolute top-[43%]">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="inline-block rounded-full px-3 py-1 font-main-font text-sm text-black mr-2 mb-1 mt-1 border-[1px] border-black "
              >
                {ingredient}
                <button
                  className="ml-2 text-red-500 "
                  onClick={() => handleDeleteIngredient(index)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <div className="absolute top-[80%]">
            <Button onClick={sendIngredientsToBackend} style="bg-33B249 text-white px-2 md:px-4 py-1 rounded-lg cursor-pointer transition duration-200 hover:bg-black">
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
