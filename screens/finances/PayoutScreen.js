import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import { formatters } from '../../utils/formatters';
import { dateUtils } from '../../utils/dateUtils';
import { validators } from '../../utils/validators';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const PayoutScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [payoutHistory, setPayoutHistory] = useState([]);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [selectedPayoutMethod, setSelectedPayoutMethod] = useState('bank_transfer');

  // Mock payout data
  const mockPayoutHistory = [
    {
      id: '1',
      amount: 1250.50,
      status: 'completed',
      payoutMethod: 'bank_transfer',
      requestDate: '2024-01-15T10:30:00Z',
      processedDate: '2024-01-16T14:20:00Z',
      transactionId: 'PAY-123456789',
      accountInfo: '****1234',
    },
    {
      id: '2',
      amount: 980.75,
      status: 'pending',
      payoutMethod: 'bank_transfer',
      requestDate: '2024-01-14T16:45:00Z',
      processedDate: null,
      transactionId: 'PAY-123456790',
      accountInfo: '****1234',
    },
    {
      id: '3',
      amount: 750.25,
      status: 'completed',
      payoutMethod: 'paypal',
      requestDate: '2024-01-10T09:15:00Z',
      processedDate: '2024-01-11T11:30:00Z',
      transactionId: 'PAY-123456791',
      accountInfo: 'john@example.com',
    },
    {
      id: '4',
      amount: 650.00,
      status: 'failed',
      payoutMethod: 'bank_transfer',
      requestDate: '2024-01-08T14:20:00Z',
      processedDate: null,
      transactionId: 'PAY-123456792',
      accountInfo: '****1234',
      failureReason: 'Insufficient funds',
    },
  ];

  const payoutMethods = [
    {
      key: 'bank_transfer',
      label: 'Bank Transfer',
      icon: '🏦',
      description: 'Direct deposit to your bank account',
      processingTime: '1-2 business days',
    },
    {
      key: 'paypal',
      label: 'PayPal',
      icon: '💳',
      description: 'Transfer to your PayPal account',
      processingTime: 'Instant',
    },
    {
      key: 'check',
      label: 'Check',
      icon: '📄',
      description: 'Physical check mailed to your address',
      processingTime: '5-7 business days',
    },
  ];

  useEffect(() => {
    loadPayoutData();
  }, []);

  const loadPayoutData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAvailableBalance(2345.75); // Mock available balance
      setPayoutHistory(mockPayoutHistory);
    } catch (error) {
      Alert.alert('Error', 'Failed to load payout data');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPayoutData();
    setRefreshing(false);
  };

  const validatePayoutAmount = () => {
    if (!payoutAmount.trim()) {
      Alert.alert('Error', 'Please enter a payout amount');
      return false;
    }

    if (!validators.isValidNumber(payoutAmount)) {
      Alert.alert('Error', 'Please enter a valid amount');
      return false;
    }

    const amount = parseFloat(payoutAmount);
    if (amount <= 0) {
      Alert.alert('Error', 'Payout amount must be greater than 0');
      return false;
    }

    if (amount > availableBalance) {
      Alert.alert('Error', 'Payout amount cannot exceed available balance');
      return false;
    }

    if (amount < 50) {
      Alert.alert('Error', 'Minimum payout amount is $50');
      return false;
    }

    return true;
  };

  const handleRequestPayout = async () => {
    if (!validatePayoutAmount()) {
      return;
    }

    setRequesting(true);
    try {
      const amount = parseFloat(payoutAmount);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Payout Requested',
        `Your payout request for ${formatters.formatCurrency(amount)} has been submitted successfully. You will receive a confirmation email shortly.`,
        [
          {
            text: 'OK',
            onPress: () => {
              setPayoutAmount('');
              loadPayoutData(); // Refresh data
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to request payout. Please try again.');
    } finally {
      setRequesting(false);
    }
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

  const renderMetricCard = (title, value, subtitle, color = colors.primary, icon = '💰') => (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricIcon}>{icon}</Text>
        <Text style={styles.metricTitle}>{title}</Text>
      </View>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
    </View>
  );

  const renderBalanceMetrics = () => (
    <View style={styles.metricsGrid}>
      <View style={styles.metricRow}>
        {renderMetricCard(
          'Available Balance',
          formatters.formatCurrency(availableBalance),
          'ready for payout',
          colors.primary,
          '💰'
        )}
        {renderMetricCard(
          'Minimum Payout',
          '$50.00',
          'minimum amount',
          colors.info,
          '📊'
        )}
      </View>
    </View>
  );

  const renderPayoutRequest = () => (
    <View style={styles.payoutRequestContainer}>
      <Text style={styles.sectionTitle}>Request Payout</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Payout Amount *</Text>
        <TextInput
          style={styles.amountInput}
          placeholder="Enter amount (min $50)"
          value={payoutAmount}
          onChangeText={setPayoutAmount}
          keyboardType="decimal-pad"
          placeholderTextColor={colors.textSecondary}
        />
        <Text style={styles.balanceText}>
          Available: {formatters.formatCurrency(availableBalance)}
        </Text>
      </View>

      <View style={styles.methodContainer}>
        <Text style={styles.label}>Payout Method</Text>
        {payoutMethods.map((method) => (
          <TouchableOpacity
            key={method.key}
            style={[
              styles.methodOption,
              selectedPayoutMethod === method.key && styles.selectedMethodOption,
            ]}
            onPress={() => setSelectedPayoutMethod(method.key)}
          >
            <View style={styles.methodInfo}>
              <Text style={styles.methodIcon}>{method.icon}</Text>
              <View style={styles.methodDetails}>
                <Text style={styles.methodLabel}>{method.label}</Text>
                <Text style={styles.methodDescription}>{method.description}</Text>
                <Text style={styles.methodTime}>{method.processingTime}</Text>
              </View>
            </View>
            {selectedPayoutMethod === method.key && (
              <Text style={styles.selectedIcon}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.requestButton, requesting && styles.requestButtonDisabled]}
        onPress={handleRequestPayout}
        disabled={requesting}
      >
        <Text style={styles.requestButtonText}>
          {requesting ? 'Processing...' : 'Request Payout'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPayoutHistory = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payout History</Text>
      {payoutHistory.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No payout history available</Text>
        </View>
      ) : (
        payoutHistory.map((payout) => (
          <View key={payout.id} style={styles.payoutCard}>
            <View style={styles.payoutHeader}>
              <View style={styles.payoutInfo}>
                <Text style={styles.payoutAmount}>
                  {formatters.formatCurrency(payout.amount)}
                </Text>
                <Text style={styles.payoutDate}>
                  {dateUtils.formatDate(payout.requestDate)}
                </Text>
              </View>
              <View style={styles.payoutStatus}>
                <Text style={styles.statusIcon}>{getStatusIcon(payout.status)}</Text>
                <Text style={[styles.statusText, { color: getStatusColor(payout.status) }]}>
                  {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                </Text>
              </View>
            </View>

            <View style={styles.payoutDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Method:</Text>
                <Text style={styles.detailValue}>
                  {payoutMethods.find(m => m.key === payout.payoutMethod)?.label || 'Unknown'}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Account:</Text>
                <Text style={styles.detailValue}>{payout.accountInfo}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Transaction ID:</Text>
                <Text style={styles.detailValue}>{payout.transactionId}</Text>
              </View>
              {payout.processedDate && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Processed:</Text>
                  <Text style={styles.detailValue}>
                    {dateUtils.formatDateTime(payout.processedDate)}
                  </Text>
                </View>
              )}
              {payout.failureReason && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Failure Reason:</Text>
                  <Text style={[styles.detailValue, { color: colors.error }]}>
                    {payout.failureReason}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))
      )}
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Coming Soon', 'Payout settings will be available soon!')}
        >
          <Text style={styles.actionIcon}>⚙️</Text>
          <Text style={styles.actionTitle}>Payout Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => Alert.alert('Coming Soon', 'Tax documents will be available soon!')}
        >
          <Text style={styles.actionIcon}>📄</Text>
          <Text style={styles.actionTitle}>Tax Documents</Text>
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
          onPress={() => Alert.alert('Coming Soon', 'Payout analytics will be available soon!')}
        >
          <Text style={styles.actionIcon}>📊</Text>
          <Text style={styles.actionTitle}>Payout Analytics</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Payouts"
        subtitle="Request and manage payouts"
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
        {renderBalanceMetrics()}
        {renderPayoutRequest()}
        {renderQuickActions()}
        {renderPayoutHistory()}
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
  payoutRequestContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    ...globalStyles.shadow,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  amountInput: {
    ...globalStyles.input,
    backgroundColor: colors.background,
    borderColor: colors.border,
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  balanceText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  methodContainer: {
    marginBottom: 20,
  },
  methodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: colors.border,
  },
  selectedMethodOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  methodDetails: {
    flex: 1,
  },
  methodLabel: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  methodDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  methodTime: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '500',
  },
  selectedIcon: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
  },
  requestButton: {
    ...globalStyles.primaryButton,
    backgroundColor: colors.primary,
  },
  requestButtonDisabled: {
    opacity: 0.6,
  },
  requestButtonText: {
    ...typography.button,
    color: colors.white,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
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
  payoutCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...globalStyles.shadow,
  },
  payoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  payoutInfo: {
    flex: 1,
  },
  payoutAmount: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  payoutDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  payoutStatus: {
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
  payoutDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  detailValue: {
    ...typography.body2,
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

export default PayoutScreen; 