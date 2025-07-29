// src/styles/GlobalStyles.js
import { createGlobalStyle, keyframes } from 'styled-components'; // <--- Importa keyframes

// Define a animação de rotação para o spinner
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  body {
    margin: 0;
    font-family: ${(props) => props.theme.fontFamily};
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${(props) => props.theme.colors.text};
    margin-top: 0;
    margin-bottom: ${(props) => props.theme.spacing.medium};
    font-weight: 600;
  }

  p {
    color: ${(props) => props.theme.colors.lightText};
  }

  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  // Adiciona a animação globalmente para o spinner
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export default GlobalStyles;