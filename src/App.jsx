// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Layout, Card } from './components/Layout';
import PopulationChart from './components/PopulationChart';
// MUDANÇA AQUI: Importa o serviço de dados fictícios
import { fetchMockBrazilPopulation } from './services/mockIbgeService';

function App() {
  const [populationData, setPopulationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPopulationData = async () => {
      try {
        setLoading(true);
        setError(null);

        // MUDANÇA AQUI: Chama a função que busca dados fictícios
        const data = await fetchMockBrazilPopulation();
        console.log("Dados fictícios brutos:", data); // Para inspeção

        // A lógica de processamento permanece a mesma, pois a estrutura dos mockData é similar
        if (data && data.length > 0 && data[0].resultados && data[0].resultados.length > 0) {
          const series = data[0].resultados[0].series;
          console.log("Séries fictícias encontradas:", series);

          const brazilDataRaw = series.find(item => item.localidade.id === '1'); // '1' é o ID para Brasil
          console.log("Dados fictícios do Brasil encontrados:", brazilDataRaw);

          if (brazilDataRaw && brazilDataRaw.serie) {
            const formattedData = Object.entries(brazilDataRaw.serie).map(([year, value]) => ({
              year: parseInt(year), // Garante que o ano é um número
              value: parseInt(value) // Garante que o valor é um número
            }));
            // Os dados fictícios já vêm com vários anos, então setamos diretamente
            setPopulationData(formattedData);
          } else {
            setError("Dados da população do Brasil fictícios não encontrados ou incompletos.");
          }
        } else {
          setError("Estrutura de dados fictícios inesperada ou vazia (resposta principal).");
        }
      } catch (err) {
        setError("Falha ao buscar dados fictícios da população: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getPopulationData();
  }, []);

  return (
    <Layout>
      {/* Card de População Numérica */}
      <Card>
        <h2>População Estimada do Brasil</h2>
        {loading && <p>Carregando dados...</p>}
        {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
        {!loading && !error && populationData.length > 0 && (
          <div>
            {/* Exibe o dado mais recente dos dados fictícios */}
            <p>Ano: **{populationData[populationData.length - 1].year}**</p>
            <p>Valor: **{populationData[populationData.length - 1].value.toLocaleString('pt-BR')}**</p>
          </div>
        )}
        {!loading && !error && populationData.length === 0 && <p>Nenhum dado de população disponível.</p>}
      </Card>

      {/* Card do Gráfico de População */}
      <Card>
        <h2>Gráfico da População Estimada</h2>
        {loading && <p>Carregando gráfico...</p>}
        {error && <p style={{ color: 'red' }}>Erro ao carregar gráfico: {error}</p>}
        {/* Renderiza o gráfico apenas se houver dados e sem erros */}
        {!loading && !error && populationData.length > 0 ? (
          <PopulationChart data={populationData} />
        ) : (
          !loading && !error && <p>Nenhum dado para exibir no gráfico.</p>
        )}
      </Card>

      <Card>
        <h2>Outro Gráfico (futuro)</h2>
        <p>Mais um espaço para gráficos.</p>
      </Card>
      <Card>
        <h2>Dados Adicionais</h2>
        <p>Aqui podemos adicionar outras informações do IBGE.</p>
      </Card>
    </Layout>
  );
}

export default App;