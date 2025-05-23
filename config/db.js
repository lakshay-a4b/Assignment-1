import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: "5432",
    database: "postgres",
});

pool.on('connect', () => console.log('PostgreSQL connected'));
pool.on('error', (err) => console.error('PostgreSQL error', err));

export default pool;