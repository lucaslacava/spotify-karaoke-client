import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "./global";
import { useDarkMode } from "./hooks/useDarkMode";
import { Form } from "react-bootstrap";

import { Login, Dashboard, Toggle } from "./components";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const [theme, toggleTheme] = useDarkMode();
  const [search, setSearch] = useState("");

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <header
        className="d-flex container"
        style={{
          width: "100vw",
          justifyContent: "space-between",
          marginTop: 16,
          marginBottom: 16,
        }}
      >
        {code ? (
          <Form.Control
            type="search"
            style={{ width: "80%", height: 48 }}
            placeholder="Search songs and artists"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        ) : (
          <Login />
        )}
        <Toggle theme={theme} toggleTheme={toggleTheme} />
      </header>
      {code ? (
        <Dashboard
          code={code}
          theme={theme}
          search={search}
          setSearch={setSearch}
        />
      ) : (
        <div id="loginBg" style={{ marginTop: "-80px" }} />
      )}
    </ThemeProvider>
  );
}

export default App;
