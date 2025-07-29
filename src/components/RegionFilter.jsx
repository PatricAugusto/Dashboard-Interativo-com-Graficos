// src/components/RegionFilter.jsx
import React from 'react';
import styled from 'styled-components';
import { useTheme } from 'styled-components'; // Adiciona useTheme para cores dos botões

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.small};
  margin-bottom: ${(props) => props.theme.spacing.medium};
  justify-content: center;
  padding: 0 ${(props) => props.theme.spacing.small};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    gap: ${(props) => props.theme.spacing.xsmall};
    margin-bottom: ${(props) => props.theme.spacing.small};
    padding: 0;
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
    background-color: ${(props) => props.theme.colors.background};
  }

  input[type="checkbox"] {
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
      content: '✔';
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

const ControlButtonsContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.small};
  margin-top: ${(props) => props.theme.spacing.small};
  width: 100%;
  justify-content: center;
  border-top: 1px solid ${(props) => props.theme.colors.border};
  padding-top: ${(props) => props.theme.spacing.small};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    margin-top: ${(props) => props.theme.spacing.xsmall};
    padding-top: ${(props) => props.theme.spacing.xsmall};
    gap: ${(props) => props.theme.spacing.xsmall};
  }
`;

const ControlButton = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.cardBackground};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius};
  padding: ${(props) => props.theme.spacing.xsmall} ${(props) => props.theme.spacing.medium};
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
  outline: none;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.border};
    cursor: not-allowed;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 80%; /* Ocupa mais largura em mobile */
    padding: ${(props) => props.theme.spacing.small};
    font-size: 0.9rem;
  }
`;

const RegionFilter = ({ allRegions, selectedRegions, onRegionChange }) => {
  const theme = useTheme(); // Para usar as cores do tema nos botões

  const handleCheckboxChange = (region) => {
    const newSelectedRegions = selectedRegions.includes(region)
      ? selectedRegions.filter((r) => r !== region)
      : [...selectedRegions, region];
    onRegionChange(newSelectedRegions);
  };

  const handleSelectAll = () => {
    onRegionChange(allRegions); // Define todas as regiões como selecionadas
  };

  const handleSelectNone = () => {
    onRegionChange([]); // Define nenhuma região como selecionada
  };

  const allSelected = selectedRegions.length === allRegions.length;
  const noneSelected = selectedRegions.length === 0;

  return (
    <div>
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
      <ControlButtonsContainer>
        <ControlButton onClick={handleSelectAll} disabled={allSelected}>
          Selecionar Todos
        </ControlButton>
        <ControlButton onClick={handleSelectNone} disabled={noneSelected}>
          Nenhum
        </ControlButton>
      </ControlButtonsContainer>
    </div>
  );
};

export default RegionFilter;