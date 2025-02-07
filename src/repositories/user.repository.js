import { BaseRepository } from './base.repository.js';
import bcrypt from 'bcrypt';

class UserRepository extends BaseRepository {
    constructor(db) {
        super('users', db);
    }

    // Method to create a new account (with encrypted password)
<<<<<<< HEAD
    createUser(username, password, role = 'user') {
=======
    create(username, password, role = 'user') {
>>>>>>> 37a2cdd (fix: controllers, repositories)
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${this.tableName} (username, password, role) VALUES (?, ?, ?)`;
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return reject(err);
                }
                this.db.run(query, [username, hashedPassword, role], function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve({ id: this.lastID, username, role });
                });
            });
        });
    }

    // Method for credentials verification
    findByCredentials(username, password) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${this.tableName} WHERE username = ?`;
            this.db.get(query, [username], (err, row) => {
                if (err) {
                    return reject(err);
                }
                if (row) {
                    bcrypt.compare(password, row.password, (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        if (result) {
                            resolve(row);
                        } else {
                            resolve(null);
                        }
                    });
                } else {
                    resolve(null);
                }
            });
        });
    }

    // Method to list all accounts
    findAll() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${this.tableName}`;
            this.db.all(query, [], (err, rows) => {
                if (err) {
                    console.error('Error fetching users:', err);
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
}

export default UserRepository;