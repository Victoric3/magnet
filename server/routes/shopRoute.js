const express = require('express')
const shopControllers = require('../controllers/shopControllers')
const authController = require('../controllers/authController')
const upload = require('../middlewares/uploadFile')
const router = express.Router()

router
.route('/')
.post(
    authController.protect, 
    upload.fields([
        { name: 'shopImg', maxCount: 1 },
        { name: 'shopBanner', maxCount: 1 }
      ]),
    shopControllers.createShop)
// .get(authController.protect, shopControllers.getAllProducts)

// router
// .route('/:id')
// .get(authController.protect, shopControllers.getProduct)
// .patch(authController.protect, shopControllers.updateProduct)
// .delete(
//     authController.protect, 
//     shopControllers.deleteProduct)

module.exports = router