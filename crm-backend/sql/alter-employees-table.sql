-- Alter employees table to match latest schema for dummy logins
ALTER TABLE employees
ADD COLUMN name VARCHAR(100) NOT NULL AFTER id,
ADD COLUMN department VARCHAR(50) AFTER role,
ADD COLUMN manager_id INT AFTER department,
ADD COLUMN status VARCHAR(20) DEFAULT 'active' AFTER manager_id,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER status;
