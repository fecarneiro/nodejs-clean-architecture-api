import { Router } from 'express';
import { verifyToken } from '../utils/auth.js';
<<<<<<< HEAD
import PostRepository from '../repositories/post.repository.js';
import PostController from '../controllers/post.controller.js';

const router = Router();
const postRepository = new PostRepository(db);
const postController = new PostController(postRepository);

// Create new post - needs JWT validation
router.post('/', verifyToken, (req, res) => postController.create(req, res));

// List all posts - needs JWT validation
router.get('/', verifyToken, (req, res) => postController.findAll(req, res));

export default router;
=======

export default function postRoutes(postController) {
    const router = Router();

    // Create new post - needs JWT validation
    router.post('/', verifyToken, (req, res) => postController.create(req, res));

    // List all posts - needs JWT validation
    router.get('/', verifyToken, (req, res) => postController.findAll(req, res));

    return router;
}

>>>>>>> 37a2cdd (fix: controllers, repositories)
