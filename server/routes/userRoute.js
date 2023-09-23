const express = require('express')
const authController = require('../controllers/authController')
const userControllers = require('../controllers/userControllers')
const routes = express.Router()
const upload = require('../uploadFile')

routes.post('/signUp', authController.signUp)
routes.post('/signIn', authController.signIn)
routes.post('/forgotPassword', authController.forgotPassword)
routes.patch('/resetPassword/:token', authController.resetPassword)
routes.patch('/updatePassword', authController.protect, authController.updatePassword)

routes
.route('/')
.get(authController.protect,userControllers.getAllUsers)
routes
.route('/currentUser')
.get(authController.protect,userControllers.getCurrentUser)
.patch(authController.protect, userControllers.updateCurrentUser)
routes
.route('/currentUser/image')
.patch(authController.protect, upload.single('image'), userControllers.updateUserImage)
module.exports = routes