/**
 * @description: The Schema definition for the Product model
 */

const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    ratingCount: { type: Number, required: true },
});

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrls: { type: [String], required: true },
    rating: { type: RatingSchema, required: true },
});

module.exports = mongoose.model('Product', ProductSchema);
