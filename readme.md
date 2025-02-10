# **Backend CRUD API with RBAC**

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/CRUD)
</div>

## **🎯 Overview**
A REST API built with Node.js that implements user authentication, role-based access control (RBAC), and full CRUD operations for users, posts, and comments. The project follows clean architecture principles and industry best practices.

## **🌟 Key Features**
- Clean Architecture and SOLID Principles
- JWT Authentication
- Role-Based Access Control (RBAC)
- Repository Pattern Implementation
- Dependency Injection
- SQLite Database Integration
- Comprehensive API Documentation

## **⚙️ Technical Stack**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: Bcrypt
- **Package Manager**: Bun

## **🏗️ Architecture**

### Project Structure
```
CRUD/
├── src/
│   ├── controllers/        # Business logic
│   ├── middlewares/       # RBAC & auth middleware
│   ├── repositories/      # Data access layer
│   ├── routes/           # API endpoints
│   ├── app.js           # Application entry point
│   ├── database.js      # Database configuration
│   └── roles.js         # RBAC definitions
├── .env                # Environment variables
└── package.json        # Project dependencies
```

## **🚀 Getting Started**

### Prerequisites
- Node.js (v16+)
- SQLite3
- Bun (optional)

### Installation
1. Clone the repository
```bash
git clone https://github.com/feelipino/CRUD.git
cd CRUD
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your values
```

4. Start the server
```bash
bun run dev
# or
npm run dev
```

## **🔒 Security Features**

### Authentication
- JWT-based authentication
- Secure password hashing with bcrypt
- Token expiration management

### Role-Based Access Control
- **Admin Role**: Full system access
- **User Role**: Limited to specific operations
- Middleware-based permission checks

## **📡 API Endpoints**

### Authentication
```
POST /users/signup - Register new user
POST /users/signin - Authenticate user
```

### Users
```
GET /users - List all users (Admin only)
```

### Posts
```
GET /posts - List all posts
POST /posts - Create new post (Auth required)
```

### Comments
```
GET /comments - List all comments
POST /comments - Add comment to post (Auth required)
```

## **💾 Database Schema**

### Users
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
)
```

### Posts
```sql
CREATE TABLE posts (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    content TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
)
```

### Comments
```sql
CREATE TABLE comments (
    id INTEGER PRIMARY KEY,
    post_id INTEGER,
    user_id INTEGER,
    content TEXT,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
)
```

## **📚 Implementation Details**

### Repository Pattern
- Abstracted data access layer
- Simplified testing and maintenance
- Centralized database operations

### Dependency Injection
- Loose coupling between components
- Enhanced testability
- Flexible component replacement

## **🔄 API Response Examples**

### Successful Authentication
```json
{
  "token": "eyJhbGciOiJ...",
  "user": {
    "id": 1,
    "username": "user123",
    "role": "user"
  }
}
```

## **🔜 Future Improvements**
- [ ] Implement automated tests with Playwright
- [ ] Unit tests
