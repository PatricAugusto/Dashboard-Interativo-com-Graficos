// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react'; // <--- NOVO: useMemo
import { Layout, Card } from './components/Layout';
import DataHighlightCard from './components/DataHighlightCard';
import PopulationChart from './components/PopulationChart';
import RegionalPopulationChart from './components/RegionalPopulationChart';
import YearSelector from './components/YearSelector'; // <--- NOVO: Importa YearSelector
import {
  fetchMockBrazilPopulation,
  fetchMockRegionalPopulation,
} from './services/mockIbgeService';

function App() {
  const [allPopulationData, setAllPopulationData] = useState([]); // <--- NOVO: Armazena TODOS os dados da população
  const [regionalPopulationData, setRegionalPopulationData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null); // <--- NOVO: Estado para o ano selecionado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch da população total
        const brazilData = await fetchMockBrazilPopulation();
        if (brazilData && brazilData.length > 0 && brazilData[0].resultados && brazilData[0].resultados.length > 0) {
          const series = brazilData[0].resultados[0].series;
          const brazilDataRaw = series.find(item => item.localidade.id === '1');

          if (brazilDataRaw && brazilDataRaw.serie) {
            const formattedData = Object.entries(brazilDataRaw.serie).map(([year, value]) => ({
              year: parseInt(year),
              value: parseInt(value)
            }));
            formattedData.sort((a, b) => a.year - b.year);
            setAllPopulationData(formattedData); // <--- Armazena TODOS os dados
            // Define o ano mais recente como o padrão selecionado
            if (formattedData.length > 0) {
              setSelectedYear(formattedData[formattedData.length - 1].year);
            }
          } else {
            setError("Dados da população do Brasil fictícios não encontrados ou incompletos.");
          }
        } else {
          setError("Estrutura de dados fictícios (Brasil) inesperada ou vazia.");
        }

        // Fetch dos dados regionais
        const regionalData = await fetchMockRegionalPopulation();
        if (regionalData && regionalData.length > 0) {
          setRegionalPopulationData(regionalData);
        } else {
          console.warn("Nenhum dado regional disponível ou estrutura inesperada.");
        }

      } catch (err) {
        setError("Falha ao buscar dados: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Derivar os anos disponíveis para o seletor
  const availableYears = useMemo(() => {
    return allPopulationData.map(data => data.year);
  }, [allPopulationData]);

  // Filtrar os dados da população com base no ano selecionado
  // Para o gráfico de barras, vamos mostrar apenas o ano selecionado e o ano anterior para contexto
  const filteredPopulationData = useMemo(() => {
    if (!selectedYear || allPopulationData.length === 0) {
      return [];
    }
    const selectedYearIndex = allPopulationData.findIndex(data => data.year === selectedYear);
    if (selectedYearIndex !== -1) {
      // Inclui o ano selecionado e o ano anterior (se existir)
      const startIndex = Math.max(0, selectedYearIndex - 1);
      return allPopulationData.slice(startIndex, selectedYearIndex + 1);
    }
    return [];
  }, [selectedYear, allPopulationData]);

  // Pega o dado mais recente para o DataHighlightCard (usa o último de allPopulationData)
  const latestPopulation = allPopulationData.length > 0 ? allPopulationData[allPopulationData.length - 1] : null;

  return (
    <Layout>
      {/* Card de População Numérica - permanece o mesmo */}
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

      {/* Card do Gráfico de População (barras) */}
      <Card>
        <h2>Gráfico da População Estimada (Anual)</h2>
        {/* <--- NOVO: Adiciona o YearSelector aqui */}
        {!loading && !error && availableYears.length > 0 && (
          <YearSelector
            years={availableYears}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear} // Função para atualizar o ano selecionado
          />
        )}
        {loading && <p>Carregando gráfico...</p>}
        {error && <p style={{ color: 'red' }}>Erro ao carregar gráfico: {error}</p>}
        {!loading && !error && filteredPopulationData.length > 0 ? (
          <PopulationChart data={filteredPopulationData} /> 
        ) : (
          !loading && !error && <p>Nenhum dado para exibir no gráfico.</p>
        )}
      </Card>

      {/* Card do Gráfico de População por Região (pizza) - permanece o mesmo */}
      <Card>
        <h2>População por Região</h2>
        {loading && <p>Carregando gráfico regional...</p>}
        {error && <p style={{ color: 'red' }}>Erro ao carregar gráfico regional: {error}</p>}
        {!loading && !error && regionalPopulationData.length > 0 ? (
          <RegionalPopulationChart data={regionalPopulationData} />
        ) : (
          !loading && !error && <p>Nenhum dado regional disponível para o gráfico.</p>
        )}
      </Card>

      <Card>
        <h2>Dados Adicionais</h2>
        <p>Aqui podemos adicionar outras informações do IBGE.</p>
      </Card>
    </Layout>
  );
}

export default App;