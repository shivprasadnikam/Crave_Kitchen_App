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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { menuCategoriesService, menuItemsService, testNetworkConnection } from '../../services/menuService';

const AddMenuItemScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
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
    dietaryInfo: {
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isDairyFree: false,
    },
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      console.log(`[ADD MENU ITEM] Loading categories for vendor: ${user?.vendorProfileId || user?.id || 1}`);
      
      // Test network connection first
      console.log(`[ADD MENU ITEM] Testing network connection...`);
      const networkOk = await testNetworkConnection();
      if (!networkOk) {
        console.error(`[ADD MENU ITEM] Network test failed - cannot load categories`);
        Alert.alert('Network Error', 'Cannot connect to server. Please check your backend is running.');
        return;
      }
      
      const vendorId = user?.vendorProfileId || user?.id || 1;
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
    
    if (!formData.name.trim()) {
      errors.name = 'Item name is required';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      errors.price = 'Price must be a positive number';
    }
    
    if (!formData.categoryId) {
      errors.categoryId = 'Please select a category';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
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
      
      const vendorId = user?.vendorProfileId || user?.id || 1;
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
        categoryId: itemData.categoryId
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

  const renderInput = (label, value, onChangeText, placeholder, keyboardType = 'default', multiline = false) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.textInput, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
    </View>
  );

  const renderCategoryPicker = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Category *</Text>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setShowCategoryPicker(true)}
      >
        <Text style={[styles.pickerButtonText, !formData.categoryId && styles.placeholderText]}>
          {getSelectedCategoryName()}
        </Text>
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

        {/* Form */}
        <View style={styles.form}>
          {renderInput('Item Name *', formData.name, (text) => setFormData({...formData, name: text}), 'Enter item name')}
          
          {renderInput('Description *', formData.description, (text) => setFormData({...formData, description: text}), 'Enter item description', 'default', true)}
          
          {renderInput('Price *', formData.price, (text) => setFormData({...formData, price: text}), '0.00', 'decimal-pad')}
          
          {renderCategoryPicker()}
          
          {renderInput('Preparation Time (minutes)', formData.preparationTime, (text) => setFormData({...formData, preparationTime: text}), '30', 'numeric')}
          
          {renderInput('Calories', formData.calories, (text) => setFormData({...formData, calories: text}), '250', 'numeric')}
          
          {renderInput('Allergens', formData.allergens, (text) => setFormData({...formData, allergens: text}), 'e.g., nuts, dairy, gluten')}
          
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Dietary Information</Text>
          </View>
          
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
          
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Availability</Text>
          </View>
          
          {renderToggle('Available for Order', formData.isAvailable, (value) => setFormData({...formData, isAvailable: value}))}
          
          {renderToggle('Featured Item', formData.isFeatured, (value) => setFormData({...formData, isFeatured: value}))}
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
            
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => {
                    setFormData({...formData, categoryId: item.id.toString()});
                    setShowCategoryPicker(false);
                  }}
                >
                  <Text style={styles.categoryItemText}>{item.name}</Text>
                  {formData.categoryId === item.id.toString() && (
                    <Text style={styles.categoryItemSelected}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
            />
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
});

export default AddMenuItemScreen;
