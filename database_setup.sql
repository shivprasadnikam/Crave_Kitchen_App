-- =====================================================
-- Crave Kitchen Database Setup Script
-- Complete database schema for vendor registration system
-- =====================================================

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS crave_kitchen_db;
USE crave_kitchen_db;

-- =====================================================
-- 1. USERS TABLE - Core authentication table (Vendor Only)
-- =====================================================
CREATE TABLE ck_users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    email_verification_expires_at TIMESTAMP NULL,
    profile_image_url VARCHAR(500),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP NULL,
    password_changed_at TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_is_active (is_active),
    INDEX idx_users_email_active (email, is_active)
);

-- =====================================================
-- 2. VENDOR PROFILES TABLE - Extended vendor information
-- =====================================================
CREATE TABLE ck_vendor_profiles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    restaurant_name VARCHAR(255) NOT NULL,
    cuisine_type VARCHAR(100),
    description TEXT,
    address_street VARCHAR(255),
    address_city VARCHAR(100),
    address_state VARCHAR(50),
    address_zip_code VARCHAR(20),
    address_country VARCHAR(100) DEFAULT 'USA',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_approved BOOLEAN DEFAULT FALSE,
    approval_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    approval_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES ck_users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_approval_status (approval_status),
    INDEX idx_cuisine_type (cuisine_type),
    INDEX idx_vendor_profiles_approved (is_approved, approval_status),
    FULLTEXT INDEX ft_vendor_profiles_search (restaurant_name, cuisine_type, description)
);

-- =====================================================
-- 3. BUSINESS HOURS TABLE - Operating hours for vendors
-- =====================================================
CREATE TABLE ck_business_hours (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    vendor_profile_id BIGINT NOT NULL,
    day_of_week ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NOT NULL,
    is_open BOOLEAN DEFAULT TRUE,
    open_time TIME NULL,
    close_time TIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_profile_id) REFERENCES ck_vendor_profiles(id) ON DELETE CASCADE,
    UNIQUE KEY unique_vendor_day (vendor_profile_id, day_of_week),
    INDEX idx_vendor_profile_id (vendor_profile_id)
);

-- =====================================================
-- 4. AUTHENTICATION TOKENS TABLE - JWT token management
-- =====================================================
CREATE TABLE ck_auth_tokens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    token_type ENUM('access', 'refresh', 'reset', 'verification') NOT NULL,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_revoked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES ck_users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_token_hash (token_hash),
    INDEX idx_expires_at (expires_at),
    INDEX idx_is_revoked (is_revoked),
    INDEX idx_auth_tokens_user_type (user_id, token_type)
);

-- =====================================================
-- 5. PASSWORD RESET TOKENS TABLE - Password reset functionality
-- =====================================================
CREATE TABLE ck_password_reset_tokens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES ck_users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_token_hash (token_hash),
    INDEX idx_expires_at (expires_at),
    INDEX idx_is_used (is_used)
);

-- =====================================================
-- 6. LOGIN HISTORY TABLE - Track login attempts
-- =====================================================
CREATE TABLE ck_login_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    device_type ENUM('mobile', 'desktop', 'tablet') NULL,
    is_successful BOOLEAN DEFAULT TRUE,
    failure_reason VARCHAR(255) NULL,
    FOREIGN KEY (user_id) REFERENCES ck_users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_login_at (login_at),
    INDEX idx_is_successful (is_successful),
    INDEX idx_login_history_user_success (user_id, is_successful)
);

-- =====================================================
-- 7. USER SESSIONS TABLE - Active session management
-- =====================================================
CREATE TABLE ck_user_sessions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    refresh_token_hash VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES ck_users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_session_id (session_id),
    INDEX idx_expires_at (expires_at),
    INDEX idx_is_active (is_active),
    INDEX idx_user_sessions_user_active (user_id, is_active)
);

-- =====================================================
-- 8. EMAIL TEMPLATES TABLE - Email template management
-- =====================================================
CREATE TABLE ck_email_templates (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    template_name VARCHAR(100) UNIQUE NOT NULL,
    subject VARCHAR(255) NOT NULL,
    html_content TEXT NOT NULL,
    text_content TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_template_name (template_name),
    INDEX idx_is_active (is_active)
);

-- =====================================================
-- 9. EMAIL LOGS TABLE - Track sent emails
-- =====================================================
CREATE TABLE ck_email_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NULL,
    template_id BIGINT NULL,
    email_type ENUM('verification', 'reset_password', 'welcome', 'notification') NOT NULL,
    recipient_email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    status ENUM('sent', 'delivered', 'failed', 'bounced') DEFAULT 'sent',
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivered_at TIMESTAMP NULL,
    error_message TEXT NULL,
    FOREIGN KEY (user_id) REFERENCES ck_users(id) ON DELETE SET NULL,
    FOREIGN KEY (template_id) REFERENCES ck_email_templates(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_email_type (email_type),
    INDEX idx_status (status),
    INDEX idx_sent_at (sent_at)
);

-- =====================================================
-- 10. SYSTEM SETTINGS TABLE - Application configuration
-- =====================================================
CREATE TABLE ck_system_settings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_setting_key (setting_key),
    INDEX idx_is_public (is_public)
);

-- =====================================================
-- 11. MENU CATEGORIES TABLE - Menu organization
-- =====================================================
CREATE TABLE ck_menu_categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    vendor_profile_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_profile_id) REFERENCES ck_vendor_profiles(id) ON DELETE CASCADE,
    INDEX idx_vendor_profile_id (vendor_profile_id),
    INDEX idx_is_active (is_active),
    INDEX idx_sort_order (sort_order)
);

-- =====================================================
-- 12. MENU ITEMS TABLE - Individual menu items
-- =====================================================
CREATE TABLE ck_menu_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    vendor_profile_id BIGINT NOT NULL,
    category_id BIGINT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500),
    is_available BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    preparation_time_minutes INT DEFAULT 15,
    calories INT,
    allergens TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_profile_id) REFERENCES ck_vendor_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES ck_menu_categories(id) ON DELETE SET NULL,
    INDEX idx_vendor_profile_id (vendor_profile_id),
    INDEX idx_category_id (category_id),
    INDEX idx_is_available (is_available),
    INDEX idx_is_featured (is_featured),
    FULLTEXT INDEX ft_menu_items_search (name, description)
);

-- =====================================================
-- 13. INVENTORY ITEMS TABLE - Stock management
-- =====================================================
CREATE TABLE ck_inventory_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    vendor_profile_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    current_stock DECIMAL(10, 2) DEFAULT 0,
    unit VARCHAR(50) NOT NULL,
    min_stock_level DECIMAL(10, 2) DEFAULT 0,
    cost_per_unit DECIMAL(10, 2),
    supplier VARCHAR(255),
    last_restocked_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_profile_id) REFERENCES ck_vendor_profiles(id) ON DELETE CASCADE,
    INDEX idx_vendor_profile_id (vendor_profile_id),
    INDEX idx_current_stock (current_stock),
    INDEX idx_min_stock_level (min_stock_level)
);

-- =====================================================
-- 14. ORDERS TABLE - Customer orders
-- =====================================================
CREATE TABLE ck_orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    vendor_profile_id BIGINT NOT NULL,
    customer_id BIGINT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status ENUM('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    tax_amount DECIMAL(10, 2) DEFAULT 0,
    delivery_fee DECIMAL(10, 2) DEFAULT 0,
    customer_name VARCHAR(255),
    customer_phone VARCHAR(20),
    customer_email VARCHAR(255),
    delivery_address TEXT,
    special_instructions TEXT,
    estimated_delivery_time TIMESTAMP NULL,
    actual_delivery_time TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_profile_id) REFERENCES ck_vendor_profiles(id) ON DELETE CASCADE,
    INDEX idx_vendor_profile_id (vendor_profile_id),
    INDEX idx_customer_id (customer_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_order_number (order_number)
);

-- =====================================================
-- 15. ORDER ITEMS TABLE - Individual items in orders
-- =====================================================
CREATE TABLE ck_order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    menu_item_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES ck_orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES ck_menu_items(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id),
    INDEX idx_menu_item_id (menu_item_id)
);

-- =====================================================
-- 16. PAYMENTS TABLE - Payment tracking
-- =====================================================
CREATE TABLE ck_payments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    payment_method ENUM('cash', 'card', 'online', 'mobile') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    transaction_id VARCHAR(255),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES ck_orders(id) ON DELETE CASCADE,
    INDEX idx_order_id (order_id),
    INDEX idx_status (status),
    INDEX idx_payment_date (payment_date)
);

-- =====================================================
-- 17. VENDOR PAYOUTS TABLE - Vendor earnings
-- =====================================================
CREATE TABLE ck_vendor_payouts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    vendor_profile_id BIGINT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
    payout_method VARCHAR(100),
    account_details TEXT,
    processed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vendor_profile_id) REFERENCES ck_vendor_profiles(id) ON DELETE CASCADE,
    INDEX idx_vendor_profile_id (vendor_profile_id),
    INDEX idx_status (status),
    INDEX idx_processed_at (processed_at)
);

-- =====================================================
-- 18. NOTIFICATIONS TABLE - System notifications
-- =====================================================
CREATE TABLE ck_notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('order', 'payment', 'system', 'marketing') NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES ck_users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_type (type),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- TRIGGERS FOR AUTOMATIC TIMESTAMP UPDATES
-- =====================================================
DELIMITER //

CREATE TRIGGER update_ck_users_timestamp
BEFORE UPDATE ON ck_users
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END//

CREATE TRIGGER update_ck_vendor_profiles_timestamp
BEFORE UPDATE ON ck_vendor_profiles
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END//

CREATE TRIGGER update_ck_business_hours_timestamp
BEFORE UPDATE ON ck_business_hours
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END//

CREATE TRIGGER update_ck_menu_categories_timestamp
BEFORE UPDATE ON ck_menu_categories
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END//

CREATE TRIGGER update_ck_menu_items_timestamp
BEFORE UPDATE ON ck_menu_items
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END//

CREATE TRIGGER update_ck_inventory_items_timestamp
BEFORE UPDATE ON ck_inventory_items
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END//

CREATE TRIGGER update_ck_orders_timestamp
BEFORE UPDATE ON ck_orders
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END//

DELIMITER ;

-- =====================================================
-- INSERT DEFAULT DATA
-- =====================================================

-- Insert default email templates
INSERT INTO ck_email_templates (template_name, subject, html_content, text_content) VALUES
('email_verification', 'Verify Your Email - Crave Kitchen',
 '<h1>Welcome to Crave Kitchen!</h1><p>Please verify your email by clicking <a href="{{verification_url}}">here</a>.</p>',
 'Welcome to Crave Kitchen! Please verify your email by visiting: {{verification_url}}'),

('password_reset', 'Reset Your Password - Crave Kitchen',
 '<h1>Password Reset Request</h1><p>Click <a href="{{reset_url}}">here</a> to reset your password.</p>',
 'Password Reset Request. Visit this link to reset your password: {{reset_url}}'),

('welcome_vendor', 'Welcome to Crave Kitchen - Vendor Account',
 '<h1>Welcome to Crave Kitchen!</h1><p>Your vendor account has been created successfully.</p>',
 'Welcome to Crave Kitchen! Your vendor account has been created successfully.'),

('order_confirmation', 'Order Confirmed - Crave Kitchen',
 '<h1>Order Confirmed!</h1><p>Your order #{{order_number}} has been confirmed.</p>',
 'Order Confirmed! Your order #{{order_number}} has been confirmed.');

-- Insert system settings
INSERT INTO ck_system_settings (setting_key, setting_value, setting_type, description) VALUES
('jwt_access_token_expiry', '3600', 'number', 'Access token expiry time in seconds'),
('jwt_refresh_token_expiry', '604800', 'number', 'Refresh token expiry time in seconds'),
('password_reset_token_expiry', '3600', 'number', 'Password reset token expiry time in seconds'),
('email_verification_token_expiry', '86400', 'number', 'Email verification token expiry time in seconds'),
('max_login_attempts', '5', 'number', 'Maximum failed login attempts before lockout'),
('lockout_duration', '900', 'number', 'Account lockout duration in seconds'),
('require_email_verification', 'true', 'boolean', 'Whether email verification is required for new accounts'),
('allow_vendor_registration', 'true', 'boolean', 'Whether new vendor registrations are allowed'),
('default_preparation_time', '15', 'number', 'Default preparation time for menu items in minutes'),
('tax_rate', '0.08', 'number', 'Default tax rate as decimal'),
('delivery_fee', '2.99', 'number', 'Default delivery fee'),
('min_order_amount', '10.00', 'number', 'Minimum order amount for delivery');

-- Insert sample admin user (password: admin123)
INSERT INTO ck_users (email, password_hash, name, is_active, is_email_verified) VALUES
('admin@cravekitchen.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/HS.iK2O', 'Admin User', TRUE, TRUE);

-- =====================================================
-- CREATE VIEWS FOR COMMON QUERIES
-- =====================================================

-- View for vendor dashboard data
CREATE VIEW v_vendor_dashboard AS
SELECT 
    vp.id as vendor_id,
    vp.restaurant_name,
    vp.cuisine_type,
    vp.is_approved,
    vp.approval_status,
    COUNT(DISTINCT mi.id) as total_menu_items,
    COUNT(DISTINCT o.id) as total_orders,
    SUM(o.total_amount) as total_revenue
FROM ck_vendor_profiles vp
LEFT JOIN ck_menu_items mi ON vp.id = mi.vendor_profile_id AND mi.is_available = TRUE
LEFT JOIN ck_orders o ON vp.id = o.vendor_profile_id AND o.status = 'delivered'
GROUP BY vp.id;

-- View for low stock inventory
CREATE VIEW v_low_stock_inventory AS
SELECT 
    ii.id,
    ii.name,
    ii.current_stock,
    ii.min_stock_level,
    ii.unit,
    vp.restaurant_name,
    vp.id as vendor_profile_id
FROM ck_inventory_items ii
JOIN ck_vendor_profiles vp ON ii.vendor_profile_id = vp.id
WHERE ii.current_stock <= ii.min_stock_level;

-- =====================================================
-- CREATE STORED PROCEDURES
-- =====================================================

DELIMITER //

-- Procedure to create a new vendor account
CREATE PROCEDURE CreateVendorAccount(
    IN p_email VARCHAR(255),
    IN p_password_hash VARCHAR(255),
    IN p_name VARCHAR(255),
    IN p_phone VARCHAR(20),
    IN p_restaurant_name VARCHAR(255),
    IN p_cuisine_type VARCHAR(100),
    IN p_description TEXT,
    IN p_address_street VARCHAR(255),
    IN p_address_city VARCHAR(100),
    IN p_address_state VARCHAR(50),
    IN p_address_zip_code VARCHAR(20),
    IN p_address_country VARCHAR(100)
)
BEGIN
    DECLARE new_user_id BIGINT;
    DECLARE new_vendor_id BIGINT;
    
    START TRANSACTION;
    
    -- Create user account (vendor only)
    INSERT INTO ck_users (email, password_hash, name, phone, is_active, is_email_verified)
    VALUES (p_email, p_password_hash, p_name, p_phone, TRUE, FALSE);
    
    SET new_user_id = LAST_INSERT_ID();
    
    -- Create vendor profile
    INSERT INTO ck_vendor_profiles (
        user_id, restaurant_name, cuisine_type, description,
        address_street, address_city, address_state, address_zip_code, address_country
    )
    VALUES (
        new_user_id, p_restaurant_name, p_cuisine_type, p_description,
        p_address_street, p_address_city, p_address_state, p_address_zip_code, p_address_country
    );
    
    SET new_vendor_id = LAST_INSERT_ID();
    
    -- Create default business hours (Monday-Friday 9-5)
    INSERT INTO ck_business_hours (vendor_profile_id, day_of_week, is_open, open_time, close_time)
    VALUES 
        (new_vendor_id, 'monday', TRUE, '09:00', '17:00'),
        (new_vendor_id, 'tuesday', TRUE, '09:00', '17:00'),
        (new_vendor_id, 'wednesday', TRUE, '09:00', '17:00'),
        (new_vendor_id, 'thursday', TRUE, '09:00', '17:00'),
        (new_vendor_id, 'friday', TRUE, '09:00', '17:00'),
        (new_vendor_id, 'saturday', FALSE, NULL, NULL),
        (new_vendor_id, 'sunday', FALSE, NULL, NULL);
    
    COMMIT;
    
    SELECT new_user_id as user_id, new_vendor_id as vendor_id;
END//

-- Procedure to get vendor statistics
CREATE PROCEDURE GetVendorStats(IN p_vendor_id BIGINT)
BEGIN
    SELECT 
        vp.restaurant_name,
        COUNT(DISTINCT mi.id) as total_menu_items,
        COUNT(DISTINCT o.id) as total_orders,
        SUM(CASE WHEN o.status = 'delivered' THEN o.total_amount ELSE 0 END) as total_revenue,
        COUNT(DISTINCT CASE WHEN o.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN o.id END) as orders_last_30_days,
        SUM(CASE WHEN o.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) AND o.status = 'delivered' THEN o.total_amount ELSE 0 END) as revenue_last_30_days
    FROM ck_vendor_profiles vp
    LEFT JOIN ck_menu_items mi ON vp.id = mi.vendor_profile_id AND mi.is_available = TRUE
    LEFT JOIN ck_orders o ON vp.id = o.vendor_profile_id
    WHERE vp.id = p_vendor_id
    GROUP BY vp.id, vp.restaurant_name;
END//

DELIMITER ;

-- =====================================================
-- FINAL COMMIT
-- =====================================================
COMMIT;

-- Display success message
SELECT 'Database setup completed successfully!' as status; 