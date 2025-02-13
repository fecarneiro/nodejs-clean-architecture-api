import { BaseRepository } from './base.repository.js';
import bcrypt from 'bcrypt';

class UserRepository extends BaseRepository {
    constructor(db) {
        super('users', db);
    }

    // Method to create a new account (with encrypted password)
    create(username, password, role = 'user') {
        return new Promise((resolve, reject) => {
            //Create SQL query
            const query = `INSERT INTO ${this.tableName} (username, password, role) VALUES (?, ?, ?)`;
            //Encrypt the password
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return reject(err);
                }
                //Execute the query in the database SQLite
                this.db.run(query, [username, hashedPassword, role], function (err) {
                    if (err) {
                        return reject(err);
                    }
                    //Return the new user created
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

    // Method to update an account (username, role)
    update(id, username, role) {
        return new Promise((resolve, reject) => {
            // Validate required fields
            if (!username || !role) {
                return reject(new Error('Username and role are required.'));
            }

            const query = `UPDATE ${this.tableName} SET username = ?, role = ? WHERE id = ?`;
            this.db.run(query, [username, role, id], function (err) {
                if (err) {
                    return reject(err);
                }
                if (this.changes === 0) {
                    return reject(new Error('User not found.'));
                }
                resolve({ id, username, role});
            });
        });
    }

    // Method to delete an account
    delete(id) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
            this.db.run(query, [id], function (err) {
                if (err) {
                    return reject(err);
                }
                if (this.changes === 0) {
                    return reject(new Error('User not found.'));
                }
                resolve({ id });
            });
        });
    }
}

export default UserRepository;