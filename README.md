# Blog Microsserviços

Este repositório contém a implementação de um sistema de blog dividido em microsserviços para gerenciamento de autenticação, usuários e posts. O projeto foi desenvolvido com Node.js, Express, Sequelize e Mongoose, com foco em segurança, escalabilidade e boas práticas de arquitetura.
## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pre-requisitos)
- [fluxo de Uso](#fluxo-de-uso)
- [Documentação](#Documentação)

## Funcionalidades

- **Autenticação de Usuários**: Registro, login e geração de token JWT.
- **Gerenciamento de Usuários**: Cadastro, listagem, edição e exclusão de professores e alunos.
- **Área de Administração**: Permite a criação, edição e exclusão de posts.
- **Gerenciamento de Posts**: Criação, leitura, edição e exclusão de posts.
- **Proteção de Rotas**: Acesso a rotas restritas apenas com token JWT válido.

---

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução JavaScript.
- **Express**: Framework web para Node.js.
- **Sequelize**: ORM para PostgreSQL (usuários e autenticação).
- **Mongoose**: ODM para MongoDB (posts).
- **PostgreSQL**: Banco de dados relacional.
- **MongoDB**: Banco de dados não relacional.

---

## Pré-requisitos

Antes de começar, certifique-se de que você tenha as seguintes ferramentas instaladas:

- **Node.js**: [Link para download](https://nodejs.org/en/download/)
- **npm** : O `npm` é instalado automaticamente com o Node.js.
- **MongoDB**: Caso esteja usando uma instalação local do MongoDB, certifique-se de tê-lo rodando. Caso contrário, utilize um serviço de banco de dados em nuvem como o [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **PostgreSQL** : [Link para download](https://www.postgresql.org/download/)

### Configuração do Ambiente

1. **Clone o repositório**

   Abra um terminal e execute o seguinte comando:

   ```bash
   git clone https://github.com/seuusuario/seu-repo.git
   cd seu-repo

2. **Configuração do Ambiente**

   Crie o arquivo .env para cada microsserviço:

   ```bash
    # Exemplo para auth-service
    DB_URL=postgres://usuario:senha@localhost:5432/authdb
    JWT_SECRET=sua_chave_secreta
    PORT=3002
    
    # Exemplo para user-service
    DB_URL=postgres://usuario:senha@localhost:5432/userdb
    PORT=3003
    
    # Exemplo para post-service
    MONGO_URI=mongodb://localhost:27017/postsdb
    PORT=3001
   ```
     Observação: As credenciais do MongoDB e o segredo do JWT podem ser alterados conforme necessário.

### Executando a Aplicação

1. **Instale as dependecias**

    No diretório raiz do projeto, navegue até cada microserviço:

    ```bash
    cd auth-service
    npm install
    npm start

    cd user-service
    npm install
    npm start

    cd post-service
    npm install
    npm start
    ```
    Estes comandos irão instalar todas as dependencias necessarias.

2. **Inicie os container**

    No diretório raiz do projeto, execute:

     ```bash
     docker-compose up -d

3. **Acesse a API**

  - Auth API: http://localhost:3002
  - User API: http://localhost:3003
  - Post API: http://localhost:3001

## Fluxo de Uso

### Página de Login

- Registrar-se através do endpoint /auth/register.
- Realizar login em /auth/login para receber o token JWT.
- Enviar token no cabeçalho Authorization: Bearer seu-token-jwt para acessar as rotas protegidas.
- Gerenciar posts e usuários utilizando o token.

### Proteção de Rotas

Rotas como a de administração estão protegidas. Se um usuário não estiver autenticado e tentar acessar uma rota protegida, ele não consiguirá.

---

## Documentação

A documentação completa do projeto pode ser acessada [aqui](docs/API-Documentação-Postman.pdf).

---
