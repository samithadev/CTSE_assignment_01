# Product Catalog Microservice
A microservice for managing product catalogs with support for categories, search, and basic inventory tracking.
Features

# Full CRUD operations for products and categories
Advanced search and filtering capabilities
Pagination and sorting
Nested categories support
Basic inventory tracking

# Technology Stack

Node.js and Express
MongoDB with Mongoose
Docker containerization
CI/CD with GitHub Actions
SonarCloud for code quality and security scanning

# Getting Started
Prerequisites

Node.js 18+
Docker and Docker Compose (for containerized development)
MongoDB (if running locally without Docker)

# Installation

Clone the repository:
bashgit clone https://github.com/yourusername/product-catalog-service.git
cd product-catalog-service

# Install dependencies:
npm install

# Set up environment variables:
Edit .env with your configuration


# Running Locally
npm run dev

# Or using Docker Compose
docker-compose up
Running Tests
bashnpm test
API Documentation

# Products
GET /api/products - Get all products with filtering and pagination 

GET /api/products/:id - Get a specific product 

POST /api/products - Create a new product

PUT /api/products/:id - Update a product

DELETE /api/products/:id - Delete a product

GET /api/products/search?query=keyword - Search products

# Categories
GET /api/categories - Get all categories

GET /api/categories/:id - Get a specific category

GET /api/categories/:id/subcategories - Get subcategories of a category

POST /api/categories - Create a new category

PUT /api/categories/:id - Update a category

DELETE /api/categories/:id - Delete a category

# Deployment
This service is designed to be deployed as a containerized application on any cloud provider.
Architecture

This microservice follows a layered architecture:

Controllers: Handle HTTP requests and responses

Services: Contain business logic

Models: Define data structures

Routes: Define API endpoints

# Security Measures
Helmet for HTTP security headers

Rate limiting to prevent abuse

Input validation with Joi

SonarCloud scanning for vulnerabilities

Secure Docker configuration

