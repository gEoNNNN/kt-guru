import React, { useEffect, useState, useRef } from "react";
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
        "http://127.0.0.1:8000/api/recipes/ai-recipes",
        requestData
      );
      console.log(response.data.message);
      setMessage(response.data.message);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching AI recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < message.length - 1) {
        setDisplayedMessage((prev) => prev + message[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 40);

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

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center">
        {loading ? (
          <>
            <iframe
              src={robot_cook}
              title="Robot Cooking"
              className="w-[500px] h-[500px]"
            ></iframe>
            <span className="text-font-main text-xl">AI is cooking...</span>
          </>
        ) : showResults ? (
          <div className="flex items-center justify-start h-screen">
            <div className="flex flex-col items-center z-10">
              <iframe
                src={robot_reading}
                className="w-[500px] h-[500px]"
              ></iframe>
              <button
                onClick={handleRefresh}
                className="bg-33B249 text-white px-2 md:px-4 py-1 rounded-lg cursor-pointer transition duration-200 hover:bg-black mt-4"
              >
                Test AI Again
              </button>
            </div>
            <div
              className=" text-left text-xl w-[65%] ml-8 pr-[50px] h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
              ref={messageContainerRef}
            >
              {displayedMessage &&
                displayedMessage
                  .split("\n")
                  .map((line, index) => <p key={index}>{line}</p>)}
              {showScrollDown && (
                <div className="absolute bottom-[50px] right-[30%] text-gray-500 animate-bounce">
                  <span className="mr-2">Scroll down</span>
                  <span>&#8595;</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 h-screen z-10">
            <iframe src={robot_think} className="w-[480px] h-[500px]"></iframe>
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
