import { BaseRepository } from './base.repository.js';

class PostRepository extends BaseRepository {
    constructor(db) {
        super('posts', db);
    }

    // Método para criar um novo post
    createPost(user_id, content) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${this.tableName} (user_id, content) VALUES (?, ?)`;
            this.db.run(query, [user_id, content], function (err) {
                if (err) {
                    console.error('Erro ao criar post:', err);
                    return reject(new Error('Erro ao criar post.'));
                }
                resolve({ id: this.lastID, user_id, content });
            });
        });
    }

    // Método para listar todos os posts
    findAll() {
        return new Promise((resolve, reject) => {
            const query = `
            SELECT posts.id, posts.content, posts.user_id, users.username
            FROM ${this.tableName}
            JOIN users ON posts.user_id = users.id;}
            `
            this.db.all(query, [], (err, rows) => {
                if (err) {
                    console.error('Erro ao listar posts:', err);
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
}

export default PostRepository;