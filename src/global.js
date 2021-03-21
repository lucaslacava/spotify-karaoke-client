import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  #root {
    height: 100vh;
  }
  html { 
    background: url('https://media.giphy.com/media/ku5EcFe4PNGWA/giphy.gif') no-repeat center center fixed; 
    background-size: cover;
  }

  body {
    align-items: center;
    background: ${({ theme }) => theme.body};
    /* background: url('http://gph.is/1qtYHrM'); */
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }`;
