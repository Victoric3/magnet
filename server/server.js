const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const app = express()
const magnetDb = 'mongodb://localhost/magnetdb';
mongoose.connect(magnetDb)
.then(console.log('server successfully running'))
.catch(err => console.log(err))
const Product = require('./models/productModel')
const products = JSON.parse(fs.readFileSync(`${__dirname}/../src/data/products.json`))

app.get('/api/v1/products', (req, res) => 
{ res.status(200).json({
    status: 'success',
    data: { products },
    number: products.length,
    origin: 'dummy products'
})}
)

const userRoute = require('./routes/user')
app.use('/users', userRoute)
app.listen(3000, () => {console.log('aphaMagnet3Server is running on ports 3000');})