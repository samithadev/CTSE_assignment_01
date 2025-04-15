const ProductService = require('../../src/services/product.service'); // Assuming this is where your service is located
const Product = require('../../src/models/product.model');

// Mocking Mongoose methods
jest.mock('../../src/models/product.model'); // Mock the Product model

describe('ProductService', () => {
  beforeEach(() => {
    // Clear previous mock data before each test
    Product.find.mockClear();
    Product.findById.mockClear();
    Product.findByIdAndUpdate.mockClear();
    Product.countDocuments.mockClear();
  });

  it('should return products with pagination', async () => {
    // Define mock data
    const mockProducts = [{ name: 'Product 1' }, { name: 'Product 2' }];
    const mockTotal = 2;

    // Mock Mongoose methods
    Product.find.mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockProducts), // Resolves with the mock products
    });

    Product.countDocuments.mockResolvedValue(mockTotal); // Mock countDocuments method

    // Define the query parameters for pagination
    const query = {
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };

    // Call the service method
    const result = await ProductService.getAllProducts(query);

    // Assertions
    expect(result.products).toEqual(mockProducts);
    expect(result.pagination.total).toBe(mockTotal);
    expect(result.pagination.pages).toBe(1);

    // Check that the methods are called correctly
    expect(Product.find).toHaveBeenCalledTimes(1);
    expect(Product.find).toHaveBeenCalledWith(expect.objectContaining({ isActive: true }));
    expect(Product.countDocuments).toHaveBeenCalledTimes(1);
  });

  // it('should create a new product', async () => {
  //   const mockProductData = { name: 'New Product', price: 100 };
  //   const mockSave = jest.fn().mockResolvedValue(mockProductData);
  
  //   // Mock the constructor of the Product model to return an object with a save method
  //   const ProductMock = jest.fn().mockImplementation(() => ({
  //     save: mockSave
  //   }));
  
  //   // Replace the original Product with our mock
  //   jest.mock('../../src/models/product.model', () => ProductMock);
  
  //   const ProductService = require('../../src/services/product.service');
  
  //   const result = await ProductService.createProduct(mockProductData);
  
  //   expect(mockSave).toHaveBeenCalledTimes(1);
  //   expect(result).toEqual(mockProductData);
  // });

  // it('should update a product', async () => {
  //   const productId = '123';
  //   const updatedProduct = { name: 'Updated Product', price: 150 };

  //   Product.findByIdAndUpdate.mockResolvedValue(updatedProduct); // Mock findByIdAndUpdate method

  //   const result = await ProductService.updateProduct(productId, updatedProduct);

  //   expect(result).toEqual(updatedProduct);
  //   expect(Product.findByIdAndUpdate).toHaveBeenCalledTimes(1);
  //   expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
  //     productId,
  //     updatedProduct,
  //     { new: true, runValidators: true }
  //   );
  // });

  it('should delete a product', async () => {
    const productId = '123';
    const deletedProduct = { isActive: false };

    Product.findByIdAndUpdate.mockResolvedValue(deletedProduct); // Mock findByIdAndUpdate for soft delete

    const result = await ProductService.deleteProduct(productId);

    expect(result).toEqual(deletedProduct);
    expect(Product.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(
      productId,
      { isActive: false },
      { new: true }
    );
  });
});
