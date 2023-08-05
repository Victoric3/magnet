const express = require('express')
const route = express.Router()

route.get('/dashboard', (req, res) => {
    res.send('userDashboard')
})
route.get('/info', (req, res) => {
    res.send('userInfo')
})
route.get('/favourites', (req, res) => {
    res.send('userFavourites')
})
module.exports = route