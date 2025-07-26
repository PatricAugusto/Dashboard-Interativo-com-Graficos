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

// Componente para o cabeçalho
const Header = styled.header`
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: ${(props) => props.theme.spacing.medium} ${(props) => props.theme.spacing.large};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px; /* Altura mínima para o cabeçalho */
`;

// Componente para a área de conteúdo principal onde os gráficos e cards ficarão
const ContentArea = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Layout responsivo de grid */
  gap: ${(props) => props.theme.spacing.large}; /* Espaço entre os itens do grid */
  flex-grow: 1; /* Permite que a área de conteúdo ocupe o espaço restante */
`;

// Componente para um card genérico (usaremos para agrupar gráficos/dados)
const Card = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: ${(props) => props.theme.spacing.large};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
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