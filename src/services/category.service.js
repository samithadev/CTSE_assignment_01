const Category = require('../models/category.model');

class CategoryService {
  async getAllCategories() {
    return Category.find({ isActive: true })
      .populate('parent', 'name');
  }
  
  async getCategoryById(id) {
    return Category.findById(id);
  }
  
  async createCategory(categoryData) {
    const category = new Category(categoryData);
    return category.save();
  }
  
  async updateCategory(id, categoryData) {
    return Category.findByIdAndUpdate(
      id, 
      categoryData, 
      { new: true, runValidators: true }
    );
  }
  
  async deleteCategory(id) {
    // Check if category has dependent products before deletion
    const productCount = await require('../models/product.model').countDocuments({ category: id, isActive: true });
    if (productCount > 0) {
      throw new Error('Cannot delete category that has active products');
    }
    
    // Soft delete
    return Category.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
  }
  
  async getSubcategories(parentId) {
    return Category.find({ parent: parentId, isActive: true });
  }
}

module.exports = new CategoryService();