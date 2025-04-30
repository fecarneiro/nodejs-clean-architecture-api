# **Backend CRUD API with RBAC and JWT**

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

## **🎯 Overview**
This is a REST API built with Node.js that implements user authentication, role-based access control (RBAC), and complete CRUD operations for users, posts, and comments. The project follows clean architecture principles and software best practices.

## **🌟 Main Features**
- Clean Architecture & SOLID Principles: The application follows "Clean Architecture" principles, promoting separation of concerns and making the codebase maintainable and scalable, as well as SOLID principles, which are a set of best practices for object-oriented software design.
- JWT (JSON Web Tokens) Authentication
- Role-Based Access Control (RBAC)
- Repository Pattern Implementation
- Dependency Injection
- SQLite Database Integration
- Cache Middleware for Performance Optimization
- Response Time Monitoring

## **⚙️ Tech Stack**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: Bcrypt
- **Package Managers**: NPM/Bun
- **Containerization**: Docker

## **🏗️ Architecture**

### Project Structure
```
CRUD/
├── src/
│   ├── controllers/        # Business logic
│   │   ├── user.controller.js
│   │   ├── post.controller.js
│   │   └── comment.controller.js
│   ├── middlewares/        # RBAC & authentication middlewares
│   │   ├── auth.js
│   │   ├── rbac.js
│   │   ├── cache.js
│   │   └── responseTimeLogger.js
│   ├── repositories/       # Data access layer
│   │   ├── base.repository.js
│   │   ├── user.repository.js
│   │   ├── post.repository.js
│   │   └── comment.repository.js
│   ├── routes/             # API endpoints
│   │   ├── users.js
│   │   ├── posts.js
│   │   └── comments.js
│   ├── app.js              # Application entry point
│   ├── database.js         # Database configuration
│   └── roles.js            # RBAC definitions
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── .env                    # Environment variables
└── package.json            # Project dependencies
```

## **🚀 Getting Started**

### Prerequisites
- Node.js (v16+)
- Docker and Docker Compose (optional)
- Git

### Installation with Docker

1. Clone the repository
```bash
git clone https://github.com/feelipino/CRUD.git
cd CRUD
```

2. Using Docker Compose
```bash
docker-compose up -d
```

The server will be available at `http://localhost:3000`.

## **🔒 Authentication and Authorization System**

### Roles and Permissions
The system implements two types of roles:

- **Admin**: Full access (create, read, update, delete)
- **User**: Limited access (create, read)

### Authentication Flow

1. **Account Creation (Signup)**
  ```
  POST /users/signup
  ```
  
  **Request Body:**
  ```json
  {
    "username": "your_username",
    "password": "your_password",
    "role": "admin" // or "user" (default is "user" if not specified)
  }
  ```
  
  **Response:**
  ```json
  {
    "id": 1,
    "username": "your_username",
    "role": "admin"
  }
  ```

2. **Login (Signin)**
  ```
  POST /users/signin
  ```
  
  **Request Body:**
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
  
  **Response:**
  ```json
  {
    "user": {
     "id": 1,
     "username": "your_username",
     "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

3. **Using the JWT Token**

  After logging in, you will receive a JWT token that must be included in the `Authorization` header of all requests that require authentication:

  ```
  Authorization: Bearer your_jwt_token
  ```

## **📡 API Endpoints**

### Users
| Method | Endpoint | Description | Authentication | Permission |
| ------ | -------- | ----------- | -------------- | ---------- |
| POST | /users/signup | Register new user | No | Public |
| POST | /users/signin | Authenticate user | No | Public |
| GET | /users | List all users | Yes | Admin |
| PUT | /users/:id | Update user | Yes | Admin |
| DELETE | /users/:id | Delete user | Yes | Admin |

### Posts
| Method | Endpoint | Description | Authentication | Permission |
| ------ | -------- | ----------- | -------------- | ---------- |
| GET | /posts | List all posts | Yes | Admin, User |
| POST | /posts | Create new post | Yes | Admin, User |
| PUT | /posts/:id | Update post | Yes | Admin |
| DELETE | /posts/:id | Delete post | Yes | Admin |

### Comments
| Method | Endpoint | Description | Authentication | Permission |
| ------ | -------- | ----------- | -------------- | ---------- |
| GET | /comments | List all comments | Yes | Admin, User |
| POST | /comments | Create new comment | Yes | Admin, User |
| PUT | /comments/:id | Update comment | Yes | Admin |
| DELETE | /comments/:id | Delete comment | Yes | Admin |

## **🔄 Usage Examples**

### 1. Creating an admin user
```bash
curl -X POST http://localhost:3000/users/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123", "role": "admin"}'
```

### 2. Authenticating and obtaining the JWT token
```bash
curl -X POST http://localhost:3000/users/signin \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

Response:
```json
{
  "user": {
   "id": 1,
   "username": "admin",
   "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 3. Creating a post (with authentication)
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_jwt_token" \
  -d '{"content": "This is my first post!"}'
```

### 4. Listing all posts (with authentication)
```bash
curl -X GET http://localhost:3000/posts \
  -H "Authorization: Bearer your_jwt_token"
```

### 5. Creating a comment on a post (with authentication)
```bash
curl -X POST http://localhost:3000/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_jwt_token" \
  -d '{"post_id": 1, "content": "Great post!"}'
```

## **🔧 Additional Resources**

### JWT Token Duration
The JWT token is valid for 100 hours by default, as configured in the `.env` file.

### Cache
The API implements a caching system to improve performance, especially for frequent read operations.

### Response Time Monitoring
The `responseTimeLogger` middleware measures and logs the response time of each request, helping to identify potential bottlenecks.

## **🔍 Testing**

To run the tests (when implemented):
```bash
npm test
# or
bun test
```

## **🛠️ Troubleshooting**

### Invalid or expired JWT token
If you receive an "Invalid or expired token" error, log in again to obtain a new token.

### Permission denied
Check if the user has the appropriate role (admin or user) for the operation you are trying to perform.

### Corrupted database
If the SQLite database becomes corrupted, you can delete the `database.db` file and restart the server to create a new database.

## **📄 License**
This project is licensed under the MIT license.