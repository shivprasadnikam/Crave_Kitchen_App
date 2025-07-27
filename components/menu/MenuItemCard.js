import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { THEME } from '../../styles/theme';
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
    backgroundColor: THEME.colors.SURFACE.PRIMARY,
    borderRadius: THEME.borderRadius.MD,
    marginBottom: THEME.spacing.MD,
    overflow: 'hidden',
    ...THEME.shadows.SM,
  },
  compactCard: {
    padding: THEME.spacing.MD,
  },
  cardContent: {
    padding: THEME.spacing.MD,
  },
  compactContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactImageContainer: {
    width: 60,
    height: 60,
    borderRadius: THEME.borderRadius.SM,
    overflow: 'hidden',
    marginRight: THEME.spacing.MD,
  },
  compactImage: {
    width: '100%',
    height: '100%',
  },
  compactImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: THEME.colors.SURFACE.SECONDARY,
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
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
    marginBottom: THEME.spacing.XS,
  },
  compactCategory: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    marginBottom: THEME.spacing.XS,
  },
  compactPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.SM,
  },
  compactPrice: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  compactOriginalPrice: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    textDecorationLine: 'line-through',
  },
  compactActions: {
    marginLeft: THEME.spacing.MD,
  },
  imageSection: {
    position: 'relative',
    marginBottom: THEME.spacing.MD,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: THEME.borderRadius.SM,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: THEME.colors.SURFACE.SECONDARY,
    borderRadius: THEME.borderRadius.SM,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 48,
    marginBottom: THEME.spacing.SM,
  },
  imagePlaceholderLabel: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  badgesContainer: {
    position: 'absolute',
    top: THEME.spacing.SM,
    left: THEME.spacing.SM,
    flexDirection: 'row',
    gap: THEME.spacing.SM,
  },
  badge: {
    paddingHorizontal: THEME.spacing.SM,
    paddingVertical: THEME.spacing.XS,
    borderRadius: THEME.borderRadius.ROUND,
  },
  popularBadge: {
    backgroundColor: THEME.colors.WARNING.MAIN + '20',
  },
  newBadge: {
    backgroundColor: THEME.colors.SUCCESS.MAIN + '20',
  },
  discountBadge: {
    backgroundColor: THEME.colors.ERROR.MAIN + '20',
  },
  badgeText: {
    ...THEME.typography.CAPTION.SMALL,
    fontWeight: '600',
  },
  contentSection: {
    gap: THEME.spacing.MD,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleSection: {
    flex: 1,
    marginRight: THEME.spacing.MD,
  },
  name: {
    ...THEME.typography.HEADING.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
    marginBottom: THEME.spacing.XS,
  },
  category: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  price: {
    ...THEME.typography.HEADING.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '600',
  },
  originalPrice: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    textDecorationLine: 'line-through',
  },
  description: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    lineHeight: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: THEME.spacing.MD,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 16,
    marginRight: THEME.spacing.XS,
  },
  detailText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  allergensSection: {
    marginTop: THEME.spacing.XS,
  },
  allergensLabel: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    fontWeight: '600',
    marginBottom: THEME.spacing.XS,
  },
  allergensList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: THEME.spacing.XS,
  },
  allergenTag: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.ERROR.MAIN,
    backgroundColor: THEME.colors.ERROR.MAIN + '20',
    paddingHorizontal: THEME.spacing.XS,
    paddingVertical: THEME.spacing.XS,
    borderRadius: THEME.borderRadius.SM,
  },
  moreAllergens: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    fontStyle: 'italic',
  },
  tagsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: THEME.spacing.SM,
  },
  tag: {
    backgroundColor: THEME.colors.PRIMARY.MAIN + '20',
    paddingHorizontal: THEME.spacing.SM,
    paddingVertical: THEME.spacing.XS,
    borderRadius: THEME.borderRadius.ROUND,
  },
  tagText: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.PRIMARY.MAIN,
    fontWeight: '600',
  },
  moreTags: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    fontStyle: 'italic',
  },
  customizationsSection: {
    marginTop: THEME.spacing.XS,
  },
  customizationsLabel: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.INFO.MAIN,
    fontStyle: 'italic',
  },
  actionsSection: {
    borderTopWidth: 1,
    borderTopColor: THEME.colors.BORDER.PRIMARY,
    padding: THEME.spacing.MD,
    gap: THEME.spacing.MD,
  },
  availabilitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availabilityLabel: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '500',
  },
  editActions: {
    flexDirection: 'row',
    gap: THEME.spacing.MD,
  },
  actionButton: {
    flex: 1,
    paddingVertical: THEME.spacing.SM,
    borderRadius: THEME.borderRadius.SM,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: THEME.colors.PRIMARY.MAIN,
  },
  editButtonText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: THEME.colors.ERROR.MAIN,
  },
  deleteButtonText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
});

export default MenuItemCard; 