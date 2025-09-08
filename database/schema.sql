-- Database schema for Penny-Debt CRM system

-- Table for debt relief applications (ApplyForm.jsx)
CREATE TABLE debt_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    total_debt DECIMAL(12,2) NOT NULL,
    monthly_income DECIMAL(12,2) NOT NULL,
    loan_type ENUM('personal', 'credit-card', 'medical', 'business', 'multiple', 'other') NOT NULL DEFAULT 'personal',
    employment_status ENUM('employed', 'self-employed', 'unemployed', 'retired', 'student') NOT NULL DEFAULT 'employed',
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    message TEXT,
    agree_to_terms BOOLEAN NOT NULL DEFAULT FALSE,
    source VARCHAR(50) DEFAULT 'website',
    lead_type VARCHAR(50) DEFAULT 'debt_relief',
    status ENUM('new', 'contacted', 'qualified', 'converted', 'rejected') DEFAULT 'new',
    assigned_to INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Table for customer signups (Signup.jsx)
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    mobile VARCHAR(20),
    email_verified BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_mobile (mobile),
    INDEX idx_status (status)
);

-- Table for career applications (Careers.jsx)
CREATE TABLE career_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    resume_filename VARCHAR(255),
    resume_path VARCHAR(500),
    position_applied VARCHAR(255),
    status ENUM('submitted', 'reviewing', 'shortlisted', 'interviewed', 'hired', 'rejected') DEFAULT 'submitted',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Table for CRM users/staff
CREATE TABLE crm_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role ENUM('admin', 'manager', 'agent', 'viewer') NOT NULL DEFAULT 'agent',
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Table for lead activities/notes
CREATE TABLE lead_activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lead_id INT NOT NULL,
    lead_type ENUM('debt_application', 'customer', 'career') NOT NULL,
    user_id INT,
    activity_type ENUM('call', 'email', 'meeting', 'note', 'status_change') NOT NULL,
    subject VARCHAR(255),
    description TEXT,
    scheduled_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_lead_id_type (lead_id, lead_type),
    INDEX idx_user_id (user_id),
    INDEX idx_activity_type (activity_type),
    INDEX idx_created_at (created_at),
    
    FOREIGN KEY (user_id) REFERENCES crm_users(id) ON DELETE SET NULL
);

-- Add foreign key constraint for debt_applications
ALTER TABLE debt_applications 
ADD CONSTRAINT fk_debt_assigned_to 
FOREIGN KEY (assigned_to) REFERENCES crm_users(id) ON DELETE SET NULL;

-- Table for system settings
CREATE TABLE system_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description VARCHAR(255),
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (updated_by) REFERENCES crm_users(id) ON DELETE SET NULL
);

-- Insert default admin user (password should be hashed in real implementation)
INSERT INTO crm_users (username, email, password_hash, full_name, role) 
VALUES ('admin', 'admin@pennydebt.com', '$2b$10$example_hash', 'System Administrator', 'admin');

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('company_name', 'Penny & Debt', 'Company name'),
('company_email', 'info@pennydebt.com', 'Company contact email'),
('company_phone', '+91 9876543210', 'Company contact phone'),
('min_debt_amount', '10000', 'Minimum debt amount for applications'),
('max_file_size', '5242880', 'Maximum file upload size in bytes (5MB)');