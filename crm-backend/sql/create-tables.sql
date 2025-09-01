
CREATE TABLE IF NOT EXISTS loan_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  amount DECIMAL(12,2),
  product VARCHAR(100),
  purpose VARCHAR(255),
  details JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS careers_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(100),
  email VARCHAR(100),
  resume_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employees table with hierarchy, department, and RBAC
CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  department VARCHAR(50),
  manager_id INT,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);

-- Roles table for RBAC (optional, for extensibility)
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description VARCHAR(255)
);

-- Employee_Roles mapping (for many-to-many, if needed)
CREATE TABLE IF NOT EXISTS employee_roles (
  employee_id INT,
  role_id INT,
  PRIMARY KEY (employee_id, role_id),
  FOREIGN KEY (employee_id) REFERENCES employees(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Example hierarchy/roles: Admin, TeamLead, Marketing, HR, Verifier, Tech, Support, Shared, Recovery, Legal, Operations, Advisor, Customer

-- Sample insert for roles (add more as needed)
INSERT IGNORE INTO roles (name, description) VALUES
('admin', 'System Administrator'),
('teamlead', 'Team Lead'),
('marketing', 'Marketing Department'),
('hr', 'Human Resources'),
('verifier', 'Verification Team'),
('tech', 'Technical Team'),
('support', 'Support Team'),
('shared', 'Shared Services'),
('recovery', 'Recovery Team'),
('legal', 'Legal Department'),
('operations', 'Operations Department'),
('advisor', 'Advisor'),
('customer', 'Customer');

CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password VARCHAR(255),
  address VARCHAR(255),
  subscriptionStatus VARCHAR(20),
  subscriptionStart DATETIME,
  subscriptionEnd DATETIME,
  documents JSON,
  dashboardData JSON,
  role VARCHAR(20) DEFAULT 'customer',
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  loanType VARCHAR(50),
  loanAmount DECIMAL(12,2),
  currentEMI DECIMAL(12,2),
  monthlyIncome DECIMAL(12,2),
  source VARCHAR(50),
  status VARCHAR(20),
  assignedTo INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customerId INT,
  advisorId INT,
  plan JSON,
  status VARCHAR(20),
  progress JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customerId) REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customerId INT,
  amount DECIMAL(12,2),
  date DATETIME,
  status VARCHAR(20),
  renewal BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customerId) REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS advisors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS legal_executives (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS operations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS chats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  senderId INT,
  receiverId INT,
  message TEXT,
  timestamp DATETIME
);

CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(20),
  recipientId INT,
  status VARCHAR(20),
  message TEXT
);

-- Add more tables as needed for RBAC, team_leads, admins, etc.
