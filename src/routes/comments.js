import { Router } from 'express';
<<<<<<< HEAD
import db from '../database.js';
import { verifyToken } from '../utils/auth.js';
import CommentRepository from '../repositories/comment.repository.js';
import CommentController from '../controllers/comment.controller.js';

const router = Router();
const commentRepository = new CommentRepository(db);
const commentController = new CommentController(commentRepository);

// Create new comment - needs JWT validation
router.post('/', verifyToken, async (req, res) => commentController.create(req, res));

// List all comments - needs JWT validation
router.get('/', verifyToken, async (req, res) => commentController.findAll(req, res));

export default router;

=======
import { verifyToken } from '../utils/auth.js';

export default function commentRoutes(commentController) {
    const router = Router();

    // Create new comment - needs JWT validation
    router.post('/', verifyToken, async (req, res) => commentController.create(req, res));

    // List all comments - needs JWT validation
    router.get('/', verifyToken, async (req, res) => commentController.findAll(req, res));

    return router;
}
>>>>>>> 37a2cdd (fix: controllers, repositories)
