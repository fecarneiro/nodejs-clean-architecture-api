import express from 'express';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import commentsRoutes from './routes/comments.js';
import dotenv from 'dotenv';

// Function from dotenv package to provide variables from .env
dotenv.config();

const app = express();

// Middleware → parse JSON
app.use(express.json());

// Middleware → Root route
app.get('/', (req, res) => {
    res.status(200).send('API is running!');
});

// Middleware → Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentsRoutes);

// Server port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
