const mongoose = require('mongoose');
const productService = require('../../src/services/product.service');
const Product = require('../../src/models/product.model');

// Mock the mongoose Product model
jest.mock('../../src/models/product.model');

describe('Product Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('should return products with pagination', async () => {
      // Mock data
      const mockProducts = [
        { _id: '1', name: 'Product 1' },
        { _id: '2', name: 'Product 2' }
      ];
      
      // Mock the Product methods
      Product.find.mockReturnThis();
      Product.populate.mockReturnThis();
      Product.sort.mockReturnThis();
      Product.skip.mockReturnThis();
      Product.limit.mockResolvedValue(mockProducts);
      Product.countDocuments.mockResolvedValue(2);
      
      // Call the service method
      const result = await productService.getAllProducts();
      
      // Assertions
      expect(Product.find).toHaveBeenCalledWith({ isActive: true });
      expect(result.products).toEqual(mockProducts);
      expect(result.pagination.total).toBe(2);
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      // Mock data
      const productData = {
        name: 'New Product',
        description: 'Description',
        price: 29.99,
        category: '12345',
        sku: 'NP-001'
      };
      
      const savedProduct = {
        _id: '54321',
        ...productData,
        save: jest.fn().mockResolvedValue({ _id: '54321', ...productData })
      };
      
      // Mock the Product constructor
      Product.mockImplementation(() => savedProduct);
      
      // Call the service method
      const result = await productService.createProduct(productData);
      
      // Assertions
      expect(Product).toHaveBeenCalledWith(productData);
      expect(savedProduct.save).toHaveBeenCalled();
      expect(result).toEqual({ _id: '54321', ...productData });
    });
  });
});