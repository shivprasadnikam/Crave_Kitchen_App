import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuContext } from '../../context/MenuContext';
import { colors } from '../../styles/colors';
import { globalStyles } from '../../styles/globalStyles';
import { typography } from '../../styles/typography';
import { validators } from '../../utils/validators';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const EditMenuItemScreen = ({ navigation, route }) => {
  const { menuItems, categories, fetchMenuItems, fetchCategories, updateMenuItem, deleteMenuItem } = useContext(MenuContext);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    image: '',
    available: true,
    preparationTime: '',
    calories: '',
    allergens: '',
    ingredients: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  const { itemId } = route.params;

  useEffect(() => {
    loadData();
  }, [itemId]);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchMenuItems(),
        fetchCategories(),
      ]);
      
      const foundItem = menuItems.find(i => i.id === itemId);
      if (foundItem) {
        setItem(foundItem);
        setFormData({
          name: foundItem.name || '',
          description: foundItem.description || '',
          price: foundItem.price?.toString() || '',
          categoryId: foundItem.categoryId || '',
          image: foundItem.image || '',
          available: foundItem.available ?? true,
          preparationTime: foundItem.preparationTime?.toString() || '',
          calories: foundItem.calories?.toString() || '',
          allergens: foundItem.allergens || '',
          ingredients: foundItem.ingredients || '',
          notes: foundItem.notes || '',
        });
      } else {
        Alert.alert('Error', 'Menu item not found');
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load menu item data');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Item name must be at least 2 characters';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    // Price validation
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (!validators.isValidPrice(formData.price)) {
      newErrors.price = 'Please enter a valid price';
    }

    // Category validation
    if (!formData.categoryId) {
      newErrors.categoryId = 'Please select a category';
    }

    // Preparation time validation
    if (formData.preparationTime && !validators.isValidNumber(formData.preparationTime)) {
      newErrors.preparationTime = 'Please enter a valid preparation time';
    }

    // Calories validation
    if (formData.calories && !validators.isValidNumber(formData.calories)) {
      newErrors.calories = 'Please enter a valid calorie count';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const updateData = {
        ...formData,
        price: parseFloat(formData.price),
        preparationTime: formData.preparationTime ? parseInt(formData.preparationTime) : null,
        calories: formData.calories ? parseInt(formData.calories) : null,
        updatedAt: new Date().toISOString(),
      };

      await updateMenuItem(itemId, updateData);
      Alert.alert(
        'Success',
        'Menu item updated successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update menu item');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = () => {
    Alert.alert(
      'Delete Menu Item',
      `Are you sure you want to delete "${item?.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setSaving(true);
              await deleteMenuItem(itemId);
              Alert.alert(
                'Success',
                'Menu item deleted successfully!',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
              );
            } catch (error) {
              Alert.alert('Error', 'Failed to delete menu item');
            } finally {
              setSaving(false);
            }
          },
        },
      ]
    );
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
        autoCapitalize={options.autoCapitalize || 'none'}
        keyboardType={options.keyboardType || 'default'}
        multiline={options.multiline || false}
        numberOfLines={options.numberOfLines || 1}
        maxLength={options.maxLength}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  const renderCategorySelector = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Category *</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryOption,
              formData.categoryId === category.id && styles.selectedCategoryOption
            ]}
            onPress={() => handleInputChange('categoryId', category.id)}
          >
            <Text style={[
              styles.categoryOptionText,
              formData.categoryId === category.id && styles.selectedCategoryOptionText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {errors.categoryId && <Text style={styles.errorText}>{errors.categoryId}</Text>}
    </View>
  );

  const renderImageSection = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Item Image</Text>
      {formData.image ? (
        <View style={styles.imageContainer}>
          <Text style={styles.imageText}>📷 Image uploaded</Text>
          <TouchableOpacity style={styles.changeImageButton}>
            <Text style={styles.changeImageText}>Change Image</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.imageUploadButton}>
          <Text style={styles.imageUploadText}>📷 Add Photo</Text>
          <Text style={styles.imageUploadSubtext}>Tap to upload an image</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderAvailabilityToggle = () => (
    <View style={styles.toggleContainer}>
      <Text style={styles.label}>Available for Order</Text>
      <Switch
        value={formData.available}
        onValueChange={(value) => handleInputChange('available', value)}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={colors.white}
      />
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionButtonsContainer}>
      <TouchableOpacity 
        style={[styles.actionButton, styles.saveButton]} 
        onPress={handleSaveChanges}
        disabled={saving}
      >
        <Text style={styles.saveButtonText}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.actionButton, styles.deleteButton]} 
        onPress={handleDeleteItem}
        disabled={saving}
      >
        <Text style={styles.deleteButtonText}>Delete Item</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Edit Menu Item"
        subtitle={item?.name}
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
          <View style={styles.form}>
            {renderInput('name', 'Item Name *', 'Enter item name', {
              autoCapitalize: 'words',
              maxLength: 50,
            })}

            {renderInput('description', 'Description *', 'Describe your item...', {
              autoCapitalize: 'sentences',
              multiline: true,
              numberOfLines: 3,
              maxLength: 200,
            })}

            {renderCategorySelector()}

            {renderInput('price', 'Price *', '0.00', {
              keyboardType: 'decimal-pad',
            })}

            {renderInput('preparationTime', 'Preparation Time (minutes)', '15', {
              keyboardType: 'numeric',
            })}

            {renderInput('calories', 'Calories', '250', {
              keyboardType: 'numeric',
            })}

            {renderInput('ingredients', 'Ingredients', 'List main ingredients...', {
              autoCapitalize: 'sentences',
              multiline: true,
              numberOfLines: 2,
            })}

            {renderInput('allergens', 'Allergens', 'e.g., Nuts, Dairy, Gluten', {
              autoCapitalize: 'words',
            })}

            {renderInput('notes', 'Special Notes', 'Any special instructions or notes...', {
              autoCapitalize: 'sentences',
              multiline: true,
              numberOfLines: 2,
            })}

            {renderImageSection()}

            {renderAvailabilityToggle()}
          </View>

          {renderActionButtons()}
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
  categoryScroll: {
    marginBottom: 8,
  },
  categoryOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedCategoryOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryOptionText: {
    ...typography.body2,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  selectedCategoryOptionText: {
    color: colors.white,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  imageText: {
    ...typography.body2,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  changeImageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.primary,
  },
  changeImageText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
  imageUploadButton: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  imageUploadText: {
    ...typography.body1,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  imageUploadSubtext: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionButtonsContainer: {
    gap: 12,
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    ...typography.button,
    color: colors.white,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  deleteButtonText: {
    ...typography.button,
    color: colors.white,
    fontWeight: '600',
  },
});

export default EditMenuItemScreen; 