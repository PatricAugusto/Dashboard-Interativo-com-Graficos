// src/components/Footer.jsx
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  grid-column: 1 / -1; /* Garante que o footer ocupe toda a largura da grade */
  background-color: ${(props) => props.theme.colors.cardBackground};
  color: ${(props) => props.theme.colors.lightText};
  padding: ${(props) => props.theme.spacing.large};
  text-align: center;
  font-size: 0.9rem;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  margin-top: ${(props) => props.theme.spacing.xlarge}; /* Espaçamento acima do footer */
  border-radius: ${(props) => props.theme.borderRadius}; /* Mantém o estilo arredondado */
  box-shadow: ${(props) => props.theme.boxShadow}; /* Mantém a sombra */

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.spacing.medium};
    margin-top: ${(props) => props.theme.spacing.large};
  }

  p {
    margin: 0;
    line-height: 1.5;
  }

  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <FooterContainer>
      <p>
        &copy; {currentYear} Dashboard de Dados Demográficos. Todos os direitos reservados.
      </p>
      <p>
        Desenvolvido com React. Dados fictícios baseados em informações do IBGE.
      </p>
    </FooterContainer>
  );
};

export default Footer;