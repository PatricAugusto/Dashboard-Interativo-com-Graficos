// src/App.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Card, Header } from './components/Layout';
import DataHighlightCard from './components/DataHighlightCard';
import PopulationChart from './components/PopulationChart';
import RegionalPopulationChart from './components/RegionalPopulationChart';
import AgeDistributionChart from './components/AgeDistributionChart';
import YearSelector from './components/YearSelector';
import RegionFilter from './components/RegionFilter';
import NoDataMessage from './components/NoDataMessage';
import ThemeToggle from './components/ThemeToggle';
import Loader from './components/Loader';

import { getTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

import {
  fetchMockBrazilPopulation,
  fetchMockRegionalPopulation,
  fetchMockAgeDistribution,
} from './services/mockIbgeService';

const THEME_STORAGE_KEY = 'dashboardThemeMode';

function App() {
  const [themeMode, setThemeMode] = useState(() => {
    try {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      return storedTheme ? storedTheme : 'light';
    } catch (error) {
      console.error("Erro ao ler do localStorage:", error);
      return 'light';
    }
  });

  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, newMode);
      } catch (error) {
        console.error("Erro ao escrever no localStorage:", error);
      }
      return newMode;
    });
  };

  const currentTheme = useMemo(() => getTheme(themeMode), [themeMode]);

  const [allPopulationData, setAllPopulationData] = useState([]);
  const [allRegionalPopulationData, setAllRegionalPopulationData] = useState([]);
  const [ageDistributionData, setAgeDistributionData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

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
              // Define o ano inicial como o último ano disponível
              setSelectedYear(formattedData[formattedData.length - 1].year);
            }
          } else {
            setError("Dados da população do Brasil fictícios não encontrados ou incompletos.");
          }
        } else {
          setError("Estrutura de dados fictícios (Brasil) inesperada ou vazia.");
        }

        const regionalData = await fetchMockRegionalPopulation();
        if (regionalData && regionalData.length > 0) {
          setAllRegionalPopulationData(regionalData);
          setSelectedRegions(regionalData.map(item => item.region));
        } else {
          console.warn("Nenhum dado regional disponível ou estrutura inesperada.");
        }

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
    // <--- Lógica de filtro corrigida: inclui todos os anos até o selectedYear
    return allPopulationData.filter(data => data.year <= selectedYear);
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
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Layout>
        <Header>
          <h1>Dashboard IBGE</h1>
          <ThemeToggle toggleTheme={toggleTheme} currentMode={themeMode} />
        </Header>

        {/* Card de População Numérica */}
        {loading && (
          <Loader message="Carregando população..." />
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
          {loading && <Loader message="Carregando gráfico de população..." />}
          {error && <NoDataMessage type="error" message={`Erro ao carregar gráfico: ${error}`} />}
          {!loading && !error && filteredPopulationData.length > 0 ? (
            <PopulationChart data={filteredPopulationData} />
          ) : (
            // Mensagem específica para o gráfico anual quando não há dados para o filtro
            !loading && !error && <NoDataMessage type="empty" message="Nenhum dado disponível para o gráfico até o ano selecionado." />
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
          {loading && <Loader message="Carregando gráfico regional..." />}
          {error && <NoDataMessage type="error" message={`Erro ao carregar gráfico regional: ${error}`} />}
          {!loading && !error && filteredRegionalPopulationData.length > 0 ? (
            <RegionalPopulationChart data={filteredRegionalPopulationData} />
          ) : (
            !loading && !error && <NoDataMessage type="empty" message="Nenhuma região selecionada para exibir no gráfico." />
          )}
        </Card>

        {/* Card de População por Faixa Etária */}
        <Card>
          <h2>População por Faixa Etária</h2>
          {loading && <Loader message="Carregando dados de faixa etária..." />}
          {error && <NoDataMessage type="error" message={`Erro ao carregar dados de faixa etária: ${error}`} />}
        {!loading && !error && ageDistributionData.length > 0 ? (
          <AgeDistributionChart data={ageDistributionData} />
        ) : (
          !loading && !error && <NoDataMessage type="empty" message="Nenhum dado de faixa etária disponível." />
        )}
      </Card>
    </Layout>
  </ThemeProvider>
);
}

export default App;