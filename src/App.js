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
      <div style={{ marginTop: 280 }}>
        <Toggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      {code ? (
        <Dashboard
          code={code}
          theme={theme === "light" ? lightTheme : darkTheme}
        />
      ) : (
        <Login />
      )}
      ;<footer> testando</footer>
    </ThemeProvider>
  );
}

export default App;
