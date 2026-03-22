const { pool } = require('../database/db');
const fs = require('fs');
const path = require('path');

async function initDb() {
  console.log('Verifying database tables...');
  try {
    // Check if the students table exists
    const res = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'students'
      );
    `);

    if (!res.rows[0].exists) {
      console.log('Database tables not found. Initializing schema...');
      const schemaPath = path.join(__dirname, '../database/schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      await pool.query(schema);
      console.log('Database schema initialized successfully.');
    } else {
      console.log('Database tables already exist. Skipping initialization.');
    }
  } catch (err) {
    console.error('Error initializing database:', err.message);
    // Don't exit with error to allow the server to still try and start
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  initDb();
}

module.exports = initDb;
