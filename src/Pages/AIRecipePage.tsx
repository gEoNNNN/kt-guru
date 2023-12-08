import { useEffect, useState, useRef } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import robot_cook from "../assets/giphy.gif";
import robot_think from "../assets/giphy2.gif";
import robot_reading from "../assets/giphy3.gif";

export default function AIRecipe() {
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState("");
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const requestData = {
        categories: category,
        ingredients: ingredients,
      };
      const response = await axios.post(
        "https://kitchenguru.onrender.com/api/recipes/generate-ai-recipes",
        requestData
      );
      console.log(response.data);
      setMessage(response.data.message);
      setPhoto(response.data.image);

      setShowResults(true);
    } catch (error) {
      console.error("Error fetching AI recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let index = 1;
    setDisplayedMessage(message[0]);
    const interval = setInterval(() => {
      if (index < message.length - 1) {
        setDisplayedMessage((prev) => prev + message[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [message]);

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (
      messageContainerRef.current &&
      messageContainerRef.current.scrollHeight >
        messageContainerRef.current.clientHeight
    ) {
      setShowScrollDown(true);
    } else {
      setShowScrollDown(false);
    }
  }, [displayedMessage]);

  const handleSaveRecipe = async () => {
    try {
      const requestData = {
        message: message,
        image: photo,
      };

      const token = localStorage.getItem("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/recipes/create-ai-recipes",
        requestData,
        { headers: headers }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error saving AI recipe:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center">
        {loading ? (
          <>
            <img
              src={robot_cook}
              title="Robot Cooking"
              className="w-[500px] h-[500px]"
            ></img>
            <span className="text-font-main text-xl">AI is cooking...</span>
          </>
        ) : showResults ? (
          <div className="flex items-center justify-start h-screen overflow-hidden">
            <div className="flex flex-col items-center z-10 h-[70vh]">
              <img
                src={`http://127.0.0.1:8000${photo}`}
                className="rounded-full w-[250px] h-[250px]"
              ></img>
              <img src={robot_reading} className="w-[350px] h-[350px]"></img>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleRefresh}
                  className="bg-33B249 text-white px-2 md:px-4 py-1 rounded-lg cursor-pointer transition duration-200 hover:bg-black"
                >
                  Test AI Again
                </button>
                <button
                  onClick={handleSaveRecipe}
                  className="bg-33B249 text-white px-2 md:px-4 py-1 rounded-lg cursor-pointer transition duration-200 hover:bg-black"
                >
                  Save AI Recipe
                </button>
              </div>
            </div>

            <div className=" text-left text-xl w-[900px] ml-8 pr-[50px] h-[70vh] overflow-hidden">
              <div className="h-full overflow-y-auto" ref={messageContainerRef}>
                {displayedMessage && (
                  <p className="whitespace-pre-wrap">{displayedMessage}</p>
                )}
              </div>
              {showScrollDown && (
                <div className="absolute bottom-[50px] right-[35%] text-gray-500 animate-bounce">
                  <span className="mr-2">Scroll down</span>
                  <span>&#8595;</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 z-10">
            <img src={robot_think} className="w-[80%]"></img>
            <input
              type="text"
              placeholder="Enter category (ex. dessert)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 rounded w-[350px]"
            />
            <input
              type="text"
              placeholder="Enter ingredients (ex. milk, sugar, cacao)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="border p-2 rounded w-[350px]"
            />
            <button
              onClick={handleSubmit}
              className="bg-33B249 text-white px-2 md:px-4 py-1 rounded-lg cursor-pointer transition duration-200 hover:bg-black"
            >
              Let AI cook
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
