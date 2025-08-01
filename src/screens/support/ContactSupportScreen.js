import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const ContactSupportScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Contact Support</Text>
          <Text style={styles.headerSubtitle}>Get in touch with our support team</Text>
        </View>

        {/* Contact Options */}
        <View style={styles.content}>
          <TouchableOpacity style={styles.contactCard}>
            <Text style={styles.contactIcon}>📧</Text>
            <Text style={styles.contactTitle}>Email Support</Text>
            <Text style={styles.contactDescription}>support@cravekitchen.com</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard}>
            <Text style={styles.contactIcon}>📞</Text>
            <Text style={styles.contactTitle}>Phone Support</Text>
            <Text style={styles.contactDescription}>+1 (555) 123-4567</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard}>
            <Text style={styles.contactIcon}>💬</Text>
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactDescription}>Available 24/7</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  contactDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});

export default ContactSupportScreen;
