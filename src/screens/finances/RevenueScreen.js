import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const RevenueScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Revenue</Text>
          <Text style={styles.headerSubtitle}>Track your financial performance</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('PaymentHistory')}
          >
            <Text style={styles.actionIcon}>💰</Text>
            <Text style={styles.actionTitle}>Payment History</Text>
            <Text style={styles.actionDescription}>View all payment transactions</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('Payout')}
          >
            <Text style={styles.actionIcon}>💳</Text>
            <Text style={styles.actionTitle}>Payout</Text>
            <Text style={styles.actionDescription}>Request and manage payouts</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('FinancialReports')}
          >
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionTitle}>Financial Reports</Text>
            <Text style={styles.actionDescription}>Generate detailed financial reports</Text>
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
  actionCard: {
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
  actionIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  actionDescription: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});

export default RevenueScreen;
