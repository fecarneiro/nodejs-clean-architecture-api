import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.js';
import { cacheMiddleware } from '../middlewares/cache.js';
import { responseTimeLogger } from '../middlewares/responseTimeLogger.js';

export default function postRoutes(postController) {
    const router = Router(); 
    router.use(verifyToken); // JWT Validation for all '/posts' endpoints
    
    // Create new post
    router.post('/', async (req, res) => postController.create(req, res));

    // List all posts
    router.get('/', responseTimeLogger, cacheMiddleware('posts'), async (req, res) => postController.findAll(req, res));

    // Update post
    router.put('/:id', async (req, res) => postController.update(req, res));

    // Delete post
    router.delete('/:id', async (req, res) => postController.delete(req, res));
    
    return router;
}

