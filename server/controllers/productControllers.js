const Product = require('../models/productSchema');
const Shop = require('../models/shopSchema')
const { updateCurrentShopProducts } = require('./shopControllers');
const APIFEATURES = require('./../utilities/apiFeatures')
const path = require('path')


exports.createProduct = async (req, res) => {
  const shop = await Shop.findById(req.body.shopId)
if(!req.user.shops.includes(shop.name)){
  res.status(401).json({
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
    deliveryFee: req.body.deliveryFee,
    location: shop.location,
    returnPolicy: req.body.returnPolicy,
    quantity: req.body.quantity,
    price: req.body.price,
    name: req.body.name,
    date: Date.now(),
    shopName: shop.name,
    shopId: req.body.shopId,
    commision: req.body.commision,
    owner: req.user.userName,
    currencySymbol: req.user.currencySymbol
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
    const product = await Product.findByIdAndUpdate(id, { 
      $set:{
        image: req.file.path,
        imageUrl: `http://localhost:8000/images/${req.file.filename}`,
      }
    }, { new: true });

    if (!product) {
      return res.status(404).json({ error: 'product not found' });
    }
    // await product.save()
    res.status(200).json({
      status: 'successfully uploaded image',
      productData: product
    })

  } catch (error) {
    return res.status(500).json(
      { 
        error: 'Internal server error', 
        message: error.message 
      });
  }
};
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
// exports.updateProduct = async (req, res) => {
//   try{
//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     })
    
//     res.status(201).json(
//       {
//     status: 'success',
//     products: product
//       }
//     )}catch(err){
//     res.status(404).json(
//       {
//         status: 'failed',
//         errorMessage: err.message
//       }
//     )
//   }
// }
exports.deleteProduct = async (req, res) => {
  try{
    const product = await Product.findByIdAndDelete(req.params.id)
    
    res.status(204).json(
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
  }
}
