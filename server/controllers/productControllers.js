const Product = require('../models/productSchema');
const Shop = require('../models/shopSchema')
const User = require('../models/userSchema')
const { updateCurrentShopProducts } = require('./shopControllers');
const APIFEATURES = require('./../utilities/apiFeatures')
const path = require('path')


exports.createProduct = async (req, res) => {
  const shop = await Shop.findById(req.body.shopId)
if(!req.user.shops.includes(shop._id)){
  return res.status(401).json({
    status:'failed',
    message: 'you can only add a product to your shop'
  })
}
  const product = new Product({
    productType: req.body.productType,
    productOverview: req.body.productOverview,
    discount: req.body.discount,
    currency: req.user.currency,
    email: shop.email,
    category: shop.category,
    deliveryLocations: req.body.deliveryLocations,
    homeDeliveryFee: req.body.homeDeliveryFee,
    homeDeliverySpeed: req.body.homeDeliverySpeed,
    homeDeliveryDistance: shop.homeDeliveryDistance,
    returnPolicy: req.body.returnPolicy,
    quantity: req.body.quantity,
    price: req.body.price,
    name: req.body.name,
    date: Date.now(),
    shopName: shop.name,
    shopId: req.body.shopId,
    commision: req.body.commision,
    owner: req.user.userName,
    currencySymbol: req.user.currencySymbol,
    productSpecifications: req.body.productSpecifications
  });
  try{
    await product.save()
    await updateCurrentShopProducts(product.shopId, product._id)
  res.status(201).json({
    status: 'success',
    product: product,

  })
} catch(err){
  res.status(400).json({
      erorrMessage: err.message
  })
}
}
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
  
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
  
    if (req.files.image1) {
      product.image1 = req.files.image1[0].path;
      product.imageUrl1 = `${process.env.BASEURL}/images/${req.files.image1[0].filename}`;
    }
  
    if (req.files.image2) {
      product.image2 = req.files.image2[0].path;
      product.imageUrl2 = `${process.env.BASEURL}/images/${req.files.image2[0].filename}`;
    }
  
    if (req.files.image3) {
      product.image3 = req.files.image3[0].path;
      product.imageUrl3 = `${process.env.BASEURL}/images/${req.files.image3[0].filename}`;
    }
  
    if (req.files.image4) {
      product.image4 = req.files.image4[0].path;
      product.imageUrl4 = `${process.env.BASEURL}/images/${req.files.image4[0].filename}`;
    }
  
    // Save the updated product
    await product.save();
  
    res.status(200).json({
      status: 'Successfully uploaded images',
      productData: product
    });
  
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
  
};
exports.updateOtherProductDetails = async(req, res) => {
  const { id } = req.params
  const updateFields = {}
  const returnPolicy = [
    'No guarantee',
    '5-day guarantee',
    '10-day guarantee',
    '15-day guarantee',
    '30-day guarantee',
    '2months guarantee',
    '3months guarantee',
    '6months guarantee',
    '1-year guarantee',
    '2-year guarantee',
    '5-year guarantee',
  ]
  if(req.body.name){
    updateFields.name = req.body.name
  }
  if(req.body.quantity){
    updateFields.quantity = req.body.quantity
  }
  if(req.body.deliveryFee){
    updateFields.deliveryFee = req.body.deliveryFee
  }
  if(req.body.discount){
    updateFields.discount = req.body.discount
  }
  if(req.body.productOverview){
    updateFields.productOverview = req.body.productOverview
  }
  if(req.body.commision){
    updateFields.commision = req.body.commision
  }
  if(req.body.price){
    updateFields.price = req.body.price
  }
  if(returnPolicy.includes(req.body.returnPolicy)){
      updateFields.returnPolicy = req.body.returnPolicy
  }
  try{
    const updatedProduct = await Product.findByIdAndUpdate(id, { $set: updateFields })
    res.status(200).json({
      status: 'success',
      message: 'this shop has been successfully updated',
      productData: updatedProduct
    })
  }catch(err){
    res.status(400).json({
      status: 'failed',
      message: err.message
    })
  }
}
exports.getProductDataForShop = async (req, res) => {
  try {
    const shopId = req.params.id;

    const shop = await Shop.findById(shopId);

    if (!shop) {
      return res.status(404).json({
        status: 'failed',
        message: 'shop not found'
      });
    }

    const productIds = [...new Set(shop.products)];

    const productData = await Product.find({ _id: { $in: productIds } });

    res.status(200).json({
      status: 'success',
      productData: productData
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      errorMessage: err.message
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try{
   const features = new APIFEATURES(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination()
    const allProducts = await features.query
    
    res.status(201).json(
      {
    status: 'success',
    amount: allProducts.length,
    products: allProducts
      }
    )}catch(err){
    res.status(404).json(
      {
        status: 'failed',
        errorMessage: err.message
      }
    )
  }
}
exports.getProduct = async (req, res) => {
  try{
    const product = await Product.findById(req.params.id)
    
    res.status(201).json(
      {
    status: 'success',
    product: product
      }
    )}catch(err){
    res.status(404).json(
      {
        status: 'failed',
        errorMessage: err.message
      }
    )
  }
}

exports.deleteProduct = async (req, res) => {
  try{
    const product = await Product.findByIdAndDelete(req.params.id)
    const owner = await User.findOne({ userName: product.owner });
    const shop = await Shop.findOne({ _id: product.shopId });


    Shop.schema.set('validateBeforeSave', false);
    if (!shop) {
      return res.status(404).json({
        status: 'failed',
        errorMessage: 'shop not found',
      });
    }else if(req.user.userName !== owner.userName ){
      return res.status(401).json({
        status: 'failed',
        errorMessage: 'you can only delete your product',
      });
    }

    shop.products.pull(product._id);
    await shop.save();
    
    res.status(200).json(
      {
    status: 'success'
    }
    )}catch(err){
    res.status(404).json(
      {
        status: 'failed',
        errorMessage: err.message
      }
    )
  }finally {
    Shop.schema.set('validateBeforeSave', true);
  }
}
