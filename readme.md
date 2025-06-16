# Node.js Clean Architecture REST API

A Node.js REST API built with Clean Architecture principles, featuring JWT authentication, Role-Based Access Control (RBAC), and comprehensive CRUD operations.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 🌟 Features

- **Clean Architecture**: Separation of concerns with clear layers (Controllers, Repositories, Middlewares)
- **SOLID Principles**: Object-oriented design principles for maintainable code
- **JWT Authentication**: Secure token-based authentication system
- **Role-Based Access Control**: Admin and User roles with different permissions
- **Password Encryption**: Bcrypt hashing with salt for secure password storage in database
- **Repository Pattern**: Abstracted data access layer
- **Dependency Injection**: Loose coupling between components
- **Performance Optimization**: Built-in caching and response time monitoring
- **Docker Support**: Containerized deployment ready
- **SQLite Database**: Lightweight, embedded database with encrypted password storage

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Docker and Docker Compose (optional but recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/feelipino/nodejs-clean-architecture-api
   cd nodejs-clean-architecture-api
   ```

2. **Using Docker (Recommended)**

   ```bash
   docker-compose up -d
   ```

3. **Using Node.js directly**

   ```bash
   npm install
   npm start
   ```

The API will be available at `http://localhost:3000`

> **Note**: The SQLite database (`database.db`) will be automatically created with all necessary tables on first run. All passwords are automatically encrypted using bcrypt before being stored in the database.

## 🏗️ Architecture

### Project Structure

```text
src/
├── controllers/              # Business logic layer
│   ├── user.controller.js
│   ├── post.controller.js
│   └── comment.controller.js
├── middlewares/              # Cross-cutting concerns
│   ├── auth.js               # JWT authentication
│   ├── rbac.js               # Role-based access control
│   ├── cache.js              # Response caching
│   └── responseTimeLogger.js # Performance monitoring
├── repositories/             # Data access layer
│   ├── base.repository.js
│   ├── user.repository.js
│   ├── post.repository.js
│   └── comment.repository.js
├── routes/                   # API route definitions
│   ├── users.js
│   ├── posts.js
│   └── comments.js
├── app.js                    # Application entry point
├── database.js               # Database configuration
└── roles.js                  # RBAC role definitions
```

### Key Design Patterns

- **Repository Pattern**: Abstracts data access logic
- **Dependency Injection**: Controllers receive repositories as dependencies
- **Middleware Pattern**: Cross-cutting concerns handled by Express middlewares
- **Clean Architecture**: Clear separation between business logic and infrastructure

## 🔐 Authentication & Authorization

### User Roles

| Role  | Permissions                   |
|-------|-------------------------------|
| Admin | Full system access: Create, Read, Update  |
| User  | Limited access: Create, Read              |

### Password Security

- **Bcrypt Encryption**: All passwords are hashed using bcrypt with salt rounds before database storage
- **Secure Comparison**: Password verification uses bcrypt's secure comparison methods
- **No Plain Text**: Raw passwords are never stored in the database

### Getting Started

1. **Create an Admin Account**

   ```bash
   curl -X POST http://localhost:3000/users/signup \
     -H "Content-Type: application/json" \
     -d '{"username": "admin", "password": "admin123", "role": "admin"}'
   ```

2. **Login and Get JWT Token**

   ```bash
   curl -X POST http://localhost:3000/users/signin \
     -H "Content-Type: application/json" \
     -d '{"username": "admin", "password": "admin123"}'
   ```

3. **Use Token in Requests**

   ```bash
   curl -X GET http://localhost:3000/posts \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

## 📡 API Reference

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users/signup` | Register new user | No |
| POST | `/users/signin` | Login user | No |

**Signup Request:**

```json
{
  "username": "john_doe",
  "password": "secure123",
  "role": "user"
}
```

**Signin Response:**

```json
{
  "user": {
    "id": 1,
    "username": "john_doe",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### User Management (Admin Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | List all users |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

### Posts

| Method | Endpoint | Description | Admin | User |
|--------|----------|-------------|-------|------|
| GET | `/posts` | List all posts | ✅ | ✅ |
| POST | `/posts` | Create post | ✅ | ✅ |
| PUT | `/posts/:id` | Update post | ✅ | ❌ |
| DELETE | `/posts/:id` | Delete post | ✅ | ❌ |

**Create Post:**

```json
{
  "content": "This is my first post!"
}
```

### Comments

| Method | Endpoint | Description | Admin | User |
|--------|----------|-------------|-------|------|
| GET | `/comments` | List all comments | ✅ | ✅ |
| POST | `/comments` | Create comment | ✅ | ✅ |
| PUT | `/comments/:id` | Update comment | ✅ | ❌ |
| DELETE | `/comments/:id` | Delete comment | ✅ | ❌ |

**Create Comment:**

```json
{
  "post_id": 1,
  "content": "Great post!"
}
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRATION=100h
```

### Docker Configuration

The project includes Docker configuration for easy deployment:

- **Dockerfile**: Multi-stage build for optimized image size
- **docker-compose.yml**: Complete stack with volume mounting for database persistence

## 🚀 Performance Features

### Caching

- **Built-in caching**: Automatic response caching for read operations
- **Configurable TTL**: Default 60-second cache lifetime
- **Smart cache keys**: URL-based cache key generation

### Monitoring

- **Response Time Logging**: Automatic performance monitoring
- **Request/Response Logging**: Detailed request logging for debugging

## 🧪 Development

### Available Scripts

```bash
npm start          # Start production server with Bun
npm run dev        # Start development server with nodemon
```

### Adding New Features

1. **Create Repository**: Extend `BaseRepository` for data access
2. **Create Controller**: Handle business logic and HTTP responses
3. **Define Routes**: Set up endpoints with appropriate middlewares
4. **Update Permissions**: Modify `roles.js` if needed

### Example: Adding a New Entity

```javascript
// 1. Create repository
class CategoryRepository extends BaseRepository {
    constructor(db) {
        super('categories', db);
    }
    // Add custom methods...
}

// 2. Create controller
class CategoryController {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    // Add controller methods...
}

// 3. Set up routes with middlewares
router.get('/', verifyToken, checkRolePermission('read'), controller.findAll);
```

## 🔒 Security

- **Password Hashing**: Bcrypt with salt rounds for secure password encryption in database
- **JWT Security**: Secure token generation and validation
- **Role-Based Access**: Granular permission system
- **Input Validation**: Request validation in controllers
- **Environment Variables**: Sensitive data in `.env` file
- **Database Security**: All sensitive data encrypted before storage

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,  -- Encrypted with bcrypt
    role TEXT DEFAULT 'user'
);
```

### Posts Table

```sql
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
```

### Comments Table

```sql
CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);
```

## 🐳 Deployment

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Considerations

- Use a production-grade database (PostgreSQL, MySQL)
- Set up proper logging and monitoring
- Configure reverse proxy (Nginx)
- Set up SSL/TLS certificates
- Use environment-specific configurations
- Implement database backup strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Clean Architecture principles
- Inspired by Domain-Driven Design
- Following SOLID principles for maintainable code
- Secure password handling with bcrypt encryption

---
