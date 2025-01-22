import { Router } from 'express';
import db from '../database.js';
import bcrypt from 'bcrypt';
import { generateToken, verifyToken } from '../utils/auth.js';

const router = Router();

//SIGN UP
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username e password obrigatórios.' });
    }

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';

        db.run(query, [username, hashedPassword], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'Username já está em uso.' });
                }
                return res.status(500).json({ error: 'Erro ao inserir usuário no DB.' });
            }


            res.status(201).json({id: this.lastID, username });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao processar solicitação' });
    }  
});

//SIGN IN
router.post('/signin', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username e password obrigatórios.' });
    }

    const query = 'SELECT * FROM users WHERE username = ?'
    db.get(query, [username], async (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao localizar usuário.'});
        }
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' })
        }

        try {
            // Verifica a senha
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ error: "Senha incorreta." })
            }

            // Gera o token JWT
            const token = generateToken({ id: user.id, username: user.username });
            
            // Retorna o token e informações básicas do usuário
            res.status(200).json({
                message: 'Login bem-sucedido',
                token, // Token JWT
                user: {
                    id: user.id,
                    username: user.username,
                },
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao processar a solicitação.'});
        }
    });
});

// GET
router.get('/', (req, res) => {
    const query = 'SELECT * FROM users';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Erro ao buscar usuários.' });
        }
        res.status(200).json(rows);
    });
});

export default router;
