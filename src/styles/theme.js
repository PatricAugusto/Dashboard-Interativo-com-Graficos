// src/styles/theme.js
const theme = {
  colors: {
    primary: '#0056b3',
    secondary: '#6c757d',
    background: '#f1f4f8',
    cardBackground: '#ffffff',
    text: '#343a40',
    lightText: '#495057',
    border: '#dee2e6',
    accent: '#28a745',
    chartColors: {
      blue: 'rgba(0, 123, 255, 0.8)',
      green: 'rgba(40, 167, 69, 0.8)',
      gray: 'rgba(108, 117, 125, 0.8)',
      yellow: 'rgba(255, 193, 7, 0.8)',
      red: 'rgba(220, 53, 69, 0.8)',
      purple: 'rgba(102, 16, 242, 0.8)',
    },
  },
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
  // <--- NOVO: Breakpoints para responsividade
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1025px', // Acima de tablet
  },
};

export default theme;