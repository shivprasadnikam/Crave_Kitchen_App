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

const AddMenuItemScreen = ({ navigation }) => {
  const { categories, fetchCategories, addMenuItem } = useContext(MenuContext);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      Alert.alert('Error', 'Failed to load categories');
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

  const handleAddItem = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const itemData = {
        ...formData,
        price: parseFloat(formData.price),
        preparationTime: formData.preparationTime ? parseInt(formData.preparationTime) : null,
        calories: formData.calories ? parseInt(formData.calories) : null,
        createdAt: new Date().toISOString(),
      };

      await addMenuItem(itemData);
      Alert.alert(
        'Success',
        'Menu item added successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to add menu item');
    } finally {
      setLoading(false);
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

  const renderImageUpload = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Item Image (Optional)</Text>
      <TouchableOpacity style={styles.imageUploadButton}>
        <Text style={styles.imageUploadText}>📷 Add Photo</Text>
        <Text style={styles.imageUploadSubtext}>Tap to upload an image</Text>
      </TouchableOpacity>
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Add Menu Item"
        subtitle="Create a new menu item"
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

            {renderImageUpload()}

            {renderAvailabilityToggle()}
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.addButtonText}>Add Menu Item</Text>
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
  addButton: {
    ...globalStyles.primaryButton,
    backgroundColor: colors.primary,
  },
  addButtonText: {
    ...typography.button,
    color: colors.white,
  },
});

export default AddMenuItemScreen; 