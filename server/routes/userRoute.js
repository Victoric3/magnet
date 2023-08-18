const express = require('express')
const signUpcontroller = require('../controllers/signUpcontroller')
const routes = express.Router()

routes.post('/signUp', signUpcontroller.signUp)
module.exports = routes