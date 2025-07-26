import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

const OrderItem = ({ 
  item, 
  showPrice = true,
  showCustomizations = true,
  compact = false 
}) => {
  const {
    id,
    name,
    quantity,
    price,
    totalPrice,
    customizations,
    specialInstructions,
    isAvailable,
    category,
  } = item;

  const getAvailabilityColor = () => {
    return isAvailable ? colors.success : colors.error;
  };

  const getAvailabilityText = () => {
    return isAvailable ? 'Available' : 'Unavailable';
  };

  const renderCompactView = () => (
    <View style={styles.compactContainer}>
      <View style={styles.compactMain}>
        <Text style={styles.compactQuantity}>{quantity}x</Text>
        <Text style={styles.compactName} numberOfLines={1}>{name}</Text>
        {showPrice && (
          <Text style={styles.compactPrice}>${totalPrice.toFixed(2)}</Text>
        )}
      </View>
      {!isAvailable && (
        <Text style={[styles.compactAvailability, { color: getAvailabilityColor() }]}>
          {getAvailabilityText()}
        </Text>
      )}
    </View>
  );

  const renderFullView = () => (
    <View style={styles.container}>
      {/* Main Item Info */}
      <View style={styles.mainSection}>
        <View style={styles.quantitySection}>
          <Text style={styles.quantity}>{quantity}x</Text>
        </View>
        
        <View style={styles.itemInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{name}</Text>
            {!isAvailable && (
              <View style={[styles.availabilityBadge, { backgroundColor: getAvailabilityColor() + '20' }]}>
                <Text style={[styles.availabilityText, { color: getAvailabilityColor() }]}>
                  {getAvailabilityText()}
                </Text>
              </View>
            )}
          </View>
          
          {category && (
            <Text style={styles.category}>{category}</Text>
          )}
          
          {showPrice && (
            <View style={styles.priceSection}>
              <Text style={styles.unitPrice}>${price.toFixed(2)} each</Text>
              <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Customizations */}
      {showCustomizations && customizations && customizations.length > 0 && (
        <View style={styles.customizationsSection}>
          {customizations.map((customization, index) => (
            <View key={index} style={styles.customizationRow}>
              <Text style={styles.customizationName}>{customization.name}</Text>
              {customization.price > 0 && (
                <Text style={styles.customizationPrice}>+${customization.price.toFixed(2)}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Special Instructions */}
      {specialInstructions && (
        <View style={styles.instructionsSection}>
          <Text style={styles.instructionsLabel}>Special Instructions:</Text>
          <Text style={styles.instructionsText}>{specialInstructions}</Text>
        </View>
      )}

      {/* Divider */}
      <View style={styles.divider} />
    </View>
  );

  return compact ? renderCompactView() : renderFullView();
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  mainSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  quantitySection: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  quantity: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
  },
  itemInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  name: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    ...typography.caption,
    fontWeight: '600',
  },
  category: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitPrice: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  totalPrice: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  customizationsSection: {
    marginLeft: 52, // Align with item name
    marginTop: 8,
    marginBottom: 8,
  },
  customizationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  customizationName: {
    ...typography.body2,
    color: colors.textSecondary,
    flex: 1,
  },
  customizationPrice: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
  },
  instructionsSection: {
    marginLeft: 52, // Align with item name
    marginTop: 8,
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 8,
  },
  instructionsLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  instructionsText: {
    ...typography.body2,
    color: colors.textPrimary,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: 12,
  },
  // Compact view styles
  compactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  compactMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  compactQuantity: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: '600',
    width: 30,
  },
  compactName: {
    ...typography.body2,
    color: colors.textPrimary,
    flex: 1,
    marginLeft: 8,
  },
  compactPrice: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
    marginLeft: 8,
  },
  compactAvailability: {
    ...typography.caption,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default OrderItem; 