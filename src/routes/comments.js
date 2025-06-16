import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.js';
import { cacheMiddleware } from '../middlewares/cache.js';
import { responseTimeLogger } from '../middlewares/responseTimeLogger.js';
import { checkRolePermission } from '../middlewares/rbac.js';

export default function commentRoutes(commentController) {
    const router = Router();
    router.use(verifyToken);

    // Create new comment
    router.post('/', checkRolePermission('create'), async (req, res) =>
      commentController.create(req, res)
    );

    // List all comments
    router.get(
      '/',
      responseTimeLogger,
      cacheMiddleware('comments'),
      checkRolePermission('read'),
      async (req, res) => commentController.findAll(req, res)
    );

    // Update comment
    router.put('/:id', checkRolePermission('update'), async (req, res) =>
      commentController.update(req, res)
    );

    // Delete comment
    router.delete('/:id', checkRolePermission('delete'), async (req, res) =>
      commentController.delete(req, res)
    );

    return router;
}
