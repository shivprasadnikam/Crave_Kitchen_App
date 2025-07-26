import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import AvailabilityToggle from './AvailabilityToggle';
import PriceEditor from './PriceEditor';

const MenuItemCard = ({ 
  item, 
  onPress, 
  onEdit, 
  onDelete, 
  onToggleAvailability,
  onPriceChange,
  showActions = true,
  compact = false,
  editable = false 
}) => {
  const {
    id,
    name,
    description,
    price,
    originalPrice,
    category,
    image,
    isAvailable,
    isPopular,
    isNew,
    preparationTime,
    calories,
    allergens,
    customizations,
    tags,
  } = item;

  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  const renderCompactView = () => (
    <TouchableOpacity
      style={[styles.card, styles.compactCard]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.compactContent}>
        <View style={styles.compactImageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.compactImage} />
          ) : (
            <View style={styles.compactImagePlaceholder}>
              <Text style={styles.compactImageText}>🍽️</Text>
            </View>
          )}
        </View>
        
        <View style={styles.compactInfo}>
          <Text style={styles.compactName} numberOfLines={1}>{name}</Text>
          <Text style={styles.compactCategory}>{category}</Text>
          <View style={styles.compactPriceRow}>
            <Text style={styles.compactPrice}>${price.toFixed(2)}</Text>
            {hasDiscount && (
              <Text style={styles.compactOriginalPrice}>${originalPrice.toFixed(2)}</Text>
            )}
          </View>
        </View>
        
        <View style={styles.compactActions}>
          <AvailabilityToggle
            isAvailable={isAvailable}
            onToggle={() => onToggleAvailability && onToggleAvailability(item)}
            size="small"
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFullView = () => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {/* Image Section */}
        <View style={styles.imageSection}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>🍽️</Text>
              <Text style={styles.imagePlaceholderLabel}>No Image</Text>
            </View>
          )}
          
          {/* Badges */}
          <View style={styles.badgesContainer}>
            {isPopular && (
              <View style={[styles.badge, styles.popularBadge]}>
                <Text style={styles.badgeText}>🔥 Popular</Text>
              </View>
            )}
            {isNew && (
              <View style={[styles.badge, styles.newBadge]}>
                <Text style={styles.badgeText}>🆕 New</Text>
              </View>
            )}
            {hasDiscount && (
              <View style={[styles.badge, styles.discountBadge]}>
                <Text style={styles.badgeText}>{discountPercentage}% OFF</Text>
              </View>
            )}
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.category}>{category}</Text>
            </View>
            
            <View style={styles.priceSection}>
              <Text style={styles.price}>${price.toFixed(2)}</Text>
              {hasDiscount && (
                <Text style={styles.originalPrice}>${originalPrice.toFixed(2)}</Text>
              )}
            </View>
          </View>

          {/* Description */}
          {description && (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          )}

          {/* Details Row */}
          <View style={styles.detailsRow}>
            {preparationTime && (
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>⏱️</Text>
                <Text style={styles.detailText}>{preparationTime} min</Text>
              </View>
            )}
            {calories && (
              <View style={styles.detailItem}>
                <Text style={styles.detailIcon}>🔥</Text>
                <Text style={styles.detailText}>{calories} cal</Text>
              </View>
            )}
          </View>

          {/* Allergens */}
          {allergens && allergens.length > 0 && (
            <View style={styles.allergensSection}>
              <Text style={styles.allergensLabel}>Allergens:</Text>
              <View style={styles.allergensList}>
                {allergens.slice(0, 3).map((allergen, index) => (
                  <Text key={index} style={styles.allergenTag}>
                    {allergen}
                  </Text>
                ))}
                {allergens.length > 3 && (
                  <Text style={styles.moreAllergens}>+{allergens.length - 3}</Text>
                )}
              </View>
            </View>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <View style={styles.tagsSection}>
              {tags.slice(0, 3).map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
              {tags.length > 3 && (
                <Text style={styles.moreTags}>+{tags.length - 3}</Text>
              )}
            </View>
          )}

          {/* Customizations */}
          {customizations && customizations.length > 0 && (
            <View style={styles.customizationsSection}>
              <Text style={styles.customizationsLabel}>
                {customizations.length} customization{customizations.length > 1 ? 's' : ''} available
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Actions */}
      {showActions && (
        <View style={styles.actionsSection}>
          <View style={styles.availabilitySection}>
            <Text style={styles.availabilityLabel}>Available</Text>
            <AvailabilityToggle
              isAvailable={isAvailable}
              onToggle={() => onToggleAvailability && onToggleAvailability(item)}
            />
          </View>
          
          {editable && (
            <View style={styles.editActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() => onEdit && onEdit(item)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => onDelete && onDelete(item)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );

  return compact ? renderCompactView() : renderFullView();
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    ...globalStyles.shadow,
  },
  compactCard: {
    padding: 12,
  },
  cardContent: {
    padding: 16,
  },
  compactContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  compactImage: {
    width: '100%',
    height: '100%',
  },
  compactImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactImageText: {
    fontSize: 24,
  },
  compactInfo: {
    flex: 1,
  },
  compactName: {
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  compactCategory: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  compactPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  compactPrice: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  compactOriginalPrice: {
    ...typography.caption,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  compactActions: {
    marginLeft: 12,
  },
  imageSection: {
    position: 'relative',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: colors.background,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 48,
    marginBottom: 8,
  },
  imagePlaceholderLabel: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  badgesContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadge: {
    backgroundColor: colors.warning + '20',
  },
  newBadge: {
    backgroundColor: colors.success + '20',
  },
  discountBadge: {
    backgroundColor: colors.error + '20',
  },
  badgeText: {
    ...typography.caption,
    fontWeight: '600',
  },
  contentSection: {
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleSection: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  category: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  price: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  originalPrice: {
    ...typography.body2,
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  description: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  detailText: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  allergensSection: {
    marginTop: 4,
  },
  allergensLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  allergensList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  allergenTag: {
    ...typography.caption,
    color: colors.error,
    backgroundColor: colors.error + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  moreAllergens: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  tagsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  moreTags: {
    ...typography.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  customizationsSection: {
    marginTop: 4,
  },
  customizationsLabel: {
    ...typography.caption,
    color: colors.info,
    fontStyle: 'italic',
  },
  actionsSection: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 16,
    gap: 12,
  },
  availabilitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availabilityLabel: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: colors.primary,
  },
  editButtonText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  deleteButtonText: {
    ...typography.body2,
    color: colors.white,
    fontWeight: '600',
  },
});

export default MenuItemCard; 