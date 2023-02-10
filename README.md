# Apé Safari Urbano 

Aplicativo para dispositivos móveis que permite a avaliação de calçadas no município de Jardim/MS.
                                                
## Como usar

1. [Requisitos](#1-requisitos)
2. [Instalação](#2-instalação)
3. [Acesso](#3-acesso)

## 1. Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Fastify](https://www.fastify.io)
- [Prisma](https://www.prisma.io)
- [React Native](https://reactnative.dev)
- [Expo](https://expo.dev)


## 2. Instalação

**2.1.** Clone o repositório:

```bash
    git clone https://github.com/ptersnow/ape-safari-urbano.git
```

**2.2.** Vá até a pasta local que foi criada contendo o servidor do projeto:

```bash
    cd ape-safari-urbano/server
```

**2.3.** Instalação das dependências do projeto com npm:

```bash
    npm install
```

**2.4.** Faça uma cópia do arquivo `.env.example` e renomeie para `.env`:

**2.5.** Configure a conexão com os dados do banco de dados no arquivo `.env`:

    DATABASE_URL="file:./dev.db"

**2.6.** Execute o prisma para criar as tabelas e popular o banco de dados

```bash
    npx prisma migrate dev
```

**2.7.** Execute o servidor que vai armazenar os dados:

```bash
    npm run dev
```

**2.8.** Em outro terminal, vá até a pasta local que foi criada contendo o projeto aplicativo:

```bash
    cd ape-safari-urbano/mobile
```

**2.9.** Faça uma cópia do arquivo `.env.example` e renomeie para `.env`:

**2.10.** Configure a conexão com os dados do banco de dados no arquivo `.env`:

    CLIENT_ID=INSERIR A SUA CHAVE DO GOOGLE_ID
    API_URL=http://10.9.1.181:3333


**2.11.** Instalação das dependências do projeto com npm:

```bash
    npm install
```

**2.9.** Iniciar a aplicação
```
    expo start
```

