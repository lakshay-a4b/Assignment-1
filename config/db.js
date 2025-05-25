import { Pool } from "pg";

const pool = new Pool({
    user: "youruser",
    password: "yourpass",
    host: "localhost",
    port: "5432",
    database: "yourdbname",
});

pool.on('connect', () => console.log('PostgreSQL connected'));
pool.on('error', (err) => console.error('PostgreSQL error', err));

export default pool;