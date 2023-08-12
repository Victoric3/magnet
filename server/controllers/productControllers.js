const Product = require('../models/productModel');
const APIFEATURES = require('./../utilities/apiFeatures')

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try{
  await product.save()
  res.status(201).json({
      status: 'success',
      product: product
  })
} catch(err){
  res.status(400).json({
      erorrMessage: err.message
  })
}
//    try{
//     const newProduct = await Product.create(req.body);
//     res.status(201).json(
//         {
//             status : 'success',
//             data : {
//                 product: newProduct
//             }
//         })

//    } catch(err) {
//     res.status(400).json(
//      {
//          status: 'failed',
//          Message: err
//      }
//     )
// }


// }
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
