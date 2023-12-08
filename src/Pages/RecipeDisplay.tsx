import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import notFavorite from "../assets/not_favorite.png";
import favorite from "../assets/favorite.png";
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
  minutes_passed: string;
}

interface Review {
  id: number;
  text: string;
  rating: number;
  avatar: string;
  username: string;
  created_time: string;
  minutes_passed: string;
}

function RecipeDisplayPage() {
  const { id: idString } = useParams<{ id: any }>();
  const id = parseInt(idString, 10);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [userFeedback, setUserFeedback] = useState<UserFeedback | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [nickname, setNickname] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const userProfileResponse = await axios.get(
            "https://kitchenguru.onrender.com/api/users/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(userProfileResponse.data);
          setNickname(userProfileResponse.data.username);
          setAvatar(userProfileResponse.data.profile.avatar);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  const deleteReview = async () => {
    setUserFeedback(null);
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await axios.delete(
        `https://kitchenguru.onrender.com/api/recipes/update-review/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Review deleted successfully");

      setReviews(reviews.filter((review) => review.username !== nickname));
    } catch (error) {
      console.error("Error deleting the review:", error);
    }
  };

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
          "https://kitchenguru.onrender.com/api/recipes/delete-favorites",
          {
            headers: headers,
            data: data,
          }
        );
        console.log("Recipe removed from favorites");
      } else {
        await axios.post(
          "https://kitchenguru.onrender.com/api/recipes/add-favorites",
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
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }
    const payload = {
      id: id,
      text: feedback,
      rating: userRating || 0,
    };
    try {
      const response = await axios.post(
        "https://kitchenguru.onrender.com/api/recipes/recipe-review",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Review sent successfully:", response.data);

      try {
        const userProfileResponse = await axios.get(
          "https://kitchenguru.onrender.com/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(userProfileResponse.data);
        setNickname(userProfileResponse.data.username);
        setAvatar(userProfileResponse.data.profile.avatar);

        setUserFeedback({
          photo: userProfileResponse.data.profile.avatar,
          name: userProfileResponse.data.username,
          stars: userRating || 0,
          feedback: feedback,
          minutes_passed: userProfileResponse.data.minutes_passed,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
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

      const token = localStorage.getItem("access_token");
      const headers: any = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      try {
        const response = await axios.get(
          `https://kitchenguru.onrender.com/api/recipes/get-recipe?recipe_id=${id}`,
          { headers }
        );

        setRecipe(response.data.recipe);
        setIsFavorite(response.data.is_favorite);
        console.log(response);

        try {
          const reviewResponse = await axios.get(
            `https://kitchenguru.onrender.com/api/recipes/recipe-review?recipe_id=${id}`,
            { headers }
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

  const CalculateTime = (time: any) => {
    if (time >= 518400) {
      return `${Math.floor(time / 518400)} years ago`;
    } else if (time >= 43200) {
      return `${Math.floor(time / 43200)} months ago`;
    } else if (time >= 10080) {
      return `${Math.floor(time / 10080)} weeks ago`;
    } else if (time >= 1440) {
      return `${Math.floor(time / 1440)} days ago`;
    } else if (time >= 60) {
      return `${Math.floor(time / 60)} hours ago`;
    } else {
      return `${time} minutes ago`;
    }
  };

  if (!recipe) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const confirmAndDeleteReview = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the review?"
    );
    if (isConfirmed) {
      deleteReview();
    }
  };

  return (
    <>
      <Navbar />
      <div className="recipe-display font-main-font">
        <div className="mt-[150px]">
          <div className="flex flex-wrap justify-center items-center">
            <div className="flex flex-row w-[50%] h-[50%] justify-center items-center gap-[10px]">
              <div>
                <button className="" onClick={toggleFavorite}>
                  {isFavorite ? (
                    <img src={favorite} className="w-[50px] h-[50px]" />
                  ) : (
                    <img src={notFavorite} className="w-[50px] h-[50px]" />
                  )}
                </button>
              </div>
              <div className="flex flex-col">
                <span className=" text-4xl ">{recipe.title}</span>
                <div>
                  {recipe.created_by !== null ? (
                    <>
                      <span>Created by : </span>
                      <button
                        className="font-bold hover:underline"
                        onClick={() =>
                          navigate(`/profile/${recipe.created_by}`)
                        }
                      >
                        @{recipe.created_by}
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <img
              src={
                recipe.images[0].image.startsWith("/recipe")
                  ? `https://kitchenguru.onrender.com${recipe.images[0].image}`
                  : decodeURIComponent(recipe.images[0].image.slice(1))
              }
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
              <span className="space-y-4">
                {decodeURI(recipe.ingredients)
                  .split("\n")
                  .map((ingredient: any, index: any) => (
                    <ol key={index}>{ingredient}</ol>
                  ))}
              </span>
            </span>
          </div>
          <div className="w-[50%] grid justify-items-center pr-[20px]">
            <span className="text-2xl text-center pb-[20px]">
              Instructions:
            </span>
            <ol className="list-decimal pl-5 space-y-4">
              {decodeURI(recipe.instructions)
                .split("\n")
                .map((instruction: any, index: any) => (
                  <ol key={index}>{instruction}</ol>
                ))}
            </ol>
          </div>
        </div>
      </div>
      <div className="mt-[7%] relative">
        <div
          className="h-[600px] lg:h-[660px] bg-contain bg-center bg-no-repeat "
          style={{ backgroundImage: `url(${contactUs})` }}
        >
          <div className="ml-[28%] pt-[3%] flex items-center space-x-2">
            <img
              src={
                recipe.images[0].image.startsWith("/recipe")
                  ? `https://kitchenguru.onrender.com${recipe.images[0].image}`
                  : decodeURIComponent(recipe.images[0].image.slice(1))
              }
              className="rounded-full w-[50px] h-[50px]"
            />
            <span className="text-xl">{recipe.title}</span>
          </div>

          <div className="h-[100%] w-[100%]">
            <div className="text-2xl ml-[28%] mt-[2%]">Your Rating : </div>
            <div className="ml-[28%] mt-[1%]">
              <StarRating onRate={handleRating} />
            </div>
            <div className="text-2xl ml-[28%] mt-[1%]">Your Review :</div>
            <div className="text-center">
              <CommentForm
                style="mt-[30px] h-[230px] w-[43%] rounded-[10px] border-[1px] border-black px-[10px] py-[10px] resize-none mb-[20px]"
                placeholder="Feedback for the recipe..."
                name="feedback"
                buttonstyle="bg-33B249 border-black border-1 shadow-lg rounded-full w-[150px] h-[40px] text-white"
                onSubmit={token ? handleFeedbackSubmit : () => {}}
              />
            </div>
            {userFeedback && (
              <div className="flex justify-center rounded-3xl">
                <div className="mt-[50px] text-center w-[800px] border-2 border-black p-[25px] rounded-3xl">
                  {" "}
                  <div className="flex gap-[20px] border-b-[2px]">
                    <div className="flex items-center space-x-2 flex-col mt-[3px] mb-[10px]">
                      <img
                        src={avatar || userFeedback.photo}
                        alt={nickname || "Nickname"}
                        className="rounded-full w-[70px] h-[70px]"
                      />
                    </div>
                    <div className="flex flex-col text-start items-start">
                      <span className="text-xl">{nickname || "Nickname"}</span>
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
                <div className="mt-[50px] text-center w-[800px] border-2 border-black p-[25px] rounded-3xl relative">
                  {nickname === review.username && (
                    <button
                      onClick={confirmAndDeleteReview}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center m-2 z-50"
                      aria-label="Delete review"
                    >
                      X
                    </button>
                  )}
                  <div className="flex gap-[20px] border-b-[2px] items-center">
                    <div className="flex items-center space-x-2 flex-col mt-[3px] mb-[10px]">
                      <img
                        src={`https://kitchenguru.onrender.com${review.avatar}`}
                        alt={review.username}
                        className="rounded-full w-[70px] h-[70px]"
                      />
                    </div>
                    <div className="flex flex-col text-start items-start">
                      <span className="text-xl">{review.username}</span>
                      <StarRating value={review.rating} readOnly />
                    </div>
                  </div>
                  <div className="mt-2 text-lg text-start">{review.text}</div>
                  <div className="mt-2 text-start text-zinc-600">
                    <span>{CalculateTime(review.minutes_passed)}</span>
                  </div>
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
