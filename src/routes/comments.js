import { Router } from 'express';
import db from '../database.js';
import { verifyToken } from '../utils/auth.js';

const router = Router();

// GET: Listar todos os comentários
router.get('/', (req, res) => {
    const query = `
        SELECT comments.id, comments.content, comments.post_id, comments.user_id, users.username 
        FROM comments 
        JOIN users ON comments.user_id = users.id
    `;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Erro ao buscar comentários.' });
        }
        res.status(200).json(rows);
    });
});

// POST: Criar novo comentário (Protegido)
router.post('/', verifyToken, (req, res) => {
    const { post_id, content } = req.body;

    if (!post_id || !content) {
        return res.status(400).json({ error: 'Post ID e conteúdo são obrigatórios.' });
    }

    const userId = req.user.id;  // Obtendo o ID do usuário autenticado via token

    const query = 'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)';
    db.run(query, [post_id, userId, content], function (err) {
        if (err) {
            return res.status(500).json({
                error: 'Erro ao registrar comentário no DB.',
                details: err.message 
                });
        }

        res.status(201).json({
            id: this.lastID,
            post_id,
            user_id: userId,
            username: req.user.username, // Extraindo username do token JWT
            content });
    });
});

export default router;
