// src/components/DataHighlightCard.jsx
import React from 'react';
import styled from 'styled-components';
import { Card } from './Layout';

const Value = styled.p`
  font-size: 2.8rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.small};
  text-align: center; /* Já estava, mas confirmo */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 2.2rem; /* Reduz o tamanho da fonte em mobile */
  }
`;

const Label = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.lightText};
  text-align: center; /* Já estava, mas confirmo */
  margin-top: ${(props) => props.theme.spacing.small};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 0.9rem; /* Reduz o tamanho da fonte em mobile */
  }
`;

const DataHighlightCard = ({ title, value, label }) => {
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