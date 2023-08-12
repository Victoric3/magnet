const express = require('express')
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const mongoose = require('mongoose')
const app = express()

const magnetDb = 'mongodb://127.0.0.1/magnetdb';
mongoose.connect(magnetDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log('server successfully running'))
.catch(err => console.log(err))
const productControllers = require('./controllers/productControllers')
app.use(express.json())
//top level code above


// app.post('/api/v1/products', productControllers.createProduct)
// app.get('/api/v1/products', productControllers.getAllProducts)


const userRoute = require('./routes/userRoute')
app.use('/users', userRoute)
const ProductRoute = require('./routes/productRoute')
app.use('/api/v1/products', ProductRoute)
app.listen(3000, () => {console.log('aphaMagnet3Server is running on port 3000');})