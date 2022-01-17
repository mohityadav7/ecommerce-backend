/**
 * /src/services/product.service.js
 *
 * @description: Service for all database operations related to users are performed here.
 */

const Product = require('../models/product.model');
const logger = require('../logger')('product.service');

module.exports = {
    /**
     * Get all products from database
     *
     * @returns {{error: Object, products: Array<Object>}}
     */
    getAllProducts: async () => {
        try {
            const products = await Product.find();
            return { products };
        } catch (error) {
            logger.error(error);
            return { error };
        }
    },
};
