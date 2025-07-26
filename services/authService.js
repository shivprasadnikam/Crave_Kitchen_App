import { api, API_ENDPOINTS } from './api';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */
export const authService = {
  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} - Login response
   */
  login: async (email, password) => {
    return api.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
  },

  /**
   * Register new user
   * @param {object} userData - User registration data
   * @returns {Promise} - Registration response
   */
  register: async (userData) => {
    return api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  },

  /**
   * Logout user
   * @returns {Promise} - Logout response
   */
  logout: async () => {
    return api.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  /**
   * Refresh authentication token
   * @returns {Promise} - Token refresh response
   */
  refreshToken: async () => {
    return api.post(API_ENDPOINTS.AUTH.REFRESH);
  },

  /**
   * Forgot password
   * @param {string} email - User email
   * @returns {Promise} - Forgot password response
   */
  forgotPassword: async (email) => {
    return api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      email,
    });
  },

  /**
   * Reset password
   * @param {string} token - Reset token
   * @param {string} newPassword - New password
   * @returns {Promise} - Reset password response
   */
  resetPassword: async (token, newPassword) => {
    return api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      newPassword,
    });
  },

  /**
   * Verify email
   * @param {string} token - Verification token
   * @returns {Promise} - Email verification response
   */
  verifyEmail: async (token) => {
    return api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
      token,
    });
  },

  /**
   * Get current user profile
   * @returns {Promise} - User profile response
   */
  getCurrentUser: async () => {
    return api.get(API_ENDPOINTS.AUTH.UPDATE_PROFILE);
  },

  /**
   * Update user profile
   * @param {object} profileData - Profile data to update
   * @returns {Promise} - Profile update response
   */
  updateProfile: async (profileData) => {
    return api.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, profileData);
  },

  /**
   * Change password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise} - Password change response
   */
  changePassword: async (currentPassword, newPassword) => {
    return api.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    });
  },

  /**
   * Upload profile picture
   * @param {FormData} formData - Form data with image
   * @returns {Promise} - Upload response
   */
  uploadProfilePicture: async (formData) => {
    return api.upload('/auth/profile-picture', formData);
  },

  /**
   * Delete account
   * @param {string} password - User password for confirmation
   * @returns {Promise} - Account deletion response
   */
  deleteAccount: async (password) => {
    return api.post('/auth/delete-account', {
      password,
    });
  },

  /**
   * Get user preferences
   * @returns {Promise} - User preferences response
   */
  getPreferences: async () => {
    return api.get('/auth/preferences');
  },

  /**
   * Update user preferences
   * @param {object} preferences - Preferences to update
   * @returns {Promise} - Preferences update response
   */
  updatePreferences: async (preferences) => {
    return api.put('/auth/preferences', preferences);
  },

  /**
   * Get user activity log
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Activity log response
   */
  getActivityLog: async (filters = {}) => {
    return api.get('/auth/activity-log', { params: filters });
  },

  /**
   * Enable two-factor authentication
   * @returns {Promise} - 2FA setup response
   */
  enable2FA: async () => {
    return api.post('/auth/2fa/enable');
  },

  /**
   * Disable two-factor authentication
   * @param {string} code - 2FA code
   * @returns {Promise} - 2FA disable response
   */
  disable2FA: async (code) => {
    return api.post('/auth/2fa/disable', { code });
  },

  /**
   * Verify two-factor authentication code
   * @param {string} code - 2FA code
   * @returns {Promise} - 2FA verification response
   */
  verify2FA: async (code) => {
    return api.post('/auth/2fa/verify', { code });
  },

  /**
   * Get login history
   * @param {object} filters - Filter parameters
   * @returns {Promise} - Login history response
   */
  getLoginHistory: async (filters = {}) => {
    return api.get('/auth/login-history', { params: filters });
  },

  /**
   * Revoke all sessions
   * @returns {Promise} - Session revocation response
   */
  revokeAllSessions: async () => {
    return api.post('/auth/revoke-sessions');
  },

  /**
   * Get account security status
   * @returns {Promise} - Security status response
   */
  getSecurityStatus: async () => {
    return api.get('/auth/security-status');
  },

  /**
   * Update security settings
   * @param {object} securitySettings - Security settings to update
   * @returns {Promise} - Security settings update response
   */
  updateSecuritySettings: async (securitySettings) => {
    return api.put('/auth/security-settings', securitySettings);
  },
};

export default authService; 