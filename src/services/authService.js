import apiConfig from '../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', data = null, customHeaders = {}) => {
  try {
    const url = apiConfig.getFullUrl(endpoint);
    
    // Get the current auth token from AsyncStorage
    const token = await AsyncStorage.getItem('auth_token');
    const headers = apiConfig.getAuthHeaders(token);
    const finalHeaders = { ...headers, ...customHeaders };

    const config = {
      method,
      headers: finalHeaders,
      body: data ? JSON.stringify(data) : null,
    };

    console.log(`API Call: ${method} ${url}`, data ? { data } : '');

    const response = await fetch(url, config);
    const responseData = await response.json();

    console.log(`API Response: ${response.status}`, responseData);

    if (!response.ok) {
      throw new Error(responseData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return responseData;
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};

export const authService = {
  login: async (email, password) => {
    try {
      const response = await apiCall(apiConfig.ENDPOINTS.AUTH.LOGIN, 'POST', {
        email,
        password,
      });

      return {
        user: response.data.user,
        token: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },

  register: async (userData) => {
    console.log('🚀 [REGISTER API] Starting registration process...');
    console.log('📧 [REGISTER API] Email:', userData.email);
    console.log('🏪 [REGISTER API] Restaurant:', userData.restaurantName);
    console.log('📱 [REGISTER API] Phone:', userData.phone);
    console.log('📍 [REGISTER API] Address:', JSON.stringify(userData.address, null, 2));
    console.log('🕒 [REGISTER API] Business Hours:', JSON.stringify(userData.businessHours, null, 2));
    console.log('🍽️ [REGISTER API] Cuisine Type:', userData.cuisineType);
    console.log('✅ [REGISTER API] Terms Accepted:', userData.acceptTerms);
    console.log('📧 [REGISTER API] Marketing Accepted:', userData.acceptMarketing);
    
    try {
      // Transform the data to match API structure
      const apiData = {
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        name: userData.name,
        restaurantName: userData.restaurantName,
        phone: userData.phone,
        address: userData.address,
        businessHours: userData.businessHours,
        cuisineType: userData.cuisineType,
        description: userData.description,
        acceptTerms: userData.acceptTerms,
        acceptMarketing: userData.acceptMarketing,
      };

      console.log('🌐 [REGISTER API] Making API call to:', apiConfig.ENDPOINTS.AUTH.REGISTER);
      console.log('📤 [REGISTER API] Request payload:', JSON.stringify(apiData, null, 2));
      
      const startTime = Date.now();
      const response = await apiCall(apiConfig.ENDPOINTS.AUTH.REGISTER, 'POST', apiData);
      const endTime = Date.now();
      
      console.log('⏱️ [REGISTER API] API call completed in:', endTime - startTime, 'ms');
      console.log('📥 [REGISTER API] Response received:', JSON.stringify(response, null, 2));
      
      if (response.success) {
        console.log('✅ [REGISTER API] Registration successful!');
        console.log('🆔 [REGISTER API] User ID:', response.data?.userId || 'Not provided');
        console.log('📧 [REGISTER API] Email verification required:', response.data?.emailVerificationRequired || false);
        console.log('👨‍💼 [REGISTER API] Admin approval required:', response.data?.adminApprovalRequired || false);
      } else {
        console.log('❌ [REGISTER API] Registration failed:', response.error);
      }

      return response;
    } catch (error) {
      console.log('💥 [REGISTER API] Error occurred:', error.message);
      console.log('🔍 [REGISTER API] Error details:', error);
      
      // Handle different types of errors
      if (error.message.includes('Email address is already registered')) {
        console.log('📧 [REGISTER API] Email already exists error');
        throw new Error('Email address is already registered');
      } else if (error.message.includes('Validation failed')) {
        console.log('❌ [REGISTER API] Validation error');
        throw new Error('Please check your input and try again');
      } else if (error.message.includes('Network request failed')) {
        console.log('🌐 [REGISTER API] Network error - check server connection');
        throw new Error('Network error - please check your connection and try again');
      } else if (error.message.includes('timeout')) {
        console.log('⏰ [REGISTER API] Request timeout');
        throw new Error('Request timeout - please try again');
      } else {
        console.log('❓ [REGISTER API] Unknown error');
        throw new Error(error.message || 'Registration failed');
      }
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await apiCall(apiConfig.ENDPOINTS.AUTH.FORGOT_PASSWORD, 'POST', {
        email,
      });

      return { message: response.message || 'Password reset email sent' };
    } catch (error) {
      throw new Error(error.message || 'Failed to send reset email');
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiCall(apiConfig.ENDPOINTS.AUTH.RESET_PASSWORD, 'POST', {
        token,
        newPassword,
      });

      return { message: response.message || 'Password reset successfully' };
    } catch (error) {
      throw new Error(error.message || 'Failed to reset password');
    }
  },

  refreshToken: async (refreshToken) => {
    try {
      // For refresh token calls, we don't need the auth header since we're using the refresh token
      const url = apiConfig.getFullUrl(apiConfig.ENDPOINTS.AUTH.REFRESH_TOKEN);
      const headers = apiConfig.getAuthHeaders(); // No token needed for refresh
      
      const config = {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      };

      console.log(`Refresh Token API Call: POST ${url}`);

      const response = await fetch(url, config);
      const responseData = await response.json();

      console.log(`Refresh Token API Response: ${response.status}`, responseData);

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return {
        token: responseData.data.accessToken,
        refreshToken: responseData.data.refreshToken,
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to refresh token');
    }
  },

  logout: async () => {
    try {
      console.log('🚪 [LOGOUT API] Starting logout process...');
      
      const response = await apiCall(apiConfig.ENDPOINTS.AUTH.LOGOUT, 'POST');
      
      console.log('✅ [LOGOUT API] Logout successful:', response);
      
      return { success: true, message: response.message || 'Logout successful' };
    } catch (error) {
      console.log('❌ [LOGOUT API] Logout error:', error.message);
      // Even if the API call fails, we should still logout locally
      throw new Error(error.message || 'Logout failed');
    }
  },

  // Helper method to get API configuration
  getApiConfig: () => apiConfig,

  // Helper method to get auth token
  getAuthToken: async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      return token;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  },
}; 