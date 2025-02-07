import React, { useState, useEffect, createContext } from "react";
import themes from "./themes";
import PropTypes from "prop-types";

export const ThemeContext = createContext(themes.dark);

/* eslint-disable react/prop-types */

const ThemeContextWrapper = ({ children }) => {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme-browserMarkdownApp")) || themes.dark
  );

  useEffect(() => {
    const currentTheme = JSON.parse(
      localStorage.getItem("theme-browserMarkdownApp")
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

ThemeContextWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeContextWrapper;
