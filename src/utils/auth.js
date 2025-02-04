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
    // Checks if the token was sent in the header and in the correct format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token not provided or invalid' });
    }
    
    // Extracts the token from the Authorization header (removes "Bearer ")
    const token = authHeader.split(' ')[1];

    try {
        // Verifies and decodes the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Adds the user information to the request for later use
        req.user = decoded;
        // Proceeds to the next middleware or controller
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};
