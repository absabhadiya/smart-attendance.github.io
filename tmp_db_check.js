const { pool } = require('./database/db');
(async () => {
    try {
        const res = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'subjects'");
        console.log('Columns in subjects table:', res.rows.map(r => r.column_name));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
