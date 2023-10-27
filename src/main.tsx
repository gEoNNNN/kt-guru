import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./Pages/home.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.tsx";
import RegisterPage from "./Pages/RegisterPage.tsx";
import ForgotPasswordPage from "./Pages/ForgotPassword.tsx";
import ForgotPasswordCodePage from "./Pages/ForgotPasswordCode.tsx";
import NewPassword from "./Pages/NewPassword.tsx";
import MainPage from "./Pages/Main.tsx";
import AboutUs from "./Pages/AboutUs.tsx";
import RecipePage from "./Pages/RecipePage.tsx";
import RecipeDisplayPage from "./Pages/RecipeDisplay.tsx";
import TopPage from "./Pages/Top.tsx";
import AIRecipePage from "./Pages/AIRecipePage.tsx";
import Profile from "./Pages/Profile.tsx";
import RecipeTest from "./Pages/Recipe.tsx";
import CreateRecipe from "./Pages/CreateRecipe.tsx";
import Token from "./Components/RefreshToken/token.tsx";

const queryClient = new QueryClient();
function App() {
  const storedToken = localStorage.getItem("access_token");
  const [isTokenValid, setIsTokenValid] = useState(false);
  
  useEffect(() => {
      if (storedToken && storedToken.length > 1) {
          setIsTokenValid(true);
      }
  }, [storedToken]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/forgotpassword",
      element: <ForgotPasswordPage />,
    },
    {
      path: "/forgotpasswordcode",
      element: <ForgotPasswordCodePage />,
    },
    {
      path: "/main",
      element: <MainPage />,
    },
    {
      path: "/recipe",
      element: <RecipePage />,
    },
    {
      path: "/recipedisplay/:id",
      element: <RecipeDisplayPage />,
    },
    {
      path: "/top",
      element: <TopPage />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/aboutus",
      element: <AboutUs />,
    },
    {
      path: "/airecipe",
      element: <AIRecipePage />,
    },
    {
      path: "/recipetest",
      element: <RecipeTest />,
    },
    {
      path: "/newpassword/:encodedata",
      element: <NewPassword />,
    },
    {
      path: "/create-recipe",
      element: <CreateRecipe />,
    },
    {
      path: "/create-recipe",
      element: <CreateRecipe />,
    },
  ]);
return (
  <React.StrictMode>
    <RouterProvider router={router} />
     <QueryClientProvider client={queryClient}></QueryClientProvider>
      {isTokenValid && <Token/>}
    </React.StrictMode>
);
}
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);