import { Pool } from "pg";

/**
 * Singleton Pattern: Reutiliza a mesma Pool entre requisições
 * e sobrevive ao Hot Reload do Next.js em desenvolvimento
 */
let globalPool = global.pool;

if (!globalPool) {
  globalPool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
    max: 20, // Máximo de conexões no pool
    idleTimeoutMillis: 30000, // Fecha conexão idle após 30s
    connectionTimeoutMillis: 2000, // Timeout de conexão
  });

  global.pool = globalPool;
}

async function query(queryObject) {
  const pool = global.pool || globalPool;

  try {
    const result = await pool.query(queryObject);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export default {
  query: query,
};

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "development" ? false : true;
}
