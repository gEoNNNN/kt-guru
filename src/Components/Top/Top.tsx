import React, { ChangeEvent, useEffect, useState } from 'react';
import Navbar from "../../Components/Navbar";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import test from "../../assets/category/general.jpg";
import Button from '../Button/Button';

const categoryMap: { [key: string]: string } = {
  option1: 'fast_food',
  option2: 'desserts',
  option3: 'soups',
  option4: 'salad',
  option5: 'meat',
  option6: 'seafood',
};
export default function Top() {
  const handleClick = (title: any) => {
    let id = title;
  };
  const [sortby, setSortby] = useState<SortByOption>('');
  const [minDuration, setMinDuration] = useState('0');
  const [maxDuration, setMaxDuration] = useState('300');
  const [categories, setCategories] = useState('');
  const [next, setNext] = useState('');
  const [prev, setPrev] = useState<string | null>(null);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [accessToken,setAccessToken] = useState("")


  useEffect(() => {
    axios
    .get(`http://127.0.0.1:8000/api/recipes/best100?duration_min=${minDuration.toString()}&duration_max=${maxDuration.toString()}&category=${categories.toString()}&sort_by=${sortby.toString()}`)
    .then((response: any) => {setData(response.data.results);setNext(response.data.next);setPrev(response.data.previous)    })
    .catch((error: any) => {
      console.log(error)});
  }, []);
  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortby(event.target.value as SortByOption);
    axios
        .get(`http://127.0.0.1:8000/api/recipes/best100?duration_min=${minDuration.toString()}&duration_max=${maxDuration.toString()}&category=${categories.toString()}&sort_by=${sortby.toString()}`)
        .then((response: any) => {setData(response.data.results);setNext(response.data.next);setPrev(response.data.previous)
        })
        .catch((error: any) => {
          console.log(error)});
  };
  const handleMinDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinDuration(event.target.value);
    if(minDuration === ""){
      axios
      .get(`http://127.0.0.1:8000/api/recipes/best100?duration_min=${'0'}&duration_max=${maxDuration.toString()}&category=${categories.toString()}&sort_by=${sortby.toString()}`)
      .then((response: any) => {setData(response.data.results);setNext(response.data.next);setPrev(response.data.previous)
      })
      .catch((error: any) => {
        console.log(error)});
    }else{
      axios
        .get(`http://127.0.0.1:8000/api/recipes/best100?duration_min=${minDuration.toString()}&duration_max=${maxDuration.toString()}&category=${categories.toString()}&sort_by=${sortby.toString()}`)
        .then((response: any) => {setData(response.data.results);setNext(response.data.next);setPrev(response.data.previous)
        })
        .catch((error: any) => {
          console.log(error)});
    }
  };
  const handleMaxDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxDuration(event.target.value);
    axios
        .get(`http://127.0.0.1:8000/api/recipes/best100?duration_min=${minDuration.toString()}&duration_max=${maxDuration.toString()}&category=${categories.toString()}&sort_by=${sortby.toString()}`)
        .then((response: any) => {setData(response.data.results);setNext(response.data.next);setPrev(response.data.previous)        })
        .catch((error: any) => {
          console.log(error)});
  };
const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    let updatedCategories = [];
    
    if (checked) {
      updatedCategories = [...categories, categoryMap[id]];
    } else {
      updatedCategories = categories.filter((category: string) => category !== categoryMap[id]);
    }
    setCategories(updatedCategories);
    axios
        .get(`http://127.0.0.1:8000/api/recipes/best100?duration_min=${minDuration.toString()}&duration_max=${maxDuration.toString()}&category=${updatedCategories.toString()}&sort_by=${sortby.toString()}`)
        .then((response: any) => {
            setData(response.data.results);
            setNext(response.data.next);
            setPrev(response.data.previous)
        })
        .catch((error: any) => {
          console.log(error);
        });
};
const handleLinkClick = async (recipeId: any) => {
  const token = localStorage.getItem('access_token');
  if (token !== null) {
    setAccessToken(token);
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
const prevPage = (prev: string) => {
  axios
    .get(prev)
    .then((response: any) => {setData(response.data.results);setNext(response.data.next);setPrev(response.data.previous)})
        .catch((error: any) => {
          console.log(error)});
}
const nextPage = (next: string) => {
  axios
    .get(next)
    .then((response: any) => {setData(response.data.results);setNext(response.data.next);setPrev(response.data.previous)})
        .catch((error: any) => {
          console.log(error)});
}
const API_KEY = 'AIzaSyBqorJmCpLLlf4zPYIaQu3HCNpmrufIWIQ';
const CSE_ID = 'a268077d2792a4859';
async function fetchImageUrlByTitle(title: string): Promise<string | null> {
  const url = 'https://www.googleapis.com/customsearch/v1';

  const params = {
      q: title,
      key: API_KEY,
      cx: CSE_ID,
      searchType: 'image',
      num: 1 
  };

  try {
      const response = await axios.get(url, { params });
      const results = response.data;

      if (results.items && results.items.length > 0) {
          return results.items[0].link;
      }
  } catch (error) {
      console.error('Error fetching image URL:', error);
  }

  return null;
}
console.log(fetchImageUrlByTitle("denis").promise)
  return (
    <>
    <Navbar/>
    <div>
      <div className="flex">
        <div className="w-3/4 p-4">
        <div className="flex flex-wrap justify-center gap-4 mt-[15%]">
        {data.slice(0, 3).map((recipe: any, i) => {
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
                      <div className="relative group w-[310px] h-[220px] rounded-md">
                        <div className="flex flex-col items-center bg-white shadow-md p-4 rounded-md w-full transition-opacity duration-300 group-hover:opacity-0 ">
                          {recipe.images && recipe.images[0] && (
                            <img
                              //src={http://127.0.0.1:8000${recipe.images[0].image}}
                              src={test}
                              alt={recipe.title}
                              className="w-full h-[150px] object-cover rounded-[18px]"
                            />
                          )}
                          <div className="mt-4 text-center">{recipe.title}</div>
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div className="text-center font-bold mb-2">
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
              <div className="flex flex-wrap justify-center gap-4 mt-[8%]">
                  {data.slice(3, 6).map((recipe: any, i) => {
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
                              //src={http://127.0.0.1:8000${recipe.images[0].image}}
                              src={test}
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
              {next && (<Button style="absolute mt-[-16%] ml-[67%] bg-33B249 w-[80px] h-[30px] text-white px-2 md:px-4 py-1 rounded-lg cursor-pointer transition duration-200 hover:bg-black" onClick={() => nextPage(next)}>Next</Button>)}
              {prev && (<Button style="absolute mt-[-14%] ml-[67%] bg-33B249 w-[80px] h-[30px] text-white px-2 md:px-4 py-1 rounded-lg cursor-pointer transition duration-200 hover:bg-black" onClick={() => prevPage(prev)}>Prev</Button>)}
          </div>
            <div className="w-1/4 p-4">
            <div className="mt-[7%] ml-[3%] p-8 absolute border rounded-lg font-main-font bg-green-500 text-xl">
      <div className="flex flex-col space-y-4">
        <label className="flex items-center">
          <input
            type="radio"
            className="form-radio h-5 w-5"
            value="average_rating"
            checked={sortby === 'average_rating'}
            onChange={handleSortChange}
          />
          <span className="ml-2 text-white">Rating</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            className="form-radio h-5 w-5"
            value="review_count"
            checked={sortby === 'review_count'}
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
    <div className='absolute font-main-font text-xl mt-[19%] ml-[3%]'>
      <span>Duration</span>
      <div className='absolute flex flex-row items-center'>
        <input
          type='text'
          className='w-12 border border-green-500'
          placeholder='0'
          value={minDuration}
          onChange={handleMinDurationChange}
        />
        <span className='mx-2'>-</span>
        <input
          type='text'
          className='w-12 border border-green-500'
          placeholder='300'
          value={maxDuration}
          onChange={handleMaxDurationChange}
        />
        <span className='mx-2'>minutes</span>
      </div>
    </div>
            <div className='absolute text-xl font-main-font mt-[25%] ml-[2.5%]'>
              <span>Select Food Categories:</span>
            </div>
            <div className="absolute justify-center mt-[28%] ml-[3%]">
              <div className="bg-green-500 p-8 rounded-lg shadow-lg">
              <div className="flex flex-col items-start space-y-4">
                <div className="flex items-center">
                  <input onChange={handleCheckboxChange} type="checkbox" name="options" id="option1" className="form-checkbox text-green-600 h-6 w-6" />
                  <label className="text-white ml-4 text-lg">Fast food</label>
                </div>
                <div className="flex items-center">
                  <input onChange={handleCheckboxChange} type="checkbox" name="options" id="option2" className="form-checkbox text-green-600 h-6 w-6" />
                  <label className="text-white ml-4 text-lg">Desserts</label>
                </div>
                <div className="flex items-center">
                  <input onChange={handleCheckboxChange} type="checkbox" name="options" id="option3" className="form-checkbox text-green-600 h-6 w-6" />
                  <label className="text-white ml-4 text-lg">Soups</label>
                </div>
                <div className="flex items-center">
                  <input onChange={handleCheckboxChange} type="checkbox" name="options" id="option4" className="form-checkbox text-green-600 h-6 w-6" />
                  <label className="text-white ml-4 text-lg">Salads</label>
                </div>
                <div className="flex items-center">
                  <input onChange={handleCheckboxChange} type="checkbox" name="options" id="option5" className="form-checkbox text-green-600 h-6 w-6" />
                  <label className="text-white ml-4 text-lg">Meat</label>
                </div>
                <div className="flex items-center">
                  <input onChange={handleCheckboxChange} type="checkbox" name="options" id="option6" className="form-checkbox text-green-600 h-6 w-6" />
                  <label className="text-white ml-4 text-lg">Seafood</label>
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