import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

const ThemeContext = createContext("light");

export default function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={theme}></ThemeContext.Provider>
  );
}
