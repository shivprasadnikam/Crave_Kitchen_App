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

const PaymentHistoryScreen = ({ navigation }) => {
  const payments = [
    {
      id: '1',
      orderNumber: '#ORD-001',
      amount: '$24.99',
      date: '2024-01-15',
      status: 'Completed',
      method: 'Credit Card',
      customer: 'John Doe',
    },
    {
      id: '2',
      orderNumber: '#ORD-002',
      amount: '$18.50',
      date: '2024-01-14',
      status: 'Completed',
      method: 'Credit Card',
      customer: 'Jane Smith',
    },
    {
      id: '3',
      orderNumber: '#ORD-003',
      amount: '$32.97',
      date: '2024-01-13',
      status: 'Refunded',
      method: 'Credit Card',
      customer: 'Mike Johnson',
    },
    {
      id: '4',
      orderNumber: '#ORD-004',
      amount: '$12.99',
      date: '2024-01-12',
      status: 'Completed',
      method: 'Credit Card',
      customer: 'Sarah Wilson',
    },
    {
      id: '5',
      orderNumber: '#ORD-005',
      amount: '$45.75',
      date: '2024-01-11',
      status: 'Pending',
      method: 'Credit Card',
      customer: 'David Brown',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#4CAF50';
      case 'Pending':
        return '#FFA500';
      case 'Refunded':
        return '#FF4444';
      case 'Failed':
        return '#FF4444';
      default:
        return '#666666';
    }
  };

  const renderPayment = ({ item }) => (
    <View style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <Text style={styles.orderNumber}>{item.orderNumber}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentAmount}>{item.amount}</Text>
        <Text style={styles.paymentDate}>Date: {item.date}</Text>
        <Text style={styles.paymentMethod}>Method: {item.method}</Text>
        <Text style={styles.customerName}>Customer: {item.customer}</Text>
      </View>
      
      <View style={styles.paymentActions}>
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
          <Text style={styles.headerTitle}>Payment History</Text>
          <Text style={styles.headerSubtitle}>All customer payments and transactions</Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Revenue</Text>
            <Text style={styles.summaryAmount}>$1,234.20</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>This Month</Text>
            <Text style={styles.summaryAmount}>$456.78</Text>
          </View>
        </View>

        {/* Payments List */}
        <View style={styles.content}>
          <FlatList
            data={payments}
            renderItem={renderPayment}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.paymentsList}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => navigation.navigate('Payout')}
          >
            <Text style={styles.quickActionText}>View Payouts</Text>
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
  paymentsList: {
    gap: 12,
  },
  paymentCard: {
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
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
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
  paymentInfo: {
    marginBottom: 12,
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  paymentDate: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  paymentMethod: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 14,
    color: '#666666',
  },
  paymentActions: {
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

export default PaymentHistoryScreen;
