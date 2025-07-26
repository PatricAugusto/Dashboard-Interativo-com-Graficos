// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import GlobalStyles from './styles/GlobalStyles'; // Importa os estilos globais
import { ThemeProvider } from 'styled-components'; // Importa o ThemeProvider
import theme from './styles/theme'; // Importa o tema

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}> {/* Envolve a aplicação com ThemeProvider */}
      <GlobalStyles /> {/* Aplica os estilos globais */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);