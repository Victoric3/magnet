const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String,  
        required: [true, 'A product must have a name']
    },
    price: {
        type: String, 
        required: [true, 'A product must have a price']
    },
    date: {
        type: Date, 
        default: new Date(),
    },
    quantity: {
        type: String, 
        required: [true, 'please state the quantity of goods available']
    },
    returnPolicy: {
        type: String,  
        default: 'no return policy was indicated for this item'
    },
    location: {
        type: String, 
        required: [true, 'please state the location of this item']
    },
    deliveryFee: {
        type: String,
        default: 0
    },
    category: String,
    email: String,
    image: String,
    rating: {
        type: [Number], 
        default: []
    },
    ratingQuantity:  {
        type: [Number], 
        default: []
    },
    ratingAvearage:  {
        type: [Number], 
        default: []
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
        type: String, 
        default: 0
    },
    productOverview: {
        type: String, 
        default: 'this shop has the best items you will find out there😁'
    },
    productType: {
        type: String, 
        required: [true, 'please specify the type of product you sell']
    },
    shopName: {
        type: String,
        required: 'A product must belong to a shop'
    },
    owner: {
        type: String,
        required: 'A product must belong to a shop'
    },
    shopId: String,
    commision: String,
    imageUrl: String
    


})
const Product = mongoose.model('Product', productSchema)
module.exports = Product