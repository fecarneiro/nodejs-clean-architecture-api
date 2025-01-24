import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Função para gerar um token JWT
export function generateToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role // Adiciona o papel ao token
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
    });
}

// Middleware verify token
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // Verifica se o token foi enviado no cabeçalho e no formato correto
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido ou inválido'});
    }
    
    // Extrai o token do cabeçalho Authorization (remove "Bearer ")
    const token = authHeader.split(' ')[1];

    try {
        // Verifica e decodifica o token usando a chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
         // Adiciona as informações do usuário na requisição para uso posterior
        req.user = decoded;
        // Prossegue para o próximo middleware ou controlador
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido ou expirado' });
    }
};

