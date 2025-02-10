import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.js';
import { restrictToAdmin } from '../middlewares/rbac.js';

export default function userRoutes(userController) {
    const router = Router();

    // Sign up
    router.post('/signup', async (req, res) => userController.create(req, res));

    // Sign in
    router.post('/signin', async (req, res) => userController.signIn(req, res));

    // Update a user (needs JWT validation, only admins)
    router.put('/:id', verifyToken, restrictToAdmin, async (req, res) => userController.update(req, res));

    // Delete a user (needs JWT validation, only admins)
    router.delete('/:id', verifyToken, restrictToAdmin, async (req, res) => userController.delete(req, res));

    // Get all users (needs JWT validation, only admins)
    router.get('/', verifyToken, restrictToAdmin, async (req, res) => userController.findAll(req, res));

    return router;
}

