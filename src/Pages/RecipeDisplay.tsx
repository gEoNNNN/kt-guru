import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import notFavorite from "../assets/not_favorite.png";
import favorite from "../assets/favorite.png";
import test from "../assets/category/general.jpg";
import CommentForm from "../Components/CommentForm";
import contactUs from "../assets/contactUs.png";
import StarRating from "../Components/StarRate";

interface Recipe {
  category: string;
  created_by: any;
  duration: number;
  images: { image: string }[];
  ingredients: string;
  instructions: string;
  title: string;
}

interface UserFeedback {
  photo: string;
  name: string;
  stars: number;
  feedback: string;
}

interface Review {
  text: string;
  rating: number;
  user: {
    avatar: string;
    username: string;
  };
}

function RecipeDisplayPage() {
  const { id: idString } = useParams<{ id: any }>();
  const id = parseInt(idString, 10);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userFeedback, setUserFeedback] = useState<UserFeedback | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const toggleFavorite = async () => {
    const token = localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const data = {
      recipe_id: id,
    };

    console.log("Sending request with data:", data);

    try {
      if (isFavorite) {
        await axios.delete(
          "http://127.0.0.1:8000/api/recipes/delete-favorites",
          {
            headers: headers,
            data: data,
          }
        );
        console.log("Recipe removed from favorites");
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/recipes/add-favorites",
          data,
          { headers }
        );
        console.log("Recipe added to favorites");
      }
      setIsFavorite((prevFavorite) => !prevFavorite);
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  const handleFeedbackSubmit = async (feedback: string) => {
    setUserFeedback({
      photo: test,
      name: "Nickname",
      stars: userRating || 0,
      feedback: feedback,
    });
    const payload = {
      id: id,
      text: feedback,
      rating: userRating || 0,
    };

    const accessToken = localStorage.getItem("access_token");
    console.log(payload);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/recipes/recipe-review",
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Review sent successfully:", response.data);
    } catch (error) {
      console.error("There was an error sending the review:", error);
    }
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      console.log(id);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/recipes/get-recipe?recipe_id=${id}`
        );

        setRecipe(response.data.recipe);
        console.log(response);

        try {
          const reviewResponse = await axios.get(
            `http://127.0.0.1:8000/api/recipes/get-reviews?recipe_id=${id}`
          );
          setReviews(reviewResponse.data.results);
          console.log(reviewResponse);
        } catch (error) {
          console.error("Error fetching the reviews:", error);
        }
      } catch (error) {
        console.error("Error fetching the recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="recipe-display font-main-font">
        <div className="mt-[150px]">
          <div className="flex flex-wrap justify-center items-center">
            <div className="flex flex-row w-[50%] justify-center items-center gap-[10px]">
              <div>
                <button className="" onClick={toggleFavorite}>
                  {isFavorite ? (
                    <img src={favorite} className="w-[50px] h-[50px]" />
                  ) : (
                    <img src={notFavorite} className="w-[50px] h-[50px]" />
                  )}
                </button>
              </div>
              <div>
                <span className=" text-4xl ">{recipe.title}</span>
              </div>
            </div>
            <img
              src={decodeURIComponent(recipe.images[0].image.slice(1))}
              alt={recipe.title}
              className="rounded-full w-[300px] h-[300px]"
            />
          </div>
        </div>
        <div className="flex mt-[100px] pr-[100px]">
          <div className="w-[50%] grid justify-items-center">
            <span className="text-2xl text-center pb-[20px] ">
              Ingredients:
            </span>
            <span className="space-y-4">
              {recipe.ingredients
                .split("\n")
                .map((ingredient: any, index: any) => (
                  <li key={index}>{ingredient}</li>
                ))}
            </span>
          </div>
          <div className="w-[50%] grid justify-items-center pr-[20px]">
            <span className="text-2xl text-center pb-[20px]">
              Instructions:
            </span>
            <ol className="list-decimal pl-5 space-y-4">
              {recipe.instructions
                .split("\n")
                .map((instruction: any, index: any) => (
                  <li key={index}>{instruction}</li>
                ))}
            </ol>
          </div>
        </div>
      </div>
      <div className="pt-[7%] relative">
        <div
          className="w-full h-[600px] bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${contactUs})` }}
        >
          <div className="pl-[28%] pt-[3%] flex items-center space-x-2">
            <img
              src={decodeURIComponent(recipe.images[0].image.slice(1))}
              className="rounded-full w-[50px] h-[50px]"
            />
            <span className="text-xl">{recipe.title}</span>
          </div>

          <div className="">
            <div className="text-2xl pl-[28%] pt-[2%]">Your Rating : </div>
            <div className="pl-[28%] pt-[1%]">
              <StarRating onRate={handleRating} />
            </div>
            <div className="text-2xl pl-[28%] pt-[1%]">Your Review :</div>
            <div className="text-center">
              <CommentForm
                style="mt-[30px] h-[230px] w-[43%] rounded-[10px] border-[1px] border-black px-[10px] py-[10px] resize-none mb-[20px]"
                placeholder="Feedback for the recipe..."
                name="feedback"
                buttonstyle="bg-33B249 border-black border-1 shadow-lg rounded-full w-[150px] h-[40px] text-white"
                onSubmit={handleFeedbackSubmit}
              />
            </div>
            {userFeedback && (
              <div className="flex justify-center rounded-3xl">
                <div className="mt-[50px] text-center w-[800px] border-4 p-[25px] rounded-3xl">
                  <div className="flex gap-[20px] border-b-[2px]">
                    <div className="flex items-center space-x-2 flex-col mt-[3px] mb-[10px]">
                      <img
                        src={userFeedback.photo}
                        alt={userFeedback.name}
                        className="rounded-full w-[70px] h-[70px]"
                      />
                    </div>
                    <div className="flex flex-col text-start items-start">
                      <span className="text-xl">{userFeedback.name}</span>
                      <StarRating value={userFeedback.stars} readOnly />
                    </div>
                  </div>
                  <div className="mt-2 text-lg text-start">
                    {userFeedback.feedback}
                  </div>
                </div>
              </div>
            )}
            {[...reviews].reverse().map((review, index) => (
              <div className="flex justify-center " key={index}>
                <div className="mt-[50px] text-center w-[800px] border-4 p-[25px] rounded-3xl">
                  <div className="flex gap-[20px] border-b-[2px]">
                    <div className="flex items-center space-x-2 flex-col mt-[3px] mb-[10px]">
                      <img
                        src={review.user.avatar}
                        alt={review.user.username}
                        className="rounded-full w-[70px] h-[70px]"
                      />
                    </div>
                    <div className="flex flex-col text-start items-start">
                      <span className="text-xl">{review.user.username}</span>
                      <StarRating value={review.rating} readOnly />
                    </div>
                  </div>
                  <div className="mt-2 text-lg text-start">{review.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeDisplayPage;
