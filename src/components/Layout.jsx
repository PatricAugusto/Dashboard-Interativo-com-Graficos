// src/components/Layout.jsx
import React from 'react';
import styled from 'styled-components';

// Layout principal do dashboard
export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Padrão: uma coluna para mobile */
  gap: ${(props) => props.theme.spacing.large}; /* Espaçamento entre os itens */
  padding: ${(props) => props.theme.spacing.large};
  max-width: 1400px; /* Limita a largura máxima do layout para não esticar demais */
  margin: 0 auto; /* Centraliza o layout */
  min-height: 100vh; /* Ocupa pelo menos a altura da tela */
  box-sizing: border-box; /* Inclui padding e borda no tamanho total */

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.spacing.medium};
    gap: ${(props) => props.theme.spacing.medium};
  }

  /* <--- NOVO: Layout para Tablets e Desktops */
  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Colunas flexíveis */
    /* Exemplo: Ajusta a área do DataHighlightCard para ocupar 2 colunas */
    > *:first-child { /* Isso assume que o DataHighlightCard é o primeiro filho direto do Layout */
        grid-column: span 1; /* Uma coluna em tablet */
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); /* Colunas maiores para tablet */
    gap: ${(props) => props.theme.spacing.xlarge};
    padding: ${(props) => props.theme.spacing.xlarge};

    /* O DataHighlightCard pode ocupar 2 colunas em desktop */
    > *:first-child {
        grid-column: span 2; /* Ocupa duas colunas para destaque */
    }
  }
`;

// Card genérico para os conteúdos do dashboard
export const Card = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: ${(props) => props.theme.spacing.large};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.medium};
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  border: 1px solid ${(props) => props.theme.colors.border}; /* Adiciona uma borda sutil */

  h2 {
    color: ${(props) => props.theme.colors.primary}; /* Títulos dos cards em destaque */
    margin-bottom: ${(props) => props.theme.spacing.medium};
    font-size: 1.5rem;

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: 1.3rem;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.spacing.medium};
  }
`;

// Componente de cabeçalho
export const Header = styled.header`
  grid-column: 1 / -1; /* Ocupa todas as colunas disponíveis */
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: ${(props) => props.theme.spacing.large};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${(props) => props.theme.boxShadow};
  margin-bottom: ${(props) => props.theme.spacing.large}; /* Espaço abaixo do header */
  border-radius: ${(props) => props.theme.borderRadius};

  h1 {
    margin: 0;
    color: ${(props) => props.theme.colors.primary};
    font-size: 2rem;

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: 1.5rem;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.medium};
    padding: ${(props) => props.theme.spacing.medium};
    margin-bottom: ${(props) => props.theme.spacing.medium};
    text-align: center;
  }
`;