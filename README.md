# Tech Challenge - Plataforma de Blog

Este projeto é uma plataforma de blog completa, desenvolvida como parte de um desafio técnico. A arquitetura é baseada em serviços com um backend em Node.js, um frontend em React e um banco de dados PostgreSQL, todos orquestrados com Docker para facilitar o desenvolvimento e a implantação.

## 🚀 Tecnologias Utilizadas

-   **Backend:** Node.js, Express, Sequelize (ORM)
-   **Frontend:** React
-   **Banco de Dados:** PostgreSQL 15
-   **Containerização:** Docker, Docker Compose

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

-   [Git](https://git-scm.com/)
-   [Docker](https://www.docker.com/products/docker-desktop/) e Docker Compose
-   [Node.js](https://nodejs.org/en/) (v18 ou superior) - Opcional, para rodar os serviços fora do Docker.

## ⚙️ Instalação e Configuração

Siga os passos abaixo para configurar e executar o ambiente de desenvolvimento local.

**1. Clone o repositório:**

```bash
git clone [https://github.com/inovaulaorg/tech-challenge.git](https://github.com/inovaulaorg/tech-challenge.git)
cd tech-challenge
```

**2. Crie o arquivo de variáveis de ambiente:**

Este projeto utiliza um arquivo `.env` para gerenciar segredos e configurações de ambiente. Ele **não** é enviado para o Git e precisa ser criado manualmente.

Copie o arquivo de exemplo `.env.example` para criar o seu:

```bash
cp .env.example .env
```

**3. Configure suas variáveis de ambiente:**

Abra o arquivo `.env` que você acabou de criar e preencha as variáveis com os valores desejados. Para desenvolvimento local, os valores padrão para o banco de dados já devem funcionar. **É crucial definir um `JWT_SECRET` seguro.**

**4. Construa os containers Docker:**

Este comando irá baixar as imagens necessárias e construir os serviços de backend e frontend.

```bash
docker-compose build
```

## ▶️ Executando a Aplicação

Para iniciar todos os serviços (banco de dados, backend e frontend) em segundo plano, execute:

```bash
docker-compose up -d
```

A aplicação estará disponível nos seguintes endereços:

-   **Frontend (React):** `http://localhost:3000`
-   **Backend (API):** `http://localhost:3001`
-   **PostgreSQL:** A porta `5432` estará disponível para conexão externa, caso precise usar um cliente de banco de dados.

### ⏹️ Parando a Aplicação

Para parar todos os containers, execute:

```bash
docker-compose down
```

Para parar e remover os volumes (apagar os dados do banco de dados), execute:
```bash
docker-compose down -v
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
