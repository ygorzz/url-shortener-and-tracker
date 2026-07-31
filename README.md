# URL Shortening API

![Node.js](https://img.shields.io/badge/node-%3E%3D18-green)
![Express](https://img.shields.io/badge/express-5.x-black)
![MongoDB](https://img.shields.io/badge/mongodb-database-green)
![Docker](https://img.shields.io/badge/docker-containerized-blue)
![JWT](https://img.shields.io/badge/auth-JWT-orange)
![Swagger](https://img.shields.io/badge/docs-Swagger-85EA2D)

## Descrição

API REST para encurtamento e rastreamento de URLs, desenvolvida como projeto de portfólio com foco na aplicação de boas práticas de desenvolvimento Back-end utilizando Node.js.

A aplicação permite que usuários autenticados criem URLs encurtadas, gerenciem suas URLs, acompanhem estatísticas de acesso, renovem a validade dos links e realizem redirecionamentos para as URLs originais.

O projeto foi desenvolvido utilizando arquitetura em camadas, documentação completa com Swagger/OpenAPI, autenticação JWT, tratamento centralizado de erros, Rate Limiting e containerização completa com Docker.

---

## Tecnologias utilizadas

| Tecnologia | Versão | Função |
|---|---|---|
| [Node.js](https://nodejs.org/) | >= 18 | Ambiente de execução JavaScript |
| [Express](https://expressjs.com/) | ^5.x | Framework para construção da API |
| [MongoDB](https://www.mongodb.com/) | — | Banco de dados NoSQL |
| [Mongoose](https://mongoosejs.com/) | ^9.x | ODM para comunicação com o MongoDB |
| [JWT](https://jwt.io/) | — | Autenticação baseada em tokens |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | — | Hash de senhas |
| [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) | — | Limitação de requisições |
| [Swagger UI](https://swagger.io/tools/swagger-ui/) | — | Interface da documentação da API |
| [OpenAPI 3.0](https://spec.openapis.org/oas/latest.html) | — | Especificação da documentação |
| [Docker](https://www.docker.com/) | — | Containerização da aplicação |
| [Docker Compose](https://docs.docker.com/compose/) | — | Orquestração dos containers |
| [Mongo Express](https://github.com/mongo-express/mongo-express) | — | Interface gráfica para gerenciamento do MongoDB |

A aplicação utiliza **JavaScript com ES Modules** (`import`/`export`) nativamente.

---

## Estrutura do projeto

```text
url-shortening/
├── src/
│   ├── config/                    # Configurações da aplicação
│   ├── controllers/               # Recebe as requisições HTTP
│   ├── services/                  # Regras de negócio e comunicação como banco de dados
│   ├── routes/                    # Definição das rotas
│   ├── middlewares/               # Middlewares globais
│   ├── models/                    # Models do MongoDB
│   ├── errors/                    # Classes de erros customizadas
│   └── app.js                     # Configuração do Express
│   ├── swagger.json               # Especificação OpenAPI
│
├── docker-compose.yml             # Orquestração dos containers
├── .dockerignore               
├── .gitignore               
├── Dockerfile                     # Container da API
├── server.js                      # Inicialização da aplicação
├── package.json
└── README.md
```

---

## Funcionalidades

### Autenticação

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `auth/register` | Cria uma nova conta |
| `POST` | `auth/login` | Realiza autenticação e retorna um JWT |

Após o login, o usuário recebe um **Access Token** que deve ser enviado nas rotas protegidas utilizando:

```http
Authorization: Bearer <token>
```

---

### URLs

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/shortUrls` | Cria uma URL encurtada |
| `GET` | `/shortUrls` | Lista todas as URLs do usuário autenticado |
| `GET` | `/shortUrls/:shortUrl/redirect` | Redireciona para a URL original |
| `GET` | `/shortUrls/:shortUrl/stats` | Retorna estatísticas da URL |
| `PUT` | `/shortUrls/:shortUrl/renew` | Renova o tempo de expiração da URL |
| `DELETE` | `shortUrls/:shortUrl` | Remove uma URL |

### Campos da URL

```json
{
  "originalUrl": "string",
  "shortUrl": "string",
  "accessCount": 0,
  "expiresInMs": 86400000,
  "userId": "<id do usuário>"
  "createdAt: "datetime"
  "updatedAt: "datetime"
}
```

### Campos do usuário

```json
{
  "name": "string",
  "email": "string",
  "hashPassword": "string"
}
```

---

## Funcionalidades e diferenciais

### Arquitetura

- **Arquitetura em camadas** — Separação entre Routes, Controllers e Services.
- **Separação de responsabilidades** — Cada camada possui uma única responsabilidade, com exceção de services que, por ser um projeto pequeno, contém regras de negócio e comunicação com o banco de dados. Dessa forma, não contendo a camada repositories.
- **ES Modules** — Utilização nativa de `import` e `export`.
- **Código modular** — Estrutura organizada para facilitar manutenção e escalabilidade.

### Segurança

- **JWT Authentication** — Autenticação baseada em Access Token.
- **Autorização** — Cada usuário possui acesso apenas às próprias URLs.
- **Hash de senhas** — Utilização do bcrypt para armazenamento seguro.
- **Rate Limiting** — Limitação de requisições por rota utilizando `express-rate-limit`.
- **Validação de entrada** — Verificação de formato, obrigatoriedade e consistência dos dados.

### Banco de dados

- **MongoDB + Mongoose** — Persistência utilizando banco NoSQL.
- **Relacionamento entre usuários e URLs** — Um usuário pode possuir diversas URLs.
- **Persistência dos dados** — Utilização de Docker Volume para manter os dados do banco.

### Tratamento de erros

- **Sistema centralizado de erros** — Middleware global para tratamento de exceções.
- **Classes de erro customizadas** — Implementação de `BaseError`, `BadRequestError`, `UnauthorizedError`, `ConflictError` e `NotFoundError`.
- **Respostas padronizadas** — Todas as exceções retornam objetos consistentes contendo status HTTP e mensagem.

### Documentação

- **Swagger UI** — Interface gráfica para testar todos os endpoints.
- **OpenAPI 3.0** — Documentação seguindo o padrão da especificação OpenAPI.
- **Schemas reutilizáveis** — Componentes compartilhados entre as rotas.
- **Exemplos completos** — Requisições, respostas, parâmetros e códigos HTTP documentados.

### Infraestrutura

- **Docker** — API totalmente containerizada.
- **Docker Compose** — Orquestração da aplicação.
- **MongoDB Container** — Banco executando em container dedicado.
- **Mongo Express** — Interface gráfica para gerenciamento do banco.
- **Rede interna do Docker** — Comunicação segura entre os containers.

---

## Como executar o projeto

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Passo a passo

**1. Clone o repositório e acesse a pasta do projeto:**

```bash
git clone <url-do-repositorio>

cd url-shortening
```

**2. Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do projeto contendo as configurações necessárias da aplicação.
Como é um projeto de portifólio, deixei as variáveis de ambiente para conexão com o banco de dados hardcoded no docker-compose.yml. Com o objetivo de facilitar o teste do projeto.
Logo, no exemplo do arquivo `.env` abaixo, a `PORT` do server e a `JWT_SECRET` podem ser de sua escolha. Já a `DATABASE_CONNECTION_STRING` deve ser a mesma do exemplo.

Exemplo:

```env
PORT=<porta_que_iniciará_o_server>
JWT_SECRET=<sua_chave_secreta>
DATABASE_CONNECTION_STRING=mongodb://admin:admin123@mongodb:27017/url-shortener?authSource=admin
```

**3. Construa e inicialize os containers:**

```bash
docker compose up -d --build
```

Serão iniciados automaticamente:

- API Node.js
- MongoDB
- Mongo Express

**4. Acesse a aplicação**

| Serviço | Endereço |
|---|---|
| API | http://localhost:8000 |
| Swagger UI | http://localhost:8000/api-docs |
| Mongo Express | http://localhost:8081 |

**5. Encerrar os containers**

```bash
docker compose down
```

Caso deseje remover também os volumes persistentes:

```bash
docker compose down -v
```

---

## Observações

- O projeto foi desenvolvido com foco em práticas utilizadas em aplicações reais de mercado.
- Toda a autenticação é realizada utilizando JWT.
- As senhas são armazenadas utilizando hash com bcrypt.
- O MongoDB executa em container dedicado com persistência através de Docker Volumes.
- A documentação da API é disponibilizada através do Swagger UI.
- A aplicação implementa tratamento centralizado de erros e validações de entrada.
- O código utiliza JavaScript com ES Modules e segue arquitetura em camadas.

---

*Desenvolvido por **Ygor Santos** — [LinkedIn](https://www.linkedin.com/in/ygor-santos-869152325/) | [GitHub](https://github.com/ygorzz)*
