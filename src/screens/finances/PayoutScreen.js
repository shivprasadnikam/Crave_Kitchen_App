import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';

const PayoutScreen = ({ navigation }) => {
  const payouts = [
    {
      id: '1',
      amount: '$1,250.00',
      date: '2024-01-15',
      status: 'Completed',
      method: 'Bank Transfer',
      reference: 'PAY-001',
    },
    {
      id: '2',
      amount: '$980.50',
      date: '2024-01-08',
      status: 'Completed',
      method: 'Bank Transfer',
      reference: 'PAY-002',
    },
    {
      id: '3',
      amount: '$1,450.75',
      date: '2024-01-01',
      status: 'Completed',
      method: 'Bank Transfer',
      reference: 'PAY-003',
    },
    {
      id: '4',
      amount: '$750.25',
      date: '2024-12-25',
      status: 'Pending',
      method: 'Bank Transfer',
      reference: 'PAY-004',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#4CAF50';
      case 'Pending':
        return '#FFA500';
      case 'Failed':
        return '#FF4444';
      default:
        return '#666666';
    }
  };

  const renderPayout = ({ item }) => (
    <View style={styles.payoutCard}>
      <View style={styles.payoutHeader}>
        <Text style={styles.payoutAmount}>{item.amount}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.payoutInfo}>
        <Text style={styles.payoutDate}>Date: {item.date}</Text>
        <Text style={styles.payoutMethod}>Method: {item.method}</Text>
        <Text style={styles.payoutReference}>Ref: {item.reference}</Text>
      </View>
      
      <View style={styles.payoutActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Download Receipt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Payouts</Text>
          <Text style={styles.headerSubtitle}>Track your earnings and payments</Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Earned</Text>
            <Text style={styles.summaryAmount}>$4,431.50</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>This Month</Text>
            <Text style={styles.summaryAmount}>$1,250.00</Text>
          </View>
        </View>

        {/* Payouts List */}
        <View style={styles.content}>
          <FlatList
            data={payouts}
            renderItem={renderPayout}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.payoutsList}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('PaymentHistory')}
          >
            <Text style={styles.quickActionText}>Payment History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('FinancialReports')}
          >
            <Text style={styles.quickActionText}>Financial Reports</Text>
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
  summarySection: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  content: {
    padding: 20,
  },
  payoutsList: {
    gap: 12,
  },
  payoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  payoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  payoutAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  payoutInfo: {
    marginBottom: 12,
  },
  payoutDate: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  payoutMethod: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  payoutReference: {
    fontSize: 14,
    color: '#666666',
  },
  payoutActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PayoutScreen;
