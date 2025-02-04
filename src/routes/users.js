import { Router } from 'express';
import db from '../database.js';
import { verifyToken } from '../utils/auth.js';
import { restrictToAdmin } from '../middlewares/rbac.js';
import UserRepository from '../repositories/user.repository.js';
import UserController from '../controllers/user.controller.js';

const router = Router();
const userRepository = new UserRepository(db);
const userController = new UserController (userRepository);

// Sign up
router.post('/signup', async (req, res) => userController.create(req, res));

// Sign in
router.post('/signin', async (req, res) => userController.signIn(req, res));

// Get all users (needs JWT validation, only admins)
router.get('/', verifyToken, restrictToAdmin, async (req, res) => userController.findAll(req, res));

export default router;
