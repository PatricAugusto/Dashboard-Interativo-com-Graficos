// src/components/DataHighlightCard.jsx
import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: ${(props) => props.theme.spacing.large};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza o conteúdo */
  justify-content: center;
  text-align: center;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  border: 1px solid ${(props) => props.theme.colors.border};

  h3 {
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: ${(props) => props.theme.spacing.small};
    font-size: 1.2rem;
    font-weight: 600;

    @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: 1.5rem; /* Título maior em desktop */
    }
  }

  .value {
    font-size: 3rem; /* Tamanho maior para o valor */
    font-weight: 700;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: ${(props) => props.theme.spacing.xsmall};
    line-height: 1.1; /* Ajusta o espaçamento da linha */
    word-break: break-all; /* Quebra palavras longas se necessário */

    @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: 4.5rem; /* Valor ainda maior em desktop */
    }
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: 2.5rem;
    }
  }

  .label {
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.lightText};

    @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: 1.1rem;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.spacing.medium};
  }
`;

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
  
  return (
    <CardContainer>
      <h3>{title}</h3>
      <span className="value">{typeof value === 'number' ? value.toLocaleString('pt-BR') : value}</span>
      <span className="label">{label}</span>
    </CardContainer>
  );
};

export default DataHighlightCard;