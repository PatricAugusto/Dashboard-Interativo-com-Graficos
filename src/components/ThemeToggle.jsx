// src/components/ThemeToggle.jsx
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'; // Ícones de sol e lua

const ToggleButton = styled.button`
  background-color: ${(props) => props.theme.colors.cardBackground};
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius};
  padding: ${(props) => props.theme.spacing.small} ${(props) => props.theme.spacing.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xsmall};
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  outline: none;

  &:hover {
    background-color: ${(props) => props.theme.colors.background};
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    font-size: 1.1rem;
    color: ${(props) => props.theme.colors.primary}; /* Ícone na cor primária */
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.spacing.xsmall};
    font-size: 0.8rem;
    span {
      display: none; /* Esconde o texto em mobile, mostra apenas o ícone */
    }
  }
`;

const ThemeToggle = ({ toggleTheme, currentMode }) => {
  return (
    <ToggleButton onClick={toggleTheme}>
      <FontAwesomeIcon icon={currentMode === 'light' ? faMoon : faSun} />
      <span>{currentMode === 'light' ? 'Modo Escuro' : 'Modo Claro'}</span>
    </ToggleButton>
  );
};

export default ThemeToggle;