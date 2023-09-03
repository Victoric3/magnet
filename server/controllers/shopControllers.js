const Shop = require('../models/shopSchema')
const path = require('path')
const { updateCurrentUserShop } = require('../controllers/userControllers')
const User = require('../models/userSchema');

exports.getShopDataForUser = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the request parameters

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: 'failed',
        message: 'User not found'
      });
    }

    // Retrieve unique shop names from the user's 'shops' array
    const uniqueShopNames = [...new Set(user.shops)];

    // Find the shop data based on the unique shop names
    const shopData = await Shop.find({ name: { $in: uniqueShopNames } });

    res.status(200).json({
      status: 'success',
      shopData: shopData
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      errorMessage: err.message
    });
  }
};

exports.getShopById = async(req, res) => {
  try{
    const shopData = await Shop.findById({ _id: req.params.id })
    res.status(200).json({
      status: 'success',
      shopData: shopData 
    })

  }catch(e){
      res.status(400).json({
        status: 'fail',
        err: e.message
      })
  }
}
exports.getAllShops= async(req, res) => {
  try{
    const shopData = await Shop.find({})
    res.status(200).json({
      status: 'success',
      shopData: shopData 
    })

  }catch(e){
      res.status(400).json({
        status: 'fail',
        err: e.message
      })
  }
}



exports.createShop = async (req, res) => {
    const shopImgFile = req.files['shopImg'][0];
    const shopBannerFile = req.files['shopBanner'][0];
    const shopImgUrl = `http://localhost:8000/images/${shopImgFile.filename}`
    const shopBannerUrl = `http://localhost:8000/images/${shopBannerFile.filename}`

    const shop = new Shop({
        shopType: req.body.shopType,
        shopOverview: req.body.shopOverview,
        currencySymbol: req.body.currencySymbol,
        currency: req.body.currency,
        shopCatchPhrase: req.body.shopCatchPhrase,
        rating: req.body.rating,
        ratingQuantity: req.body.ratingQuantity,
        ratingAvearage: req.body.ratingAvearage,
        imageCover: shopBannerFile.filename,
        image: shopImgFile.filename,
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
        shopBannerUrl: shopBannerUrl,
        shopImgUrl: shopImgUrl,
    });
    try{
    await shop.save()
    await updateCurrentUserShop( req.user.id, shop.name );

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
exports.updateCurrentShopProducts = async (shopId, newProductId) => {
  try {
  const updatedShop = await Shop.findByIdAndUpdate(
    shopId,
    { $push: { products: newProductId } },
    { new: true, runValidators: true }
    );
  

    return updatedShop;
  } catch (err) {
    throw err;
  }
};
