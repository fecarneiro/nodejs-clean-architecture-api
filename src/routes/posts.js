import { Router } from 'express';
import db from '../database.js';
import { verifyToken } from '../utils/auth.js';
import PostRepository from '../repositories/post.repository.js';

const router = Router();
const postRepository = new PostRepository(db);

// Create new post - protected by JWT
router.post('/', verifyToken, async(req, res) => {
    const { content } = req.body;
    const user_id = req.user.id;

    if (!content) {
        return res.status(400).json({ error: 'Content is required.' });
    
    }
    try {
        const post = await postRepository.createPost(user_id, content);
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Error creating post.' });
    }  
});


// List all posts - protected by JWT
router.get('/', verifyToken, async(req, res) => {
    try {
        const posts = await postRepository.findAll();
        res.status(201).json(posts);
    } catch (error) {
        console.error('Error listing posts:', error);
        res.status(500).json({ error: 'Error listing posts.' });
    }  
});

export default router;