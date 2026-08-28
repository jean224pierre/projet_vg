require('dotenv').config();
const { Pool } = require('pg');

// Render exige SSL pour se connecter à sa base Postgres managée depuis l'extérieur ;
// en local (Postgres non-Render), on désactive SSL.
const isRenderDb = (process.env.DATABASE_URL || '').includes('render.com');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: isRenderDb ? { rejectUnauthorized: false } : false
});

pool.on('error', function (err) {
    console.error('Erreur inattendue sur le pool Postgres:', err);
});

module.exports = pool;