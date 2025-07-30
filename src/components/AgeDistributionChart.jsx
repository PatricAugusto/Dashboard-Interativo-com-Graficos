// src/components/AgeDistributionChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2'; // O mesmo componente Bar
import styled from 'styled-components';
import { useTheme } from 'styled-components';

const ChartContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  height: 350px; /* Altura para o gráfico */
  position: relative;
`;

const AgeDistributionChart = ({ data }) => {
  const theme = useTheme();

  if (!data || data.length === 0) {
    return <p>Nenhum dado de distribuição etária disponível.</p>;
  }

  const chartData = {
    labels: data.map((item) => item.range), // Faixas etárias
    datasets: [
      {
        label: 'População',
        data: data.map((item) => item.population), // Valores de população
        backgroundColor: theme.colors.chartColors.purple, // Cor diferente para este gráfico
        borderColor: theme.colors.primary,
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y', // <--- ESSENCIAL: Isso transforma o gráfico em horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Geralmente não é necessário legenda para um único dataset
      },
      title: {
        display: true,
        text: 'População por Faixa Etária',
        color: theme.colors.text,
        font: {
          size: 16,
          family: theme.fontFamily,
          weight: '600',
        },
      },
      tooltip: {
        backgroundColor: theme.colors.text,
        titleColor: theme.colors.cardBackground,
        bodyColor: theme.colors.cardBackground,
        borderColor: theme.colors.border,
        borderWidth: 1,
        cornerRadius: theme.borderRadius,
        callbacks: {
          label: function (context) {
            const value = parseInt(context.raw);
            return `População: ${value.toLocaleString('pt-BR')}`;
          },
        },
      },
    },
    scales: {
      x: { // Eixo X para valores (população)
        title: {
          display: true,
          text: 'População',
          color: theme.colors.lightText,
          font: {
            family: theme.fontFamily,
          },
        },
        ticks: {
          color: theme.colors.lightText,
          callback: function (value) {
            return `${(value / 1000000).toLocaleString('pt-BR')}M`;
          },
          font: {
            family: theme.fontFamily,
          },
        },
        grid: {
          color: theme.colors.border,
          drawBorder: false,
        },
      },
      y: { // Eixo Y para categorias (faixas etárias)
        title: {
          display: true,
          text: 'Faixa Etária',
          color: theme.colors.lightText,
          font: {
            family: theme.fontFamily,
          },
        },
        ticks: {
          color: theme.colors.lightText,
          font: {
            family: theme.fontFamily,
          },
        },
        grid: {
          color: theme.colors.border,
          drawBorder: false,
        },
      },
    },
  };

  return (
    <ChartContainer>
      <Bar data={chartData} options={chartOptions} />
    </ChartContainer>
  );
};

export default AgeDistributionChart;