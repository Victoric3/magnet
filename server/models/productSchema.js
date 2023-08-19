const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String,  
        trim: true,
        required: [true, 'A product must have a name']
    },
    price: {
        type: Number, 
        required: [true, 'A product must have a price']
    },
    date: {
        type: Date, 
        default: Date.now(),
    },
    quantity: {
        type: Number, 
        required: [true, 'please state the quantity of goods available']
    },
    returnPolicy: {
        type: String,  
        trim: true,
        default: 'no return policy was indicated for this item'
    },
    location: {
        type: String, 
        required: [true, 'please state the location of this item/shop']
    },
    deliveryFee: {
        type: Number,
        default: 0
    },
    category: String,
    contact: String,
    email: String,
    image: String,
    imageCover: String,
    rating: {
        type: Number, 
        default: 0
    },
    ratingQuantity:  {
        type: Number, 
        default: 0
    },
    ratingAvearage:  {
        type: Number, 
        default: 0
    },
    shopName: {
        type: String,  
        trim: true,
        unique: true,
        required: [true, 'your shop must have a name']
    },
    shopOverview: {
        type: String,  
        trim: true,
        default: 'we sell the best products, check it out!!'
    },
    
    verificationStatus: {
        type: String,
        default: 'none'
    },
    currency: {
        type: String, 
        required: [true, 'please state the currency your accept']
    },
    discount: {
        type: Number, 
        default: 0
    },
    productOverview: {
        type: String, 
        trim: true,
        default: 'this shop has the best items you will find out there😁'
    },
    productType: {
        type: String, 
        required: [true, 'please specify the type of product you sell']
    },
    


})
const Product = mongoose.model('Product', productSchema)
module.exports = Product