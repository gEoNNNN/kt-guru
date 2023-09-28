import React from 'react';
import data from '../../assets/recipes.json';
import Navbar from "../../Components/Navbar";
import RecipeCart from '../RecipeCard/RecipeCard';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

export default function Recipe() {
  const handleClick = (title) => {
    setSelectedTitle(title);
    console.log(selectedTitle);
  };
  const navigate = useNavigate();
  const handleDiplay = () => {
    navigate('/recipedisplay');
  };

  return (
    <div className='flex items-center justify-center mt-12 sm:mt-20'>
      <div className='flex flex-wrap justify-center'>
        {data.slice(0, 6).map((el: any) => (
          <div className='w-full sm:w-1/3 p-2 space-y-8' key={el.fields.title}>
            <Button onClick={handleDiplay}>
            <RecipeCart 
              image={el.fields.image} 
              title={el.fields.title} 
              onClick={() => handleClick(el.fields.title)}
            />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
