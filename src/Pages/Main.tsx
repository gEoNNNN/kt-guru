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

export default function MainPage() {
  const [data, setData] = useState<any[]>([]);
  const dd: any[] = [
    { id: 1, name: "mehuineaat" },
    { id: 2, name: "mehuineaat2" },
  ];

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentIngredient(e.target.value);
  };

  const sendIngredientsToBackend = async () => {
    try {
      console.log(ingredients);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/recipes/search",
        {
          ingredients: ingredients,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error sending ingredients:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentIngredient.trim()) {
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

  const handleCategorySelection = (category: string) => {
    console.log(category);
    setCategorySelected(true);
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
              <Button onClick={() => handleCategorySelection("general")}>
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
              <Button onClick={() => handleCategorySelection("salads")}>
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
              <Button onClick={() => handleCategorySelection("dessert")}>
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
            <div>{data.map((el: any) => el.name)}</div>
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
          ></Inputbox>
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
            <Button
              onClick={sendIngredientsToBackend}
              style="bg-33B249 text-white px-2 md:px-4 py-1 rounded-lg cursor-pointer transition duration-200 hover:bg-black"
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
