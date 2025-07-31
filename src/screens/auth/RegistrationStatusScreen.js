import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

const RegistrationStatusScreen = ({ navigation, route }) => {
  const { userData, registrationResponse } = route.params || {};
  
  console.log('📋 [REGISTRATION STATUS] Screen loaded with data:', {
    userData,
    registrationResponse
  });

  const handleBackToAuth = () => {
    console.log('🔙 [REGISTRATION STATUS] User clicked back to auth');
    navigation.navigate('VendorAuth');
  };

  const handleResendEmail = () => {
    console.log('📧 [REGISTRATION STATUS] User requested to resend verification email');
    // TODO: Implement resend email verification
    Alert.alert('Email Sent', 'Verification email has been resent.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Registration Successful! 🎉</Text>
          <Text style={styles.subtitle}>
            Welcome to Crave Kitchen, {userData?.name || 'Vendor'}!
          </Text>
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>Account Status</Text>
          
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Email Verification:</Text>
            <Text style={[styles.statusValue, styles.pending]}>Pending</Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Admin Approval:</Text>
            <Text style={[styles.statusValue, styles.pending]}>Pending</Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Account Access:</Text>
            <Text style={[styles.statusValue, styles.limited]}>Limited</Text>
          </View>
        </View>

        {/* Next Steps */}
        <View style={styles.nextStepsCard}>
          <Text style={styles.nextStepsTitle}>Next Steps</Text>
          
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>1</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Verify Your Email</Text>
              <Text style={styles.stepDescription}>
                Check your email ({userData?.email}) and click the verification link
              </Text>
            </View>
          </View>
          
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>2</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Wait for Admin Approval</Text>
              <Text style={styles.stepDescription}>
                Our team will review your application (usually within 24 hours)
              </Text>
            </View>
          </View>
          
          <View style={styles.stepItem}>
            <Text style={styles.stepNumber}>3</Text>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Set Up Your Restaurant</Text>
              <Text style={styles.stepDescription}>
                Once approved, you can add your menu, set prices, and start accepting orders
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.resendButton} onPress={handleResendEmail}>
            <Text style={styles.resendButtonText}>Resend Verification Email</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.backButton} onPress={handleBackToAuth}>
            <Text style={styles.backButtonText}>Back to Login</Text>
          </TouchableOpacity>
        </View>

        {/* Support Info */}
        <View style={styles.supportCard}>
          <Text style={styles.supportTitle}>Need Help?</Text>
          <Text style={styles.supportText}>
            If you don't receive the verification email or have any questions, 
            please contact our support team.
          </Text>
          <Text style={styles.supportEmail}>support@cravekitchen.com</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B35',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 15,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusLabel: {
    fontSize: 16,
    color: '#666666',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  pending: {
    color: '#FFA500',
  },
  limited: {
    color: '#FF6B6B',
  },
  nextStepsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 15,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4A90E2',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 30,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 15,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  actions: {
    marginBottom: 20,
  },
  resendButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  resendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  backButtonText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },
  supportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  supportText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 8,
  },
  supportEmail: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '600',
  },
});

export default RegistrationStatusScreen; 