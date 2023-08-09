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


