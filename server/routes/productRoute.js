const express = require('express')
const productControllers = require('../controllers/productControllers')
const authController = require('../controllers/authController')
const router = express.Router()
const upload = require('../uploadFile')


router
.route('/')
.get(authController.protect, productControllers.getAllProducts)
.post(authController.protect,
    upload.single("image"),
    productControllers.createProduct)

router
.route('/:id')
.get(authController.protect, productControllers.getProduct)
.patch(authController.protect, productControllers.updateProduct)
.delete(
    authController.protect, 
    productControllers.deleteProduct)
    
module.exports = router