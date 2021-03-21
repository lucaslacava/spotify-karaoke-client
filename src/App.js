import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "./global";
import { useDarkMode } from "./hooks/useDarkMode";

import { Login, Dashboard, Toggle } from "./components";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <header className="d-flex justify-content-center align-items-center">
        <Toggle theme={theme} toggleTheme={toggleTheme} />
      </header>
      {code ? <Dashboard code={code} /> : <Login />}
    </ThemeProvider>
  );
}

export default App;
