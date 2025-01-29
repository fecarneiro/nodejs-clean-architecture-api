# **Documentação do Projeto Backend**

## **Descrição**
Este projeto é uma API backend construída com Node.js e SQLite, que oferece funcionalidades de autenticação, gerenciamento de usuários, posts e comentários. A API utiliza autenticação baseada em JWT para proteger rotas específicas. Além disso, o projeto implementa um sistema de controle de acesso baseado em papéis (**RBAC**) com dois papéis principais: **ADMIN** e **USER**.

---

## **Estrutura do Projeto**

A estrutura do projeto está organizada da seguinte forma:

```
CRUD/
├── node_modules/
├── src/
│ ├── middlewares/
│ │ ├── rbac.js
│ ├── repositories/
│ │ ├── base.repository.js
│ │ ├── comment.repository.js
│ │ ├── post.repository.js
│ │ ├── user.repository.js
│ ├── routes/
│ │ ├── users.js
│ │ ├── posts.js
│ │ ├── comments.js
│ ├── utils/
│ │ ├── auth.js
│ ├── roles.js
│ ├── app.js
│ ├── database.js
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

## **Controle de Acesso Baseado em Papéis (RBAC)**

### **Papéis Disponíveis**
1. **ADMIN**  
   - Acesso total a todas as rotas e ações: `create`, `read`, `update`, `delete`.
   - Pode acessar rotas exclusivas, como a rota que lista todos os usuários.

2. **USER**  
   - Pode acessar todas as rotas comuns, como criar posts, ler posts e atualizar alguns recursos.
   - Não pode acessar rotas restritas a administradores, por exemplo, a rota de listagem de todos os usuários.

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
    "username": "string",
    "role": "string"
  }
  ```
  Por padrão, se nenhum papel for especificado, o valor de `role` será `"user"`.

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
      "username": "string",
      "role": "string"
    }
  }
  ```

#### **GET /**
- **Descrição**: Lista todos os usuários (rota protegida, apenas para ADMIN).
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Resposta (para ADMIN)**:
  ```json
  [
    {
      "id": "number",
      "username": "string",
      "role": "string"
    }
  ]
  ```
- **Erro (para USER)**:
  ```json
  {
    "error": "Acesso negado! Apenas administradores podem acessar esta rota."
  }
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
    "id": "<number>",
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
   - `role`: Papel do usuário no sistema (`admin` ou `user`).

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

## **Repositórios**

A pasta `repositories` contém a implementação do padrão de repositório, que abstrai a lógica de acesso a dados e facilita a manutenção e testes do código.

### Estrutura da Pasta `repositories`

1. **`base.repository.js`**:
   - Classe base que define métodos comuns para todos os repositórios.

2. **`comment.repository.js`**:
   - Repositório específico para a tabela `comments`.
   - Métodos para criar e listar comentários, incluindo informações relacionadas de `users` e `posts`.

3. **`post.repository.js`**:
   - Repositório específico para a tabela `posts`.
   - Métodos para criar e listar posts, incluindo informações do autor.

4. **`user.repository.js`**:
   - Repositório específico para a tabela `users`.
   - Métodos para criar, listar e autenticar usuários.

---

## **Utils**

### Arquivo: `utils/auth.js`
O arquivo `auth.js`, localizado na pasta `utils/`, contém funções relacionadas à autenticação utilizando JWT.

#### Funções Disponíveis

1. **`generateToken(user)`**
   - Gera um token JWT para autenticação.
   - Parâmetros: Objeto contendo as informações do usuário (exemplo: `{ id, username, role }`).
   - Retorno: Um token JWT assinado como string.

2. **`verifyToken(req, res, next)`**
   - Middleware para verificar a validade de um token JWT enviado no cabeçalho da requisição.
     - Verifica se o cabeçalho contém um token no formato correto (`Bearer <token>`).
     - Decodifica e valida o token usando a chave secreta definida em `.env`.
     - Adiciona as informações do usuário decodificado (`req.user`) à requisição para uso posterior.
     - Respostas possíveis:
       - Erro `401`: Token não fornecido ou inválido.
       - Erro `403`: Token inválido ou expirado.

#### Exemplo de Uso em Rotas

```javascript
import { verifyToken } from '../utils/auth.js';

router.get('/rota-protegida', verifyToken, (req, res) => {
    res.json({ message: 'Acesso permitido!', user: req.user });
});
```

---

## **Arquivo de Papéis (roles.js)**

#### Arquivo: `src/roles.js`
Define os papéis e suas permissões. Para este projeto, existem apenas dois papéis:

```javascript
export const roles = {
    admin: ['create', 'read', 'update', 'delete'],
    user: ['create', 'read', 'update']
};
```
- `admin`: Tem acesso total a todas as rotas.
- `user`: Pode criar, ler e atualizar, mas não pode acessar rotas exclusivas de `admin`.

---

## **Middleware RBAC**

#### Arquivo: `src/middlewares/rbac.js`
Implementa o controle de acesso baseado em papéis:

```javascript
import { roles } from '../roles.js';

export function checkRolePermission(action) {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!roles[userRole] || !roles[userRole].includes(action)) {
            return res.status(403).json({ error: 'Acesso negado! Você não tem permissão para realizar esta ação.' });
        }
        next();
    };
}

export function restrictToAdmin(req, res, next) {
    const userRole = req.user?.role;
    if (userRole !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado! Apenas administradores podem acessar esta rota.' });
    }
    next();
}

export default checkRolePermission;
```

- **`checkRolePermission(action)`**: Verifica se o papel do usuário (`userRole`) possui permissão para a ação solicitada (`create`, `read`, `update`, `delete`).
- **`restrictToAdmin(req, res, next)`**: Bloqueia o acesso caso o papel do usuário não seja `admin`.

---

## **Dependências**

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

## **Testes**

Os testes estão localizados na pasta `/tests`. Para executar testes automatizados (se configurados):
```bash
npx playwright test
```

---

Este documento consolida todas as funcionalidades do projeto, incluindo o sistema de autenticação JWT, o controle de acesso baseado em papéis (RBAC) e as rotas criadas para gerenciar usuários, posts e comentários. Sinta-se livre para adaptar ou estender a implementação conforme necessário!