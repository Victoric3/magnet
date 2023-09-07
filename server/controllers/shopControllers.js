const Shop = require('../models/shopSchema')
const path = require('path')
const { updateCurrentUserShop } = require('../controllers/userControllers')
const User = require('../models/userSchema');
const Product = require('../models/productSchema')

exports.getShopDataForUser = async (req, res) => {
  try {
    const userId = req.user._id;

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
    
  const shop = new Shop({
        shopType: req.body.shopType,
        shopOverview: req.body.shopOverview,
        currencySymbol: req.body.currencySymbol,
        currency: req.body.currency,
        shopCatchPhrase: req.body.shopCatchPhrase,
        rating: 0,
        ratingQuantity: 0,
        ratingAvearage: 0,
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
        currencySymbol: req.user.currencySymbol,
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
exports.updateShopImage = async (req, res) => {
  try {
    const { id } = req.params;

    const updateFields = {};

    if (req.files.shopImg) {
      updateFields.image = req.files.shopImg[0].path;
      updateFields.shopImgUrl = `http://localhost:8000/images/${req.files.shopImg[0].filename}`;
    }

    if (req.files.shopBanner) {
      updateFields.imageCover = req.files.shopBanner[0].path;
      updateFields.shopBannerUrl = `http://localhost:8000/images/${req.files.shopBanner[0].filename}`;
    }

    const shop = await Shop.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.status(200).json({
      status: 'successfully uploaded image',
      shopData: shop
    })

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};


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

exports.deleteShop = async (req, res) => {
  try {
    //1 find the shop from my request parameters
    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({
        status: 'failed',
        errorMessage: 'Shop not found',
      });
    }
    // turned off validation because password confirm is not available
    User.schema.set('validateBeforeSave', false);


    // 2 Find the owner of the shop by their username 
    const owner = await User.findOne({ userName: shop.owner });

    if (!owner) {
      return res.status(404).json({
        status: 'failed',
        errorMessage: 'Owner not found',
      });
    }else if(req.user.userName !== owner.userName ){
      return res.status(401).json({
        status: 'failed',
        errorMessage: 'you can only delete your shop',
      });
    }


    // 3 Remove the shop name from the owner's shops array
    owner.shops.pull(shop.name);
    await owner.save();

    //4 Delete all shop products 
    await Product.deleteMany({ _id: { $in: shop.products } });

    //5 Delete the shop
    await Shop.deleteOne({ _id: shop._id });

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      errorMessage: err.message,
    });
  }finally {
    User.schema.set('validateBeforeSave', true);
  }
};

