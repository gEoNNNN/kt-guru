import { createContext, useState } from "react";

const ThemeContext = createContext("light");

export default function App() {
  const [theme] = useState("light");

  return <ThemeContext.Provider value={theme}></ThemeContext.Provider>;
}
