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
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { menuCategoriesService, menuItemsService } from '../../services/menuService';

const EditMenuItemScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  
  const { itemId } = route.params;
  const [item, setItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const vendorId = user?.vendorId || user?.id || 1;
      
      if (!vendorId) {
        throw new Error('Vendor ID not found. Please log in again.');
      }
      
      // Load item and categories in parallel
      const [itemResponse, categoriesResponse] = await Promise.all([
        menuItemsService.getItemById(itemId),
        menuCategoriesService.getAllCategories(vendorId)
      ]);

      if (itemResponse.success && itemResponse.data) {
        const itemData = itemResponse.data;
        setItem(itemData);
        setFormData({
          name: itemData.name || '',
          description: itemData.description || '',
          price: itemData.price?.toString() || '',
          categoryId: itemData.categoryId?.toString() || '',
          isAvailable: itemData.isAvailable ?? true,
          isFeatured: itemData.isFeatured ?? false,
          preparationTime: itemData.preparationTime?.toString() || '',
          calories: itemData.calories?.toString() || '',
          allergens: itemData.allergens || '',
          dietaryInfo: {
            isVegetarian: itemData.dietaryInfo?.isVegetarian ?? false,
            isVegan: itemData.dietaryInfo?.isVegan ?? false,
            isGlutenFree: itemData.dietaryInfo?.isGlutenFree ?? false,
            isDairyFree: itemData.dietaryInfo?.isDairyFree ?? false,
          },
        });
      }

      if (categoriesResponse.success && categoriesResponse.data?.content) {
        setCategories(categoriesResponse.data.content);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'Failed to load menu item data');
    } finally {
      setLoading(false);
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
    const validation = validateForm();
    
    if (!validation.isValid) {
      Alert.alert('Validation Error', Object.values(validation.errors).join('\n'));
      return;
    }

    try {
      setSaving(true);
      
      const vendorId = user?.vendorId || user?.id || 1;
      
      if (!vendorId) {
        throw new Error('Vendor ID not found. Please log in again.');
      }
      
      const itemData = {
        ...formData,
        vendorId,
        price: parseFloat(formData.price),
        categoryId: parseInt(formData.categoryId),
        preparationTime: parseInt(formData.preparationTime) || 0,
        calories: parseInt(formData.calories) || 0,
      };

      const response = await menuItemsService.updateItem(itemId, itemData);
      
      if (response.success) {
        Alert.alert('Success', 'Menu item updated successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]);
      } else {
        throw new Error(response.message || 'Failed to update menu item');
      }
    } catch (error) {
      console.error('Error updating menu item:', error);
      Alert.alert('Error', error.message || 'Failed to update menu item');
    } finally {
      setSaving(false);
    }
  };

  const performDelete = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this menu item? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeleting(true);
              const response = await menuItemsService.deleteItem(itemId);
              
              if (response.success) {
                Alert.alert('Success', 'Menu item deleted successfully!', [
                  {
                    text: 'OK',
                    onPress: () => navigation.goBack()
                  }
                ]);
              } else {
                throw new Error(response.message || 'Failed to delete menu item');
              }
            } catch (error) {
              console.error('Error deleting menu item:', error);
              Alert.alert('Error', error.message || 'Failed to delete menu item');
            } finally {
              setDeleting(false);
            }
          }
        }
      ]
    );
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
          <Text style={styles.loadingText}>Loading menu item...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Menu Item</Text>
          <Text style={styles.headerSubtitle}>Update your menu item details</Text>
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

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Update Menu Item</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.deleteButton, deleting && styles.deleteButtonDisabled]}
            onPress={performDelete}
            disabled={deleting}
          >
            {deleting ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.deleteButtonText}>Delete Item</Text>
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
  },
  toggleThumbActive: {
    left: 26,
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
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 8,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FF4444',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButtonDisabled: {
    backgroundColor: '#CCCCCC',
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
    flex: 1,
  },
  categoryItemSelected: {
    fontSize: 20,
    color: '#FF6B35',
  },
});

export default EditMenuItemScreen;
