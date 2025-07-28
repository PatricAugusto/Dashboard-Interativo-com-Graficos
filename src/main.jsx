// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import GlobalStyles from './styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

// Importações e registro do Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // <--- NOVO: Para gráficos de pizza/doughnut
} from 'chart.js';

// Registra os componentes necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // <--- NOVO: Para gráficos de pizza/doughnut
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);