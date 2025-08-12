const db = require('../config/db');

const createTables = async () => {
  try {
    await db.promise().query(`CREATE TABLE IF NOT EXISTS customer_logins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )`);

    await db.promise().query(`CREATE TABLE IF NOT EXISTS employee_logins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      employee_id VARCHAR(100) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )`);

    await db.promise().query(`CREATE TABLE IF NOT EXISTS applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255),
      email VARCHAR(255),
      mobile VARCHAR(50),
      location VARCHAR(255),
      debt_amount DECIMAL(15,2),
      monthly_income DECIMAL(15,2),
      existing_emis DECIMAL(15,2),
      incomeSource VARCHAR(255),
      occupation VARCHAR(255),
      debtType VARCHAR(255),
      additionalNotes TEXT,
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    console.log('All required tables created or already exist.');
    process.exit(0);
  } catch (err) {
    console.error('Error creating tables:', err);
    process.exit(1);
  }
};

createTables();
