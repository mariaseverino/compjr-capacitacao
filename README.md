src
|- app
| |- controllers
| |- middlewares
| |- schemas
|- config
|- database

├── Codigo
│ ├── backend
│ │ └── **tests**
│ │ └── database
│ │ └── unitarios
│ │ └── validação
│ └── frontend
├── Padrões Adotados
└── Requisitos
└── Diagramas de Projeto
└── Diagrama de Caso de Uso
└── Diagrama de Classe
└── Diagrama de Implantação
└── Diagrama de Sequencia

├── src
│ ├── app
│ │ ├── controllers
│ │ ├── middlewares
│ │ └── schemas
│ ├── config
│ └── database

services:

    mongo:
        image: mongo
        container_name: mongo-test
        restart: always
        ports:
            - 27017:27017
        environment:
            MONGO_INITDB_ROOT_USERNAME: root
            MONGO_INITDB_ROOT_PASSWORD: senha

    mongo-express:
        image: mongo-express
        container_name: mongo-express-test
        restart: always
        ports:
            - 8081:8081
        environment:
            MONG_INITDB_ROOT_USERNAME: root
            MONG_INITDB_ROOT_PASSWORD: senha
