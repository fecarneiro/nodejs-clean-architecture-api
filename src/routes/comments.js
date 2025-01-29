import { Router } from 'express';
import db from '../database.js';
import { verifyToken } from '../utils/auth.js';
import CommentRepository from '../repositories/comment.repository.js';

const router = Router();
const commentRepository = new CommentRepository(db);

//Criar novo comentário - protegido por JWT
router.post('/', verifyToken, async(req, res) => {
    const { post_id, content } = req.body;
    const user_id = req.user.id;

    if (!post_id || !content) {
        return res.status(400).json({ error: 'Post ID e conteúdo do comentário são obrigatórios.' });
    }

      try {
        const comment = await commentRepository.createComment(post_id, user_id, content);
        res.status(201).json(comment);

      } catch (error) {
        console.error('Erro ao criar comentário:', error);
        res.status(500).json({ error: 'Erro ao criar comentário.' });
      }
});


// Listar todos os comentários - protegido por JWT
router.get('/', verifyToken, async(req, res) => {
    try {
        const comments = await commentRepository.findAll();
        res.status(201).json(comments);
    } catch (error) {
        console.error('Erro ao listar comentários.', error);
        res.status(500).json({ error: 'Erro ao listar comentários.' });
    }  
});

export default router;
