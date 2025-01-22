### Documentação do Projeto Backend

#### **Descrição**
Este projeto é uma API backend construída com Node.js e SQLite, que oferece funcionalidades de autenticação, gerenciamento de usuários, posts e comentários. A API utiliza autenticação baseada em JWT para proteger rotas específicas.

---

## **Estrutura do Projeto**

A estrutura do projeto está organizada da seguinte forma:

```
backend/
├── crud/
│   ├── node_modules/
│   ├── roles/ (não utilizado por enquanto)
├── src/
│   ├── routes/
│   │   ├── users.js
│   │   ├── posts.js
│   │   ├── comments.js
│   ├── utils/
│   ├── app.js
│   ├── database.js
├── tests/
├── tests-examples/
├── .env
├── .gitignore
├── database.db
├── package.json
├── package-lock.json
├── playwright.config.ts
```

---

## **Configuração e Instalação**

1. **Pré-requisitos**:
   - Node.js instalado (versão 16 ou superior).
   - SQLite3 instalado no sistema ou incluído como dependência.
   - Gerenciador de pacotes `bun` instalado (opcional).

2. **Clonar o Repositório**:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd backend
   ```

3. **Instalar Dependências**:
   ```bash
   npm install
   ```

4. **Configuração do Ambiente**:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```
   JWT_SECRET=<sua_chave_secreta>
   JWT_EXPIRATION=1000h
   ```

5. **Iniciar o Servidor**:
   - Com `bun`:
     ```bash
     bun run dev
     ```
   - Com `npm`:
     ```bash
     npm run dev
     ```

6. O servidor estará rodando em: `http://localhost:3000`.

---

## **Rotas da API**

### **1. Rotas de Usuários (`/users`)**
#### **POST /signup**
- **Descrição**: Registra um novo usuário.
- **Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Resposta**: 
  ```json
  {
    "id": "number",
    "username": "string"
  }
  ```

#### **POST /signin**
- **Descrição**: Autentica um usuário existente.
- **Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Resposta**:
  ```json
  {
    "message": "Login bem-sucedido",
    "token": "string",
    "user": {
      "id": "number",
      "username": "string"
    }
  }
  ```

#### **GET /**
- **Descrição**: Lista todos os usuários.
- **Resposta**: 
  ```json
  [
    {
      "id": "number",
      "username": "string"
    }
  ]
  ```

---

### **2. Rotas de Posts (`/posts`)**
#### **GET /**
- **Descrição**: Lista todos os posts com informações do autor.
- **Resposta**:
  ```json
  [
    {
      "id": "number",
      "content": "string",
      "user_id": "number",
      "username": "string"
    }
  ]
  ```

#### **POST /**
- **Descrição**: Cria um novo post (rota protegida).
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Body**:
  ```json
  {
    "content": "string"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": "number",
    "user_id": "number",
    "username": "string",
    "content": "string"
  }
  ```

---

### **3. Rotas de Comentários (`/comments`)**
#### **GET /**
- **Descrição**: Lista todos os comentários com informações do autor e post relacionado.
- **Resposta**:
  ```json
  [
    {
      "id": "number",
      "content": "string",
      "post_id": "number",
      "user_id": "number",
      "username": "string"
    }
  ]
  ```

#### **POST /**
- **Descrição**: Cria um novo comentário em um post (rota protegida).
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Body**:
  ```json
  {
    "post_id": "number",
    "content": "string"
  }
  ```
- **Resposta**:
  ```json
  {
    "id": "number",
    "post_id": "<post_id>",
    "user_id": "<user_id>",
    "username": "<username>",
    "content": "<content>"
  }
  ```

---

## **Banco de Dados**

O banco de dados utiliza SQLite e é inicializado automaticamente no arquivo `database.js`. As tabelas são criadas se não existirem.

### Estrutura das Tabelas

1. Tabela `users`:
   - `id`: Chave primária.
   - `username`: Nome único do usuário.
   - `password`: Senha criptografada.

2. Tabela `posts`:
   - `id`: Chave primária.
   - `user_id`: Relacionamento com a tabela `users`.
   - `content`: Conteúdo do post.

3. Tabela `comments`:
   - `id`: Chave primária.
   - `post_id`: Relacionamento com a tabela `posts`.
   - `user_id`: Relacionamento com a tabela `users`.
   - `content`: Conteúdo do comentário.

---

## Dependências

### Produção:
- `express`: Framework para construção da API.
- `sqlite3`: Banco de dados embutido.
- `bcrypt`: Hashing de senhas.
- `jsonwebtoken`: Geração e validação de tokens JWT.
- `dotenv`: Gerenciamento de variáveis de ambiente.

### Desenvolvimento:
- `@playwright/test`: Testes automatizados.
- `@types/node`: Tipagem para Node.js.

---

## Testes

Os testes estão localizados na pasta `/tests`. Para executar testes automatizados (se configurados):
```bash
npx playwright test
```