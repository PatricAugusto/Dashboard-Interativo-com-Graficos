// src/components/YearSelector.jsx
import React from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.small};
  margin-bottom: ${(props) => props.theme.spacing.medium};
  width: 100%; /* Ocupa a largura total do seu container */
  justify-content: flex-end; /* Alinha o seletor à direita */

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    justify-content: center; /* Centraliza em telas pequenas */
    margin-bottom: ${(props) => props.theme.spacing.small};
  }
`;

const Label = styled.label`
  font-size: 0.95rem;
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;
`;

const StyledSelect = styled.select`
  padding: ${(props) => props.theme.spacing.xsmall} ${(props) => props.theme.spacing.small};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.colors.cardBackground};
  color: ${(props) => props.theme.colors.text};
  font-size: 0.95rem;
  cursor: pointer;
  outline: none; /* Remove a borda de foco padrão */
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 86, 179, 0.2); /* Sombra suave no foco */
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const YearSelector = ({ years, selectedYear, onYearChange }) => {
  return (
    <SelectContainer>
      <Label htmlFor="year-select">Ano:</Label>
      <StyledSelect id="year-select" value={selectedYear} onChange={(e) => onYearChange(e.target.value)}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </StyledSelect>
    </SelectContainer>
  );
};

export default YearSelector;