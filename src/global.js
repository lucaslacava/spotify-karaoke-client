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
  /* html { 
    background: url('https://media.giphy.com/media/ku5EcFe4PNGWA/giphy.gif') no-repeat center center fixed; 
    background-size: cover;
  } */

  body {
    align-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: 'Space Grotesk', sans-serif;
    transition: all 0.25s linear;
  }
  
  #loginBg{
    width: 100vw;
    height: 100%;
    margin-top:-80px;
    align-items: center;
    background: url('${({ theme }) => theme.gifUrl}') no-repeat fixed;
    background-size: cover;
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: 'Space Grotesk', sans-serif;
    transition: all 0.25s linear;
  }`;
