const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
 item: String,
 quantity: String,
 image: String
});

module.exports = mongoose.model('Product', productSchema);

