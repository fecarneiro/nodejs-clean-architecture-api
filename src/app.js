import express from 'express';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import UserRepository from './repositories/user.repository.js';
import PostRepository from './repositories/user.repository.js';
import CommentRepository from './repositories/user.repository.js';
import UserController from './controllers/user.controller.js';
import PostController from './controllers/user.controller.js';
import CommentController from './controllers/user.controller.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';

// Function from dotenv package to provide variables from .env
dotenv.config();

const app = express();

// Middleware → parse JSON
app.use(express.json());

// Creating the database connection
const db = new sqlite3.Database('./database.db');

// Creating the repository with the database connection
const userRepository = new UserRepository(db);
const postRepository = new PostRepository(db);
const commentRepository = new CommentRepository(db);

// Creating controllers with the repository
const userController = new UserController(userRepository);
const postController = new PostController(postRepository);
const commentController = new CommentController(commentRepository);

// Middleware → Routes with controller injetcted
app.use('/users', userRoutes(userController));
app.use('/posts', postRoutes(postController));
app.use('/comments', commentRoutes(commentController));

// Middleware → Root route
app.get('/', (req, res) => {
    res.status(200).send('API is running!');
});

// Server port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
