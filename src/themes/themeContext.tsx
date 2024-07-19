import React, { useState, useEffect, createContext, ReactNode } from "react";
import themes, { Theme } from "./themes"; // Assuming themes is a TypeScript module exporting a Theme type

// Define the context type
interface ThemeContextType {
  theme: Theme;
  handleThemeChange: () => void;
}

// Create the context with default value
export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.dark,
  handleThemeChange: () => {},
});

// Define props type for the wrapper component
interface ThemeContextWrapperProps {
  children: ReactNode;
}

const ThemeContextWrapper: React.FC<ThemeContextWrapperProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    JSON.parse(localStorage.getItem("theme-browserMarkdownApp") || 'null') || themes.dark
  );

  useEffect(() => {
    const currentTheme = JSON.parse(
      localStorage.getItem("theme-browserMarkdownApp") || 'null'
    );
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme-browserMarkdownApp", JSON.stringify(theme));
  }, [theme]);

  const handleThemeChange = () => {
    setTheme((prevTheme) =>
      prevTheme.name === themes.light.name ? themes.dark : themes.light
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextWrapper;
