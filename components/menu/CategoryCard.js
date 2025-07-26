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
    return isActive ? colors.success : colors.textSecondary;
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
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    ...globalStyles.shadow,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: colors.primary,
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
    width: 50,
    height: 50,
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
    ...typography.body1,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  compactItemCount: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  compactStatus: {
    marginLeft: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  imageSection: {
    position: 'relative',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 36,
    marginBottom: 8,
  },
  imagePlaceholderLabel: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface + 'CC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    ...typography.caption,
    fontWeight: '600',
    marginLeft: 4,
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
  itemCount: {
    ...typography.body2,
    color: colors.textSecondary,
  },
  sortOrder: {
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sortOrderText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  description: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  emptyStateText: {
    ...typography.body2,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 4,
  },
  emptyStateSubtext: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  actionsSection: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 16,
    gap: 12,
  },
  actionRow: {
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
  reorderSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reorderLabel: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  reorderButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  reorderButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moveUpButton: {
    backgroundColor: colors.success,
  },
  moveDownButton: {
    backgroundColor: colors.warning,
  },
  reorderButtonText: {
    ...typography.body1,
    color: colors.white,
    fontWeight: '600',
  },
});

export default CategoryCard; 