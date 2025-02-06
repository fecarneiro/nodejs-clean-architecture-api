import express from 'express';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import UserRepository from './repositories/user.repository.js';
import UserController from './controllers/user.controller.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import commentsRoutes from './routes/comments.js';

// Function from dotenv package to provide variables from .env
dotenv.config();

const app = express();

// Middleware → parse JSON
app.use(express.json());

// Creating the database connection
const db = new sqlite3.Database('./database.db');

// Creating the repository with the database connection
const userRepository = new UserRepository(db);

// Creating the controller with the repository
const userController = new UserController(userRepository);

// Middleware → Routes with controller injetcted
app.use('/users', userRoutes(userController));
app.use('/posts', postRoutes);
app.use('/comments', commentsRoutes);


// Middleware → Root route
app.get('/', (req, res) => {
    res.status(200).send('API is running!');
});

// Server port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
