// src/models/db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'oliver',
  host: 'localhost',
  database: 'proyect_jwt',
  password: 'admin123',
  port: 5432,
});

export default pool;
