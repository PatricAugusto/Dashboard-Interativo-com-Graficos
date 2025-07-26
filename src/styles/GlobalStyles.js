// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif; 
    background-color: #f4f7f6; 
    color: #333;
    line-height: 1.6;
  }

  #root {
    display: flex;
    min-height: 100vh; 
    width: 100%;
  }
`;

export default GlobalStyles;