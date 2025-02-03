import { Router } from 'express';
import db from '../database.js';
import { verifyToken } from '../utils/auth.js';
import PostRepository from '../repositories/post.repository.js';
import PostController from '../controllers/post.controller.js';

const router = Router();
const postRepository = new PostRepository(db);
const postController = new PostController(postRepository);

// Create new post - protected by JWT
router.post('/', verifyToken, (req, res) => postController.create(req, res));

// List all posts - protected by JWT
router.get('/', verifyToken, (req, res) => postController.findAll(req, res));

export default router;