const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'this field is required'],
        unique: true
    },
    price: {
        type: Number, 
        required: [true, 'this field is required']
    },
    date: {
        type: Number, 
        required: [true, 'this field is required']
    }
})
const Product = mongoose.model('Product', productSchema)
module.exports = Product