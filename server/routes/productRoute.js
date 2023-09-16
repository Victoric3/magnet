const express = require('express')
const productControllers = require('../controllers/productControllers')
const authController = require('../controllers/authController')
const router = express.Router()
const upload = require('../uploadFile')


router
.route('/')
.get(authController.protect, productControllers.getAllProducts)
.post(authController.protect, productControllers.createProduct)

router
.route('/shop/:id')
.get(authController.protect, productControllers.getProductDataForShop)
router
.route('/:id')
.get(authController.protect, productControllers.getProduct)
.patch(authController.protect, 
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
      ]),
      productControllers.updateProduct)
.delete(
    authController.protect, 
    productControllers.deleteProduct)
router
.route('/details/:id')   
.patch(authController.protect, productControllers.updateOtherProductDetails)
module.exports = router