const mongoose = require('mongoose')
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
const shopSchema = new mongoose.Schema({
    name: {
        type: String,  
        unique: true,
        required: [true, 'A shop must have a name']
    },
    Date: {
        type: Date, 
        default: new Date(),
    },
    category: {
        type: String, 
        required: [true, 'please state the category of goods you sell']
    },
    deliveryLocations:[locationSchema],
    homeDeliveryFee: Number,
    homeDeliverySpeed: Number,
    homeDeliveryDistance: String,
    owner: {
        type: String, 
        required: [true, 'who owns this shop']
    },
    openingHours: {
        type: String, 
        required: [true, 'openingHours is required']
    },
    closingHours: {
        type: String, 
        required: [true, 'closingHours is required']
    },
    faceBook: String,
    instagram: String,
    linkedIn: String,
    twitter: String,
    email: String,
    image: {
        type: String,
        default: ''
    },
    imageCover: {
        type: String,
        default: ''
    },
    shopImgUrl: {
        type: String,
        default: ''
    },
    shopBannerUrl: {
        type: String,
        default: ''
    },
    rating: {
        type: [Number], 
        default: 0
    },
    ratingQuantity:  {
        type: Number, 
        default: 0
    },
    reviews: {
        type: [String]
    },
    shopCatchPhrase: {
        type: String,  
        trim: true,
        default: 'we deliver only quality'
    },
    
    verificationStatus: {
        type: String,
        default: 'none'
    },
    
    shopOverview: {
        type: String, 
        trim: true,
        default: 'this shop has the best items you will find out there😁'
    },
    shopType: {
        type: String, 
        enum: ['Eshop', 'Pshop'],
        required: [true, 'please specify the type of shop you sell']
    },
    Orders: {
        type: [Object],
        default: []
    },
    MagnetsAttached: {
        type: [Object],
        default: []
    },
    score: {
        type: [Number], 
        default: [1]
    },
    products: {
        type: [String],
        default: []
    },
    currencySymbol: {
        type: String,
        default: '$'
    },
    currency: {
        type: String,
        default: 'united states dollar'
    }

})
const Shop = mongoose.model('Shop', shopSchema)
module.exports = Shop