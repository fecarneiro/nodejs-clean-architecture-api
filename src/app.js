import express from 'express';
import db from './database.js';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import UserRepository from './repositories/user.repository.js';
import PostRepository from './repositories/post.repository.js';
import CommentRepository from './repositories/comment.repository.js';
import UserController from './controllers/user.controller.js';
import PostController from './controllers/post.controller.js';
import CommentController from './controllers/comment.controller.js';

// Configuring the express server and variables
const app = express();
dotenv.config();
app.use(express.json());

// Creating instances of the repositories and controllers
const userRepository = new UserRepository(db);
const postRepository = new PostRepository(db);
const commentRepository = new CommentRepository(db);
const userController = new UserController(userRepository);
const postController = new PostController(postRepository);
const commentController = new CommentController(commentRepository);

// Configuring the routes
app.use('/users', userRoutes(userController));
app.use('/posts', postRoutes(postController));
app.use('/comments', commentRoutes(commentController));


// Initializing the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
