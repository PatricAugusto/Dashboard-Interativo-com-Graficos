// src/components/NoDataMessage.jsx
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faExclamationTriangle, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'styled-components'; // <--- NOVO: Importa useTheme

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.large};
  text-align: center;
  min-height: 150px;
  color: ${(props) => props.theme.colors.lightText};
  font-size: 1rem;

  svg {
    font-size: 2.5rem;
    margin-bottom: ${(props) => props.theme.spacing.medium};
    /* A cor do ícone será definida inline com base no tipo */
  }

  p {
    margin: 0;
    font-weight: 500;
  }
`;

const NoDataMessage = ({ type = 'info', message }) => {
  const theme = useTheme(); // <--- NOVO: Chama o hook useTheme para acessar o tema

  let icon;
  let iconColorKey; // Renomeado para 'iconColorKey' para evitar confusão com a cor final

  switch (type) {
    case 'error':
      icon = faExclamationTriangle;
      iconColorKey = 'red'; // Usaremos diretamente a string 'red' ou uma chave do tema.
      break;
    case 'empty':
      icon = faChartBar;
      iconColorKey = 'lightText'; // Chave do tema
      break;
    case 'info':
    default:
      icon = faInfoCircle;
      iconColorKey = 'secondary'; // Chave do tema
      break;
  }

  // Determina a cor final do ícone
  // Se iconColorKey for uma chave de theme.colors, usa-a. Caso contrário, usa iconColorKey diretamente (ex: 'red')
  const finalIconColor = theme.colors[iconColorKey] || iconColorKey;

  return (
    <MessageContainer>
      <FontAwesomeIcon icon={icon} style={{ color: finalIconColor }} /> {/* <--- APLICANDO A COR CORRETAMENTE */}
      <p>{message}</p>
    </MessageContainer>
  );
};

export default NoDataMessage;