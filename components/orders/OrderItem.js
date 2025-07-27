import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { THEME } from '../../styles/theme';

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
    return isAvailable ? THEME.colors.SUCCESS.MAIN : THEME.colors.ERROR.MAIN;
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
    marginBottom: THEME.spacing.SM,
  },
  mainSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  quantitySection: {
    width: 40,
    alignItems: 'center',
    marginRight: THEME.spacing.MD,
  },
  quantity: {
    ...THEME.typography.HEADING.SMALL,
    color: THEME.colors.PRIMARY.MAIN,
    fontWeight: '600',
  },
  itemInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: THEME.spacing.XS,
  },
  name: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
    flex: 1,
    marginRight: THEME.spacing.SM,
  },
  availabilityBadge: {
    paddingHorizontal: THEME.spacing.SM,
    paddingVertical: THEME.spacing.XS,
    borderRadius: THEME.borderRadius.ROUND,
  },
  availabilityText: {
    ...THEME.typography.CAPTION.SMALL,
    fontWeight: '600',
  },
  category: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    marginBottom: THEME.spacing.SM,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitPrice: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  totalPrice: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  customizationsSection: {
    marginLeft: 52, // Align with item name
    marginTop: THEME.spacing.SM,
    marginBottom: THEME.spacing.SM,
  },
  customizationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.XS,
  },
  customizationName: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    flex: 1,
  },
  customizationPrice: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.PRIMARY.MAIN,
    fontWeight: '600',
  },
  instructionsSection: {
    marginLeft: 52, // Align with item name
    marginTop: THEME.spacing.SM,
    backgroundColor: THEME.colors.SURFACE.SECONDARY,
    borderRadius: THEME.borderRadius.SM,
    padding: THEME.spacing.SM,
  },
  instructionsLabel: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    fontWeight: '600',
    marginBottom: THEME.spacing.XS,
  },
  instructionsText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: THEME.colors.BORDER.PRIMARY,
    marginTop: THEME.spacing.MD,
  },
  // Compact view styles
  compactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: THEME.spacing.XS,
  },
  compactMain: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  compactQuantity: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.PRIMARY.MAIN,
    fontWeight: '600',
    width: 30,
  },
  compactName: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    flex: 1,
    marginLeft: THEME.spacing.SM,
  },
  compactPrice: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
    marginLeft: THEME.spacing.SM,
  },
  compactAvailability: {
    ...THEME.typography.CAPTION.SMALL,
    fontWeight: '600',
    marginLeft: THEME.spacing.SM,
  },
});

export default OrderItem; 