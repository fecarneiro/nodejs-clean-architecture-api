import { Router } from 'express';
import { verifyToken } from '../utils/auth.js';

export default function commentRoutes(commentController) {
    const router = Router();

    // Create new comment - needs JWT validation
    router.post('/', verifyToken, async (req, res) => commentController.create(req, res));

    // List all comments - needs JWT validation
    router.get('/', verifyToken, async (req, res) => commentController.findAll(req, res));

    return router;
}
