const Product = require('../models/productSchema');
const { updateCurrentShopProducts } = require('./shopControllers');
const APIFEATURES = require('./../utilities/apiFeatures')

exports.createProduct = async (req, res) => {
  const imagefile = req.file
  const imageUrl = `http://localhost:8000/images/${imagefile.filename}`

  const product = new Product({productType: req.body.productType,
    productOverview: req.body.productOverview,
    discount: req.body.discount,
    currency: req.user.currency,
    image: imagefile.filename,
    imageUrl: imageUrl,
    email: req.body.email,
    category: req.body.category,
    deliveryFee: req.body.deliveryFee,
    location: req.body.location,
    returnPolicy: req.body.returnPolicy,
    quantity: req.body.quantity,
    price: req.body.price,
    name: req.body.name,
    date: Date.now(),
    shopName: req.body.shopName,
    shopId: req.body.shopId,
    commision: req.body.commision,
    owner: req.user.userName,
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
    products: product
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
exports.updateProduct = async (req, res) => {
  try{
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    
    res.status(201).json(
      {
    status: 'success',
    products: product
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
