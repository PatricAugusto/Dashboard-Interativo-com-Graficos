// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Importações e registro do Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarController,
} from 'chart.js';

// Registra os componentes necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarController,
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Remove ThemeProvider e GlobalStyles daqui */}
    <App />
  </React.StrictMode>,
);