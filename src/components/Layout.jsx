// src/components/Layout.jsx
import React from 'react';
import styled from 'styled-components';

// Componente para o layout principal do dashboard
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column; /* Organiza os itens em coluna: cabeçalho e conteúdo */
  flex: 1; /* Ocupa o espaço disponível do #root */
  padding: ${(props) => props.theme.spacing.large}; /* Espaçamento interno geral */
  gap: ${(props) => props.theme.spacing.large}; /* Espaço entre cabeçalho e conteúdo */
  background-color: ${(props) => props.theme.colors.background};
`;

const Header = styled.header`
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: ${(props) => props.theme.spacing.large} ${(props) => props.theme.spacing.xlarge}; /* Mais padding */
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 70px; /* Altura mínima ligeiramente maior */
  border-bottom: 1px solid ${(props) => props.theme.colors.border}; /* Linha sutil na parte inferior */
  margin-bottom: ${(props) => props.theme.spacing.large}; /* Espaço abaixo do cabeçalho */

  h1 {
    font-size: 1.8rem; /* Tamanho maior para o título do dashboard */
    font-weight: 700; /* Mais destaque para o título */
    color: ${(props) => props.theme.colors.primary}; /* Cor primária para o título */
    margin: 0; /* Remover margem padrão do h1 */
  }
`;

// Componente para a área de conteúdo principal onde os gráficos e cards ficarão
const ContentArea = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Layout responsivo de grid */
  gap: ${(props) => props.theme.spacing.large}; /* Espaço entre os itens do grid */
  flex-grow: 1; /* Permite que a área de conteúdo ocupe o espaço restante */
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: ${(props) => props.theme.spacing.large};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  border: 1px solid ${(props) => props.theme.colors.border}; /* Borda sutil */
  transition: all 0.2s ease-in-out; /* Transição suave para interatividade */

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Sombra mais evidente no hover */
    transform: translateY(-2px); /* Efeito de elevação sutil */
  }

  h2 {
    font-size: 1.3rem; /* Tamanho padrão para títulos de card */
    font-weight: 600;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: ${(props) => props.theme.spacing.medium}; /* Mais espaço abaixo do título do card */
  }

  p {
    font-size: 0.95rem; /* Texto um pouco menor */
    color: ${(props) => props.theme.colors.lightText};
  }
`;

// Componente principal do layout para ser exportado e usado em App.jsx
const Layout = ({ children }) => {
  return (
    <DashboardContainer>
      <Header>
        <h1>Dashboard IBGE</h1>
        {/* Aqui poderíamos ter botões, menus, etc. */}
      </Header>
      <ContentArea>{children}</ContentArea>
    </DashboardContainer>
  );
};

export { Layout, Header, ContentArea, Card };