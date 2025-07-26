import api, { setAuthToken, clearAuthToken } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, APP_CONSTANTS } from '../config';

/**
 * Login vendor
 * @param {string} email - Vendor email
 * @param {string} password - Vendor password
 * @returns {Promise<object>} - Login response with user data and tokens
 */
export const loginVendor = async (email, password) => {
  try {
    const response = await api.post(API_CONFIG.AUTH.LOGIN, {
      email,
      password,
    });

    const { token, refresh_token, user } = response.data;

    // Store tokens and user data
    await AsyncStorage.multiSet([
      [APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN, token],
      [APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN, refresh_token],
      [APP_CONSTANTS.STORAGE_KEYS.USER_PROFILE, JSON.stringify(user)],
    ]);

    // Set auth token for future requests
    setAuthToken(token);

    return {
      success: true,
      user,
      token,
      refresh_token,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Register vendor
 * @param {object} vendorData - Vendor registration data
 * @returns {Promise<object>} - Registration response
 */
export const registerVendor = async (vendorData) => {
  try {
    const response = await api.post(API_CONFIG.AUTH.REGISTER, vendorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Logout vendor
 * @returns {Promise<void>}
 */
export const logoutVendor = async () => {
  try {
    // Call logout endpoint
    await api.post(API_CONFIG.AUTH.LOGOUT);
  } catch (error) {
    console.error('Logout API call failed:', error);
  } finally {
    // Clear local storage and auth token
    await AsyncStorage.multiRemove([
      APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN,
      APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN,
      APP_CONSTANTS.STORAGE_KEYS.USER_PROFILE,
      APP_CONSTANTS.STORAGE_KEYS.RESTAURANT_INFO,
    ]);

    clearAuthToken();
  }
};

/**
 * Refresh auth token
 * @returns {Promise<object>} - New token data
 */
export const refreshToken = async () => {
  try {
    const refresh_token = await AsyncStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN);
    
    if (!refresh_token) {
      throw new Error('No refresh token available');
    }

    const response = await api.post(API_CONFIG.AUTH.REFRESH_TOKEN, {
      refresh_token,
    });

    const { token, refresh_token: newRefreshToken } = response.data;

    // Update stored tokens
    await AsyncStorage.multiSet([
      [APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN, token],
      [APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken],
    ]);

    setAuthToken(token);

    return {
      token,
      refresh_token: newRefreshToken,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Forgot password
 * @param {string} email - Vendor email
 * @returns {Promise<object>} - Response message
 */
export const forgotPassword = async (email) => {
  try {
    const response = await api.post(API_CONFIG.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Reset password
 * @param {string} token - Reset token
 * @param {string} password - New password
 * @returns {Promise<object>} - Response message
 */
export const resetPassword = async (token, password) => {
  try {
    const response = await api.post(API_CONFIG.AUTH.RESET_PASSWORD, {
      token,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Change password
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<object>} - Response message
 */
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.post(API_CONFIG.AUTH.CHANGE_PASSWORD, {
      current_password: currentPassword,
      new_password: newPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Verify email
 * @param {string} token - Email verification token
 * @returns {Promise<object>} - Response message
 */
export const verifyEmail = async (token) => {
  try {
    const response = await api.post(API_CONFIG.AUTH.VERIFY_EMAIL, { token });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get current user profile
 * @returns {Promise<object>} - User profile data
 */
export const getCurrentUser = async () => {
  try {
    const response = await api.get(API_CONFIG.VENDOR.PROFILE);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Update user profile
 * @param {object} profileData - Profile data to update
 * @returns {Promise<object>} - Updated profile data
 */
export const updateProfile = async (profileData) => {
  try {
    const response = await api.put(API_CONFIG.VENDOR.UPDATE_PROFILE, profileData);
    
    // Update stored user profile
    const userProfile = await AsyncStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.USER_PROFILE);
    if (userProfile) {
      const updatedProfile = { ...JSON.parse(userProfile), ...response.data };
      await AsyncStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.USER_PROFILE, JSON.stringify(updatedProfile));
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Upload profile avatar
 * @param {FormData} formData - Form data with image
 * @returns {Promise<object>} - Upload response
 */
export const uploadAvatar = async (formData) => {
  try {
    const response = await api.post(API_CONFIG.VENDOR.UPLOAD_AVATAR, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Check if user is authenticated
 * @returns {Promise<boolean>} - True if authenticated
 */
export const isAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
    return !!token;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

/**
 * Get stored auth token
 * @returns {Promise<string|null>} - Auth token or null
 */
export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Get stored user profile
 * @returns {Promise<object|null>} - User profile or null
 */
export const getStoredUserProfile = async () => {
  try {
    const profile = await AsyncStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.USER_PROFILE);
    return profile ? JSON.parse(profile) : null;
  } catch (error) {
    console.error('Error getting stored user profile:', error);
    return null;
  }
};

/**
 * Initialize auth state
 * @returns {Promise<object>} - Auth state data
 */
export const initializeAuth = async () => {
  try {
    const [token, userProfile] = await AsyncStorage.multiGet([
      APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN,
      APP_CONSTANTS.STORAGE_KEYS.USER_PROFILE,
    ]);

    if (token[1]) {
      setAuthToken(token[1]);
      return {
        isAuthenticated: true,
        user: userProfile[1] ? JSON.parse(userProfile[1]) : null,
        token: token[1],
      };
    }

    return {
      isAuthenticated: false,
      user: null,
      token: null,
    };
  } catch (error) {
    console.error('Error initializing auth:', error);
    return {
      isAuthenticated: false,
      user: null,
      token: null,
    };
  }
};

/**
 * Clear all auth data
 * @returns {Promise<void>}
 */
export const clearAuthData = async () => {
  try {
    await AsyncStorage.multiRemove([
      APP_CONSTANTS.STORAGE_KEYS.AUTH_TOKEN,
      APP_CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN,
      APP_CONSTANTS.STORAGE_KEYS.USER_PROFILE,
      APP_CONSTANTS.STORAGE_KEYS.RESTAURANT_INFO,
    ]);
    clearAuthToken();
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

export default {
  loginVendor,
  registerVendor,
  logoutVendor,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyEmail,
  getCurrentUser,
  updateProfile,
  uploadAvatar,
  isAuthenticated,
  getAuthToken,
  getStoredUserProfile,
  initializeAuth,
  clearAuthData,
}; 