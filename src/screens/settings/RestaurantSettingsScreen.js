import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const RestaurantSettingsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Restaurant Settings</Text>
          <Text style={styles.headerSubtitle}>Configure your restaurant details</Text>
        </View>

        {/* Settings Options */}
        <View style={styles.content}>
          <TouchableOpacity style={styles.settingCard}>
            <Text style={styles.settingIcon}>🏪</Text>
            <Text style={styles.settingTitle}>Restaurant Information</Text>
            <Text style={styles.settingDescription}>Update restaurant name and details</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingCard}>
            <Text style={styles.settingIcon}>📍</Text>
            <Text style={styles.settingTitle}>Address & Location</Text>
            <Text style={styles.settingDescription}>Update restaurant address</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingCard}>
            <Text style={styles.settingIcon}>🍽️</Text>
            <Text style={styles.settingTitle}>Cuisine Type</Text>
            <Text style={styles.settingDescription}>Set your cuisine category</Text>
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
  settingCard: {
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
  settingIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});

export default RestaurantSettingsScreen;
