#  Deritiva - Aplicativo Educativo para Intervenção em Ortografia

[![Expo](https://img.shields.io/badge/Expo-54.0.0-000.svg)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.75.4-61DAFB.svg)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Deritiva** é um aplicativo mobile educativo desenvolvido para auxiliar no aprendizado da ortografia de palavras derivadas, com foco especial em indivíduos com dislexia. O aplicativo combina exercícios interativos, gamificação e recursos de acessibilidade para tornar o aprendizado mais envolvente e eficaz.

##  Objetivo

O aplicativo tem como objetivo principal intervir na ortografia de palavras derivadas, utilizando uma abordagem baseada na derivação morfológica. Através de exercícios progressivos, o usuário desenvolve habilidades de:

- Reconhecimento de sílabas e padrões ortográficos
- Compreensão de famílias de palavras e derivações
- Raciocínio lógico e análise de estruturas linguísticas
- Associação entre forma escrita e significado

##  Funcionalidades

###  Níveis de Dificuldade

O aplicativo possui **5 níveis de dificuldade progressiva**, cada um com **4 exercícios**:

| Nível | Título | Descrição |
|-------|--------|-----------|
| 1 | Iniciante | Palavras simples e de alta frequência |
| 2 | Explorador | Palavras com maior complexidade silábica |
| 3 | Aventureiro | Palavras com encontros consonantais |
| 4 | Mestre | Palavras com estruturas mais complexas |
| 5 | Lenda | Palavras desafiadoras e de baixa frequência |

### 🎮 Tipos de Exercícios

#### 1. Sílaba Faltante
Completar a palavra com a sílaba correta entre 4 opções.
- **Habilidade**: Identificação e associação silábica
- **Dificuldade**: Progressiva por nível

#### 2. Formando a Palavra
Organizar sílabas embaralhadas para formar a palavra correta.
- **Habilidade**: Ordenação e estruturação silábica
- **Dificuldade**: Aumenta o número de sílabas por nível

#### 3. Construtor
Escolher a sílaba correta para completar uma palavra a partir do radical.
- **Habilidade**: Reconhecimento de sufixos e radicais
- **Foco**: Derivação de palavras

#### 4. Intruso
Identificar a palavra que não pertence à família de palavras.
- **Habilidade**: Análise de famílias morfológicas
- **Foco**: Derivação e relação semântica

### Sistema de Progresso

- **Estrelas**: 1 a 3 estrelas por exercício, baseado no desempenho
- **Progresso**: Visualização do avanço por nível
- **Desbloqueio**: Próximo nível liberado após completar todos os exercícios
- **Persistência**: Progresso salvo localmente no dispositivo

### ♿ Acessibilidade

- **Tutorial interativo** com explicações detalhadas
- **Dicas** disponíveis em cada exercício
- **Feedback imediato** com indicação visual de acerto/erro
- **Cores de alto contraste** para facilitar a leitura
- **Fontes legíveis** e espaçamento adequado

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| **Expo** | 54.0.0 | Framework para desenvolvimento mobile |
| **React Native** | 0.75.4 | Biblioteca para interface nativa |
| **TypeScript** | 5.3.3 | Tipagem estática e segurança |
| **React Navigation** | 6.x | Navegação entre telas |
| **React Native Reanimated** | 3.10.0 | Animações fluidas |
| **AsyncStorage** | - | Persistência local de dados |

## Estrutura do Projeto

deritiva/
├── app/
│ ├── (tabs)/ # Telas com navegação por abas
│ │ ├── _layout.tsx # Configuração das abas
│ │ └── index.tsx # Tela Home
│ ├── exercicio1/ # Tela de níveis
│ │ └── index.tsx # Lista de níveis e exercícios
│ ├── exercicios/ # Exercícios por tipo
│ │ ├── silaba-faltante/
│ │ │ └── [level].tsx # Exercício por nível
│ │ ├── formando-a-palavra/
│ │ │ └── [level].tsx
│ │ ├── construtor/
│ │ │ └── [level].tsx
│ │ └── intruso/
│ │ └── [level].tsx
│ ├── tutorial/ # Tutorial interativo
│ │ └── index.tsx
│ ├── _layout.tsx # Layout principal
│ └── index.tsx # Rota inicial
├── assets/
│ └── images/ # Imagens do aplicativo
│ └── deritiva.png # Logo
├── components/ # Componentes reutilizáveis
│ ├── AnimatedBackground.tsx
│ ├── TutorialCard.tsx
│ └── haptic-tab.tsx
├── constants/ # Constantes do app
│ └── theme.ts # Cores e temas
├── hooks/ # Hooks personalizados
├── styles/ # Estilos centralizados
│ ├── exercicio1.ts
│ ├── homestyles.ts
│ ├── silabaFaltante.ts
│ ├── formandoPalavra.ts
│ ├── construtor.ts
│ └── intruso.ts
├── App.js # Ponto de entrada
├── app.json # Configuração do Expo
├── package.json # Dependências
├── tsconfig.json # Configuração TypeScript
└── README.md # Este arquivo


## Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Dispositivo físico com [Expo Go](https://expo.dev/go) ou emulador

### Passo a Passo

1. **Clone o repositório**


git clone https://github.com/seu-usuario/deritiva.git
cd deritiva
```

2. Instale as dependências


npm install --legacy-peer-deps
Inicie o aplicativo

npx expo start -c
Execute em um dispositivo


Android: Escaneie o QR Code com o app Expo Go

iOS: Escaneie o QR Code com a câmera do iPhone

Web: Pressione w no terminal ou acesse http://localhost:8081