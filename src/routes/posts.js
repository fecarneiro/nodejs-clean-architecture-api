import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.js';
import { cacheMiddleware } from '../middlewares/cache.js';
import { responseTimeLogger } from '../middlewares/responseTimeLogger.js';
import { checkRolePermission } from '../middlewares/rbac.js';

export default function postRoutes(postController) {
    const router = Router();
    router.use(verifyToken); // JWT Validation for all '/posts' endpoints

    // Create new post
    router.post('/', checkRolePermission('create'), async (req, res) =>
      postController.create(req, res)
    );

    // List all posts [with cache and response time logger]
    router.get(
      '/',
      responseTimeLogger,
      cacheMiddleware('posts'),
      checkRolePermission('read'),
      async (req, res) => postController.findAll(req, res)
    );

    // Update post
    router.put('/:id', checkRolePermission('update'), async (req, res) =>
      postController.update(req, res)
    );

    // Delete post
    router.delete('/:id', checkRolePermission('delete'), async (req, res) =>
      postController.delete(req, res)
    );

    return router;
}
