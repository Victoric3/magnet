const express = require('express')
const authController = require('../controllers/authController')
const userControllers = require('../controllers/userControllers')
const routes = express.Router()

routes.post('/signUp', authController.signUp)
routes.post('/signIn', authController.signIn)

routes
.route('/')
.get(authController.protect,userControllers.getAllUsers)
routes
.route('/:id')
.get(userControllers.getUser)
module.exports = routes