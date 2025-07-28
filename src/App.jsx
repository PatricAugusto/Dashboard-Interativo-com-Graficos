// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Card } from './components/Layout';
import DataHighlightCard from './components/DataHighlightCard';
import PopulationChart from './components/PopulationChart';
import RegionalPopulationChart from './components/RegionalPopulationChart';
import AgeDistributionChart from './components/AgeDistributionChart'; // <--- NOVO: Importa o novo gráfico
import YearSelector from './components/YearSelector';
import RegionFilter from './components/RegionFilter';
import NoDataMessage from './components/NoDataMessage';

import {
  fetchMockBrazilPopulation,
  fetchMockRegionalPopulation,
  fetchMockAgeDistribution, // <--- NOVO: Importa a função de dados de faixa etária
} from './services/mockIbgeService';

function App() {
  const [allPopulationData, setAllPopulationData] = useState([]);
  const [allRegionalPopulationData, setAllRegionalPopulationData] = useState([]);
  const [ageDistributionData, setAgeDistributionData] = useState([]); // <--- NOVO: Estado para dados de faixa etária
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedRegions, setSelectedRegions] = useState([]);
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
            setAllPopulationData(formattedData);
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
          setAllRegionalPopulationData(regionalData);
          setSelectedRegions(regionalData.map(item => item.region));
        } else {
          console.warn("Nenhum dado regional disponível ou estrutura inesperada.");
        }

        // <--- NOVO: Fetch dos dados de faixa etária
        const ageData = await fetchMockAgeDistribution();
        if (ageData && ageData.length > 0) {
          setAgeDistributionData(ageData);
        } else {
          console.warn("Nenhum dado de faixa etária disponível ou estrutura inesperada.");
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

  const availableYears = useMemo(() => {
    return allPopulationData.map(data => data.year);
  }, [allPopulationData]);

  const filteredPopulationData = useMemo(() => {
    if (!selectedYear || allPopulationData.length === 0) {
      return [];
    }
    const selectedYearIndex = allPopulationData.findIndex(data => data.year === selectedYear);
    if (selectedYearIndex !== -1) {
      const startIndex = Math.max(0, selectedYearIndex - 1);
      return allPopulationData.slice(startIndex, selectedYearIndex + 1);
    }
    return [];
  }, [selectedYear, allPopulationData]);

  const latestPopulation = allPopulationData.length > 0 ? allPopulationData[allPopulationData.length - 1] : null;

  const allAvailableRegions = useMemo(() => {
    return allRegionalPopulationData.map(item => item.region);
  }, [allRegionalPopulationData]);

  const filteredRegionalPopulationData = useMemo(() => {
    if (selectedRegions.length === 0) {
      return [];
    }
    return allRegionalPopulationData.filter(item =>
      selectedRegions.includes(item.region)
    );
  }, [selectedRegions, allRegionalPopulationData]);

  return (
    <Layout>
      {/* Card de População Numérica */}
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
        <NoDataMessage type="empty" message="Nenhum dado de população disponível." />
      )}

      {/* Card do Gráfico de População (barras) */}
      <Card>
        <h2>Gráfico da População Estimada (Anual)</h2>
        {!loading && !error && availableYears.length > 0 && (
          <YearSelector
            years={availableYears}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
        )}
        {loading && <NoDataMessage type="info" message="Carregando dados do gráfico..." />}
        {error && <NoDataMessage type="error" message={`Erro ao carregar gráfico: ${error}`} />}
        {!loading && !error && filteredPopulationData.length > 0 ? (
          <PopulationChart data={filteredPopulationData} />
        ) : (
          !loading && !error && <NoDataMessage type="empty" message="Nenhum dado disponível para o gráfico no ano selecionado." />
        )}
      </Card>

      {/* Card do Gráfico de População por Região (pizza) */}
      <Card>
        <h2>População por Região</h2>
        {!loading && !error && allAvailableRegions.length > 0 && (
          <RegionFilter
            allRegions={allAvailableRegions}
            selectedRegions={selectedRegions}
            onRegionChange={setSelectedRegions}
          />
        )}
        {loading && <NoDataMessage type="info" message="Carregando dados do gráfico regional..." />}
        {error && <NoDataMessage type="error" message={`Erro ao carregar gráfico regional: ${error}`} />}
        {!loading && !error && filteredRegionalPopulationData.length > 0 ? (
          <RegionalPopulationChart data={filteredRegionalPopulationData} />
        ) : (
          !loading && !error && <NoDataMessage type="empty" message="Nenhuma região selecionada para exibir no gráfico." />
        )}
      </Card>

      {/* <--- NOVO: Card de População por Faixa Etária */}
      <Card>
        <h2>População por Faixa Etária</h2>
        {loading && <NoDataMessage type="info" message="Carregando dados de faixa etária..." />}
        {error && <NoDataMessage type="error" message={`Erro ao carregar dados de faixa etária: ${error}`} />}
        {!loading && !error && ageDistributionData.length > 0 ? (
          <AgeDistributionChart data={ageDistributionData} />
        ) : (
          !loading && !error && <NoDataMessage type="empty" message="Nenhum dado de faixa etária disponível." />
        )}
      </Card>
    </Layout>
  );
}

export default App;