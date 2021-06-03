import mariadb from 'mariadb';

class DatabaseClass {
  pool = null;
  getPool() {
    if (!this.pool) {
      this.pool = mariadb.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 5
      })
    }
    return this.pool;
  }
}

export const db = new DatabaseClass();