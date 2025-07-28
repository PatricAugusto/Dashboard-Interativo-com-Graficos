// src/components/Layout.jsx
import React from 'react';
import styled from 'styled-components';
import Footer from './Footer';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  padding: ${(props) => props.theme.spacing.large}; /* Padding padrão para desktop */
  gap: ${(props) => props.theme.spacing.large};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.spacing.medium}; /* Menos padding em mobile */
    gap: ${(props) => props.theme.spacing.medium};
  }
`;

const Header = styled.header`
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: ${(props) => props.theme.spacing.large} ${(props) => props.theme.spacing.xlarge};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 70px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  margin-bottom: 0; /* Remover margin-bottom aqui para usar o gap do DashboardContainer */

  h1 {
    font-size: 1.8rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.primary};
    margin: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.spacing.medium}; /* Padding menor em mobile */
    h1 {
      font-size: 1.5rem; /* Tamanho da fonte menor em mobile */
    }
  }
`;

const ContentArea = styled.main`
  flex: 1; /* Permite que o conteúdo ocupe o espaço restante */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Colunas flexíveis */
  gap: ${(props) => props.theme.spacing.large}; /* Espaçamento entre os cards */
  align-items: start; /* Alinha os itens ao topo em cada coluna */

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr; /* Uma coluna em tablets e mobile */
  }

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) and (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr); /* Duas colunas em telas médias (tablets maiores/laptops pequenos) */
  }
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: ${(props) => props.theme.spacing.large};
  border-radius: ${(props) => props.theme.borderRadius};
  box-shadow: ${(props) => props.theme.boxShadow};
  border: 1px solid ${(props) => props.theme.colors.border};
  transition: all 0.2s ease-in-out;
  display: flex; /* Adiciona display flex para centralizar conteúdo verticalmente se necessário */
  flex-direction: column;
  justify-content: center; /* Centraliza verticalmente o conteúdo dos cards */

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  h2 {
    font-size: 1.3rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: ${(props) => props.theme.spacing.medium};
    text-align: center; /* Centraliza títulos dos cards */
  }

  p {
    font-size: 0.95rem;
    color: ${(props) => props.theme.colors.lightText};
  }

  /* Responsividade para o conteúdo do card (se necessário, ex: texto menor) */
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.spacing.medium};
    h2 {
      font-size: 1.1rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;

const Layout = ({ children }) => {
  return (
    <DashboardContainer>
      <Header>
        <h1>Dashboard IBGE</h1>
      </Header>
      <ContentArea>{children}</ContentArea>
      <Footer />
    </DashboardContainer>
  );
};

export { Layout, Header, ContentArea, Card };