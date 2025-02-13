import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.js';

export default function postRoutes(postController) {
    const router = Router();

    // Create new post - needs JWT validation
    router.post('/', verifyToken, (req, res) => postController.create(req, res));

    // List all posts - needs JWT validation
    router.get('/', verifyToken, (req, res) => postController.findAll(req, res));

    // Update post - needs JWT validation
    router.put('/', verifyToken, (req, res) => postController.update(req, res));

    // Delete post - needs JWT validation
    router.delete('/', verifyToken, (req, res) => postController.delete(req, res));
    
    return router;
}

