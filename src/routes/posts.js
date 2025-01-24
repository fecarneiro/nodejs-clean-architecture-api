import { Router } from 'express';
import db from '../database.js';
import { verifyToken } from '../utils/auth.js';


const router = Router();

// GET: Listar todos os posts com username e user_id
router.get('/', (req, res) => {
    const query = `
        SELECT posts.id, posts.content, posts.user_id, users.username 
        FROM posts 
        JOIN users ON posts.user_id = users.id
    `;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Erro ao buscar posts.' });
        }
        res.status(200).json(rows);
    });
});

// POST: Criar novo post (Protegido)
router.post('/', verifyToken, (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Conteúdo é obrigatório.' });
    }

    const userId = req.user.id;  // Extraindo o ID do usuário autenticado JWT

    const query = 'INSERT INTO posts (user_id, content) VALUES (?, ?)';
    db.run(query, [userId, content], function (err) {
        if (err) {
            return res.status(500).json({ 
                error: 'Erro ao realizar nova postagem no DB.',
                details: err.message 
            });
        }

        res.status(201).json({
            id: this.lastID,
            user_id: userId,
            username: req.user.username, // Extraindo username do JWT
            content
        });
    });
});

export default router;