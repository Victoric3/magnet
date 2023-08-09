const Product = require('../models/productModel');


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
    const allProducts = await Product.find()
    
    res.status(201).json(
      {
    status: 'success',
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
