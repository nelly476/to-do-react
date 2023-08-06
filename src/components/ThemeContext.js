import React from "react";

export const themes = {
  light: {
    foreground: "black",
    background: "white",
  },
  dark: {
    foreground: "white",
    background: "black",
  },
};

export const ThemeContext = React.createContext(
  themes.dark // default value
);
