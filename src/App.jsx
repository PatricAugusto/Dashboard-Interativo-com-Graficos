// src/App.jsx
import React from 'react';
import { Layout, Card } from './components/Layout'; // Importa os componentes de layout

function App() {
  return (
    <Layout>
      {/* Exemplos de Cards dentro da ContentArea */}
      <Card>
        <h2>Gráfico 1</h2>
        <p>Conteúdo do gráfico aqui...</p>
      </Card>
      <Card>
        <h2>Gráfico 2</h2>
        <p>Conteúdo do gráfico aqui...</p>
      </Card>
      <Card>
        <h2>Gráfico 3</h2>
        <p>Conteúdo do gráfico aqui...</p>
      </Card>
      <Card>
        <h2>Gráfico 4</h2>
        <p>Conteúdo do gráfico aqui...</p>
      </Card>
    </Layout>
  );
}

export default App;