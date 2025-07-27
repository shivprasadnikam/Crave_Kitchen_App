import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { THEME } from '../../styles/theme';

const CategoryCard = ({ 
  category, 
  onPress, 
  onEdit, 
  onDelete, 
  onReorder,
  showActions = true,
  compact = false,
  editable = false,
  isSelected = false 
}) => {
  const {
    id,
    name,
    description,
    image,
    itemCount,
    isActive,
    sortOrder,
    color,
    icon,
  } = category;

  const getItemCountText = () => {
    if (itemCount === 0) return 'No items';
    if (itemCount === 1) return '1 item';
    return `${itemCount} items`;
  };

  const getStatusColor = () => {
    return isActive ? THEME.colors.SUCCESS.MAIN : THEME.colors.TEXT.SECONDARY;
  };

  const renderCompactView = () => (
    <TouchableOpacity
      style={[
        styles.card,
        styles.compactCard,
        isSelected && styles.selectedCard
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.compactContent}>
        <View style={styles.compactImageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.compactImage} />
          ) : (
            <View style={[styles.compactImagePlaceholder, { backgroundColor: color + '20' }]}>
              <Text style={styles.compactImageText}>{icon || '🍽️'}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.compactInfo}>
          <Text style={styles.compactName} numberOfLines={1}>{name}</Text>
          <Text style={styles.compactItemCount}>{getItemCountText()}</Text>
        </View>
        
        <View style={styles.compactStatus}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
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
            <View style={[styles.imagePlaceholder, { backgroundColor: color + '20' }]}>
              <Text style={styles.imagePlaceholderText}>{icon || '🍽️'}</Text>
              <Text style={styles.imagePlaceholderLabel}>No Image</Text>
            </View>
          )}
          
          {/* Status Badge */}
          <View style={styles.statusBadge}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <View style={styles.header}>
            <View style={styles.titleSection}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.itemCount}>{getItemCountText()}</Text>
            </View>
            
            {sortOrder && (
              <View style={styles.sortOrder}>
                <Text style={styles.sortOrderText}>#{sortOrder}</Text>
              </View>
            )}
          </View>

          {/* Description */}
          {description && (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          )}

          {/* Empty State */}
          {itemCount === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No items in this category</Text>
              <Text style={styles.emptyStateSubtext}>Add items to get started</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Actions */}
      {showActions && editable && (
        <View style={styles.actionsSection}>
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => onEdit && onEdit(category)}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => onDelete && onDelete(category)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
          
          {onReorder && (
            <View style={styles.reorderSection}>
              <Text style={styles.reorderLabel}>Reorder:</Text>
              <View style={styles.reorderButtons}>
                <TouchableOpacity
                  style={[styles.reorderButton, styles.moveUpButton]}
                  onPress={() => onReorder(category, 'up')}
                >
                  <Text style={styles.reorderButtonText}>↑</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.reorderButton, styles.moveDownButton]}
                  onPress={() => onReorder(category, 'down')}
                >
                  <Text style={styles.reorderButtonText}>↓</Text>
                </TouchableOpacity>
              </View>
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
  selectedCard: {
    borderWidth: 2,
    borderColor: THEME.colors.PRIMARY.MAIN,
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
    width: 50,
    height: 50,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactImageText: {
    fontSize: 20,
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
  compactItemCount: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  compactStatus: {
    marginLeft: THEME.spacing.MD,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  imageSection: {
    position: 'relative',
    marginBottom: THEME.spacing.MD,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: THEME.borderRadius.SM,
  },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    borderRadius: THEME.borderRadius.SM,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 36,
    marginBottom: THEME.spacing.SM,
  },
  imagePlaceholderLabel: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  statusBadge: {
    position: 'absolute',
    top: THEME.spacing.SM,
    right: THEME.spacing.SM,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.SURFACE.PRIMARY + 'CC',
    paddingHorizontal: THEME.spacing.SM,
    paddingVertical: THEME.spacing.XS,
    borderRadius: THEME.borderRadius.ROUND,
  },
  statusText: {
    ...THEME.typography.CAPTION.SMALL,
    fontWeight: '600',
    marginLeft: THEME.spacing.XS,
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
  itemCount: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  sortOrder: {
    backgroundColor: THEME.colors.PRIMARY.MAIN + '20',
    paddingHorizontal: THEME.spacing.SM,
    paddingVertical: THEME.spacing.XS,
    borderRadius: THEME.borderRadius.SM,
  },
  sortOrderText: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.PRIMARY.MAIN,
    fontWeight: '600',
  },
  description: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: THEME.spacing.MD,
    backgroundColor: THEME.colors.SURFACE.SECONDARY,
    borderRadius: THEME.borderRadius.SM,
  },
  emptyStateText: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
    fontStyle: 'italic',
    marginBottom: THEME.spacing.XS,
  },
  emptyStateSubtext: {
    ...THEME.typography.CAPTION.SMALL,
    color: THEME.colors.TEXT.SECONDARY,
  },
  actionsSection: {
    borderTopWidth: 1,
    borderTopColor: THEME.colors.BORDER.PRIMARY,
    padding: THEME.spacing.MD,
    gap: THEME.spacing.MD,
  },
  actionRow: {
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
  reorderSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reorderLabel: {
    ...THEME.typography.BODY.SMALL,
    color: THEME.colors.TEXT.PRIMARY,
    fontWeight: '500',
  },
  reorderButtons: {
    flexDirection: 'row',
    gap: THEME.spacing.SM,
  },
  reorderButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moveUpButton: {
    backgroundColor: THEME.colors.SUCCESS.MAIN,
  },
  moveDownButton: {
    backgroundColor: THEME.colors.WARNING.MAIN,
  },
  reorderButtonText: {
    ...THEME.typography.BODY.MEDIUM,
    color: THEME.colors.NEUTRAL.WHITE,
    fontWeight: '600',
  },
});

export default CategoryCard; 