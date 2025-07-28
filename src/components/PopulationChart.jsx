// src/components/PopulationChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { useTheme } from 'styled-components'; // <--- NOVO: Para acessar o tema dentro do componente

const ChartContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  height: 300px; /* Define uma altura para o container do gráfico de barras */
`;

const PopulationChart = ({ data }) => {
  const theme = useTheme(); // <--- NOVO: Acessa o tema

  if (!data || data.length === 0) {
    return <p>Nenhum dado disponível para o gráfico.</p>;
  }

  const chartData = {
    labels: data.map((item) => item.year),
    datasets: [
      {
        label: 'População Estimada',
        data: data.map((item) => parseInt(item.value)),
        backgroundColor: theme.colors.chartColors.blue, // <--- Usa cor do tema
        borderColor: theme.colors.primary, // <--- Usa cor do tema
        borderWidth: 1,
        borderRadius: 4, // Bordas arredondadas para as barras
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme.colors.lightText, // Cor do texto da legenda
          font: {
            family: theme.fontFamily, // Fonte da legenda
          },
        },
      },
      title: {
        display: true,
        text: 'População Estimada do Brasil (em milhões)',
        color: theme.colors.text, // Cor do título do gráfico
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
            const value = parseInt(context.raw);
            return `População: ${(value / 1000000).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} milhões`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Ano',
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
          color: theme.colors.border, // Cor da linha de grade
          drawBorder: false, // Não desenha a borda do grid (mais limpo)
        },
      },
      y: {
        title: {
          display: true,
          text: 'População (em milhões)',
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
    },
  };

  return (
    <ChartContainer>
      <Bar data={chartData} options={chartOptions} />
    </ChartContainer>
  );
};

export default PopulationChart;