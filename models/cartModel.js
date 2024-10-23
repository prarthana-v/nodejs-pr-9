const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    product : {
        type : String,
        required : true
    },
})
const cart = mongoose.model('cart', cartSchema);
module.exports = cart


