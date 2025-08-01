import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';

const CategoryManagementScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([
    { id: '1', name: 'Appetizers', itemCount: 5 },
    { id: '2', name: 'Main Course', itemCount: 12 },
    { id: '3', name: 'Desserts', itemCount: 3 },
    { id: '4', name: 'Beverages', itemCount: 8 },
  ]);

  const [newCategory, setNewCategory] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      Alert.alert('Error', 'Please enter a category name');
      return;
    }

    const newId = (categories.length + 1).toString();
    const newCat = {
      id: newId,
      name: newCategory.trim(),
      itemCount: 0,
    };

    setCategories([...categories, newCat]);
    setNewCategory('');
    setShowAddForm(false);
    Alert.alert('Success', 'Category added successfully!');
  };

  const handleDeleteCategory = (categoryId) => {
    Alert.alert(
      'Delete Category',
      'Are you sure you want to delete this category?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedCategories = categories.filter(cat => cat.id !== categoryId);
            setCategories(updatedCategories);
            Alert.alert('Success', 'Category deleted successfully!');
          },
        },
      ]
    );
  };

  const renderCategory = ({ item }) => (
    <View style={styles.categoryCard}>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryCount}>{item.itemCount} items</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteCategory(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Category Management</Text>
          <Text style={styles.headerSubtitle}>Organize your menu categories</Text>
        </View>

        {/* Add Category Section */}
        <View style={styles.addSection}>
          {!showAddForm ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddForm(true)}
            >
              <Text style={styles.addButtonText}>+ Add New Category</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.addForm}>
              <TextInput
                style={styles.input}
                value={newCategory}
                onChangeText={setNewCategory}
                placeholder="Enter category name"
                placeholderTextColor="#999"
              />
              <View style={styles.formActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setShowAddForm(false);
                    setNewCategory('');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleAddCategory}
                >
                  <Text style={styles.saveButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Categories List */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Current Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
      </ScrollView>
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
  categoriesList: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    color: '#666666',
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
});

export default CategoryManagementScreen;
