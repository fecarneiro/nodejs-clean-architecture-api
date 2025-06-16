import { BaseRepository } from './base.repository.js';

class CommentRepository extends BaseRepository {
    constructor(db) {
        super('comments', db);
    }

    // Method to create a comment
    create(post_id, user_id, content) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${this.tableName} (user_id, post_id, content) VALUES (?, ?, ?)`;
            this.db.run(query, [user_id, post_id, content], function(err) {
                if (err) {
                    console.error('Error creating comment:', err);
                    return reject(err);
                }
                resolve({ id: this.lastID, user_id, post_id, content });
            });
        });
    }

    // Method to get all comments
    findAll() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT comments.id, comments.content, comments.user_id, comments.post_id,
                       users.username, posts.content as post_content
                FROM ${this.tableName}
                JOIN users ON comments.user_id = users.id
                JOIN posts ON comments.post_id = posts.id
                ORDER BY comments.id DESC
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

    // Method to update a comment
    update(id, content) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE ${this.tableName} SET content = ? WHERE id = ?`;
            this.db.run(query, [content, id], function (err) {
                if (err) {
                    console.error('Error updating comment:', err);
                    return reject(new Error('Error updating comment.'));
                }
                resolve({ id, content });
            });
        });
    }

    // Method to delete a comment
    delete(id) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
            this.db.run(query, [id], function (err) {
                if (err) {
                    console.error('Error deleting comment:', err);
                    return reject(new Error('Error deleting comment.'));
                }
                resolve({ id });
            });
        });
    }
}

export default CommentRepository;
