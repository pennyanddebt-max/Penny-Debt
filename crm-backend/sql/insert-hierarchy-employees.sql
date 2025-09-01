-- Sample data for employees hierarchy
-- Admin (top level)
INSERT INTO employees (name, email, password, role, department, manager_id) VALUES
('Alice Admin', 'admin@pennydebt.in', '$2b$10$adminhash', 'admin', 'Management', NULL);

-- Team Leads reporting to Admin
INSERT INTO employees (name, email, password, role, department, manager_id) VALUES
('Bob TeamLead', 'teamlead@pennydebt.in', '$2b$10$teamleadhash', 'teamlead', 'Sales', 1),
('Carol TeamLead', 'teamlead2@pennydebt.in', '$2b$10$teamleadhash2', 'teamlead', 'Marketing', 1);

-- Marketing, HR, Verifier, Tech, Support, Shared, Recovery, Legal, Operations, Advisor reporting to Team Leads
INSERT INTO employees (name, email, password, role, department, manager_id) VALUES
('Dave Marketing', 'marketing@pennydebt.in', '$2b$10$marketinghash', 'marketing', 'Marketing', 2),
('Eve HR', 'hr@pennydebt.in', '$2b$10$hrhash', 'hr', 'HR', 2),
('Frank Verifier', 'verifier@pennydebt.in', '$2b$10$verifierhash', 'verifier', 'Verification', 2),
('Grace Tech', 'tech@pennydebt.in', '$2b$10$techhash', 'tech', 'Tech', 2),
('Heidi Support', 'support@pennydebt.in', '$2b$10$supporthash', 'support', 'Support', 2),
('Ivan Shared', 'shared@pennydebt.in', '$2b$10$sharedhash', 'shared', 'Shared', 2),
('Judy Recovery', 'recovery@pennydebt.in', '$2b$10$recoveryhash', 'recovery', 'Recovery', 2),
('Mallory Legal', 'legal@pennydebt.in', '$2b$10$legalhash', 'legal', 'Legal', 3),
('Niaj Operations', 'operations@pennydebt.in', '$2b$10$operationshash', 'operations', 'Operations', 3),
('Oscar Advisor', 'advisor@pennydebt.in', '$2b$10$advisorhash', 'advisor', 'Advisory', 3);

-- Note: Replace the password hashes with real bcrypt hashes in production.
-- manager_id refers to the id of the manager in the employees table.
-- You can add more employees and adjust manager_id for deeper hierarchy.
