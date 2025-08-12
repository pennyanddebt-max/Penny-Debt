-- Insert a dummy customer for testing
INSERT INTO customers (
  name, email, phone, password, address, subscriptionStatus, subscriptionStart, subscriptionEnd, documents, dashboardData, role, status
) VALUES (
  'Test User',
  'testuser@example.com',
  '+911234567890',
  '$2b$10$6qyBwKbR/fOZOBhKn3Vl3ubfvr/mOa8NnUnWCMxTdU4yiSQSFPHMu', -- bcrypt hash for 'password123'
  '123 Test Street, Test City',
  'active',
  NOW(),
  DATE_ADD(NOW(), INTERVAL 1 MONTH),
  '{"aadhar":"uploaded.pdf"}',
  '{"progress":0}',
  'customer',
  'active'
);
-- SQL to insert a dummy customer for login testing
INSERT INTO customers (name, email, password, phone)
VALUES ('Dummy User', 'dummyuser@example.com', 'dummy123', '9999999999');
