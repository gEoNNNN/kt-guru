import { useEffect, useState } from "react";
import defaultImage from "../assets/change_pic.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("fast_food");
  const [duration, setDuration] = useState("");
  const [ingredientTags, setIngredientTags] = useState("");
  const [images, setImages] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
      return;
    }
  }, []);

  const handleImageUpload = () => {
    const inputElement = document.getElementById("imageUpload");
    if (inputElement) {
      inputElement.click();
    }
  };

  const handleImageChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      const gg = e.target.files[0];
      setImages(gg);
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (index: any) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const handleRemoveInstruction = (index: any) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };

  const handleSubmitRecipe = async () => {
    const formData = {
      title,
      ingredients: ingredients.join("/n"),
      instructions: instructions.join("/n"),
      category,
      duration,
      ingredient_tags: ingredientTags,
      image: images,
    };
    console.log(formData);
    try {
      const response = await axios.post(
        "https://kitchenguru.onrender.com/api/recipes/create-recipe",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/profile");
      console.log("Recipe saved:", response.data);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="file"
        multiple
        id="imageUpload"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />

      <div className="flex items-center mb-4">
        <button className="w-1/2">
          <img
            src={selectedImage || defaultImage}
            alt="Recipe"
            className="w-[150px] object-cover rounded-full hover:border-4 border-black"
            onClick={handleImageUpload}
          />
        </button>
      </div>

      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Ingredients */}
      <div className="mb-4">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder={`Ingredient ${index + 1}`}
              value={ingredient}
              onChange={(e) => {
                const newIngredients = [...ingredients];
                newIngredients[index] = e.target.value;
                setIngredients(newIngredients);
              }}
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={() => handleRemoveIngredient(index)}
              className="ml-2 text-red-500"
            >
              X
            </button>
          </div>
        ))}

        <button
          onClick={handleAddIngredient}
          className="p-2 bg-blue-500 text-white rounded"
        >
          +
        </button>
      </div>

      {/* Instructions */}
      <div className="mb-4">
        {instructions.map((instruction, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder={`Instruction ${index + 1}`}
              value={instruction}
              onChange={(e) => {
                const newInstructions = [...instructions];
                newInstructions[index] = e.target.value;
                setInstructions(newInstructions);
              }}
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={() => handleRemoveInstruction(index)}
              className="ml-2 text-red-500"
            >
              X
            </button>
          </div>
        ))}

        <button
          onClick={handleAddInstruction}
          className="p-2 bg-blue-500 text-white rounded"
        >
          +
        </button>
      </div>

      {/* Category */}
      <select
        className="w-full p-2 mb-4 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="fast_food">Fast Food</option>
        <option value="drinks">Drinks</option>
        <option value="soups">Soups</option>
        <option value="desserts">Desserts</option>
        <option value="meat">Meat</option>
        <option value="salads">Salads</option>
        <option value="seafood">Seafood</option>
      </select>

      {/* Duration */}
      <input
        type="number"
        placeholder="Duration (in minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Ingredient Tags */}
      <input
        type="text"
        placeholder="Ingredient tags (e.g., milk, sugar, salt)"
        value={ingredientTags}
        onChange={(e) => setIngredientTags(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <button
        onClick={handleSubmitRecipe}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Submit Recipe
      </button>
    </div>
  );
}

export default CreateRecipe;
