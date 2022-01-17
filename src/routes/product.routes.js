/**
 * /src/routes/product.routes.js
 *
 * @description Main file for all product api routes. All routes with '/api/v1/products'
 * come here.
 */

const productController = require('../controllers/product');
const ProductRouter = require('express').Router();

ProductRouter.get('/getAllProducts', productController.getAllProducts);

module.exports = ProductRouter;
