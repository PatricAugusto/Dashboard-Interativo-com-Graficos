// src/components/RegionalPopulationChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { useTheme } from 'styled-components'; // <--- NOVO: Para acessar o tema

const ChartContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  height: 400px; /* Garante que o gráfico de pizza tenha espaço */
`;

const RegionalPopulationChart = ({ data }) => {
  const theme = useTheme(); // <--- NOVO: Acessa o tema

  if (!data || data.length === 0) {
    return <p>Nenhum dado de região disponível para o gráfico.</p>;
  }

  // Usando as cores do tema para as fatias
  const backgroundColors = [
    theme.colors.chartColors.blue,
    theme.colors.chartColors.green,
    theme.colors.chartColors.gray,
    theme.colors.chartColors.yellow,
    theme.colors.chartColors.red,
    theme.colors.chartColors.purple, // Se tiver mais fatias que cores, ele vai repetir
  ];
  const borderColors = [
    theme.colors.primary, // Bordas mais fortes para cada cor base
    theme.colors.accent,
    theme.colors.secondary,
    'rgba(255, 193, 7, 1)',
    'rgba(220, 53, 69, 1)',
    'rgba(102, 16, 242, 1)',
  ];

  const chartData = {
    labels: data.map((item) => item.region),
    datasets: [
      {
        label: 'População',
        data: data.map((item) => item.population),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: theme.colors.lightText, // Cor do texto da legenda
          font: {
            family: theme.fontFamily, // Fonte da legenda
          },
        },
      },
      title: {
        display: true,
        text: 'População Estimada por Região (Milhões)',
        color: theme.colors.text, // Cor do título
        font: {
          size: 16,
          family: theme.fontFamily, // Fonte do título
          weight: '600',
        },
      },
      tooltip: {
        backgroundColor: theme.colors.text, // Fundo do tooltip
        titleColor: theme.colors.cardBackground, // Cor do título no tooltip
        bodyColor: theme.colors.cardBackground, // Cor do corpo no tooltip
        borderColor: theme.colors.border,
        borderWidth: 1,
        cornerRadius: theme.borderRadius, // Bordas arredondadas
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value.toLocaleString('pt-BR')} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <ChartContainer>
      <Pie data={chartData} options={chartOptions} />
    </ChartContainer>
  );
};

export default RegionalPopulationChart;