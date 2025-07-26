import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';

const PriceEditor = ({ 
  price, 
  originalPrice,
  onSave, 
  onCancel,
  showOriginalPrice = true,
  showDiscount = true,
  compact = false,
  disabled = false 
}) => {
  const [currentPrice, setCurrentPrice] = useState(price?.toString() || '');
  const [currentOriginalPrice, setCurrentOriginalPrice] = useState(originalPrice?.toString() || '');
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCurrentPrice(price?.toString() || '');
    setCurrentOriginalPrice(originalPrice?.toString() || '');
  }, [price, originalPrice]);

  const validatePrice = (priceStr) => {
    const numPrice = parseFloat(priceStr);
    if (isNaN(numPrice) || numPrice < 0) {
      return 'Price must be a positive number';
    }
    if (numPrice > 999.99) {
      return 'Price cannot exceed $999.99';
    }
    return null;
  };

  const validateOriginalPrice = (originalPriceStr, currentPriceStr) => {
    if (!originalPriceStr) return null;
    
    const numOriginal = parseFloat(originalPriceStr);
    const numCurrent = parseFloat(currentPriceStr);
    
    if (isNaN(numOriginal) || numOriginal < 0) {
      return 'Original price must be a positive number';
    }
    if (numOriginal <= numCurrent) {
      return 'Original price must be higher than current price';
    }
    return null;
  };

  const formatPrice = (priceStr) => {
    const num = parseFloat(priceStr);
    if (isNaN(num)) return '';
    return num.toFixed(2);
  };

  const handlePriceChange = (text) => {
    // Remove any non-numeric characters except decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return;
    }
    
    // Limit decimal places to 2
    if (parts[1] && parts[1].length > 2) {
      return;
    }
    
    setCurrentPrice(cleaned);
    
    // Clear price error if it exists
    if (errors.price) {
      setErrors(prev => ({ ...prev, price: null }));
    }
  };

  const handleOriginalPriceChange = (text) => {
    const cleaned = text.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) return;
    if (parts[1] && parts[1].length > 2) return;
    
    setCurrentOriginalPrice(cleaned);
    
    if (errors.originalPrice) {
      setErrors(prev => ({ ...prev, originalPrice: null }));
    }
  };

  const handleSave = () => {
    const priceError = validatePrice(currentPrice);
    const originalPriceError = validateOriginalPrice(currentOriginalPrice, currentPrice);
    
    if (priceError || originalPriceError) {
      setErrors({
        price: priceError,
        originalPrice: originalPriceError,
      });
      return;
    }

    const newPrice = parseFloat(currentPrice);
    const newOriginalPrice = currentOriginalPrice ? parseFloat(currentOriginalPrice) : null;
    
    if (onSave) {
      onSave(newPrice, newOriginalPrice);
    }
    
    setIsEditing(false);
    setErrors({});
  };

  const handleCancel = () => {
    setCurrentPrice(price?.toString() || '');
    setCurrentOriginalPrice(originalPrice?.toString() || '');
    setIsEditing(false);
    setErrors({});
    
    if (onCancel) {
      onCancel();
    }
  };

  const handleEdit = () => {
    if (!disabled) {
      setIsEditing(true);
    }
  };

  const getDiscountPercentage = () => {
    if (!originalPrice || !currentPrice) return 0;
    const original = parseFloat(originalPrice);
    const current = parseFloat(currentPrice);
    if (original <= current) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  const renderCompactView = () => (
    <View style={styles.compactContainer}>
      {isEditing ? (
        <View style={styles.compactEditMode}>
          <TextInput
            style={[styles.compactPriceInput, errors.price && styles.inputError]}
            value={currentPrice}
            onChangeText={handlePriceChange}
            placeholder="0.00"
            keyboardType="decimal-pad"
            placeholderTextColor={colors.textSecondary}
            maxLength={6}
          />
          <View style={styles.compactEditActions}>
            <TouchableOpacity
              style={[styles.compactActionButton, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.compactActionButton, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.compactDisplayMode}
          onPress={handleEdit}
          disabled={disabled}
        >
          <Text style={styles.compactPrice}>${formatPrice(currentPrice)}</Text>
          {showOriginalPrice && originalPrice && (
            <Text style={styles.compactOriginalPrice}>${formatPrice(originalPrice)}</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );

  const renderFullView = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Price Management</Text>
        {!isEditing && !disabled && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEdit}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      {isEditing ? (
        <View style={styles.editMode}>
          {/* Current Price */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Current Price *</Text>
            <View style={styles.priceInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={[styles.priceInput, errors.price && styles.inputError]}
                value={currentPrice}
                onChangeText={handlePriceChange}
                placeholder="0.00"
                keyboardType="decimal-pad"
                placeholderTextColor={colors.textSecondary}
                maxLength={6}
              />
            </View>
            {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
          </View>

          {/* Original Price */}
          {showOriginalPrice && (
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Original Price (Optional)</Text>
              <View style={styles.priceInputContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                  style={[styles.priceInput, errors.originalPrice && styles.inputError]}
                  value={currentOriginalPrice}
                  onChangeText={handleOriginalPriceChange}
                  placeholder="0.00"
                  keyboardType="decimal-pad"
                  placeholderTextColor={colors.textSecondary}
                  maxLength={6}
                />
              </View>
              {errors.originalPrice && <Text style={styles.errorText}>{errors.originalPrice}</Text>}
              <Text style={styles.helperText}>
                Leave empty if no discount is offered
              </Text>
            </View>
          )}

          {/* Discount Preview */}
          {showDiscount && currentOriginalPrice && !errors.originalPrice && (
            <View style={styles.discountPreview}>
              <Text style={styles.discountLabel}>Discount Preview:</Text>
              <Text style={styles.discountText}>
                {getDiscountPercentage()}% off (${formatPrice(currentOriginalPrice)} → ${formatPrice(currentPrice)})
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.saveActionButton]}
              onPress={handleSave}
            >
              <Text style={styles.saveActionButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelActionButton]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelActionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.displayMode}>
          <View style={styles.priceDisplay}>
            <Text style={styles.currentPriceLabel}>Current Price:</Text>
            <Text style={styles.currentPriceValue}>${formatPrice(currentPrice)}</Text>
          </View>

          {showOriginalPrice && originalPrice && (
            <View style={styles.originalPriceDisplay}>
              <Text style={styles.originalPriceLabel}>Original Price:</Text>
              <Text style={styles.originalPriceValue}>${formatPrice(originalPrice)}</Text>
            </View>
          )}

          {showDiscount && originalPrice && (
            <View style={styles.discountDisplay}>
              <Text style={styles.discountLabel}>Discount:</Text>
              <Text style={styles.discountValue}>{getDiscountPercentage()}% off</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );

  return compact ? renderCompactView() : renderFullView();
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    ...globalStyles.shadow,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButtonText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: '600',
  },
  editMode: {
    gap: 16,
  },
  inputSection: {
    gap: 8,
  },
  inputLabel: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
  },
  currencySymbol: {
    ...typography.body1,
    color: colors.textSecondary,
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    ...typography.body1,
    color: colors.textPrimary,
    paddingVertical: 12,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
  },
  helperText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  discountPreview: {
    backgroundColor: colors.info + '20',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
  },
  discountLabel: {
    ...typography.body2,
    color: colors.info,
    fontWeight: '600',
    marginBottom: 4,
  },
  discountText: {
    ...typography.body2,
    color: colors.info,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveActionButton: {
    backgroundColor: colors.success,
  },
  saveActionButtonText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: '600',
  },
  cancelActionButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelActionButtonText: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  displayMode: {
    gap: 12,
  },
  priceDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  currentPriceLabel: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  currentPriceValue: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  originalPriceDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  originalPriceLabel: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  originalPriceValue: {
    ...typography.body1,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  discountDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  discountLabel: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  discountValue: {
    ...typography.body1,
    color: colors.error,
    fontWeight: '600',
  },
  // Compact view styles
  compactContainer: {
    minWidth: 80,
  },
  compactDisplayMode: {
    alignItems: 'center',
  },
  compactPrice: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  compactOriginalPrice: {
    ...typography.caption,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  compactEditMode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  compactPriceInput: {
    flex: 1,
    ...typography.body2,
    color: colors.textPrimary,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    textAlign: 'center',
  },
  compactEditActions: {
    flexDirection: 'row',
    gap: 4,
  },
  compactActionButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: colors.success,
  },
  saveButtonText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: colors.error,
  },
  cancelButtonText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
});

export default PriceEditor; 