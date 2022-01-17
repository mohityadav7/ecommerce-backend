/**
 * /src/controllers/product/index.js
 *
 * @description: Server-side logic for managing products.
 */

const productService = require('../../services/product.service');
const errors = require('../../errors');

module.exports = {
    getAllProducts: async (req, res, next) => {
        const response = await productService.getAllProducts();
        if (response.error) {
            next(new errors.InternalServerError('Could not get products.'));
        } else {
            res.status(200).json(response.products);
        }
    },
};
