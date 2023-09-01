const mongoose = require('mongoose')
const shopSchema = new mongoose.Schema({
    name: {
        type: String,  
        unique: true,
        required: [true, 'A shop must have a name']
    },
    Date: {
        type: Date, 
        default: Date.now(),
    },
    category: {
        type: String, 
        required: [true, 'please state the category of goods you sell']
    },
    location: {
        type: String, 
        required: [true, 'please state the location of this shop']
    },
    deliverableDistance: {
        type: String, 
    },
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
    image: String,
    imageCover: String,
    shopImgUrl: String,
    shopBannerUrl: String,
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
        type: [Number],
        default: []
    },
    Delivered: {
        type: [Number],
        default: []
    },
    MagnetsAttached: {
        type: [Number],
        default: []
    },
    seenBy: {
        type: [Number],
        default: []
    },
    productCount: {
        type: [Number],
        default: []
    },
    pending: {
        type: [Number],
        default: []
    },
    
    score: {
        type: Number, 
        default: 1
    }
    


})
const Shop = mongoose.model('Shop', shopSchema)
module.exports = Shop