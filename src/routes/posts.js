import { Router } from 'express';
import db from '../database.js';
import { verifyToken } from '../utils/auth.js';
import PostRepository from '../repositories/post.repository.js';

const router = Router();
const postRepository = new PostRepository(db);

// Criar novo post - protegido por JWT
router.post('/', verifyToken, async(req, res) => {
    const { content } = req.body;
    const user_id = req.user.id;

    if (!content) {
        return res.status(400).json({ error: 'Conteúdo é obrigatório.' });
    
    }
    try {
        const post = await postRepository.createPost(user_id, content);
        res.status(201).json(post);
    } catch (error) {
        console.error('Erro ao criar post:', error);
        res.status(500).json({ error: 'Erro ao criar post.' });
    }  
});


// Listar todos os posts - protegido por JWT
router.get('/', verifyToken, async(req, res) => {
    try {
        const posts = await postRepository.findAll();
        res.status(201).json(posts);
    } catch (error) {
        console.error('Erro ao criar post:', error);
        res.status(500).json({ error: 'Erro ao criar post.' });
    }  
});

export default router;