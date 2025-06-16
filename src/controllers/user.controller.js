import { generateToken } from '../middlewares/auth.js';

class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    // Method to sign up
    async create(req, res) {
        // Extract username, password and role from request body
        const { username, password, role = 'user' } = req.body;

        // Check if username and password are provided
        if (!username || !password) {
          return res
            .status(400)
            .json({ error: 'Username and password are required.' });
        }

        try {
            //Call the create method from the UserRepository
            const user = await this.userRepository.create(username, password, role);
            //Success response
            res.status(201).json(user);

        } catch (error) {
            //Treatment of errors
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

    // Method to update an account (username and role are required)
    async update(req, res) {
        const { id } = req.params;
        const { username, role } = req.body;

        // Validate required fields
        if (!username || !role) {
            return res.status(400).json({ error: 'Username and role are required.' });
        }

        try {
            const user = await this.userRepository.update(id, username, role);
            res.status(200).json(user);
        } catch (error) {
            console.error('Error updating user:', error);
            if (error.message === 'User not found.') {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: 'Error updating user.' });
        }
    };

    // Method to delete a user (admin)
    async delete(req, res) {
        const { id } = req.params;

        try {
            const user = await this.userRepository.delete(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Error deleting user.' });
        }
    };
}

export default UserController;
