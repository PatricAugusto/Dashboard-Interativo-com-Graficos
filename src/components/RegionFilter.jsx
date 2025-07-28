// src/components/RegionFilter.jsx
import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que os itens quebrem para a próxima linha */
  gap: ${(props) => props.theme.spacing.small};
  margin-bottom: ${(props) => props.theme.spacing.medium};
  justify-content: center; /* Centraliza os filtros */
  padding: 0 ${(props) => props.theme.spacing.small}; /* Pequeno padding para as bordas */

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    gap: ${(props) => props.theme.spacing.xsmall};
    margin-bottom: ${(props) => props.theme.spacing.small};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xsmall};
  font-size: 0.9rem;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  padding: ${(props) => props.theme.spacing.xsmall} ${(props) => props.theme.spacing.small};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius};
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.background}; /* Fundo suave no hover */
  }

  input[type="checkbox"] {
    /* Esconde o checkbox padrão e estiliza o próprio */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 16px;
    height: 16px;
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    outline: none;
    background-color: ${(props) => props.theme.colors.cardBackground};

    &:checked {
      background-color: ${(props) => props.theme.colors.primary};
      border-color: ${(props) => props.theme.colors.primary};
    }

    &:checked::before {
      content: '✔'; /* Símbolo de check */
      font-size: 10px;
      color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:focus {
      box-shadow: 0 0 0 2px rgba(0, 86, 179, 0.2);
    }
  }
`;

const RegionFilter = ({ allRegions, selectedRegions, onRegionChange }) => {
  const handleCheckboxChange = (region) => {
    // Se a região já estiver selecionada, remove-a. Caso contrário, adiciona-a.
    const newSelectedRegions = selectedRegions.includes(region)
      ? selectedRegions.filter((r) => r !== region)
      : [...selectedRegions, region];
    onRegionChange(newSelectedRegions);
  };

  return (
    <FilterContainer>
      {allRegions.map((region) => (
        <CheckboxLabel key={region}>
          <input
            type="checkbox"
            value={region}
            checked={selectedRegions.includes(region)}
            onChange={() => handleCheckboxChange(region)}
          />
          {region}
        </CheckboxLabel>
      ))}
    </FilterContainer>
  );
};

export default RegionFilter;