import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config(); // Cargar .env antes de usar las variables

// Crear instancia del pool de conexión
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT), // asegurar que sea número
});

export default pool;
