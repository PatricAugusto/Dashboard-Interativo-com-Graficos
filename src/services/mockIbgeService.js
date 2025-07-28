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
                    "2023": "216422446", // Este será o ano inicial selecionado
                    "2024": "218000000"
                  }
                }
              ]
            }
          ]
        }
      ];
      resolve(mockData);
    }, 500);
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