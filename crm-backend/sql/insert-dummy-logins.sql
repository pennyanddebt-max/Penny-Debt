-- Dummy employee logins for all roles (password: password123, bcrypt hash for demo)
INSERT INTO employees (name, email, password, role, department, manager_id) VALUES
('Admin User', 'admin@pennydebt.in', '$2b$10$2b2b2b2b2b2b2b2b2b2b2e2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b', 'admin', 'Management', NULL),
('Team Lead', 'teamlead@pennydebt.in', '$2b$10$2b2b2b2b2b2b2b2b2b2b2e2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b', 'teamlead', 'Sales', 1),
('Marketing User', 'marketing@pennydebt.in', '$2b$10$2b2b2b2b2b2b2b2b2b2b2e2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b', 'marketing', 'Marketing', 2),
('HR User', 'hr@pennydebt.in', '$2b$10$2b2b2b2b2b2b2b2b2b2b2e2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b', 'hr', 'HR', 2),
('Verifier User', 'verifier@pennydebt.in', '$2b$10$2b2b2b2b2b2b2b2b2b2b2e2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b', 'verifier', 'Verification', 2),
('Tech User', 'tech@pennydebt.in', '$2b$10$2b2b2b2b2b2b2b2b2b2b2e2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b', 'tech', 'Tech', 2),
('Support User', 'support@pennydebt.in', '$2b$10$2b2b2b2b2b2b2b2b2b2b2e2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b', 'support', 'Support', 2),
('Shared User', 'shared@pennydebt.in', '$2b$10$2b2b2b2b2b2b2b2b2b2b2e2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b', 'shared', 'Shared', 2),
('Recovery User', 'recovery@pennydebt.in', '$2b$10$2b2b2b2b2b2b2b2b2b2b2e2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b', 'recovery', 'Recovery', 2),
('Legal User', 'legal@pennydebt.in', '$2b$10$2b2b2b2b2b2b2b2b2b2b2e2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b', 'legal', 'Legal', 2),
('Operations User', 'operations@pennydebt.in', '$2b$10$2b2b2b2b2b2b2b2b2b2b2e2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b', 'operations', 'Operations', 2),
('Advisor User', 'advisor@pennydebt.in', '$2b$10$2b2b2b2b2b2b2b2b2b2b2e2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b', 'advisor', 'Advisory', 2);
-- Password for all: password123 (hash is for demo, replace in production)
