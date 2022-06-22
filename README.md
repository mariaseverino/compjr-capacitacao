# Capacitação Backend CompJunior

<div align="center">
<a target="_blank" href="https://icons8.com/icon/116707/vassoura"><img alt="livro" src="./assets/vassoura.png" ></a>

</div>

<div align="center">
  <p>
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/mariaseverino/compjr-capacitacao?color=39C2D8&logoColor=39C2D8&style=for-the-badge">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/mariaseverino/compjr-capacitacao?color=39C2D8&logoColor=39C2D8&style=for-the-badge">
  </p>
</div>

<p align="center">
    <a href="#">Sobre</a> •
    <a href="#">Requisitos mínimos</a> •
    <a href="#">Para ir além</a> •
    <a href="#">Tecnologias</a>

</p>

<p align="center">
    <a href="#">Estrutura de diretórios</a> •
    <a href="#">Como executar o projeto</a>
</p>

## ✨ Sobre

Desafio desenvolvido para a capacitação de backend da CompJunior. CRUD para um aplicativo de contratação de faxineiros.

## 📌 Especificações mínimas

-   [x] O projeto deve ter no mínimo 1 schema e 1 controller;
-   [x] Deve conter no mínimo 1 CRUD completo;
-   [x] Documentação no Swagger;
-   [x] Deve ser possível testar todas as requisições;

## 🚀 Para ir além

-   [x] Criar usuário, com e-mail e senha e realizar login;
-   [x] Mandar imagem com foto do usuário na mesma rota em que ele é criado;
-   [x] Ter uma rota que só pode ser acessado com token de autenticação;
-   [x] Ter um usuário administrador que terá permissões diferentes de um usuário comum;
-   [x] Função de recuperar senha;
-   [x] Fazer com que o usuário receba um email automático;

## ⚡️ Tecnologias

-   Node
-   MongoDB
-   Mongoose
-   Express
-   Nodemon
-   Bcryptjs
-   Crypto
-   Swagger
-   Nodemailer
-   Slugify
-   Multer
-   Jsonwebtoken

## 🗃️ Estrutura de diretórios

```
├── assets
├── src
│   ├── app
│   │    ├── controllers
│   │    ├── middlewares
│   │    └── schemas
│   ├── config
│   ├── database
│   ├── modules
│   ├── resources
│   │    └── mail
│   │        └── auth
│   ├── utils
│   ├── index.js
│   ├── routes.js
│   ├── swagger.js
│   └── uploads
│       └── images
```

## 🤔 Como executar o projeto

### 🚨 Pré requisito

Antes de começar, você vai precisar ter instalado em sua máquina o [Node.js](https://nodejs.org/).

```bash
# Clone este repositório
$ git clone https://github.com/mariaseverino/compjr-capacitacao.git

# Acesse a pasta do projeto
$ cd compjr-capacitacao

# Instale as dependências
$ npm install

# Execute a aplicação
$ npm start

# Rodando em http://localhost:3333
```

## 📝 Acessando documentação

```bash
# Acesse
http://localhost:3333/api-doc
```
