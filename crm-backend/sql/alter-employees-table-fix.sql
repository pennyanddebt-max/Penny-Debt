-- Add missing columns to employees table only if they do not exist
ALTER TABLE employees ADD COLUMN name VARCHAR(100) NOT NULL AFTER id;
ALTER TABLE employees ADD COLUMN department VARCHAR(50) AFTER role;
ALTER TABLE employees ADD COLUMN manager_id INT AFTER department;
ALTER TABLE employees ADD COLUMN status VARCHAR(20) DEFAULT 'active' AFTER manager_id;
