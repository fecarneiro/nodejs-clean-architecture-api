import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.js';

export default function commentRoutes(commentController) {
    const router = Router();

    // Create new comment - needs JWT validation
    router.post('/', verifyToken, async (req, res) => commentController.create(req, res));

    // List all comments - needs JWT validation
    router.get('/', verifyToken, async (req, res) => commentController.findAll(req, res));

    // Update comment - needs JWT validation
    router.put('/:id', verifyToken, async (req, res) => commentController.update(req, res));

    // Delete comment - needs JWT validation
    router.delete('/:id', verifyToken, async (req, res) => commentController.delete(req, res));

    return router;
}
