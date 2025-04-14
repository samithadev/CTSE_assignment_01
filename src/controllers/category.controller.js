const categoryService = require('../services/category.service');
const Joi = require('joi');

const categoryValidationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().allow(null, ''),
  parent: Joi.string().allow(null, ''),
  isActive: Joi.boolean().default(true)
});

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = categoryValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    
    const category = await categoryService.createCategory(value);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = categoryValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    
    const category = await categoryService.updateCategory(req.params.id, value);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.getSubcategories = async (req, res, next) => {
  try {
    const subcategories = await categoryService.getSubcategories(req.params.id);
    res.status(200).json(subcategories);
  } catch (error) {
    next(error);
  }
};