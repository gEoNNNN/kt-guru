import React, { ChangeEvent, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../Button/Button";

const categoryMap: { [key: string]: string } = {
  option1: "fast_food",
  option2: "desserts",
  option3: "soups",
  option4: "salad",
  option5: "meat",
  option6: "seafood",
};
export default function Top() {
  const [sortby, setSortby] = useState("favorites_count");
  const [minDuration, setMinDuration] = useState("0");
  const [maxDuration, setMaxDuration] = useState("300");
  const [next, setNext] = useState("");
  const [prev, setPrev] = useState<string | null>(null);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/recipes/best100?duration_min=${minDuration.toString()}&duration_max=${maxDuration.toString()}&category=${categories.toString()}&sort_by=${sortby.toString()}`
      )
      .then((response: any) => {
        setData(response.data.results);
        setNext(response.data.next);
        setPrev(response.data.previous);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSortByValue = event.target.value;
    setSortby(newSortByValue);
    console.log(newSortByValue);

    axios
      .get(
        `http://127.0.0.1:8000/api/recipes/best100?duration_min=${minDuration.toString()}&duration_max=${maxDuration.toString()}&category=${categories.toString()}&sort_by=${newSortByValue}`
      )
      .then((response: any) => {
        setData(response.data.results);
        setNext(response.data.next);
        setPrev(response.data.previous);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleMinDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinDuration(event.target.value);
    if (minDuration === "") {
      axios
        .get(
          `http://127.0.0.1:8000/api/recipes/best100?duration_min=${"0"}&duration_max=${maxDuration.toString()}&category=${categories.toString()}&sort_by=${sortby.toString()}`
        )
        .then((response: any) => {
          setData(response.data.results);
          setNext(response.data.next);
          setPrev(response.data.previous);
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      axios
        .get(
          `http://127.0.0.1:8000/api/recipes/best100?duration_min=${minDuration.toString()}&duration_max=${maxDuration.toString()}&category=${categories.toString()}&sort_by=${sortby.toString()}`
        )
        .then((response: any) => {
          setData(response.data.results);
          setNext(response.data.next);
          setPrev(response.data.previous);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };
  const handleMaxDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxDuration(event.target.value);
    axios
      .get(
        `http://127.0.0.1:8000/api/recipes/best100?duration_min=${minDuration.toString()}&duration_max=${maxDuration.toString()}&category=${categories.toString()}&sort_by=${sortby.toString()}`
      )
      .then((response: any) => {
        setData(response.data.results);
        setNext(response.data.next);
        setPrev(response.data.previous);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    let updatedCategories: string[] = Array.isArray(categories)
      ? [...categories]
      : [];

    if (checked) {
      updatedCategories.push(categoryMap[id]);
    } else {
      updatedCategories = updatedCategories.filter(
        (category: string) => category !== categoryMap[id]
      );
    }

    setCategories(updatedCategories);

    const queryParams = [
      `duration_min=${minDuration.toString()}`,
      `duration_max=${maxDuration.toString()}`,
      `category=${updatedCategories.toString()}`,
      `sort_by=${sortby.toString()}`,
    ].join("&");

    axios
      .get(`http://127.0.0.1:8000/api/recipes/best100?${queryParams}`)
      .then((response: any) => {
        setData(response.data.results);
        setNext(response.data.next);
        setPrev(response.data.previous);
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleLinkClick = async (recipeId: any) => {
    const token = localStorage.getItem("access_token");
    if (token !== null) {
      try {
        await axios.post(
          `http://127.0.0.1:8000/api/users/add-to-watch-list?recipe_id=${recipeId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error adding to watch list:", error);
      }
    }
  };
  const prevPage = (prev: string) => {
    axios
      .get(prev)
      .then((response: any) => {
        setData(response.data.results);
        setNext(response.data.next);
        setPrev(response.data.previous);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const nextPage = (next: string) => {
    axios
      .get(next)
      .then((response: any) => {
        setData(response.data.results);
        setNext(response.data.next);
        setPrev(response.data.previous);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return (
    <>
      <Navbar />
      <div>
        <div className="flex">
          <div className="w-3/4 p-4">
            <div className="flex flex-wrap justify-center gap-4 mt-[15%]">
              {data.slice(0, 3).map((recipe: any) => {
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
                    <div className="relative group w-[310px] h-[220px] rounded-md font-main-font">
                      <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-md w-full transition-opacity duration-300 group-hover:opacity-0 ">
                        {recipe.images && recipe.images[0] && (
                          <img
                            src={
                              recipe.images[0].image.startsWith("/recipe")
                                ? `http://127.0.0.1:8000${recipe.images[0].image}`
                                : decodeURIComponent(
                                    recipe.images[0].image.slice(1)
                                  )
                            }
                            alt={recipe.title}
                            className="w-full h-[150px] object-cover rounded-[18px]"
                          />
                        )}
                        <div className="mt-4 text-center">{recipe.title}</div>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="text-center font-bold mb-2"></div>
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
                      {sortby === "favorites_count" && (
                        <div className="mt-[4%] ml-[35%]">
                          <span>
                            Favorites:{" "}
                            {Number(recipe.favorites_count) % 1 === 0
                              ? Number(recipe.favorites_count)
                              : Number(recipe.favorites_count).toFixed(2)}
                          </span>
                        </div>
                      )}
                      {sortby === "average_rating" && (
                        <div className="mt-[4%] ml-[40%]">
                          <span>
                            Rating:{" "}
                            {Number(recipe.average_rating) % 1 === 0
                              ? Number(recipe.average_rating)
                              : Number(recipe.average_rating).toFixed(2)}
                          </span>
                        </div>
                      )}
                      {sortby === "review_count" && (
                        <div className="mt-[4%] ml-[40%]">
                          <span>
                            Review:{" "}
                            {Number(recipe.review_count) % 1 === 0
                              ? Number(recipe.review_count)
                              : Number(recipe.review_count).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-[8%]">
              {data.slice(3, 6).map((recipe: any) => {
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
                    <div className="relative group w-[310px] h-[220px] rounded-md font-main-font">
                      <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-md w-full transition-opacity duration-300 group-hover:opacity-0 ">
                        {recipe.images && recipe.images[0] && (
                          <img
                            //src={http://127.0.0.1:8000${recipe.images[0].image}}
                            src={
                              recipe.images[0].image.startsWith("/recipe")
                                ? `http://127.0.0.1:8000${recipe.images[0].image}`
                                : decodeURIComponent(
                                    recipe.images[0].image.slice(1)
                                  )
                            }
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
                      {sortby === "favorites_count" && (
                        <div className="mt-[4%] ml-[35%] ">
                          <span>
                            Favorites:{" "}
                            {Number(recipe.favorites_count) % 1 === 0
                              ? Number(recipe.favorites_count)
                              : Number(recipe.favorites_count).toFixed(2)}
                          </span>
                        </div>
                      )}
                      {sortby === "average_rating" && (
                        <div className="mt-[4%] ml-[40%]">
                          <span>
                            Rating:{" "}
                            {Number(recipe.average_rating) % 1 === 0
                              ? Number(recipe.average_rating)
                              : Number(recipe.average_rating).toFixed(2)}
                          </span>
                        </div>
                      )}
                      {sortby === "review_count" && (
                        <div className="mt-[4%] ml-[40%]">
                          <span>
                            Review:{" "}
                            {Number(recipe.review_count) % 1 === 0
                              ? Number(recipe.review_count)
                              : Number(recipe.review_count).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
            {next && (
              <div className="mb-[15px]">
                <Button
                  style="absolute mt-[-16%] ml-[71%] bg-33B249 w-[80px] h-[30px] text-white px-2 md:px-4 py-1 rounded-lg cursor-pointer transition duration-200 hover:bg-black"
                  onClick={() => nextPage(next)}
                >
                  Next
                </Button>
              </div>
            )}
            {prev && (
              <Button
                style="absolute mt-[-14%] ml-[71%] bg-33B249 w-[80px] h-[30px] text-white px-2 md:px-4 py-1 rounded-lg cursor-pointer transition duration-200 hover:bg-black"
                onClick={() => prevPage(prev)}
              >
                Prev
              </Button>
            )}
          </div>
          <div className="w-1/4 p-4 mt-[10%] flex flex-col">
            <div className=" h-32 w-64 flex items-center justify-center text-white">
              <div className="p-8 absolute border rounded-lg font-main-font bg-green-500 text-xl">
                <div className="flex flex-col space-y-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5"
                      value="average_rating"
                      checked={sortby === "average_rating"}
                      onChange={handleSortChange}
                    />
                    <span className="ml-2 text-white">Rating</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5"
                      value="review_count"
                      checked={sortby === "review_count"}
                      onChange={handleSortChange}
                    />
                    <span className="ml-2 text-white">Comments</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5"
                      value="favorites_count"
                      checked={sortby === "favorites_count"}
                      onChange={handleSortChange}
                    />
                    <span className="ml-2 text-white">Favorites</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="ml-[-10%] mt-[10%] h-32 w-64 flex items-center justify-center">
              <div className="absolute font-main-font text-xl">
                <span>Duration</span>
                <div className="absolute flex flex-row items-center">
                  <input
                    type="text"
                    className="w-12 border border-green-500"
                    placeholder="0"
                    value={minDuration}
                    onChange={handleMinDurationChange}
                  />
                  <span className="mx-2">-</span>
                  <input
                    type="text"
                    className="w-12 border border-green-500"
                    placeholder="300"
                    value={maxDuration}
                    onChange={handleMaxDurationChange}
                  />
                  <span className="mx-2">minutes</span>
                </div>
              </div>
            </div>
            <div className="ml-[-20%] h-32 w-64 flex items-center justify-center text-white">
              <div>
                <div className="absolute text-xl font-main-font">
                  <span>Select Food Categories:</span>
                </div>
                <div className="absolute justify-center ">
                  <div className="bg-green-500 p-8 rounded-lg shadow-lg">
                    <div className="flex flex-col items-start space-y-4">
                      <div className="flex items-center">
                        <input
                          onChange={handleCheckboxChange}
                          type="checkbox"
                          name="options"
                          id="option1"
                          className="form-checkbox text-green-600 h-6 w-6"
                        />
                        <label className="text-white ml-4 text-lg">
                          Fast food
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          onChange={handleCheckboxChange}
                          type="checkbox"
                          name="options"
                          id="option2"
                          className="form-checkbox text-green-600 h-6 w-6"
                        />
                        <label className="text-white ml-4 text-lg">
                          Desserts
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          onChange={handleCheckboxChange}
                          type="checkbox"
                          name="options"
                          id="option3"
                          className="form-checkbox text-green-600 h-6 w-6"
                        />
                        <label className="text-white ml-4 text-lg">Soups</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          onChange={handleCheckboxChange}
                          type="checkbox"
                          name="options"
                          id="option4"
                          className="form-checkbox text-green-600 h-6 w-6"
                        />
                        <label className="text-white ml-4 text-lg">
                          Salads
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          onChange={handleCheckboxChange}
                          type="checkbox"
                          name="options"
                          id="option5"
                          className="form-checkbox text-green-600 h-6 w-6"
                        />
                        <label className="text-white ml-4 text-lg">Meat</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          onChange={handleCheckboxChange}
                          type="checkbox"
                          name="options"
                          id="option6"
                          className="form-checkbox text-green-600 h-6 w-6"
                        />
                        <label className="text-white ml-4 text-lg">
                          Seafood
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
