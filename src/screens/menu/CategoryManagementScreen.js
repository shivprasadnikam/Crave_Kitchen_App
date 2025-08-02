import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { menuCategoriesService } from '../../services/menuService';

const CategoryManagementScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    isActive: true,
    isFeatured: false,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const vendorId = user?.vendorProfileId || user?.id || 1;
      const response = await menuCategoriesService.getAllCategories(vendorId);
      
      if (response.success && response.data?.content) {
        setCategories(response.data.content);
        console.log(`[CATEGORY MANAGEMENT] Loaded ${response.data.content.length} categories`);
      } else {
        console.error(`[CATEGORY MANAGEMENT] Failed to load categories:`, response);
        Alert.alert('Error', 'Failed to load categories');
      }
    } catch (error) {
      console.error(`[CATEGORY MANAGEMENT] Error loading categories:`, error);
      Alert.alert('Error', 'Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    console.log(`[CATEGORY MANAGEMENT] Pull-to-refresh triggered`);
    setRefreshing(true);
    await loadCategories();
    setRefreshing(false);
  };

  const handleAddCategory = async () => {
    if (!newCategory.name.trim()) {
      Alert.alert('Error', 'Category name is required');
      return;
    }

    try {
      setSaving(true);
      const vendorId = user?.vendorProfileId || user?.id || 1;
      
      console.log(`[CATEGORY MANAGEMENT] Creating category with data:`, {
        name: newCategory.name,
        description: newCategory.description
      });

      const response = await menuCategoriesService.createCategory({
        ...newCategory,
        vendorId,
      });

      if (response.success) {
        console.log(`[CATEGORY MANAGEMENT] Category created successfully:`, response.data?.name);
        setShowAddModal(false);
        setNewCategory({ name: '', description: '', isActive: true, isFeatured: false });
        await loadCategories(); // Refresh the list
        Alert.alert('Success', 'Category created successfully!');
      } else {
        throw new Error(response.message || 'Failed to create category');
      }
    } catch (error) {
      console.error(`[CATEGORY MANAGEMENT] Error creating category:`, error);
      Alert.alert('Error', error.message || 'Failed to create category');
    } finally {
      setSaving(false);
    }
  };

  const performDeleteCategory = async (categoryId, categoryName) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete "${categoryName}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeleting(true);
              console.log(`[CATEGORY MANAGEMENT] Performing delete for category: ${categoryId} (${categoryName})`);
              
              const response = await menuCategoriesService.deleteCategory(categoryId);
              
              if (response.success) {
                console.log(`[CATEGORY MANAGEMENT] Category ${categoryId} deleted successfully`);
                await loadCategories(); // Refresh the list
                Alert.alert('Success', 'Category deleted successfully!');
              } else {
                throw new Error(response.message || 'Failed to delete category');
              }
            } catch (error) {
              console.error(`[CATEGORY MANAGEMENT] Error deleting category:`, error);
              Alert.alert('Error', error.message || 'Failed to delete category');
            } finally {
              setDeleting(false);
            }
          }
        }
      ]
    );
  };

  const renderCategory = ({ item }) => (
    <View style={styles.categoryCard}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <View style={styles.categoryStatus}>
          {item.isActive && <Text style={styles.statusActive}>Active</Text>}
          {item.isFeatured && <Text style={styles.statusFeatured}>Featured</Text>}
        </View>
      </View>
      
      <Text style={styles.categoryDescription}>{item.description}</Text>
      
      <View style={styles.categoryFooter}>
        <Text style={styles.itemCount}>{item.itemCount || 0} items</Text>
        <View style={styles.categoryActions}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('EditCategory', { categoryId: item.id })}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => performDeleteCategory(item.id, item.name)}
            disabled={deleting}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Category Management</Text>
        <Text style={styles.headerSubtitle}>
          {categories.length} categories
        </Text>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No categories found</Text>
            <Text style={styles.emptyStateSubtext}>
              Add your first category to get started
            </Text>
          </View>
        )}
      />

      {/* Add Category Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addButtonText}>+ Add Category</Text>
        </TouchableOpacity>
      </View>

      {/* Add Category Modal */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Category</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Category Name *</Text>
                <TextInput
                  style={styles.textInput}
                  value={newCategory.name}
                  onChangeText={(text) => setNewCategory({...newCategory, name: text})}
                  placeholder="Enter category name"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={newCategory.description}
                  onChangeText={(text) => setNewCategory({...newCategory, description: text})}
                  placeholder="Enter category description"
                  multiline
                  numberOfLines={3}
                />
              </View>
              
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>Active</Text>
                <TouchableOpacity
                  style={[styles.toggleButton, newCategory.isActive && styles.toggleButtonActive]}
                  onPress={() => setNewCategory({...newCategory, isActive: !newCategory.isActive})}
                >
                  <View style={[styles.toggleThumb, newCategory.isActive && styles.toggleThumbActive]} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>Featured</Text>
                <TouchableOpacity
                  style={[styles.toggleButton, newCategory.isFeatured && styles.toggleButtonActive]}
                  onPress={() => setNewCategory({...newCategory, isFeatured: !newCategory.isFeatured})}
                >
                  <View style={[styles.toggleThumb, newCategory.isFeatured && styles.toggleThumbActive]} />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                onPress={handleAddCategory}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.saveButtonText}>Add Category</Text>
                )}
              </TouchableOpacity>
            </View>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  addSection: {
    padding: 20,
  },
  addButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  addForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#333333',
    marginBottom: 12,
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
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
  categoriesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
  categoriesList: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  categoryStatus: {
    flexDirection: 'row',
    gap: 8,
  },
  statusActive: {
    backgroundColor: '#4CAF50',
    color: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  statusFeatured: {
    backgroundColor: '#FFD700',
    color: '#333333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  categoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  itemCount: {
    fontSize: 14,
    color: '#666666',
  },
  categoryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#FF4444',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
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
    borderRadius: 12,
    width: '80%',
    maxWidth: 400,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
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
  modalBody: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666666',
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
    minHeight: 80,
    paddingTop: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  toggleLabel: {
    fontSize: 14,
    color: '#666666',
  },
  toggleButton: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#FF6B35',
  },
  toggleThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  toggleThumbActive: {
    left: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default CategoryManagementScreen;
