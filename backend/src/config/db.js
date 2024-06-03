// config/database.js
const dotenv = require("dotenv");
dotenv.config();

const Pool = require("pg").Pool;

const pool = new Pool({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: 5432,
    // ssl: {
    //   require: true,
    // },
});
  
// async function getPostgresVersion() {
//     const client = await pool.connect();
//     try {
//       const response = await client.query('SELECT version()');
//       console.log(response.rows[0]);
//     } finally {
//       client.release();
//     }
// }
  
// getPostgresVersion();

module.exports = pool;