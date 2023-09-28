import React from 'react';

interface ACarD {
  title?: string;
  image?: string;
  style?: string;
  onClick?:()=>void;
  id?:number;
}

export default function RecipeCard({ title, image, style, onClick, id }: ACarD) {
  return (
    <div className="flex flex-col items-center w-full sm:w-64" onClick={onClick}>
      <img src={image ? "http://dummyimage.com/240" : "http://dummyimage.com/240"} alt="recipe" className={`${style} w-full`} />
      <h1 className='w-full text-center mt-4 break-words'>{title}</h1>
    </div>
  );
}
