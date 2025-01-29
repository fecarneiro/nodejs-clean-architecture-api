import { Router } from 'express';
import db from '../database.js';
import { generateToken, verifyToken } from '../utils/auth.js';
import { restrictToAdmin } from '../middlewares/rbac.js';
import UserRepository from '../repositories/user.repository.js';

const router = Router();
const userRepository = new UserRepository(db);

//SIGN UP (cria acc com senha criptografada)
router.post('/signup', async (req, res) => {
    const { username, password, role = 'user' } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username e password obrigatórios.' });
    }

    try {
        const user = await userRepository.createUser(username, password, role);
        res.status(201).json(user);
    } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Username já está em uso.' });
        }
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário.' });
    }  
});

//SIGN IN (gera token JWT)
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username e password obrigatórios.' });
    }

    try {
        const user = await userRepository.findByCredentials(username, password);
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = generateToken(user);
        res.status(200).json({ user, token });
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        res.status(500).json({ error: 'Erro ao autenticar usuário.' });
    }
});

// GET ALL (admin)
router.get('/', verifyToken, restrictToAdmin, async (req, res) => {
    try {
        const users = await userRepository.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ error: 'Erro ao autenticar usuários.' });
    }    
});

export default router;
