-- Penny & Debt CRM: Core Tables

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
