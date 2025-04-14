const Product = require('../models/product.model');

class ProductService {
  async getAllProducts(query = {}) {
    const { 
      category, 
      minPrice, 
      maxPrice, 
      search, 
      limit = 10, 
      page = 1, 
      sortBy = 'createdAt', 
      sortOrder = 'desc' 
    } = query;
    
    const filter = { isActive: true };
    
    // Apply filters
    if (category) filter.category = category;
    if (minPrice !== undefined) filter.price = { ...filter.price, $gte: minPrice };
    if (maxPrice !== undefined) filter.price = { ...filter.price, $lte: maxPrice };
    if (search) filter.$text = { $search: search };
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Create sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // Execute query
    const products = await Product.find(filter)
      .populate('category', 'name')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await Product.countDocuments(filter);
    
    return {
      products,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      }
    };
  }
  
  async getProductById(id) {
    return Product.findById(id).populate('category', 'name');
  }
  
  async createProduct(productData) {
    const product = new Product(productData);
    return product.save();
  }
  
  async updateProduct(id, productData) {
    return Product.findByIdAndUpdate(
      id, 
      productData, 
      { new: true, runValidators: true }
    ).populate('category', 'name');
  }
  
  async deleteProduct(id) {
    // Soft delete by setting isActive to false
    return Product.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
  }
  
  async searchProducts(query) {
    return Product.find(
      { $text: { $search: query }, isActive: true },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } })
    .populate('category', 'name');
  }
}

module.exports = new ProductService();