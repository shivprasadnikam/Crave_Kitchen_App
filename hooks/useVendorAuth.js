import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

export const useVendorAuth = () => {
  const {
    isAuthenticated,
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    verifyEmail,
    clearError,
    refreshUserProfile,
  } = useAuth();

  const { addSystemNotification } = useNotifications();

  // Local state for additional functionality
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(null);
  const [lastActivity, setLastActivity] = useState(null);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);

  // Session management constants
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
  const PROFILE_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

  // Computed values
  const userProfile = useMemo(() => {
    if (!user) return null;

    return {
      ...user,
      fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      displayName: user.displayName || user.firstName || user.email,
      isProfileComplete: !!(user.firstName && user.lastName && user.phone),
      hasProfileImage: !!user.profileImage,
      accountAge: user.createdAt ? 
        Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0,
    };
  }, [user]);

  const sessionStatus = useMemo(() => {
    if (!isAuthenticated) return 'not_authenticated';
    if (isLocked) return 'locked';
    if (!isSessionValid) return 'expired';
    return 'active';
  }, [isAuthenticated, isLocked, isSessionValid]);

  const canPerformAction = useMemo(() => {
    return isAuthenticated && isSessionValid && !isLocked;
  }, [isAuthenticated, isSessionValid, isLocked]);

  const remainingLockoutTime = useMemo(() => {
    if (!lockoutTime) return 0;
    const remaining = lockoutTime + LOCKOUT_DURATION - Date.now();
    return Math.max(0, remaining);
  }, [lockoutTime]);

  // Session validation
  const validateSession = useCallback(() => {
    if (!token || !lastActivity) {
      setIsSessionValid(false);
      return false;
    }

    const timeSinceLastActivity = Date.now() - lastActivity;
    const isValid = timeSinceLastActivity < SESSION_TIMEOUT;

    setIsSessionValid(isValid);

    if (!isValid) {
      addSystemNotification(
        'Session Expired',
        'Your session has expired. Please log in again.'
      );
    }

    return isValid;
  }, [token, lastActivity, addSystemNotification]);

  // Update last activity
  const updateLastActivity = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  // Enhanced login with security features
  const handleLogin = useCallback(async (email, password) => {
    try {
      // Check if account is locked
      if (isLocked && remainingLockoutTime > 0) {
        const minutes = Math.ceil(remainingLockoutTime / (1000 * 60));
        throw new Error(`Account is locked. Try again in ${minutes} minutes.`);
      }

      // Reset lockout if time has passed
      if (isLocked && remainingLockoutTime <= 0) {
        setIsLocked(false);
        setLockoutTime(null);
        setLoginAttempts(0);
      }

      const result = await login(email, password);
      
      // Reset login attempts on successful login
      setLoginAttempts(0);
      setIsLocked(false);
      setLockoutTime(null);
      
      // Set session as valid
      setIsSessionValid(true);
      updateLastActivity();
      
      addSystemNotification(
        'Login Successful',
        `Welcome back, ${result.user.firstName || 'Vendor'}!`
      );

      return result;
    } catch (error) {
      // Increment login attempts
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);

      // Lock account if max attempts reached
      if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
        setIsLocked(true);
        setLockoutTime(Date.now());
        addSystemNotification(
          'Account Locked',
          'Too many failed login attempts. Account locked for 15 minutes.'
        );
      }

      throw error;
    }
  }, [login, isLocked, remainingLockoutTime, loginAttempts, addSystemNotification, updateLastActivity]);

  // Enhanced logout
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      
      // Clear session state
      setIsSessionValid(false);
      setSessionTimeout(null);
      setLastActivity(null);
      setLoginAttempts(0);
      setIsLocked(false);
      setLockoutTime(null);
      
      addSystemNotification(
        'Logged Out',
        'You have been successfully logged out.'
      );
    } catch (error) {
      console.error('Error during logout:', error);
      // Force logout even if API call fails
      setIsSessionValid(false);
      setSessionTimeout(null);
      setLastActivity(null);
    }
  }, [logout, addSystemNotification]);

  // Enhanced profile update
  const handleUpdateProfile = useCallback(async (profileData) => {
    try {
      setIsProfileUpdating(true);
      
      const updatedUser = await updateProfile(profileData);
      
      addSystemNotification(
        'Profile Updated',
        'Your profile has been successfully updated.'
      );

      return updatedUser;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    } finally {
      setIsProfileUpdating(false);
    }
  }, [updateProfile, addSystemNotification]);

  // Enhanced password change
  const handleChangePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      setIsPasswordChanging(true);
      
      const result = await changePassword(currentPassword, newPassword);
      
      addSystemNotification(
        'Password Changed',
        'Your password has been successfully changed.'
      );

      return result;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    } finally {
      setIsPasswordChanging(false);
    }
  }, [changePassword, addSystemNotification]);

  // Enhanced registration
  const handleRegister = useCallback(async (vendorData) => {
    try {
      const result = await register(vendorData);
      
      addSystemNotification(
        'Registration Successful',
        'Your account has been created successfully. Please check your email for verification.'
      );

      return result;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }, [register, addSystemNotification]);

  // Enhanced forgot password
  const handleForgotPassword = useCallback(async (email) => {
    try {
      const result = await forgotPassword(email);
      
      addSystemNotification(
        'Password Reset Email Sent',
        'If an account exists with this email, you will receive password reset instructions.'
      );

      return result;
    } catch (error) {
      console.error('Error requesting password reset:', error);
      throw error;
    }
  }, [forgotPassword, addSystemNotification]);

  // Enhanced reset password
  const handleResetPassword = useCallback(async (token, password) => {
    try {
      const result = await resetPassword(token, password);
      
      addSystemNotification(
        'Password Reset Successful',
        'Your password has been reset successfully. You can now log in with your new password.'
      );

      return result;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }, [resetPassword, addSystemNotification]);

  // Enhanced email verification
  const handleVerifyEmail = useCallback(async (token) => {
    try {
      const result = await verifyEmail(token);
      
      addSystemNotification(
        'Email Verified',
        'Your email has been verified successfully.'
      );

      return result;
    } catch (error) {
      console.error('Error verifying email:', error);
      throw error;
    }
  }, [verifyEmail, addSystemNotification]);

  // Session timeout management
  const startSessionTimeout = useCallback(() => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }

    const timeout = setTimeout(() => {
      setIsSessionValid(false);
      addSystemNotification(
        'Session Expired',
        'Your session has expired due to inactivity. Please log in again.'
      );
    }, SESSION_TIMEOUT);

    setSessionTimeout(timeout);
  }, [sessionTimeout, addSystemNotification]);

  const resetSessionTimeout = useCallback(() => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }
    startSessionTimeout();
    updateLastActivity();
  }, [sessionTimeout, startSessionTimeout, updateLastActivity]);

  // Security utilities
  const validatePassword = useCallback((password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors = [];
    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    }
    if (!hasUpperCase) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!hasLowerCase) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!hasNumbers) {
      errors.push('Password must contain at least one number');
    }
    if (!hasSpecialChar) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors,
      strength: calculatePasswordStrength(password),
    };
  }, []);

  const calculatePasswordStrength = useCallback((password) => {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    
    if (strength <= 2) return 'weak';
    if (strength <= 3) return 'medium';
    if (strength <= 4) return 'strong';
    return 'very_strong';
  }, []);

  const validateEmail = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePhone = useCallback((phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }, []);

  // Activity tracking
  const trackActivity = useCallback(() => {
    if (isAuthenticated && isSessionValid) {
      resetSessionTimeout();
    }
  }, [isAuthenticated, isSessionValid, resetSessionTimeout]);

  // Auto-refresh user profile
  const refreshProfile = useCallback(async () => {
    try {
      if (isAuthenticated && token) {
        await refreshUserProfile();
      }
    } catch (error) {
      console.error('Error refreshing user profile:', error);
    }
  }, [isAuthenticated, token, refreshUserProfile]);

  // Effects
  useEffect(() => {
    if (isAuthenticated && token) {
      setIsSessionValid(true);
      updateLastActivity();
      startSessionTimeout();
    } else {
      setIsSessionValid(false);
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
        setSessionTimeout(null);
      }
    }
  }, [isAuthenticated, token, startSessionTimeout, updateLastActivity]);

  // Auto-refresh profile every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated) {
        refreshProfile();
      }
    }, PROFILE_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [isAuthenticated, refreshProfile]);

  // Activity listener
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      trackActivity();
    };

    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [trackActivity]);

  return {
    // State
    isAuthenticated,
    user: userProfile,
    token,
    isLoading,
    error,
    isSessionValid,
    sessionStatus,
    canPerformAction,
    isLocked,
    remainingLockoutTime,
    loginAttempts,
    isProfileUpdating,
    isPasswordChanging,
    lastActivity,

    // Actions
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
    changePassword: handleChangePassword,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
    verifyEmail: handleVerifyEmail,
    clearError,
    refreshUserProfile: refreshProfile,

    // Session management
    validateSession,
    updateLastActivity,
    startSessionTimeout,
    resetSessionTimeout,
    trackActivity,

    // Security utilities
    validatePassword,
    validateEmail,
    validatePhone,
    calculatePasswordStrength,

    // Constants
    SESSION_TIMEOUT,
    MAX_LOGIN_ATTEMPTS,
    LOCKOUT_DURATION,
  };
}; 