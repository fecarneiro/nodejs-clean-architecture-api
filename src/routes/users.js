import { Router } from 'express';
import db from '../database.js';
import { generateToken, verifyToken } from '../utils/auth.js';
import { restrictToAdmin } from '../middlewares/rbac.js';
import UserRepository from '../repositories/user.repository.js';

const router = Router();
const userRepository = new UserRepository(db);

// SIGN UP (creates account with encrypted password)
router.post('/signup', async (req, res) => {
    const { username, password, role = 'user' } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const user = await userRepository.createUser(username, password, role);
        res.status(201).json(user);
    } catch (error) {
        if (error.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Username is already taken.' });
        }
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Error creating user.' });
    }
});

// SIGN IN (generates JWT token)
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const user = await userRepository.findByCredentials(username, password);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.status(200).json({ user, token });
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Error authenticating user.' });
    }
});

// GET ALL (admin)
router.get('/', verifyToken, restrictToAdmin, async (req, res) => {
    try {
        const users = await userRepository.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users.' });
    }
});

export default router;
