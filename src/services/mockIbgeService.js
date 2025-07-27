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
                    "2023": "216422446", // Dados mais recentes fictícios
                    "2024": "218000000"  // Futuro fictício para série
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

// Você pode adicionar outras funções aqui para outros dados fictícios, se precisar