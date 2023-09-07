const express = require('express')
const shopControllers = require('../controllers/shopControllers')
const authController = require('../controllers/authController')
const upload = require('../uploadFile')
const router = express.Router()

router
.route('/')
.get(authController.protect, shopControllers.getShopDataForUser)
.post(
    authController.protect, shopControllers.createShop)
router
.route('/All')
.get(authController.protect, shopControllers.getAllShops)


router
.route('/:id')
.patch(authController.protect,
  upload.fields([
    { name: 'shopImg', maxCount: 1 },
    { name: 'shopBanner', maxCount: 1 },
  ]),
  shopControllers.updateShopImage)
.get(authController.protect, shopControllers.getShopById)
.delete(authController.protect, shopControllers.deleteShop)

module.exports = router