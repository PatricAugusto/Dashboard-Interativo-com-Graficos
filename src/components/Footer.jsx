// src/components/Footer.jsx
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.colors.cardBackground}; /* Mesmo fundo dos cards para harmonia */
  color: ${(props) => props.theme.colors.lightText}; /* Cor de texto suave */
  padding: ${(props) => props.theme.spacing.medium} ${(props) => props.theme.spacing.large};
  text-align: center;
  font-size: 0.85rem; /* Fonte um pouco menor para o rodapé */
  border-top: 1px solid ${(props) => props.theme.colors.border}; /* Linha sutil no topo */
  margin-top: ${(props) => props.theme.spacing.large}; /* Espaço acima do rodapé */
  border-radius: ${(props) => props.theme.borderRadius}; /* Bordas arredondadas */
  box-shadow: ${(props) => props.theme.boxShadow}; /* Sombra suave */

  p {
    margin: 0; /* Remove margem padrão de parágrafo no rodapé */
  }

  a {
    color: ${(props) => props.theme.colors.primary}; /* Cor primária para links */
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
        &copy; {currentYear} Dashboard IBGE. Todos os direitos reservados.
      </p>
      <p>
        Desenvolvido com React, Vite e Styled Components.
      </p>
      {/* Você pode adicionar um link para o IBGE aqui, por exemplo */}
      {/* <p>Dados fornecidos por <a href="https://www.ibge.gov.br/" target="_blank" rel="noopener noreferrer">IBGE</a></p> */}
    </FooterContainer>
  );
};

export default Footer;