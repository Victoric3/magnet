const express = require('express')
const authController = require('../controllers/authController')
const userControllers = require('../controllers/userControllers')
const routes = express.Router()

routes.post('/signUp', authController.signUp)
routes.post('/signIn', authController.signIn)

// routes.post('/forgotPassword', authController.forgotPassword)
// routes.patch('/resetPassword/:token', authController.resetPassword)

routes
.route('/')
.get(authController.protect,userControllers.getAllUsers)
routes
.route('/currentUser')
.get(authController.protect,userControllers.getCurrentUser)
.patch(authController.protect,userControllers.updateCurrentUser)
module.exports = routes