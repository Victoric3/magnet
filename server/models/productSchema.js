const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    countryName: {
        type: String,
        required: [true, 'provide the country'],
    },
    state: {
        type: String,
        required: [true, 'provide the state'],
    },
    city: {
        type: String,
        required: [true, 'provide the city'],
    },
    addressLine1: {
        type: String,
        required: [true, 'provide the addressLine1'],
    },
    addressLine2: {
        type: String,
        required: [true, 'provide the addressLine2'],
    },
    deliveryDuration: {
        type: String,
        required: [true, 'provide how long it takes to deliver this item'],
    },
    fee: {
        type: Number,
        required: [true, 'how much do you charge to deliver to this location']
    }

});
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
    deliveryLocations:[locationSchema],
    homeDeliveryFee: Number,
    homeDeliverySpeed: Number,
    homeDeliveryDistance: String,
    category: String,
    email: String,
    productSpecifications: {
        type: [Object],
        default: [{caption: 'no data', description: 'no data'}]
    },
    image1: {
        type: String,
        default: ''
    },
    image2: {
        type: String,
        default: ''
    },
    image3: {
        type: String,
        default: ''
    },
    image4: {
        type: String,
        default: ''
    },
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
    currencySymbol: {
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
    imageUrl1: {
        type: String,
        default: ''
    },
    imageUrl2: {
        type: String,
        default: ''
    },
    imageUrl3: {
        type: String,
        default: ''
    },
    imageUrl4: {
        type: String,
        default: ''
    }
    


})
const Product = mongoose.model('Product', productSchema)
module.exports = Product