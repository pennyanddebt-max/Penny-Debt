const db = require('../config/db');
const bcrypt = require('bcryptjs');

const name = 'Karanveer Singh';
const email = 'karanveer@company.com';
const password = 'Aujla@1422';
const role = 'master';

async function createMasterEmployee() {
  try {
    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);
    // Add role column if not exists
    await db.promise().query(
      "ALTER TABLE employee_logins ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'employee'"
    ).catch(() => {}); // Ignore error if column exists
    // Insert master employee
    const [result] = await db.promise().query(
      'INSERT INTO employee_logins (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );
    console.log('Master employee created in employee_logins:', result.insertId);
    process.exit(0);
  } catch (err) {
    console.error('Error creating master employee:', err.message);
    process.exit(1);
  }
}

createMasterEmployee();
