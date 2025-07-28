// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${(props) => props.theme.fontFamily};
    background-color: ${(props) => props.theme.colors.background}; /* <--- Usa o novo fundo suave */
    color: ${(props) => props.theme.colors.text};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    display: flex;
    min-height: 100vh;
    width: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${(props) => props.theme.colors.text};
    margin-bottom: ${(props) => props.theme.spacing.small};
    font-weight: 600;
  }

  p {
    margin-bottom: ${(props) => props.theme.spacing.small};
  }
`;

export default GlobalStyles;