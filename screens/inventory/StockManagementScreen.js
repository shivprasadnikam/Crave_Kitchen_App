import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import { formatters } from '../../utils/formatters';
import { validators } from '../../utils/validators';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const StockManagementScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    currentStock: '',
    adjustment: '',
    reason: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  // Mock inventory data
  const mockInventory = [
    {
      id: '1',
      name: 'Chicken Breast',
      category: 'Meat',
      currentStock: 15,
      minStock: 20,
      unit: 'kg',
      cost: 8.50,
      supplier: 'Fresh Foods Co.',
      lastUpdated: '2024-01-15T10:30:00Z',
      status: 'low',
    },
    {
      id: '2',
      name: 'Tomatoes',
      category: 'Vegetables',
      currentStock: 25,
      minStock: 10,
      unit: 'kg',
      cost: 3.20,
      supplier: 'Local Market',
      lastUpdated: '2024-01-15T09:15:00Z',
      status: 'good',
    },
    {
      id: '3',
      name: 'Olive Oil',
      category: 'Pantry',
      currentStock: 8,
      minStock: 15,
      unit: 'L',
      cost: 12.00,
      supplier: 'Premium Oils',
      lastUpdated: '2024-01-14T16:45:00Z',
      status: 'low',
    },
    {
      id: '4',
      name: 'Rice',
      category: 'Grains',
      currentStock: 50,
      minStock: 25,
      unit: 'kg',
      cost: 2.50,
      supplier: 'Bulk Foods',
      lastUpdated: '2024-01-15T11:20:00Z',
      status: 'good',
    },
    {
      id: '5',
      name: 'Cheese',
      category: 'Dairy',
      currentStock: 5,
      minStock: 12,
      unit: 'kg',
      cost: 15.00,
      supplier: 'Dairy Delights',
      lastUpdated: '2024-01-15T08:30:00Z',
      status: 'critical',
    },
  ];

  const adjustmentReasons = [
    'Restock',
    'Usage',
    'Waste',
    'Damage',
    'Expiry',
    'Correction',
    'Other',
  ];

  const { itemId } = route.params || {};

  useEffect(() => {
    loadItemData();
  }, [itemId]);

  const loadItemData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (itemId) {
        const item = mockInventory.find(i => i.id === itemId);
        if (item) {
          setSelectedItem(item);
          setFormData({
            currentStock: item.currentStock.toString(),
            adjustment: '',
            reason: '',
            notes: '',
          });
        } else {
          Alert.alert('Error', 'Item not found');
          navigation.goBack();
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load item data');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentStock.trim()) {
      newErrors.currentStock = 'Current stock is required';
    } else if (!validators.isValidNumber(formData.currentStock)) {
      newErrors.currentStock = 'Please enter a valid number';
    } else if (parseFloat(formData.currentStock) < 0) {
      newErrors.currentStock = 'Stock cannot be negative';
    }

    if (formData.adjustment && !validators.isValidNumber(formData.adjustment)) {
      newErrors.adjustment = 'Please enter a valid adjustment amount';
    }

    if (formData.reason && formData.reason.length > 100) {
      newErrors.reason = 'Reason must be less than 100 characters';
    }

    if (formData.notes && formData.notes.length > 200) {
      newErrors.notes = 'Notes must be less than 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveStock = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const newStock = parseFloat(formData.currentStock);
      const adjustment = formData.adjustment ? parseFloat(formData.adjustment) : 0;
      const oldStock = selectedItem.currentStock;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      Alert.alert(
        'Success',
        `Stock updated successfully!\n\nPrevious: ${oldStock} ${selectedItem.unit}\nNew: ${newStock} ${selectedItem.unit}\nAdjustment: ${adjustment > 0 ? '+' : ''}${adjustment} ${selectedItem.unit}`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update stock');
    } finally {
      setSaving(false);
    }
  };

  const handleQuickAdjustment = (amount) => {
    const current = parseFloat(formData.currentStock) || 0;
    const newAmount = Math.max(0, current + amount);
    setFormData(prev => ({
      ...prev,
      currentStock: newAmount.toString(),
      adjustment: amount.toString(),
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return colors.error;
      case 'low': return colors.warning;
      case 'good': return colors.success;
      default: return colors.textSecondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical': return '🚨';
      case 'low': return '⚠️';
      case 'good': return '✅';
      default: return '📦';
    }
  };

  const renderInput = (field, label, placeholder, options = {}) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, errors[field] && styles.inputError]}
        placeholder={placeholder}
        value={formData[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        placeholderTextColor={colors.textSecondary}
        keyboardType={options.keyboardType || 'default'}
        multiline={options.multiline || false}
        numberOfLines={options.numberOfLines || 1}
        maxLength={options.maxLength}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  const renderItemInfo = () => {
    if (!selectedItem) return null;

    return (
      <View style={styles.itemInfoCard}>
        <View style={styles.itemHeader}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{selectedItem.name}</Text>
            <Text style={styles.itemCategory}>{selectedItem.category}</Text>
          </View>
          <View style={styles.itemStatus}>
            <Text style={styles.statusIcon}>{getStatusIcon(selectedItem.status)}</Text>
            <Text style={[styles.statusText, { color: getStatusColor(selectedItem.status) }]}>
              {selectedItem.status.charAt(0).toUpperCase() + selectedItem.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.itemDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Current Stock:</Text>
            <Text style={[styles.detailValue, { color: getStatusColor(selectedItem.status) }]}>
              {selectedItem.currentStock} {selectedItem.unit}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Minimum Stock:</Text>
            <Text style={styles.detailValue}>{selectedItem.minStock} {selectedItem.unit}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Cost:</Text>
            <Text style={styles.detailValue}>{formatters.formatCurrency(selectedItem.cost)}/{selectedItem.unit}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Supplier:</Text>
            <Text style={styles.detailValue}>{selectedItem.supplier}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderQuickAdjustments = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Adjustments</Text>
      <View style={styles.quickAdjustments}>
        <TouchableOpacity
          style={[styles.quickButton, { backgroundColor: colors.success }]}
          onPress={() => handleQuickAdjustment(1)}
        >
          <Text style={styles.quickButtonText}>+1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickButton, { backgroundColor: colors.success }]}
          onPress={() => handleQuickAdjustment(5)}
        >
          <Text style={styles.quickButtonText}>+5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickButton, { backgroundColor: colors.success }]}
          onPress={() => handleQuickAdjustment(10)}
        >
          <Text style={styles.quickButtonText}>+10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickButton, { backgroundColor: colors.error }]}
          onPress={() => handleQuickAdjustment(-1)}
        >
          <Text style={styles.quickButtonText}>-1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickButton, { backgroundColor: colors.error }]}
          onPress={() => handleQuickAdjustment(-5)}
        >
          <Text style={styles.quickButtonText}>-5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickButton, { backgroundColor: colors.error }]}
          onPress={() => handleQuickAdjustment(-10)}
        >
          <Text style={styles.quickButtonText}>-10</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderReasonSelector = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Reason for Adjustment (Optional)</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reasonScroll}>
        {adjustmentReasons.map((reason) => (
          <TouchableOpacity
            key={reason}
            style={[styles.reasonOption, formData.reason === reason && styles.selectedReasonOption]}
            onPress={() => handleInputChange('reason', reason)}
          >
            <Text style={[styles.reasonOptionText, formData.reason === reason && styles.selectedReasonOptionText]}>
              {reason}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}
    </View>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Stock Management"
        subtitle={selectedItem?.name}
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderItemInfo()}

          <View style={styles.form}>
            {renderInput('currentStock', 'Current Stock *', 'Enter current stock level', {
              keyboardType: 'decimal-pad',
            })}

            {renderInput('adjustment', 'Adjustment (Optional)', 'Enter adjustment amount', {
              keyboardType: 'decimal-pad',
            })}

            {renderQuickAdjustments()}

            {renderReasonSelector()}

            {renderInput('notes', 'Notes (Optional)', 'Additional notes about this adjustment...', {
              multiline: true,
              numberOfLines: 3,
              maxLength: 200,
            })}
          </View>

          <TouchableOpacity
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            onPress={handleSaveStock}
            disabled={saving}
          >
            <Text style={styles.saveButtonText}>
              {saving ? 'Saving...' : 'Update Stock'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  itemInfoCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    ...globalStyles.shadow,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemCategory: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  itemStatus: {
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
  itemDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  detailValue: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    ...globalStyles.input,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    color: colors.textPrimary,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 12,
  },
  quickAdjustments: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  quickButtonText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: '600',
  },
  reasonScroll: {
    marginBottom: 8,
  },
  reasonOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedReasonOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  reasonOptionText: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  selectedReasonOptionText: {
    color: colors.white,
  },
  saveButton: {
    ...globalStyles.primaryButton,
    backgroundColor: colors.primary,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    ...typography.button,
    color: colors.white,
    fontWeight: '600',
  },
});

export default StockManagementScreen; 