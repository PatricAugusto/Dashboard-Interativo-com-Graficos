// src/components/DataHighlightCard.jsx
import React from 'react';
import styled from 'styled-components';
import { Card } from './Layout'; // Reutiliza o estilo base do Card

// Componente estilizado para o valor principal
const Value = styled.p`
  font-size: 2.8rem; /* Tamanho grande para o destaque */
  font-weight: 700; /* Negrito para forte impacto */
  color: ${(props) => props.theme.colors.primary}; /* Cor primária do tema */
  margin-bottom: ${(props) => props.theme.spacing.small};
  text-align: center; /* Centraliza o valor */
  white-space: nowrap; /* Impede que o número quebre a linha */
  overflow: hidden; /* Oculta qualquer estouro */
  text-overflow: ellipsis; /* Adiciona reticências se o texto for muito longo */
`;

// Componente estilizado para o rótulo/descrição do valor
const Label = styled.p`
  font-size: 1rem; /* Tamanho legível */
  color: ${(props) => props.theme.colors.lightText}; /* Cor de texto secundária */
  text-align: center; /* Centraliza o rótulo */
  margin-top: ${(props) => props.theme.spacing.small};
`;

// Componente principal do DataHighlightCard
const DataHighlightCard = ({ title, value, label }) => {
  // Formata o valor com separador de milhares e remove casas decimais
  const formattedValue = value ? parseInt(value).toLocaleString('pt-BR') : 'N/A';

  return (
    <Card>
      <h2>{title}</h2>
      <Value>{formattedValue}</Value>
      {label && <Label>{label}</Label>}
    </Card>
  );
};

export default DataHighlightCard;