/**
 * Menu Types for Crave Kitchen Vendor App
 * Type definitions for menu management functionality
 */

// Menu Item Status Types
export const MENU_ITEM_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  OUT_OF_STOCK: 'out_of_stock',
  SEASONAL: 'seasonal',
  DISCONTINUED: 'discontinued',
};

// Menu Category Types
export const MENU_CATEGORY = {
  APPETIZERS: 'appetizers',
  MAIN_COURSE: 'main_course',
  DESSERTS: 'desserts',
  BEVERAGES: 'beverages',
  SIDES: 'sides',
  SALADS: 'salads',
  SOUPS: 'soups',
  SANDWICHES: 'sandwiches',
  PIZZA: 'pizza',
  BURGERS: 'burgers',
  PASTA: 'pasta',
  SEAFOOD: 'seafood',
  VEGETARIAN: 'vegetarian',
  VEGAN: 'vegan',
  GLUTEN_FREE: 'gluten_free',
  KIDS_MENU: 'kids_menu',
  BREAKFAST: 'breakfast',
  LUNCH: 'lunch',
  DINNER: 'dinner',
  LATE_NIGHT: 'late_night',
};

// Dietary Restriction Types
export const DIETARY_RESTRICTION = {
  VEGETARIAN: 'vegetarian',
  VEGAN: 'vegan',
  GLUTEN_FREE: 'gluten_free',
  DAIRY_FREE: 'dairy_free',
  NUT_FREE: 'nut_free',
  HALAL: 'halal',
  KOSHER: 'kosher',
  LOW_CARB: 'low_carb',
  KETO: 'keto',
  PALEO: 'paleo',
};

// Spice Level Types
export const SPICE_LEVEL = {
  MILD: 'mild',
  MEDIUM: 'medium',
  HOT: 'hot',
  EXTRA_HOT: 'extra_hot',
  CUSTOM: 'custom',
};

// Portion Size Types
export const PORTION_SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  FAMILY: 'family',
  CUSTOM: 'custom',
};

// Menu Item Type
export const MenuItem = {
  id: 'string',
  name: 'string',
  description: 'string',
  shortDescription: 'string?',
  price: 'number',
  originalPrice: 'number?',
  salePrice: 'number?',
  categoryId: 'string',
  category: 'string',
  status: 'string',
  isAvailable: 'boolean',
  isFeatured: 'boolean',
  isPopular: 'boolean',
  isNew: 'boolean',
  isSpicy: 'boolean',
  spiceLevel: 'string?',
  portionSize: 'string?',
  preparationTime: 'number?', // in minutes
  calories: 'number?',
  protein: 'number?',
  carbs: 'number?',
  fat: 'number?',
  fiber: 'number?',
  sodium: 'number?',
  sugar: 'number?',
  allergens: 'string[]?',
  dietaryRestrictions: 'string[]?',
  ingredients: 'string[]?',
  image: 'string?',
  images: 'string[]?',
  tags: 'string[]?',
  customizationOptions: 'object[]?',
  addOns: 'object[]?',
  sides: 'object[]?',
  drinkOptions: 'object[]?',
  maxQuantity: 'number?',
  minQuantity: 'number?',
  sortOrder: 'number',
  createdAt: 'string',
  updatedAt: 'string',
  createdBy: 'string?',
  updatedBy: 'string?',
  metadata: 'object?',
};

// Menu Category Type
export const MenuCategory = {
  id: 'string',
  name: 'string',
  description: 'string?',
  slug: 'string',
  parentId: 'string?',
  image: 'string?',
  icon: 'string?',
  color: 'string?',
  isActive: 'boolean',
  isVisible: 'boolean',
  sortOrder: 'number',
  itemCount: 'number',
  createdAt: 'string',
  updatedAt: 'string',
  createdBy: 'string?',
  updatedBy: 'string?',
  metadata: 'object?',
};

// Customization Option Type
export const CustomizationOption = {
  id: 'string',
  name: 'string',
  description: 'string?',
  type: 'string', // radio, checkbox, text, number
  required: 'boolean',
  minSelections: 'number?',
  maxSelections: 'number?',
  options: 'object[]',
  price: 'number?',
  sortOrder: 'number',
};

// Customization Option Choice Type
export const CustomizationChoice = {
  id: 'string',
  name: 'string',
  description: 'string?',
  price: 'number?',
  isAvailable: 'boolean',
  isDefault: 'boolean',
  sortOrder: 'number',
};

// Add-On Type
export const AddOn = {
  id: 'string',
  name: 'string',
  description: 'string?',
  price: 'number',
  originalPrice: 'number?',
  isAvailable: 'boolean',
  image: 'string?',
  category: 'string?',
  allergens: 'string[]?',
  dietaryRestrictions: 'string[]?',
  sortOrder: 'number',
};

// Side Dish Type
export const SideDish = {
  id: 'string',
  name: 'string',
  description: 'string?',
  price: 'number?',
  isAvailable: 'boolean',
  image: 'string?',
  category: 'string?',
  allergens: 'string[]?',
  dietaryRestrictions: 'string[]?',
  sortOrder: 'number',
};

// Drink Option Type
export const DrinkOption = {
  id: 'string',
  name: 'string',
  description: 'string?',
  price: 'number?',
  isAvailable: 'boolean',
  image: 'string?',
  category: 'string?',
  size: 'string?',
  temperature: 'string?', // hot, cold, room
  sortOrder: 'number',
};

// Menu Item Summary Type
export const MenuItemSummary = {
  id: 'string',
  name: 'string',
  description: 'string',
  price: 'number',
  category: 'string',
  status: 'string',
  isAvailable: 'boolean',
  isFeatured: 'boolean',
  image: 'string?',
  preparationTime: 'number?',
  sortOrder: 'number',
};

// Menu Category Summary Type
export const MenuCategorySummary = {
  id: 'string',
  name: 'string',
  description: 'string?',
  image: 'string?',
  itemCount: 'number',
  isActive: 'boolean',
  sortOrder: 'number',
};

// Menu Statistics Type
export const MenuStatistics = {
  totalItems: 'number',
  activeItems: 'number',
  inactiveItems: 'number',
  outOfStockItems: 'number',
  featuredItems: 'number',
  categories: 'number',
  averagePrice: 'number',
  topSellingItems: 'object[]',
  lowStockItems: 'object[]',
  categoryDistribution: 'object[]',
};

// Menu Filter Type
export const MenuFilter = {
  category: 'string[]?',
  status: 'string[]?',
  priceRange: 'object?',
  dietaryRestrictions: 'string[]?',
  allergens: 'string[]?',
  isAvailable: 'boolean?',
  isFeatured: 'boolean?',
  isPopular: 'boolean?',
  isNew: 'boolean?',
  searchTerm: 'string?',
  sortBy: 'string?',
  sortOrder: 'string?',
  limit: 'number?',
  offset: 'number?',
};

// Menu Item Creation Request Type
export const MenuItemCreationRequest = {
  name: 'string',
  description: 'string',
  shortDescription: 'string?',
  price: 'number',
  originalPrice: 'number?',
  salePrice: 'number?',
  categoryId: 'string',
  status: 'string',
  isAvailable: 'boolean',
  isFeatured: 'boolean',
  isPopular: 'boolean',
  isNew: 'boolean',
  isSpicy: 'boolean',
  spiceLevel: 'string?',
  portionSize: 'string?',
  preparationTime: 'number?',
  calories: 'number?',
  protein: 'number?',
  carbs: 'number?',
  fat: 'number?',
  fiber: 'number?',
  sodium: 'number?',
  sugar: 'number?',
  allergens: 'string[]?',
  dietaryRestrictions: 'string[]?',
  ingredients: 'string[]?',
  image: 'string?',
  images: 'string[]?',
  tags: 'string[]?',
  customizationOptions: 'object[]?',
  addOns: 'object[]?',
  sides: 'object[]?',
  drinkOptions: 'object[]?',
  maxQuantity: 'number?',
  minQuantity: 'number?',
  sortOrder: 'number?',
  metadata: 'object?',
};

// Menu Item Update Request Type
export const MenuItemUpdateRequest = {
  name: 'string?',
  description: 'string?',
  shortDescription: 'string?',
  price: 'number?',
  originalPrice: 'number?',
  salePrice: 'number?',
  categoryId: 'string?',
  status: 'string?',
  isAvailable: 'boolean?',
  isFeatured: 'boolean?',
  isPopular: 'boolean?',
  isNew: 'boolean?',
  isSpicy: 'boolean?',
  spiceLevel: 'string?',
  portionSize: 'string?',
  preparationTime: 'number?',
  calories: 'number?',
  protein: 'number?',
  carbs: 'number?',
  fat: 'number?',
  fiber: 'number?',
  sodium: 'number?',
  sugar: 'number?',
  allergens: 'string[]?',
  dietaryRestrictions: 'string[]?',
  ingredients: 'string[]?',
  image: 'string?',
  images: 'string[]?',
  tags: 'string[]?',
  customizationOptions: 'object[]?',
  addOns: 'object[]?',
  sides: 'object[]?',
  drinkOptions: 'object[]?',
  maxQuantity: 'number?',
  minQuantity: 'number?',
  sortOrder: 'number?',
  metadata: 'object?',
};

// Menu Category Creation Request Type
export const MenuCategoryCreationRequest = {
  name: 'string',
  description: 'string?',
  slug: 'string?',
  parentId: 'string?',
  image: 'string?',
  icon: 'string?',
  color: 'string?',
  isActive: 'boolean?',
  isVisible: 'boolean?',
  sortOrder: 'number?',
  metadata: 'object?',
};

// Menu Category Update Request Type
export const MenuCategoryUpdateRequest = {
  name: 'string?',
  description: 'string?',
  slug: 'string?',
  parentId: 'string?',
  image: 'string?',
  icon: 'string?',
  color: 'string?',
  isActive: 'boolean?',
  isVisible: 'boolean?',
  sortOrder: 'number?',
  metadata: 'object?',
};

// Menu Response Type
export const MenuResponse = {
  success: 'boolean',
  data: 'MenuItem?',
  message: 'string?',
  errors: 'string[]?',
  itemId: 'string?',
};

// Menu List Response Type
export const MenuListResponse = {
  success: 'boolean',
  data: 'MenuItemSummary[]',
  pagination: 'object',
  total: 'number',
  message: 'string?',
  errors: 'string[]?',
};

// Menu Categories Response Type
export const MenuCategoriesResponse = {
  success: 'boolean',
  data: 'MenuCategorySummary[]',
  pagination: 'object',
  total: 'number',
  message: 'string?',
  errors: 'string[]?',
};

// Menu Statistics Response Type
export const MenuStatisticsResponse = {
  success: 'boolean',
  data: 'MenuStatistics',
  message: 'string?',
  errors: 'string[]?',
};

// Menu Export Request Type
export const MenuExportRequest = {
  format: 'string',
  includeImages: 'boolean?',
  includeNutrition: 'boolean?',
  includeCustomizations: 'boolean?',
  categoryFilter: 'string[]?',
  statusFilter: 'string[]?',
};

// Menu Import Request Type
export const MenuImportRequest = {
  file: 'object',
  format: 'string',
  updateExisting: 'boolean?',
  categoryMapping: 'object?',
  imageUpload: 'boolean?',
};

// Menu Bulk Update Request Type
export const MenuBulkUpdateRequest = {
  itemIds: 'string[]',
  updates: 'object',
  categoryId: 'string?',
  status: 'string?',
  isAvailable: 'boolean?',
  priceAdjustment: 'object?',
};

// Menu Reorder Request Type
export const MenuReorderRequest = {
  categoryId: 'string?',
  items: 'object[]', // { id: string, sortOrder: number }[]
};

// Export all types
export default {
  MENU_ITEM_STATUS,
  MENU_CATEGORY,
  DIETARY_RESTRICTION,
  SPICE_LEVEL,
  PORTION_SIZE,
  MenuItem,
  MenuCategory,
  CustomizationOption,
  CustomizationChoice,
  AddOn,
  SideDish,
  DrinkOption,
  MenuItemSummary,
  MenuCategorySummary,
  MenuStatistics,
  MenuFilter,
  MenuItemCreationRequest,
  MenuItemUpdateRequest,
  MenuCategoryCreationRequest,
  MenuCategoryUpdateRequest,
  MenuResponse,
  MenuListResponse,
  MenuCategoriesResponse,
  MenuStatisticsResponse,
  MenuExportRequest,
  MenuImportRequest,
  MenuBulkUpdateRequest,
  MenuReorderRequest,
}; 