import { BaseRepository } from './base.repository.js';

class CommentRepository extends BaseRepository {

    constructor(db) {
        super('comments', db); // Calls BaseRepository constructor
    }

    // Method to create a new comment
    createComment(post_id, user_id, content) {
        return new Promise((resolve, reject) => {
            
            const query = `
                INSERT INTO ${this.tableName} (post_id, user_id, content)
                VALUES (?, ?, ?)
            `;
                
            this.db.run(query, [post_id, user_id, content], function (err) {
                if (err) {
                    console.error('Error creating comment:', err);
                    return reject(new Error('Error creating comment.'));
                }
                resolve({ id: this.lastID, post_id, user_id, content });
            });
        });
    }

    // Method to list all comments
    findAll() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    comments.id, 
                    comments.content, 
                    comments.post_id, 
                    comments.user_id, 
                    posts.content AS post_content,
                    users.username 
                FROM ${this.tableName}
                JOIN users ON comments.user_id = users.id
                JOIN posts ON comments.post_id = posts.id
            `;
            
            this.db.all(query, [], (err, rows) => {
                if (err) {
                    console.error('Error listing comments:', err);
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
}

export default CommentRepository;
