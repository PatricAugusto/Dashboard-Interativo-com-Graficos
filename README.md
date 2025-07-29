# 📊 Dashboard de Dados Demográficos do Brasil

Um dashboard interativo desenvolvido com **React** e **Styled Components**, projetado para visualizar dados demográficos fictícios do Brasil, como população total, distribuição regional e por faixa etária. O objetivo é criar uma ferramenta clara, dinâmica e responsiva para a exploração de dados.

---

## 🚀 Funcionalidades

- **Visualização Clara de Dados**  
  Exibe a população estimada do Brasil e dados detalhados por região e faixa etária.

- **Gráficos Interativos**  
  Apresenta gráficos de barras e pizza para uma visualização dinâmica dos dados.

- **Filtro por Ano**  
  Permite selecionar um ano específico para visualizar a população acumulada até aquele período no gráfico anual.

- **Filtro por Região**  
  Capacidade de selecionar e desmarcar regiões para focar a análise em áreas específicas.

- **Botões de Controle de Região**  
  Inclui botões "Selecionar Todos" e "Nenhum" no filtro de regiões para facilitar a interação.

- **🌙 Modo Escuro (Dark Mode)**  
  Oferece uma opção de visualização alternativa para diferentes condições de iluminação.

- **💾 Persistência do Tema**  
  A preferência do modo (claro/escuro) é salva no `localStorage`, mantendo a escolha do usuário em futuras visitas.

- **⏳ Loader Aprimorado**  
  Exibe um spinner animado e mensagens claras durante o carregamento dos dados.

---

## 🛠️ Tecnologias Utilizadas

- **React** – Biblioteca para construção de interfaces de usuário.
- **Styled Components** – Estilização com CSS-in-JS e suporte a temas.
- **Chart.js** – Criação de gráficos interativos.
- **React Chart.js 2** – Integração do Chart.js com React.
- **Font Awesome** – Biblioteca de ícones.
- **localStorage API** – Persistência de preferências no navegador.

---

## 📁 Estrutura do Projeto

```bash
.
├── public/
│   └── index.html
├── src/
│   ├── assets/                   # Imagens e recursos estáticos
│   ├── components/              # Componentes reutilizáveis
│   │   ├── AgeDistributionChart.jsx
│   │   ├── DataHighlightCard.jsx
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   ├── Loader.jsx           # Componente de carregamento
│   │   ├── NoDataMessage.jsx
│   │   ├── PopulationChart.jsx
│   │   ├── RegionalPopulationChart.jsx
│   │   ├── RegionFilter.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── YearSelector.jsx
│   ├── services/
│   │   └── mockIbgeService.js   # Serviço mockado de dados
│   ├── styles/
│   │   ├── GlobalStyles.js
│   │   └── theme.js
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

## 🧑‍💻 Como Rodar o Projeto

✅ Pré-requisitos

- Node.js

- npm ou Yarn

### 📥 Instalação

Clone o repositório:

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd nome-do-seu-repositorio
```

Instale as dependências:

```bash
npm install
# ou
yarn install
```

## 🚴 Execução

Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O app estará disponível em: http://localhost:5173

## 📂 Dados Fictícios (Mock Data)
Este projeto utiliza dados simulados via src/services/mockIbgeService.js, permitindo que o dashboard funcione sem dependência de APIs externas reais. Os dados imitam a estrutura de uma resposta da API do IBGE.

## 🤝 Contribuição
Contribuições são bem-vindas!
Sinta-se à vontade para abrir uma issue ou enviar um pull request com sugestões, melhorias ou correções.