const express = require('express')
const shopControllers = require('../controllers/shopControllers')
const authController = require('../controllers/authController')
const upload = require('../uploadFile')
const router = express.Router()

router
.route('/')
.get(authController.protect, shopControllers.getShopDataForUser)
.post(
    authController.protect, 
    upload.fields([
        { name: 'shopImg', maxCount: 1 },
        { name: 'shopBanner', maxCount: 1 }
      ]),
    shopControllers.createShop)
router
.route('/All')
.get(authController.protect, shopControllers.getAllShops)

// .get(authController.protect, shopControllers.getAllProducts)

router
.route('/:id')
.get(authController.protect, shopControllers.getShopById)
// .get(authController.protect, shopControllers.getProduct)
// .patch(authController.protect, shopControllers.updateProduct)
// .delete(
//     authController.protect, 
//     shopControllers.deleteProduct)

module.exports = router