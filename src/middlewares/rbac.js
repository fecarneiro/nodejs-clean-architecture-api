import { roles } from '../roles.js';

export function checkRolePermission(action) {
    return (req, res, next) => {
        const userRole = req.user.role; // Extrai user role do token JWT

        // Verifica se o papel do usuário permite a ação solicitada
        if (!roles[userRole] || !roles[userRole].includes(action)) {
            return res.status(403).json({ error: 'Acesso negado! Você não tem permissão para realizar esta ação.' });
        }
        next();
    };
}

export function restrictToAdmin(req, res, next) {
    const userRole = req.user.role; // Extrai user role do token JWT

    // Permite apenas usuários com papel "admin"
    if (userRole !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado! Apenas administradores podem acessar esta rota.' });
    }

    next();
}

export default restrictToAdmin;