import { generateToken } from '../utils/auth.js';

class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    // Method to sign up
    async create(req, res) {
        const { username, password, role = 'user' } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        try {
<<<<<<< HEAD
            const user = await this.userRepository.createUser(username, password, role);
=======
            const user = await this.userRepository.create(username, password, role);
>>>>>>> 37a2cdd (fix: controllers, repositories)
            res.status(201).json(user);
        } catch (error) {
            if (error.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: 'Username is already taken.' });
            }
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Error creating user.' });
        }
    };

    // Method to sign in, generates JWT
    async signIn(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required.' });
        }

        try {
            const user = await this.userRepository.findByCredentials(username, password);
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials.' });
            }

            const token = generateToken(user);
            res.status(200).json({ user, token });
        } catch (error) {
            console.error('Error authenticating user:', error);
            res.status(500).json({ error: 'Error authenticating user.' });
        }
    };

    // Method to list all accounts (admin)
    async findAll(req, res) {
        try {
            const users = await this.userRepository.findAll();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Error fetching users.' });
        }
    };
}

export default UserController;
   


