import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { THEME } from '../../styles/theme';

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
            placeholderTextColor={THEME.colors.TEXT.SECONDARY}
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
                placeholderTextColor={THEME.colors.TEXT.SECONDARY}
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
                  placeholderTextColor={THEME.colors.TEXT.SECONDARY}
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
    backgroundColor: THEME.colors.SURFACE.PRIMARY,
    borderRadius: THEME.borderRadius.MD,
    padding: THEME.spacing.MD,
    ...THEME.shadows.SM,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.MD,
  },
  title: {
    ...THEME.typography.HEADING.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: THEME.colors.PRIMARY.MAIN,
    paddingHorizontal: THEME.spacing.MD,
    paddingVertical: THEME.spacing.SM,
    borderRadius: THEME.borderRadius.SM,
  },
  editButtonText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
  editMode: {
    gap: THEME.spacing.MD,
  },
  inputSection: {
    gap: THEME.spacing.SM,
  },
  inputLabel: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '500',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.SURFACE.SECONDARY,
    borderRadius: THEME.borderRadius.SM,
    borderWidth: 1,
    borderColor: THEME.colors.BORDER.PRIMARY,
    paddingHorizontal: THEME.spacing.MD,
  },
  currencySymbol: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.SECONDARY,
    marginRight: THEME.spacing.SM,
  },
  priceInput: {
    flex: 1,
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
    paddingVertical: THEME.spacing.MD,
  },
  inputError: {
    borderColor: THEME.colors.ERROR.MAIN,
  },
  errorText: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.ERROR.MAIN,
  },
  helperText: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    fontStyle: 'italic',
  },
  discountPreview: {
    backgroundColor: THEME.colors.INFO.MAIN + '20',
    padding: THEME.spacing.MD,
    borderRadius: THEME.borderRadius.SM,
    borderLeftWidth: 4,
    borderLeftColor: THEME.colors.INFO.MAIN,
  },
  discountLabel: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.INFO.MAIN,
    fontWeight: '600',
    marginBottom: THEME.spacing.XS,
  },
  discountText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.INFO.MAIN,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: THEME.spacing.MD,
    marginTop: THEME.spacing.SM,
  },
  actionButton: {
    flex: 1,
    paddingVertical: THEME.spacing.MD,
    borderRadius: THEME.borderRadius.SM,
    alignItems: 'center',
  },
  saveActionButton: {
    backgroundColor: THEME.colors.SUCCESS.MAIN,
  },
  saveActionButtonText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
  cancelActionButton: {
    backgroundColor: THEME.colors.SURFACE.PRIMARY,
    borderWidth: 1,
    borderColor: THEME.colors.BORDER.PRIMARY,
  },
  cancelActionButtonText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  displayMode: {
    gap: THEME.spacing.MD,
  },
  priceDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: THEME.spacing.SM,
  },
  currentPriceLabel: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  currentPriceValue: {
    ...THEME.typography.HEADING.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  originalPriceDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: THEME.spacing.SM,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.BORDER.PRIMARY,
  },
  originalPriceLabel: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  originalPriceValue: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.SECONDARY,
    textDecorationLine: 'line-through',
  },
  discountDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: THEME.spacing.SM,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.BORDER.PRIMARY,
  },
  discountLabel: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  discountValue: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.ERROR.MAIN,
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
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  compactOriginalPrice: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    textDecorationLine: 'line-through',
  },
  compactEditMode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.SM,
  },
  compactPriceInput: {
    flex: 1,
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    backgroundColor: THEME.colors.SURFACE.SECONDARY,
    borderWidth: 1,
    borderColor: THEME.colors.BORDER.PRIMARY,
    borderRadius: THEME.borderRadius.XS,
    paddingHorizontal: THEME.spacing.SM,
    paddingVertical: THEME.spacing.XS,
    textAlign: 'center',
  },
  compactEditActions: {
    flexDirection: 'row',
    gap: THEME.spacing.XS,
  },
  compactActionButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: THEME.colors.SUCCESS.MAIN,
  },
  saveButtonText: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: THEME.colors.ERROR.MAIN,
  },
  cancelButtonText: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
});

export default PriceEditor; 