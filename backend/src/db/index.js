// db/index.js
const pool = require('../config/db');

// Set up your database connection
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Error connecting to PostgreSQL', err));

// Perform migrations (example using Knex.js)
// const knex = require('knex')(config);
// knex.migrate.latest()
//   .then(() => console.log('Migrations ran successfully'))
//   .catch((err) => console.error('Error running migrations', err));

module.exports = pool;
