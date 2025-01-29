import { BaseRepository } from './base.repository.js';
import bcrypt from 'bcrypt';

class UserRepository extends BaseRepository {
    constructor(db) {
        super('users', db);
    }

    // Método para criar uma nova conta
    createUser(username, password, role = 'user') {
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

    // Método para login de usuários
    findByCredentials(username, password) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${this.tableName} WHERE username = ?`;
            this.db.get(query, [username], (err, row) => {
                if (err) {
                    return reject(err);
                }
                // Código é executado se as credenciais forem encontradas no DB
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

    // Método para listar todos os usuários
    findAll() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${this.tableName}`;
            this.db.all(query, [], (err, rows) => {
                if (err) {
                    console.error('Erro ao buscar usuários:', err);
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
}

export default UserRepository;