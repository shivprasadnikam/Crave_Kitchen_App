import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { menuCategoriesService, menuItemsService } from '../../services/menuService';

const AddMenuItemScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [newCategoryData, setNewCategoryData] = useState({
    name: '',
    description: '',
    isActive: true,
    isFeatured: false,
  });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    isAvailable: true,
    isFeatured: false,
    preparationTime: '',
    calories: '',
    allergens: '',
    images: [],
    tags: [],
    nutritionalInfo: {
      protein: '',
      carbs: '',
      fat: '',
      fiber: '',
      sugar: '',
    },
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isDairyFree: false,
      isNutFree: false,
      isHalal: false,
      isKosher: false,
    },
    servingSize: '',
    spiceLevel: 'mild', // mild, medium, hot, extra-hot
    cookingInstructions: '',
    ingredients: '',
  });

  // Enhanced state for better UX
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [activeSection, setActiveSection] = useState('basic'); // basic, details, dietary, images

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      console.log(`[ADD MENU ITEM] Loading categories for vendor: ${user?.vendorId || 1}`); 
      const vendorId = user?.vendorId || 1;
      console.log(`[ADD MENU ITEM] Calling category API for vendor: ${vendorId}`);
      const response = await menuCategoriesService.getAllCategories(vendorId);
      
      if (response.success && response.data?.content) {
        setCategories(response.data.content);
        console.log(`[ADD MENU ITEM] Loaded ${response.data.content.length} categories`);
      } else {
        console.error(`[ADD MENU ITEM] Failed to load categories:`, response);
        Alert.alert('Error', 'Failed to load categories');
      }
    } catch (error) {
      console.error(`[ADD MENU ITEM] Error loading categories:`, error);
      Alert.alert('Error', 'Failed to load categories. Please try again.');
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Basic validation
    if (!formData.name.trim()) {
      errors.name = 'Item name is required';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Item name must be at least 3 characters';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      errors.price = 'Price must be a positive number';
    } else if (parseFloat(formData.price) > 999.99) {
      errors.price = 'Price cannot exceed $999.99';
    }
    
    if (!formData.categoryId) {
      errors.categoryId = 'Please select a category';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      errors.description = 'Description must be at least 10 characters';
    }
    
    // Enhanced validation
    if (formData.preparationTime && (parseInt(formData.preparationTime) < 1 || parseInt(formData.preparationTime) > 480)) {
      errors.preparationTime = 'Preparation time must be between 1 and 480 minutes';
    }
    
    if (formData.calories && (parseInt(formData.calories) < 0 || parseInt(formData.calories) > 5000)) {
      errors.calories = 'Calories must be between 0 and 5000';
    }
    
    if (formData.servingSize && formData.servingSize.trim().length < 2) {
      errors.servingSize = 'Serving size must be at least 2 characters';
    }
    
    setErrors(errors);
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  // Real-time validation
  const validateField = (field, value) => {
    const fieldErrors = { ...errors };
    
    switch (field) {
      case 'name':
        if (!value.trim()) {
          fieldErrors.name = 'Item name is required';
        } else if (value.trim().length < 3) {
          fieldErrors.name = 'Item name must be at least 3 characters';
        } else {
          delete fieldErrors.name;
        }
        break;
        
      case 'price':
        if (!value || parseFloat(value) <= 0) {
          fieldErrors.price = 'Price must be a positive number';
        } else if (parseFloat(value) > 999.99) {
          fieldErrors.price = 'Price cannot exceed $999.99';
        } else {
          delete fieldErrors.price;
        }
        break;
        
      case 'description':
        if (!value.trim()) {
          fieldErrors.description = 'Description is required';
        } else if (value.trim().length < 10) {
          fieldErrors.description = 'Description must be at least 10 characters';
        } else {
          delete fieldErrors.description;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(fieldErrors);
  };

  const handleSave = async () => {
    console.log(`[ADD MENU ITEM] Save button pressed`);
    
    const validation = validateForm();
    console.log(`[ADD MENU ITEM] Form validation result: ${validation.isValid ? 'PASS' : 'FAIL'}`, validation.errors);
    
    if (!validation.isValid) {
      Alert.alert('Validation Error', Object.values(validation.errors).join('\n'));
      return;
    }

    try {
      setSaving(true);
      
      const vendorId = user?.vendorId || 1;
      const itemData = {
        ...formData,
        vendorId,
        price: parseFloat(formData.price),
        categoryId: parseInt(formData.categoryId),
        preparationTime: parseInt(formData.preparationTime) || 0,
        calories: parseInt(formData.calories) || 0,
      };

      console.log(`[ADD MENU ITEM] Creating menu item with data:`, {
        name: itemData.name,
        price: itemData.price,
        categoryId: itemData.categoryId,
        vendorId: itemData.vendorId
      });

      const response = await menuItemsService.createItem(itemData);
      
      if (response.success) {
        console.log(`[ADD MENU ITEM] Menu item created successfully:`, response.data?.name);
        Alert.alert('Success', 'Menu item created successfully!', [
          {
            text: 'OK',
            onPress: () => {
              console.log(`[ADD MENU ITEM] Navigating back after successful creation`);
              navigation.goBack();
            }
          }
        ]);
      } else {
        throw new Error(response.message || 'Failed to create menu item');
      }
    } catch (error) {
      console.error(`[ADD MENU ITEM] Error creating menu item:`, error);
      Alert.alert('Error', error.message || 'Failed to create menu item. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getSelectedCategoryName = () => {
    const selectedCategory = categories.find(cat => cat.id.toString() === formData.categoryId);
    return selectedCategory ? selectedCategory.name : 'Select Category';
  };

  const handleAddCategory = async () => {
    if (!newCategoryData.name.trim()) {
      Alert.alert('Error', 'Category name is required');
      return;
    }

    try {
      const vendorId = user?.vendorId || 1;
      
      console.log(`[ADD MENU ITEM] Creating new category:`, {
        name: newCategoryData.name,
        description: newCategoryData.description,
        vendorId: vendorId
      });

      const categoryData = {
        ...newCategoryData,
        vendorId,
      };
      
      console.log(`[ADD MENU ITEM] Full category request payload:`, JSON.stringify(categoryData, null, 2));

      const response = await menuCategoriesService.createCategory(categoryData);

      if (response.success) {
        console.log(`[ADD MENU ITEM] Category created successfully:`, response.data?.name);
        
        // Refresh categories and select the new one
        await loadCategories();
        
        // Set the newly created category as selected
        if (response.data?.id) {
          setFormData({...formData, categoryId: response.data.id.toString()});
        }
        
        setShowAddCategoryModal(false);
        setNewCategoryData({ name: '', description: '', isActive: true, isFeatured: false });
        Alert.alert('Success', 'Category created and selected!');
      } else {
        throw new Error(response.message || 'Failed to create category');
      }
    } catch (error) {
      console.error(`[ADD MENU ITEM] Error creating category:`, error);
      Alert.alert('Error', error.message || 'Failed to create category');
    }
  };

  const getFilteredCategories = () => {
    if (!categorySearchQuery.trim()) {
      return categories;
    }
    return categories.filter(category =>
      category.name.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
      category.description?.toLowerCase().includes(categorySearchQuery.toLowerCase())
    );
  };

  // Helper functions for enhanced functionality
  const formatPrice = (price) => {
    if (!price) return '';
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return price;
    return numPrice.toFixed(2);
  };

  const handlePriceChange = (text) => {
    // Remove non-numeric characters except decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = cleaned.split('.');
    if (parts.length > 2) return;
    
    // Limit to 2 decimal places
    if (parts[1] && parts[1].length > 2) return;
    
    setFormData({...formData, price: cleaned});
    validateField('price', cleaned);
  };

  const loadTemplate = (template) => {
    setFormData({
      ...formData,
      ...template,
    });
    setShowTemplates(false);
  };

  const menuTemplates = [
    {
      name: 'Pizza',
      data: {
        name: 'Margherita Pizza',
        description: 'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil',
        price: '14.99',
        preparationTime: '20',
        calories: '285',
        spiceLevel: 'mild',
        dietaryInfo: { ...formData.dietaryInfo, isVegetarian: true },
      }
    },
    {
      name: 'Burger',
      data: {
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
        price: '12.99',
        preparationTime: '15',
        calories: '450',
        spiceLevel: 'mild',
        dietaryInfo: { ...formData.dietaryInfo },
      }
    },
    {
      name: 'Salad',
      data: {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
        price: '9.99',
        preparationTime: '10',
        calories: '180',
        spiceLevel: 'mild',
        dietaryInfo: { ...formData.dietaryInfo, isVegetarian: true },
      }
    },
    {
      name: 'Pasta',
      data: {
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta with eggs, cheese, pancetta, and black pepper',
        price: '16.99',
        preparationTime: '25',
        calories: '520',
        spiceLevel: 'medium',
        dietaryInfo: { ...formData.dietaryInfo },
      }
    },
  ];

  const renderInput = (label, value, onChangeText, placeholder, keyboardType = 'default', multiline = false, fieldName = null) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[
          styles.textInput, 
          multiline && styles.textArea,
          errors[fieldName] && styles.textInputError
        ]}
        value={value}
        onChangeText={(text) => {
          onChangeText(text);
          if (fieldName) {
            validateField(fieldName, text);
          }
        }}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
      {errors[fieldName] && (
        <Text style={styles.errorText}>{errors[fieldName]}</Text>
      )}
    </View>
  );

  const renderCategoryPicker = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Category *</Text>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setShowCategoryPicker(true)}
      >
        <View style={styles.pickerButtonContent}>
          <Text style={[styles.pickerButtonText, !formData.categoryId && styles.placeholderText]}>
            {getSelectedCategoryName()}
          </Text>
          {formData.categoryId && (
            <Text style={styles.pickerButtonSubtext}>
              {categories.length} categories available
            </Text>
          )}
        </View>
        <Text style={styles.pickerArrow}>▼</Text>
      </TouchableOpacity>
    </View>
  );

  const renderToggle = (label, value, onValueChange) => (
    <View style={styles.toggleContainer}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <TouchableOpacity
        style={[styles.toggleButton, value && styles.toggleButtonActive]}
        onPress={() => onValueChange(!value)}
      >
        <View style={[styles.toggleThumb, value && styles.toggleThumbActive]} />
      </TouchableOpacity>
    </View>
  );

  const renderSectionHeader = (title, isActive, onPress) => (
    <TouchableOpacity style={styles.sectionHeader} onPress={onPress}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
      <Text style={styles.sectionHeaderArrow}>{isActive ? '▼' : '▶'}</Text>
    </TouchableOpacity>
  );

  const renderSpiceLevelPicker = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Spice Level</Text>
      <View style={styles.spiceLevelContainer}>
        {['mild', 'medium', 'hot', 'extra-hot'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.spiceLevelButton,
              formData.spiceLevel === level && styles.spiceLevelButtonActive
            ]}
            onPress={() => setFormData({...formData, spiceLevel: level})}
          >
            <Text style={[
              styles.spiceLevelText,
              formData.spiceLevel === level && styles.spiceLevelTextActive
            ]}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderNutritionalInfo = () => (
    <View style={styles.nutritionalContainer}>
      <Text style={styles.sectionTitleText}>Nutritional Information</Text>
      <View style={styles.nutritionalGrid}>
        {renderInput('Protein (g)', formData.nutritionalInfo.protein, 
          (text) => setFormData({
            ...formData, 
            nutritionalInfo: {...formData.nutritionalInfo, protein: text}
          }), '0', 'numeric')}
        
        {renderInput('Carbs (g)', formData.nutritionalInfo.carbs, 
          (text) => setFormData({
            ...formData, 
            nutritionalInfo: {...formData.nutritionalInfo, carbs: text}
          }), '0', 'numeric')}
        
        {renderInput('Fat (g)', formData.nutritionalInfo.fat, 
          (text) => setFormData({
            ...formData, 
            nutritionalInfo: {...formData.nutritionalInfo, fat: text}
          }), '0', 'numeric')}
        
        {renderInput('Fiber (g)', formData.nutritionalInfo.fiber, 
          (text) => setFormData({
            ...formData, 
            nutritionalInfo: {...formData.nutritionalInfo, fiber: text}
          }), '0', 'numeric')}
        
        {renderInput('Sugar (g)', formData.nutritionalInfo.sugar, 
          (text) => setFormData({
            ...formData, 
            nutritionalInfo: {...formData.nutritionalInfo, sugar: text}
          }), '0', 'numeric')}
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading categories...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Add Menu Item</Text>
          <Text style={styles.headerSubtitle}>Create a new menu item for your restaurant</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.templateButton}
            onPress={() => setShowTemplates(true)}
          >
            <Text style={styles.templateButtonText}>📋 Use Template</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.previewButton}
            onPress={() => setShowPreview(true)}
          >
            <Text style={styles.previewButtonText}>👁️ Preview</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Basic Information Section */}
          {renderSectionHeader('Basic Information', activeSection === 'basic', () => setActiveSection(activeSection === 'basic' ? '' : 'basic'))}
          
          {activeSection === 'basic' && (
            <View style={styles.sectionContent}>
              {renderInput('Item Name *', formData.name, (text) => setFormData({...formData, name: text}), 'Enter item name', 'default', false, 'name')}
              
              {renderInput('Description *', formData.description, (text) => setFormData({...formData, description: text}), 'Enter item description', 'default', true, 'description')}
              
              {renderInput('Price *', formData.price, handlePriceChange, '0.00', 'decimal-pad', false, 'price')}
              
              {renderCategoryPicker()}
              
              {renderInput('Serving Size', formData.servingSize, (text) => setFormData({...formData, servingSize: text}), 'e.g., 1 slice, 1 bowl', 'default', false, 'servingSize')}
            </View>
          )}

          {/* Details Section */}
          {renderSectionHeader('Details', activeSection === 'details', () => setActiveSection(activeSection === 'details' ? '' : 'details'))}
          
          {activeSection === 'details' && (
            <View style={styles.sectionContent}>
              {renderInput('Preparation Time (minutes)', formData.preparationTime, (text) => setFormData({...formData, preparationTime: text}), '30', 'numeric', false, 'preparationTime')}
              
              {renderSpiceLevelPicker()}
              
              {renderInput('Ingredients', formData.ingredients, (text) => setFormData({...formData, ingredients: text}), 'List main ingredients', 'default', true)}
              
              {renderInput('Cooking Instructions', formData.cookingInstructions, (text) => setFormData({...formData, cookingInstructions: text}), 'Special cooking instructions', 'default', true)}
            </View>
          )}

          {/* Nutritional Information */}
          {renderSectionHeader('Nutritional Information', activeSection === 'nutritional', () => setActiveSection(activeSection === 'nutritional' ? '' : 'nutritional'))}
          
          {activeSection === 'nutritional' && (
            <View style={styles.sectionContent}>
              {renderInput('Calories', formData.calories, (text) => setFormData({...formData, calories: text}), '250', 'numeric', false, 'calories')}
              
              {renderNutritionalInfo()}
            </View>
          )}

          {/* Dietary Information */}
          {renderSectionHeader('Dietary Information', activeSection === 'dietary', () => setActiveSection(activeSection === 'dietary' ? '' : 'dietary'))}
          
          {activeSection === 'dietary' && (
            <View style={styles.sectionContent}>
              {renderInput('Allergens', formData.allergens, (text) => setFormData({...formData, allergens: text}), 'e.g., nuts, dairy, gluten')}
              
              {renderToggle('Vegetarian', formData.dietaryInfo.isVegetarian, (value) => setFormData({
                ...formData, 
                dietaryInfo: {...formData.dietaryInfo, isVegetarian: value}
              }))}
              
              {renderToggle('Vegan', formData.dietaryInfo.isVegan, (value) => setFormData({
                ...formData, 
                dietaryInfo: {...formData.dietaryInfo, isVegan: value}
              }))}
              
              {renderToggle('Gluten Free', formData.dietaryInfo.isGlutenFree, (value) => setFormData({
                ...formData, 
                dietaryInfo: {...formData.dietaryInfo, isGlutenFree: value}
              }))}
              
              {renderToggle('Dairy Free', formData.dietaryInfo.isDairyFree, (value) => setFormData({
                ...formData, 
                dietaryInfo: {...formData.dietaryInfo, isDairyFree: value}
              }))}
              
              {renderToggle('Nut Free', formData.dietaryInfo.isNutFree, (value) => setFormData({
                ...formData, 
                dietaryInfo: {...formData.dietaryInfo, isNutFree: value}
              }))}
              
              {renderToggle('Halal', formData.dietaryInfo.isHalal, (value) => setFormData({
                ...formData, 
                dietaryInfo: {...formData.dietaryInfo, isHalal: value}
              }))}
              
              {renderToggle('Kosher', formData.dietaryInfo.isKosher, (value) => setFormData({
                ...formData, 
                dietaryInfo: {...formData.dietaryInfo, isKosher: value}
              }))}
            </View>
          )}

          {/* Availability */}
          {renderSectionHeader('Availability', activeSection === 'availability', () => setActiveSection(activeSection === 'availability' ? '' : 'availability'))}
          
          {activeSection === 'availability' && (
            <View style={styles.sectionContent}>
              {renderToggle('Available for Order', formData.isAvailable, (value) => setFormData({...formData, isAvailable: value}))}
              
              {renderToggle('Featured Item', formData.isFeatured, (value) => setFormData({...formData, isFeatured: value}))}
            </View>
          )}
        </View>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Save Menu Item</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Category Picker Modal */}
      <Modal
        visible={showCategoryPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setShowCategoryPicker(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search categories..."
                value={categorySearchQuery}
                onChangeText={setCategorySearchQuery}
                placeholderTextColor="#999999"
              />
            </View>

            {/* Add Category Button */}
            <TouchableOpacity
              style={styles.addCategoryButton}
              onPress={() => {
                setShowCategoryPicker(false);
                setShowAddCategoryModal(true);
              }}
            >
              <Text style={styles.addCategoryButtonText}>+ Add New Category</Text>
            </TouchableOpacity>
            
            <FlatList
              data={getFilteredCategories()}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => {
                    setFormData({...formData, categoryId: item.id.toString()});
                    setShowCategoryPicker(false);
                    setCategorySearchQuery('');
                  }}
                >
                  <Text style={styles.categoryItemText}>{item.name}</Text>
                  {item.description && (
                    <Text style={styles.categoryItemDescription}>{item.description}</Text>
                  )}
                  {formData.categoryId === item.id.toString() && (
                    <Text style={styles.categoryItemSelected}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={() => (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    {categorySearchQuery ? 'No categories found' : 'No categories available'}
                  </Text>
                  <Text style={styles.emptyStateSubtext}>
                    {categorySearchQuery ? 'Try a different search term' : 'Create your first category'}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Add Category Modal */}
      <Modal
        visible={showAddCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Category</Text>
              <TouchableOpacity onPress={() => setShowAddCategoryModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.addCategoryForm}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Category Name *</Text>
                <TextInput
                  style={styles.textInput}
                  value={newCategoryData.name}
                  onChangeText={(text) => setNewCategoryData({...newCategoryData, name: text})}
                  placeholder="Enter category name"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={newCategoryData.description}
                  onChangeText={(text) => setNewCategoryData({...newCategoryData, description: text})}
                  placeholder="Enter category description"
                  multiline={true}
                  numberOfLines={3}
                />
              </View>

              <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>Active Category</Text>
                <TouchableOpacity
                  style={[styles.toggleButton, newCategoryData.isActive && styles.toggleButtonActive]}
                  onPress={() => setNewCategoryData({...newCategoryData, isActive: !newCategoryData.isActive})}
                >
                  <View style={[styles.toggleThumb, newCategoryData.isActive && styles.toggleThumbActive]} />
                </TouchableOpacity>
              </View>

              <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>Featured Category</Text>
                <TouchableOpacity
                  style={[styles.toggleButton, newCategoryData.isFeatured && styles.toggleButtonActive]}
                  onPress={() => setNewCategoryData({...newCategoryData, isFeatured: !newCategoryData.isFeatured})}
                >
                  <View style={[styles.toggleThumb, newCategoryData.isFeatured && styles.toggleThumbActive]} />
                </TouchableOpacity>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowAddCategoryModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.createCategoryButton}
                  onPress={handleAddCategory}
                >
                  <Text style={styles.createCategoryButtonText}>Create Category</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Template Selection Modal */}
      <Modal
        visible={showTemplates}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTemplates(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Template</Text>
              <TouchableOpacity onPress={() => setShowTemplates(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={menuTemplates}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.templateItem}
                  onPress={() => loadTemplate(item.data)}
                >
                  <Text style={styles.templateItemName}>{item.name}</Text>
                  <Text style={styles.templateItemDescription}>
                    {item.data.name} - ${item.data.price}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Preview Modal */}
      <Modal
        visible={showPreview}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPreview(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Menu Item Preview</Text>
              <TouchableOpacity onPress={() => setShowPreview(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.previewContent}>
              <View style={styles.previewCard}>
                <Text style={styles.previewName}>{formData.name || 'Item Name'}</Text>
                <Text style={styles.previewPrice}>${formatPrice(formData.price) || '0.00'}</Text>
                <Text style={styles.previewDescription}>{formData.description || 'No description provided'}</Text>
                
                {formData.servingSize && (
                  <Text style={styles.previewServingSize}>Serving: {formData.servingSize}</Text>
                )}
                
                {formData.preparationTime && (
                  <Text style={styles.previewPrepTime}>⏱️ {formData.preparationTime} min</Text>
                )}
                
                {formData.calories && (
                  <Text style={styles.previewCalories}>🔥 {formData.calories} cal</Text>
                )}
                
                {formData.spiceLevel && formData.spiceLevel !== 'mild' && (
                  <Text style={styles.previewSpiceLevel}>🌶️ {formData.spiceLevel}</Text>
                )}
                
                <View style={styles.previewDietaryTags}>
                  {Object.entries(formData.dietaryInfo).map(([key, value]) => {
                    if (value) {
                      const label = key.replace('is', '').replace(/([A-Z])/g, ' $1').trim();
                      return (
                        <View key={key} style={styles.dietaryTag}>
                          <Text style={styles.dietaryTagText}>{label}</Text>
                        </View>
                      );
                    }
                    return null;
                  })}
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 4,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  pickerButtonContent: {
    flex: 1,
  },
  pickerButtonSubtext: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  placeholderText: {
    color: '#999999',
  },
  pickerArrow: {
    fontSize: 16,
    color: '#666666',
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 16,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
  },
  toggleButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  toggleThumbActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FF6B35',
  },
  buttonContainer: {
    padding: 20,
  },
  saveButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '80%',
    maxHeight: '70%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalClose: {
    fontSize: 24,
    color: '#666666',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryItemText: {
    fontSize: 16,
    color: '#333333',
  },
  categoryItemSelected: {
    fontSize: 20,
    color: '#FF6B35',
  },
  categoryItemDescription: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333333',
  },
  addCategoryButton: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    marginVertical: 12,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addCategoryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
  addCategoryForm: {
    padding: 20,
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '600',
  },
  createCategoryButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  createCategoryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Enhanced Form Styles
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  templateButton: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  templateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  previewButton: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  previewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  sectionHeaderArrow: {
    fontSize: 16,
    color: '#666666',
  },
  sectionContent: {
    padding: 20,
  },
  textInputError: {
    borderColor: '#FF4444',
    borderWidth: 1,
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginTop: 4,
  },
  spiceLevelContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  spiceLevelButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  spiceLevelButtonActive: {
    backgroundColor: '#FF6B35',
  },
  spiceLevelText: {
    fontSize: 14,
    color: '#666666',
  },
  spiceLevelTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  nutritionalContainer: {
    marginTop: 16,
  },
  nutritionalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  templateItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  templateItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  templateItemDescription: {
    fontSize: 14,
    color: '#666666',
  },
  previewContent: {
    padding: 20,
  },
  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  previewName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  previewPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B35',
    marginBottom: 12,
  },
  previewDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  previewServingSize: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  previewPrepTime: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  previewCalories: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  previewSpiceLevel: {
    fontSize: 12,
    color: '#FF4444',
    marginBottom: 12,
  },
  previewDietaryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dietaryTag: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dietaryTagText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default AddMenuItemScreen;
