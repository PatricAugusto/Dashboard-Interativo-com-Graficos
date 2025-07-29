// src/components/Loader.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'; // Ícone de spinner

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px; /* Garante que o loader tenha um espaço mínimo */
  color: ${(props) => props.theme.colors.lightText};
  font-size: 1rem;
  padding: ${(props) => props.theme.spacing.large};
  text-align: center;

  svg {
    font-size: 3rem; /* Tamanho do ícone */
    color: ${(props) => props.theme.colors.primary}; /* Cor do spinner */
    margin-bottom: ${(props) => props.theme.spacing.medium};
    animation: spin 1.5s linear infinite; /* Aplica a animação definida globalmente */
  }

  p {
    margin: 0;
    font-weight: 500;
  }
`;

const Loader = ({ message = "Carregando dados..." }) => {
  return (
    <LoaderContainer>
      <FontAwesomeIcon icon={faSpinner} />
      <p>{message}</p>
    </LoaderContainer>
  );
};

export default Loader;