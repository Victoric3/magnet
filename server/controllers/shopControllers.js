const Shop = require('../models/shopSchema')
const path = require('path')
const { updateCurrentUserShop } = require('../controllers/userControllers')




exports.createShop = async (req, res) => {
    const shopImgFile = req.files['shopImg'][0];
    const shopBannerFile = req.files['shopBanner'][0];

    const shop = new Shop({
        shopType: req.body.shopType,
        shopOverview: req.body.shopOverview,
        currencySymbol: req.body.currencySymbol,
        currency: req.body.currency,
        shopCatchPhrase: req.body.shopCatchPhrase,
        rating: req.body.rating,
        ratingQuantity: req.body.ratingQuantity,
        ratingAvearage: req.body.ratingAvearage,
        imageCover: shopBannerFile.path,
        image: shopImgFile.path,
        email: req.body.email,
        twitter: req.body.twitter,
        linkedIn: req.body.linkedIn,
        instagram: req.body.instagram,
        faceBook: req.body.faceBook,
        closingHours: req.body.closingHours,
        openingHours: req.body.openingHours,
        owner: req.user.userName,
        deliverableDistance: req.body.deliverableDistance,
        location: req.body.location,
        category: req.body.category,
        name: req.body.name,
    });
    try{
    await shop.save()
    const updatedUser = await updateCurrentUserShop( req.user.id, shop.name );

    res.status(201).json({
        status: 'success',
        shop: shop,
    })
  } catch(err){
    res.status(400).json({
        erorrMessage: err.message
    })
  }
}