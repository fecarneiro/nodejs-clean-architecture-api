import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Function to generate JWT when signing in
export function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    });
}

// Verify token middleware
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // Checks if the token was sent in the header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token not provided or invalid' });
    }
    
    // Isolates "Bearer " from Authorization header
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Adds user infos to the request for later use
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};
