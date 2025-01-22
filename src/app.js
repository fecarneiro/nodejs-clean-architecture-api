import express from 'express';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import commentsRoutes from './routes/comments.js';
import dotenv from 'dotenv'

//Função do pacote dotenv para fornecer variáveis do .env
dotenv.config();

const app = express();

// Middleware → interpretar JSON
app.use(express.json());

// Middleware → Rota raiz
app.get('/', (req, res) => {
    res.status(200).send('API está rodando!');
});

// Middleware → Rotas
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentsRoutes);

// Porta do Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
