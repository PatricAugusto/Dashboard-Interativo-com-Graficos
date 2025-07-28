// src/services/mockIbgeService.js

/**
 * Simula a busca de dados de população estimada do IBGE.
 * Retorna dados fictícios para fins de desenvolvimento.
 *
 * @returns {Promise<Array>} Uma promessa que resolve para um array de dados de população fictícios.
 */
export const fetchMockBrazilPopulation = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = [
        {
          id: "6579",
          nome: "População residente estimada",
          resultados: [
            {
              series: [
                {
                  localidade: { id: "1", nome: "Brasil" },
                  serie: {
                    "2019": "210147125",
                    "2020": "211755692",
                    "2021": "213317639",
                    "2022": "214878477",
                    "2023": "216422446",
                    "2024": "218000000"
                  }
                }
              ]
            }
          ]
        }
      ];
      resolve(mockData);
    }, 500); // Simula um pequeno atraso na rede de 500ms
  });
};

/**
 * Simula a busca de dados de população por região.
 * Retorna dados fictícios para fins de desenvolvimento.
 *
 * @returns {Promise<Array>} Uma promessa que resolve para um array de dados de distribuição regional.
 */
export const fetchMockRegionalPopulation = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const regionalData = [
        { region: 'Sudeste', population: 89000000 },
        { region: 'Nordeste', population: 58000000 },
        { region: 'Sul', population: 30000000 },
        { region: 'Norte', population: 18000000 },
        { region: 'Centro-Oeste', population: 16000000 },
      ];
      resolve(regionalData);
    }, 600); // Um atraso um pouco diferente
  });
};

/**
 * Simula a busca de dados de população por faixa etária.
 * Retorna dados fictícios para fins de desenvolvimento.
 *
 * @returns {Promise<Array>} Uma promessa que resolve para um array de dados de distribuição etária.
 */
export const fetchMockAgeDistribution = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const ageData = [
        { range: '0-14 anos', population: 40000000 },
        { range: '15-24 anos', population: 35000000 },
        { range: '25-44 anos', population: 70000000 },
        { range: '45-64 anos', population: 50000000 },
        { range: '65+ anos', population: 23000000 },
      ];
      resolve(ageData);
    }, 700); // Um atraso um pouco diferente
  });
};