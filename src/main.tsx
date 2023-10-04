import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import HomePage from "./Pages/home.tsx";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './Pages/LoginPage.tsx';
import RegisterPage from './Pages/RegisterPage.tsx';
import ForgotPasswordPage from './Pages/ForgotPassword.tsx';
import ForgotPasswordCodePage from './Pages/ForgotPasswordCode.tsx';
import NewPassword from './Pages/NewPassword.tsx';
import MainPage from './Pages/Main.tsx';
import ProfilePage from './Pages/ProfilePage.tsx';



const queryClient = new QueryClient()
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
    path: "/newpassword",
    element: <NewPassword />,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },


]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <QueryClientProvider client={queryClient}>
    </QueryClientProvider>
  </React.StrictMode>,
)