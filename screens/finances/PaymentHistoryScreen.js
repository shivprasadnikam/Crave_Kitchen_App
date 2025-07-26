import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import { formatters } from '../../utils/formatters';
import { dateUtils } from '../../utils/dateUtils';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const PaymentHistoryScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [payments, setPayments] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock payment data
  const mockPayments = [
    {
      id: '1',
      orderId: 'ORD-001',
      customerName: 'John Smith',
      amount: 45.50,
      status: 'completed',
      paymentMethod: 'credit_card',
      paymentDate: '2024-01-15T14:30:00Z',
      transactionId: 'TXN-123456789',
      tip: 5.00,
      deliveryFee: 3.50,
      subtotal: 37.00,
    },
    {
      id: '2',
      orderId: 'ORD-002',
      customerName: 'Sarah Johnson',
      amount: 32.75,
      status: 'completed',
      paymentMethod: 'debit_card',
      paymentDate: '2024-01-15T13:15:00Z',
      transactionId: 'TXN-123456790',
      tip: 3.00,
      deliveryFee: 3.50,
      subtotal: 26.25,
    },
    {
      id: '3',
      orderId: 'ORD-003',
      customerName: 'Mike Wilson',
      amount: 28.90,
      status: 'pending',
      paymentMethod: 'cash',
      paymentDate: '2024-01-15T12:45:00Z',
      transactionId: 'TXN-123456791',
      tip: 2.50,
      deliveryFee: 3.50,
      subtotal: 22.90,
    },
    {
      id: '4',
      orderId: 'ORD-004',
      customerName: 'Emily Davis',
      amount: 55.25,
      status: 'completed',
      paymentMethod: 'credit_card',
      paymentDate: '2024-01-15T11:20:00Z',
      transactionId: 'TXN-123456792',
      tip: 7.00,
      deliveryFee: 3.50,
      subtotal: 44.75,
    },
    {
      id: '5',
      orderId: 'ORD-005',
      customerName: 'David Brown',
      amount: 41.80,
      status: 'failed',
      paymentMethod: 'credit_card',
      paymentDate: '2024-01-15T10:30:00Z',
      transactionId: 'TXN-123456793',
      tip: 4.00,
      deliveryFee: 3.50,
      subtotal: 34.30,
    },
    {
      id: '6',
      orderId: 'ORD-006',
      customerName: 'Lisa Anderson',
      amount: 38.50,
      status: 'completed',
      paymentMethod: 'debit_card',
      paymentDate: '2024-01-14T16:45:00Z',
      transactionId: 'TXN-123456794',
      tip: 4.50,
      deliveryFee: 3.50,
      subtotal: 30.50,
    },
  ];

  const filters = [
    { key: 'all', label: 'All Payments', icon: '📋' },
    { key: 'completed', label: 'Completed', icon: '✅' },
    { key: 'pending', label: 'Pending', icon: '⏳' },
    { key: 'failed', label: 'Failed', icon: '❌' },
  ];

  const paymentMethods = {
    credit_card: { label: 'Credit Card', icon: '💳' },
    debit_card: { label: 'Debit Card', icon: '💳' },
    cash: { label: 'Cash', icon: '💵' },
    digital_wallet: { label: 'Digital Wallet', icon: '📱' },
  };

  useEffect(() => {
    loadPaymentHistory();
  }, []);

  const loadPaymentHistory = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setPayments(mockPayments);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPaymentHistory();
    setRefreshing(false);
  };

  const getFilteredPayments = () => {
    let filtered = payments;

    // Filter by status
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === selectedFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(payment => 
        payment.orderId.toLowerCase().includes(query) ||
        payment.customerName.toLowerCase().includes(query) ||
        payment.transactionId.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));
  };

  const calculateMetrics = () => {
    const totalPayments = payments.length;
    const completedPayments = payments.filter(p => p.status === 'completed').length;
    const totalAmount = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
    const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

    return {
      totalPayments,
      completedPayments,
      totalAmount,
      pendingAmount,
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return colors.success;
      case 'pending': return colors.warning;
      case 'failed': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'pending': return '⏳';
      case 'failed': return '❌';
      default: return '📋';
    }
  };

  const renderFilterTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.filterContainer}
      contentContainerStyle={styles.filterContent}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          style={[styles.filterTab, selectedFilter === filter.key && styles.activeFilterTab]}
          onPress={() => setSelectedFilter(filter.key)}
        >
          <Text style={styles.filterIcon}>{filter.icon}</Text>
          <Text style={[styles.filterLabel, selectedFilter === filter.key && styles.activeFilterLabel]}>
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderMetricCard = (title, value, subtitle, color = colors.primary, icon = '📊') => (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricIcon}>{icon}</Text>
        <Text style={styles.metricTitle}>{title}</Text>
      </View>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
    </View>
  );

  const renderPaymentMetrics = () => {
    const metrics = calculateMetrics();

    return (
      <View style={styles.metricsGrid}>
        <View style={styles.metricRow}>
          {renderMetricCard(
            'Total Payments',
            metrics.totalPayments,
            'payment transactions',
            colors.primary,
            '📋'
          )}
          {renderMetricCard(
            'Completed',
            metrics.completedPayments,
            'successful payments',
            colors.success,
            '✅'
          )}
        </View>
        <View style={styles.metricRow}>
          {renderMetricCard(
            'Total Amount',
            formatters.formatCurrency(metrics.totalAmount),
            'completed payments',
            colors.primary,
            '💰'
          )}
          {renderMetricCard(
            'Pending',
            formatters.formatCurrency(metrics.pendingAmount),
            'awaiting completion',
            colors.warning,
            '⏳'
          )}
        </View>
      </View>
    );
  };

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search payments by order ID, customer, or transaction ID..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={colors.textSecondary}
      />
    </View>
  );

  const renderPaymentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.paymentCard}
      onPress={() => navigation.navigate('PaymentDetail', { paymentId: item.id })}
    >
      <View style={styles.paymentHeader}>
        <View style={styles.paymentInfo}>
          <Text style={styles.orderId}>{item.orderId}</Text>
          <Text style={styles.customerName}>{item.customerName}</Text>
        </View>
        <View style={styles.paymentStatus}>
          <Text style={styles.statusIcon}>{getStatusIcon(item.status)}</Text>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.paymentDetails}>
        <View style={styles.paymentAmount}>
          <Text style={styles.amountLabel}>Total Amount:</Text>
          <Text style={styles.amountValue}>{formatters.formatCurrency(item.amount)}</Text>
        </View>
        <View style={styles.paymentMethod}>
          <Text style={styles.methodIcon}>
            {paymentMethods[item.paymentMethod]?.icon || '💳'}
          </Text>
          <Text style={styles.methodLabel}>
            {paymentMethods[item.paymentMethod]?.label || 'Unknown'}
          </Text>
        </View>
      </View>

      <View style={styles.paymentBreakdown}>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Subtotal:</Text>
          <Text style={styles.breakdownValue}>{formatters.formatCurrency(item.subtotal)}</Text>
        </View>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Delivery Fee:</Text>
          <Text style={styles.breakdownValue}>{formatters.formatCurrency(item.deliveryFee)}</Text>
        </View>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownLabel}>Tip:</Text>
          <Text style={styles.breakdownValue}>{formatters.formatCurrency(item.tip)}</Text>
        </View>
      </View>

      <View style={styles.paymentFooter}>
        <View style={styles.paymentDate}>
          <Text style={styles.dateLabel}>Payment Date:</Text>
          <Text style={styles.dateValue}>{dateUtils.formatDateTime(item.paymentDate)}</Text>
        </View>
        <View style={styles.transactionId}>
          <Text style={styles.transactionLabel}>TXN ID:</Text>
          <Text style={styles.transactionValue}>{item.transactionId}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Coming Soon', 'Export payment history will be available soon!')}
        >
          <Text style={styles.actionIcon}>📤</Text>
          <Text style={styles.actionTitle}>Export History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Coming Soon', 'Payment analytics will be available soon!')}
        >
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionTitle}>Payment Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Revenue')}
        >
          <Text style={styles.actionIcon}>💰</Text>
          <Text style={styles.actionTitle}>Revenue Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Coming Soon', 'Payment settings will be available soon!')}
        >
          <Text style={styles.actionIcon}>⚙️</Text>
          <Text style={styles.actionTitle}>Payment Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  const filteredPayments = getFilteredPayments();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Payment History"
        subtitle={`${filteredPayments.length} payments`}
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderFilterTabs()}
        {renderPaymentMetrics()}
        {renderSearchBar()}
        {renderQuickActions()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Transactions</Text>
          {filteredPayments.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No payments found</Text>
            </View>
          ) : (
            filteredPayments.map((payment) => renderPaymentItem({ item: payment }))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  filterContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterTab: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.background,
    minWidth: 80,
  },
  activeFilterTab: {
    backgroundColor: colors.primary,
  },
  filterIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  filterLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeFilterLabel: {
    color: colors.white,
  },
  metricsGrid: {
    marginBottom: 24,
  },
  metricRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    ...globalStyles.shadow,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  metricTitle: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  metricValue: {
    ...typography.h2,
    fontWeight: '600',
    marginBottom: 4,
  },
  metricSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    ...globalStyles.input,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionTitle: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
    textAlign: 'center',
  },
  paymentCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  orderId: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  customerName: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  paymentStatus: {
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statusText: {
    ...typography.caption,
    fontWeight: '600',
  },
  paymentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentAmount: {
    flex: 1,
  },
  amountLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  amountValue: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  methodLabel: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  paymentBreakdown: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  breakdownItem: {
    flex: 1,
  },
  breakdownLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  breakdownValue: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  paymentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentDate: {
    flex: 1,
  },
  dateLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  dateValue: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  transactionId: {
    flex: 1,
    alignItems: 'flex-end',
  },
  transactionLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  transactionValue: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  emptyState: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    ...globalStyles.shadow,
  },
  emptyStateText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});

export default PaymentHistoryScreen; 