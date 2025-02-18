import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.js';

export default function postRoutes(postController) {
    const router = Router();
    // JWT Validation for all endpoints
    router.use(verifyToken);
    
    // Create new post
    router.post('/', async (req, res) => postController.create(req, res));

    // List all posts
    router.get('/', async (req, res) => postController.findAll(req, res));

    // Update post
    router.put('/:id', async (req, res) => postController.update(req, res));

    // Delete post
    router.delete('/:id', async (req, res) => postController.delete(req, res));
    
    return router;
}

