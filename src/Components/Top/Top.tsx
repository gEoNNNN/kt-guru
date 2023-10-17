import React, { ChangeEvent, useState } from 'react';
import data from '../../assets/recipes.json';
import Navbar from "../../Components/Navbar";
import { Link, useNavigate, useParams } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import axios from 'axios';

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
  const navigate = useNavigate();
  const handleDiplay = () => {
    navigate('/recipedisplay/2');
  };
  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortby(event.target.value as SortByOption);
    axios
        .get(`http://127.0.0.1:8000/api/recipes/best100?duration_min=${minDuration.toString()}&duration_max=${maxDuration.toString()}&category=${categories.toString()}&sort_by=${sortby.toString()}`)
        .then((response: any) => {
            console.log(response)
        })
        .catch((error: any) => {
          console.log(error)});
  };
  const handleMinDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinDuration(event.target.value);
    if(minDuration === ""){
      axios
      .get(`http://127.0.0.1:8000/api/recipes/best100?duration_min=${'0'}&duration_max=${maxDuration.toString()}&category=${categories.toString()}&sort_by=${sortby.toString()}`)
      .then((response: any) => {
          console.log(response)
      })
      .catch((error: any) => {
        console.log(error)});
    }else{
      axios
        .get(`http://127.0.0.1:8000/api/recipes/best100?duration_min=${minDuration.toString()}&duration_max=${maxDuration.toString()}&category=${categories.toString()}&sort_by=${sortby.toString()}`)
        .then((response: any) => {
            console.log(response)
        })
        .catch((error: any) => {
          console.log(error)});
    }
    console.log("min: ",minDuration)
  };
  const handleMaxDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxDuration(event.target.value);
    axios
        .get(`http://127.0.0.1:8000/api/recipes/best100?duration_min=${minDuration.toString()}&duration_max=${maxDuration.toString()}&category=${categories.toString()}&sort_by=${sortby.toString()}`)
        .then((response: any) => {
            console.log(response)
        })
        .catch((error: any) => {
          console.log(error)});
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    if (checked) {
      setCategories((prevCategories) => [...prevCategories, categoryMap[id]]);
    } else {
      setCategories((prevCategories) => prevCategories.filter((category: string) => category !== categoryMap[id]));
    }
    axios
        .get(`http://127.0.0.1:8000/api/recipes/best100?duration_min=${minDuration.toString()}&duration_max=${maxDuration.toString()}&category=${categories.toString()}&sort_by=${sortby.toString()}`)
        .then((response: any) => {
            console.log(response)
        })
        .catch((error: any) => {
          console.log(error)});
  };
  return (
    <>
    <Navbar/>
    <div>
      <div className="flex">
        <div className="w-3/4 p-4">
          <div className='flex p-4 mt-[5%]'>
            <div className='flex flex-wrap justify-center'>
              {data.slice(0, 6).map((el: any, i) => (
                <div className='w-full sm:w-2/3 lg:w-1/3 p-2 space-y-8' key={el.title}>
                  <Link to={`/recipedisplay/${el.id}`}>
                    <div className='w-full'>
                      <RecipeCard
                        image={el.image} 
                        title={el.title} 
                        onClick={() => handleClick(el.title)}
                        style='relative'
                      />
                    </div>
                  </Link>
                </div>
                ))}
              </div>
            </div>
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
