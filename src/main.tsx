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

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "Home",
    element: <HomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
