# Database Schema for Crave Kitchen App

This document defines the database schema required for the authentication system and login functionality.

## Database: `crave_kitchen_db`

---

## 1. Users Table (`ck_users`)

**Description:** Main user table for authentication and basic user information

```sql
CREATE TABLE ck_users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role ENUM('vendor', 'admin', 'customer') DEFAULT 'vendor',
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
    INDEX idx_role (role),
    INDEX idx_is_active (is_active)
);
```

---

## 2. Vendor Profiles Table (`ck_vendor_profiles`)

**Description:** Extended profile information specific to vendors/restaurants

```sql
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
    INDEX idx_cuisine_type (cuisine_type)
);
```

---

## 3. Business Hours Table (`ck_business_hours`)

**Description:** Operating hours for each vendor

```sql
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
```

---

## 4. Authentication Tokens Table (`ck_auth_tokens`)

**Description:** JWT tokens for authentication and session management

```sql
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
    INDEX idx_is_revoked (is_revoked)
);
```

---

## 5. Password Reset Tokens Table (`ck_password_reset_tokens`)

**Description:** Tokens for password reset functionality

```sql
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
```

---

## 6. Login History Table (`ck_login_history`)

**Description:** Track user login attempts and sessions

```sql
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
    INDEX idx_is_successful (is_successful)
);
```

---

## 7. User Sessions Table (`ck_user_sessions`)

**Description:** Active user sessions for session management

```sql
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
    INDEX idx_is_active (is_active)
);
```

---

## 8. Email Templates Table (`ck_email_templates`)

**Description:** Email templates for authentication emails

```sql
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
```

---

## 9. Email Logs Table (`ck_email_logs`)

**Description:** Track sent emails for debugging and compliance

```sql
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
```

---

## 10. System Settings Table (`ck_system_settings`)

**Description:** Application-wide settings and configurations

```sql
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
```

---

## Sample Data Insertion

### Insert Default Email Templates

```sql
INSERT INTO ck_email_templates (template_name, subject, html_content, text_content) VALUES
('email_verification', 'Verify Your Email - Crave Kitchen',
 '<h1>Welcome to Crave Kitchen!</h1><p>Please verify your email by clicking <a href="{{verification_url}}">here</a>.</p>',
 'Welcome to Crave Kitchen! Please verify your email by visiting: {{verification_url}}'),

('password_reset', 'Reset Your Password - Crave Kitchen',
 '<h1>Password Reset Request</h1><p>Click <a href="{{reset_url}}">here</a> to reset your password.</p>',
 'Password Reset Request. Visit this link to reset your password: {{reset_url}}'),

('welcome_vendor', 'Welcome to Crave Kitchen - Vendor Account',
 '<h1>Welcome to Crave Kitchen!</h1><p>Your vendor account has been created successfully.</p>',
 'Welcome to Crave Kitchen! Your vendor account has been created successfully.');
```

### Insert System Settings

```sql
INSERT INTO ck_system_settings (setting_key, setting_value, setting_type, description) VALUES
('jwt_access_token_expiry', '3600', 'number', 'Access token expiry time in seconds'),
('jwt_refresh_token_expiry', '604800', 'number', 'Refresh token expiry time in seconds'),
('password_reset_token_expiry', '3600', 'number', 'Password reset token expiry time in seconds'),
('email_verification_token_expiry', '86400', 'number', 'Email verification token expiry time in seconds'),
('max_login_attempts', '5', 'number', 'Maximum failed login attempts before lockout'),
('lockout_duration', '900', 'number', 'Account lockout duration in seconds'),
('require_email_verification', 'true', 'boolean', 'Whether email verification is required for new accounts'),
('allow_vendor_registration', 'true', 'boolean', 'Whether new vendor registrations are allowed');
```

---

## Indexes for Performance

### Additional Indexes for Better Performance

```sql
-- Composite indexes for common queries
CREATE INDEX idx_users_email_active ON ck_users(email, is_active);
CREATE INDEX idx_users_role_active ON ck_users(role, is_active);
CREATE INDEX idx_vendor_profiles_approved ON ck_vendor_profiles(is_approved, approval_status);
CREATE INDEX idx_auth_tokens_user_type ON ck_auth_tokens(user_id, token_type);
CREATE INDEX idx_login_history_user_success ON ck_login_history(user_id, is_successful);
CREATE INDEX idx_user_sessions_user_active ON ck_user_sessions(user_id, is_active);

-- Full-text search indexes
CREATE FULLTEXT INDEX ft_vendor_profiles_search ON ck_vendor_profiles(restaurant_name, cuisine_type, description);
```

---

## Database Triggers

### Update Timestamps Trigger

```sql
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
DELIMITER ;
```

---

## Security Considerations

1. **Password Hashing**: Use bcrypt or Argon2 for password hashing
2. **Token Security**: Store only hashed tokens in the database
3. **SQL Injection**: Use parameterized queries
4. **Rate Limiting**: Implement rate limiting for login attempts
5. **Audit Trail**: Log all authentication events
6. **Data Encryption**: Encrypt sensitive data at rest
7. **Session Management**: Implement proper session cleanup

---

## Backup and Recovery

### Backup Strategy

```sql
-- Create backup procedures
DELIMITER //
CREATE PROCEDURE backup_auth_data()
BEGIN
    -- Backup authentication tables
    -- Implementation depends on your backup solution
END//
DELIMITER ;
```

This schema provides a complete foundation for the authentication system and login functionality of the Crave Kitchen App.
