// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Layout, Card } from './components/Layout'; 
import DataHighlightCard from './components/DataHighlightCard'; 
import PopulationChart from './components/PopulationChart';
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

        const data = await fetchMockBrazilPopulation();
        console.log("Dados fictícios brutos:", data);

        if (data && data.length > 0 && data[0].resultados && data[0].resultados.length > 0) {
          const series = data[0].resultados[0].series;
          const brazilDataRaw = series.find(item => item.localidade.id === '1');

          if (brazilDataRaw && brazilDataRaw.serie) {
            const formattedData = Object.entries(brazilDataRaw.serie).map(([year, value]) => ({
              year: parseInt(year),
              value: parseInt(value)
            }));
            // Ordena os dados por ano, garantindo que o último elemento é o mais recente
            formattedData.sort((a, b) => a.year - b.year);
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

  // Pega o dado mais recente para o DataHighlightCard
  const latestPopulation = populationData.length > 0 ? populationData[populationData.length - 1] : null;

  return (
    <Layout>
      {/* Usando o novo DataHighlightCard */}
      {loading && (
        <DataHighlightCard title="População Estimada do Brasil" value="Carregando..." label="" />
      )}
      {error && (
        <DataHighlightCard title="População Estimada do Brasil" value="Erro!" label={error} />
      )}
      {!loading && !error && latestPopulation && (
        <DataHighlightCard
          title="População Estimada do Brasil"
          value={latestPopulation.value}
          label={`Dados de ${latestPopulation.year}`}
        />
      )}
      {!loading && !error && !latestPopulation && (
        <DataHighlightCard title="População Estimada do Brasil" value="N/A" label="Nenhum dado disponível" />
      )}

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