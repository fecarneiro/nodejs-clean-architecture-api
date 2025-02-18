import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.js';

export default function commentRoutes(commentController) {
    const router = Router();
    router.use(verifyToken);

    // Create new comment
    router.post('/', async (req, res) => commentController.create(req, res));

    // List all comments
    router.get('/', async (req, res) => commentController.findAll(req, res));

    // Update comment
    router.put('/:id', async (req, res) => commentController.update(req, res));

    // Delete comment
    router.delete('/:id', async (req, res) => commentController.delete(req, res));

    return router;
}
