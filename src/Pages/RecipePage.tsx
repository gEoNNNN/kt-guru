import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://kitchenguru.onrender.com/api/recipes/${id}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      {recipe.images && recipe.images[0] && (
        <img
          src={`https://kitchenguru.onrender.com${recipe.images[0].image}`}
          alt={recipe.title}
        />
      )}
      <div>
        <h2>Ingredients:</h2>
        <ul>
          {recipe.ingredient_tags.map((ingredient: string, index: number) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Instructions:</h2>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
}
