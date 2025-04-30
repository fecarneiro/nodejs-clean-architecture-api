import { roles } from '../roles.js';

export function checkRolePermission(action) {
    return (req, res, next) => {
        const userRole = req.user.role; // Extract user role from JWT token

        // Check if the user's role allows the requested action
        if (!roles[userRole] || !roles[userRole].includes(action)) {
            return res.status(403).json({ error: 'Access denied! You do not have permission to perform this action.' });
        }
        next();
    };
}

export function restrictToAdmin(req, res, next) {
    const userRole = req.user.role; // Extract user role from JWT token

    if (userRole !== 'admin') {
        return res.status(403).json({ error: 'Access denied! Only administrators can access this route.' });
    }

    next();
}

export default restrictToAdmin;
