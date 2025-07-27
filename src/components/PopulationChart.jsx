// src/components/PopulationChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

// Estilo para o contêiner do gráfico, se necessário
const ChartContainer = styled.div`
  width: 100%;
  max-width: 600px; /* Limite a largura para melhor visualização em telas maiores */
  margin: 0 auto; /* Centraliza o gráfico */
`;

const PopulationChart = ({ data }) => {
  // Verifica se os dados estão vazios ou não no formato esperado
  if (!data || data.length === 0) {
    return <p>Nenhum dado disponível para o gráfico.</p>;
  }

  // Prepara os dados no formato que o Chart.js espera
  // Assumindo que 'data' é um array com um objeto { year, value }
  const chartData = {
    labels: data.map((item) => item.year), // Eixo X: Anos
    datasets: [
      {
        label: 'População Estimada',
        data: data.map((item) => parseInt(item.value)), // Eixo Y: Valores da população
        backgroundColor: 'rgba(0, 123, 255, 0.7)', // Cor das barras (azul primário do nosso tema)
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Opções para o gráfico
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Permite que o gráfico se ajuste ao tamanho do contêiner
    plugins: {
      legend: {
        position: 'top', // Posição da legenda
        labels: {
          color: '#333', // Cor do texto da legenda
        },
      },
      title: {
        display: true,
        text: 'População Estimada do Brasil (em milhões)', // Título do gráfico
        color: '#333', // Cor do título
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            // Formata o valor no tooltip para milhões e com separador de milhares
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
          color: '#333',
        },
        ticks: {
          color: '#333',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)', // Linhas de grade suaves
        },
      },
      y: {
        title: {
          display: true,
          text: 'População (em milhões)',
          color: '#333',
        },
        ticks: {
          color: '#333',
          callback: function (value) {
            // Formata os ticks do eixo Y para milhões
            return `${(value / 1000000).toLocaleString('pt-BR')}M`;
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
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