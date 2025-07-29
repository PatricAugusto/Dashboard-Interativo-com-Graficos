// src/styles/theme.js

// Cores base para o modo claro
const lightColors = {
  primary: '#0056b3', // Um azul corporativo mais escuro e sóbrio
  secondary: '#6c757d', // Cinza secundário
  background: '#f1f4f8', // Fundo cinza muito claro e suave
  cardBackground: '#ffffff', // Fundo de card branco puro
  text: '#343a40', // Cor de texto principal (quase preto)
  lightText: '#495057', // Cor de texto secundária
  border: '#dee2e6', // Cor de borda suave para elementos sutis
  accent: '#28a745', // Verde para talvez um indicador positivo
  chartColors: {
    blue: 'rgba(0, 123, 255, 0.8)',
    green: 'rgba(40, 167, 69, 0.8)',
    gray: 'rgba(108, 117, 125, 0.8)',
    yellow: 'rgba(255, 193, 7, 0.8)',
    red: 'rgba(220, 53, 69, 0.8)',
    purple: 'rgba(102, 16, 242, 0.8)',
  },
};

// Cores base para o modo escuro
const darkColors = {
  primary: '#8ab4f8', // Azul mais claro para destacar no fundo escuro
  secondary: '#9aa0a6', // Cinza mais claro
  background: '#202124', // Fundo escuro
  cardBackground: '#2d2e30', // Fundo de card um pouco mais claro que o fundo
  text: '#e8eaed', // Texto claro
  lightText: '#bdc1c6', // Texto secundário claro
  border: '#5f6368', // Borda mais escura
  accent: '#6ddb88', // Verde claro para contraste
  chartColors: {
    blue: 'rgba(138, 180, 248, 0.8)', // Tons mais claros das cores para o modo escuro
    green: 'rgba(109, 219, 136, 0.8)',
    gray: 'rgba(154, 160, 166, 0.8)',
    yellow: 'rgba(255, 224, 102, 0.8)',
    red: 'rgba(255, 130, 130, 0.8)',
    purple: 'rgba(174, 142, 255, 0.8)',
  },
};

// Objeto base do tema (espaçamento, fontes, etc., que não mudam entre os modos)
const baseTheme = {
  spacing: {
    xsmall: '4px',
    small: '8px',
    medium: '16px',
    large: '24px',
    xlarge: '32px',
  },
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
  fontFamily: "'Inter', sans-serif",
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1025px',
  },
};

// Função para obter o tema completo com base no modo
export const getTheme = (mode) => ({
  ...baseTheme,
  colors: mode === 'dark' ? darkColors : lightColors,
});