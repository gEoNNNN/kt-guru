import React from 'react';
import data from '../../assets/recipes.json'
import photo from "../../assets/recipes_images/crispy-salt-and-pepper-potatoes-dan-kluger.jpg"
import Navbar from "../../Components/Navbar";
import ChildComponent from '../../Components/Recipe/Recipe';


export default function Recipe() {
  const i = 2;
  const item = data[i].fields;
  const ingredients = item.ingredients;
  const instructions = item.instructions;
  const title = item.title;
  const image = item.image_name;
  const cleanedString = ingredients.trim().replace(/'/g, '');
  const finalIngredients = cleanedString.split(',');
  

  function arangeIngredients(s: string) {
    return (
      <ul className="list-disc list-inside text-xl font-main-font">
        {s.map((ing, index) => (
          <li key={index}>{ing.replace(/'/g, ' ')}</li>
        ))}
      </ul>
    );
}



function arangeInstructions(s: string) {
  let steps = [];
  let text = "";
  let step = "Step" 

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === '.') {
      steps.push(step);
      steps.push(text);
      text = "";
    } else {
      text += char;
    }
  }
  if (text.length > 0) {
    steps.push(text);
  }
  for (let i = 0; i < steps.length; i++) {
    if(steps[i]=="Step"){
      steps[i] = steps[i] + ' ' + (i+1).toString() + ':'
    }
  }



  return (
    <div>
      {steps.map((ing, index) => (
        <div key={index} className='font-main-font'>
          <div key={index}>
            <div className='mt-[3%]'></div>
            {ing.includes("Step") ? (
              <div className='text-xl font-main-font'>{ing}</div>
            ) : (
              <div className='text-s font-main-font'>{ing}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
  
}

  return (
    <>
    <Navbar/>
<div>
  <div className="flex justify-center items-center font-main-font mt-[15%]">
    <h1 className='text-2xl w-[20%]'>{title}</h1>
    <div className="text-center ml-4">
      <img src={photo} alt="Your Photo" className="rounded-full" />
    </div>
  </div>
  <div className="flex mt-[18%]">
  <h1 className='font-main-font text-2xl absolute mt-[-7%] w-1/2 flex justify-center'>Ingredients</h1>
    <div className="w-1/2 flex justify-center">
      <h1 className='mt-[5%]'>{arangeIngredients(finalIngredients)}</h1>
    </div>
    <h1 className='font-main-font text-2xl absolute mt-[-7%] ml-[38%] w-1/2 flex justify-center'>Instructions</h1>
    <div className="w-1/2 flex justify-center">
      <h1>{arangeInstructions(instructions)}</h1>
    </div>
  </div>
</div>
</>
    );
  } 
