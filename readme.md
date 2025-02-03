# **Backend Project Documentation**

## **Description**
This project is a backend API built with Node.js and SQLite, offering authentication, user management, posts, and comments functionalities. The API uses JWT-based authentication to protect specific routes. Additionally, the project implements a role-based access control (**RBAC**) system with two main roles: **ADMIN** and **USER**.

---

## **Project Structure**

The project structure is organized as follows:

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

## **Setup and Installation**

1. **Prerequisites**:
  - Node.js installed (version 16 or higher).
  - SQLite3 installed on the system or included as a dependency.
  - `bun` package manager installed (optional).

2. **Clone the Repository**:
  ```bash
  git clone <REPOSITORY_URL>
  cd backend
  ```

3. **Install Dependencies**:
  ```bash
  npm install
  ```

4. **Environment Configuration**:
  Create a `.env` file at the root of the project with the following variables:
  ```
  JWT_SECRET=<your_secret_key>
  JWT_EXPIRATION=1000h
  ```

5. **Start the Server**:
  - With `bun`:
    ```bash
    bun run dev
    ```
  - With `npm`:
    ```bash
    npm run dev
    ```

6. The server will be running at: `http://localhost:3000`.

---

## **Role-Based Access Control (RBAC)**

### **Available Roles**
1. **ADMIN**  
  - Full access to all routes and actions: `create`, `read`, `update`, `delete`.
  - Can access exclusive routes, such as the route that lists all users.

2. **USER**  
  - Can access all common routes, such as creating posts, reading posts, and updating some resources.
  - Cannot access routes restricted to administrators, for example, the route listing all users.

---

## **API Routes**

### **1. User Routes (`/users`)**
#### **POST /signup**
- **Description**: Registers a new user.
- **Body**:
  ```json
  {
   "username": "string",
   "password": "string"
  }
  ```
- **Response**: 
  ```json
  {
   "id": "number",
   "username": "string",
   "role": "string"
  }
  ```
  By default, if no role is specified, the `role` value will be `"user"`.

#### **POST /signin**
- **Description**: Authenticates an existing user.
- **Body**:
  ```json
  {
   "username": "string",
   "password": "string"
  }
  ```
- **Response**:
  ```json
  {
   "message": "Login successful",
   "token": "string",
   "user": {
    "id": "number",
    "username": "string",
    "role": "string"
   }
  }
  ```

#### **GET /**
- **Description**: Lists all users (protected route, ADMIN only).
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response (for ADMIN)**:
  ```json
  [
   {
    "id": "number",
    "username": "string",
    "role": "string"
   }
  ]
  ```
- **Error (for USER)**:
  ```json
  {
   "error": "Access denied! Only administrators can access this route."
  }
  ```

---

### **2. Post Routes (`/posts`)**
#### **GET /**
- **Description**: Lists all posts with author information.
- **Response**:
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
- **Description**: Creates a new post (protected route).
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
- **Response**:
  ```json
  {
   "id": "number",
   "user_id": "number",
   "username": "string",
   "content": "string"
  }
  ```

---

### **3. Comment Routes (`/comments`)**
#### **GET /**
- **Description**: Lists all comments with author and related post information.
- **Response**:
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
- **Description**: Creates a new comment on a post (protected route).
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
- **Response**:
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

## **Database**

The database uses SQLite and is automatically initialized in the `database.js` file. Tables are created if they do not exist.

### Table Structure

1. `users` table:
  - `id`: Primary key.
  - `username`: Unique username.
  - `password`: Encrypted password.
  - `role`: User role in the system (`admin` or `user`).

2. `posts` table:
  - `id`: Primary key.
  - `user_id`: Relationship with the `users` table.
  - `content`: Post content.

3. `comments` table:
  - `id`: Primary key.
  - `post_id`: Relationship with the `posts` table.
  - `user_id`: Relationship with the `users` table.
  - `content`: Comment content.

---

## **Repositories**

The `repositories` folder contains the implementation of the repository pattern, which abstracts data access logic and facilitates code maintenance and testing.

### `repositories` Folder Structure

1. **`base.repository.js`**:
  - Base class defining common methods for all repositories.

2. **`comment.repository.js`**:
  - Specific repository for the `comments` table.
  - Methods to create and list comments, including related information from `users` and `posts`.

3. **`post.repository.js`**:
  - Specific repository for the `posts` table.
  - Methods to create and list posts, including author information.

4. **`user.repository.js`**:
  - Specific repository for the `users` table.
  - Methods to create, list, and authenticate users.

---
## **Controllers**
// DRAFT
- Dependencies injection
- db → PostRepository → PostController → Routes


.....
.....
.....
.....
.....
.....
.....
.....
.....
.....
Flow Summary
Request →
Route Handler →
Verify Token Middleware →
Controller Method →
Repository Method →
Database →
Response Back Through Chain
---

## **Utils**

### File: `utils/auth.js`
The `auth.js` file, located in the `utils/` folder, contains functions related to JWT authentication.

#### Available Functions

1. **`generateToken(user)`**
  - Generates a JWT token for authentication.
  - Parameters: Object containing user information (e.g., `{ id, username, role }`).
  - Returns: A signed JWT token as a string.

2. **`verifyToken(req, res, next)`**
  - Middleware to verify the validity of a JWT token sent in the request header.
    - Checks if the header contains a token in the correct format (`Bearer <token>`).
    - Decodes and validates the token using the secret key defined in `.env`.
    - Adds the decoded user information (`req.user`) to the request for later use.
    - Possible responses:
     - Error `401`: Token not provided or invalid.
     - Error `403`: Token invalid or expired.

#### Example Usage in Routes

```javascript
import { verifyToken } from '../utils/auth.js';

router.get('/protected-route', verifyToken, (req, res) => {
   res.json({ message: 'Access granted!', user: req.user });
});
```

---

## **Roles File (roles.js)**

#### File: `src/roles.js`
Defines roles and their permissions. For this project, there are only two roles:

```javascript
export const roles = {
   admin: ['create', 'read', 'update', 'delete'],
   user: ['create', 'read', 'update']
};
```
- `admin`: Has full access to all routes.
- `user`: Can create, read, and update, but cannot access `admin` exclusive routes.

---

## **RBAC Middleware**

#### File: `src/middlewares/rbac.js`
Implements role-based access control:

```javascript
import { roles } from '../roles.js';

export function checkRolePermission(action) {
   return (req, res, next) => {
      const userRole = req.user?.role;
      if (!roles[userRole] || !roles[userRole].includes(action)) {
        return res.status(403).json({ error: 'Access denied! You do not have permission to perform this action.' });
      }
      next();
   };
}

export function restrictToAdmin(req, res, next) {
   const userRole = req.user?.role;
   if (userRole !== 'admin') {
      return res.status(403).json({ error: 'Access denied! Only administrators can access this route.' });
   }
   next();
}

export default checkRolePermission;
```

- **`checkRolePermission(action)`**: Checks if the user's role (`userRole`) has permission for the requested action (`create`, `read`, `update`, `delete`).
- **`restrictToAdmin(req, res, next)`**: Blocks access if the user's role is not `admin`.

---

## **Dependencies**

### Production:
- `express`: Framework for building the API.
- `sqlite3`: Embedded database.
- `bcrypt`: Password hashing.
- `jsonwebtoken`: JWT generation and validation.
- `dotenv`: Environment variable management.

### Development:
- `@playwright/test`: Automated testing.
- `@types/node`: Type definitions for Node.js.

---

## **Tests**

Tests are located in the `/tests` folder. To run automated tests (if configured):
```bash
npx playwright test
```

---