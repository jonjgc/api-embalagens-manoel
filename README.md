# API de Embalagens - Desafio Seu Manoel

Esta é uma API desenvolvida em Node.js com o framework NestJS como solução para otimização de empacotamento. A API recebe uma lista de pedidos com produtos e suas dimensões, e retorna a melhor forma de embalá-los utilizando um conjunto de caixas pré-definidas.

## Features

-   **Otimização de Empacotamento**: Utiliza uma heurística para alocar produtos em caixas, buscando minimizar o número de caixas utilizadas.
-   **API Segura**: O endpoint principal é protegido por um sistema de Chave de API (API Key).
-   **Documentação Interativa**: A API conta com documentação automática e interativa gerada com Swagger.
-   **Pronto para Produção**: O projeto é totalmente containerizado com Docker, garantindo um ambiente de execução consistente e de fácil implantação.
-   **Validação de Dados**: Os dados de entrada são validados para garantir a integridade das requisições.

## Tecnologias Utilizadas

-   **Backend**: Node.js, NestJS, TypeScript
-   **Containerização**: Docker, Docker Compose
-   **Testes**: Jest
-   **Documentação**: Swagger
-   **Qualidade de Código**: ESLint, Prettier

---

## Como Executar o Projeto

Você pode executar este projeto de duas maneiras: utilizando Docker ou localmente.

### Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas na sua máquina:

-   [Git](https://git-scm.com/)
-   [Docker](https://www.docker.com/products/docker-desktop/) e [Docker Compose](https://docs.docker.com/compose/install/)
-   [Node.js v18+](https://nodejs.org/en/) e [npm](https://www.npmjs.com/) (para o método de execução local)

---

###  Passo a Passo para Execução

#### 1. Clone o Repositório

Abra seu terminal e clone este repositório para a sua máquina local:

```bash
git clone <https://github.com/jonjgc/api-embalagens-manoel.git>
cd api-embalagens-manoel
```

#### 2. Configure as Variáveis de Ambiente

O projeto utiliza um arquivo `.env` para gerenciar variáveis sensíveis, como a chave da API.

Crie um arquivo chamado `.env` na raiz do projeto e adicione o seguinte conteúdo:

```env
# .env
API_KEY="SEU_MANOEL_SUPER_SECRETO"
```

Esta será a chave que você usará para autenticar suas requisições na API.

#### 3. Execute a Aplicação

##### Método 1: Usando Docker (Recomendado)

Esta é a forma mais simples e rápida de subir a aplicação, pois todo o ambiente já está configurado.

No terminal, na raiz do projeto, execute o seguinte comando:

```bash
docker-compose up --build
```

O Docker irá construir a imagem da aplicação e iniciar o container. Ao final do processo, a API estará rodando e acessível em `http://localhost:3000`.

##### Método 2: Executando Localmente

Se preferir não usar o Docker, você pode rodar a aplicação diretamente na sua máquina.

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Inicie a aplicação em modo de desenvolvimento:**
    ```bash
    npm run start:dev
    ```

A API estará rodando e acessível em `http://localhost:3000`.

---

## Testando a API

Após iniciar a aplicação, você pode testá-la de duas formas:

### 1. Usando a Documentação Swagger

A forma mais fácil de testar é através da documentação interativa. Abra seu navegador e acesse:

**`http://localhost:3000/api`**

-   Clique no botão `Authorize` no canto superior direito e insira o valor da sua `API_KEY` (`SEU_MANOEL_SUPER_SECRETO`).
-   Encontre o endpoint `POST /packaging/process`, clique em "Try it out".
-   Edite o corpo da requisição (Request body) com os dados do seu pedido e clique em "Execute".

### 2. Usando um Cliente de API (Insomnia, Postman, etc.)

-   **Método**: `POST`
-   **URL**: `http://localhost:3000/packaging/process`
-   **Headers**:
    -   `Content-Type`: `application/json`
    -   `x-api-key`: `SEU_MANOEL_SUPER_SECRETO` (o valor do seu arquivo `.env`)

-   **Body (Exemplo)**:
    ```json
    {
      "pedidos": [
        {
          "id_pedido": "pedido_exemplo_1",
          "produtos": [
            {
              "id": "produto_A",
              "altura": 10,
              "largura": 20,
              "comprimento": 30
            },
            {
              "id": "produto_B",
              "altura": 40,
              "largura": 40,
              "comprimento": 30
            }
          ]
        },
        {
          "id_pedido": "pedido_exemplo_2",
          "produtos": [
            {
              "id": "produto_C",
              "altura": 60,
              "largura": 70,
              "comprimento": 40
            }
          ]
        }
      ]
    }
    ```

---

## Executando os Testes Unitários

Para garantir a qualidade e o funcionamento correto da lógica de negócio, você pode executar a suíte de testes unitários com o seguinte comando:

```bash
npm run test
```

## Importante: A resposta da tarefa 2 está na raiz deste projeto, o nome do arquivo é "Exercício 2.pdf"
