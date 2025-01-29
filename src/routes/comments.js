import { Router } from 'express';
import db from '../database.js';
import { verifyToken } from '../utils/auth.js';
import CommentRepository from '../repositories/comment.repository.js';

const router = Router();
const commentRepository = new CommentRepository(db);

// Create new comment - protected by JWT
router.post('/', verifyToken, async (req, res) => {
    const { post_id, content } = req.body;
    const user_id = req.user.id;

    if (!post_id || !content) {
        return res.status(400).json({ error: 'Post ID and comment content are required.' });
    }

    try {
        const comment = await commentRepository.createComment(post_id, user_id, content);
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: 'Error creating comment.' });
    }
});

// List all comments - protected by JWT
router.get('/', verifyToken, async (req, res) => {
    try {
        const comments = await commentRepository.findAll();
        res.status(201).json(comments);
    } catch (error) {
        console.error('Error listing comments:', error);
        res.status(500).json({ error: 'Error listing comments.' });
    }
});

export default router;

