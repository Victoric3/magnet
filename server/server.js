const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet')
const AppError = require('./utilities/appError');
const globalErrorHandler = require('./controllers/errorController');
const mongoose = require('mongoose')
const app = express()
const path = require('path');

app.use('/images', express.static(path.join(__dirname,'..', 'public/images')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'confirmation.html'));
});
dotenv.config({ path: './config.env' });
const allowedOrigins = ['https://alphamagnet3.onrender.com'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions))

const magnetDb = 'mongodb://127.0.0.1/magnetdb';
mongoose.connect(magnetDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log('server successfully running'))
.catch(err => console.log(err))
app.use(express.json({ limit: '1000000kb'}))

//top level code above
// 
app.use(helmet())



//dev logging


const userRoute = require('./routes/userRoute')
app.use('/api/v1/users', userRoute)
const shopRoute = require('./routes/shopRoute')
app.use('/api/v1/shops', shopRoute)
const ProductRoute = require('./routes/productRoute')
app.use('/api/v1/products', ProductRoute)
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  
app.use(globalErrorHandler)
const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`aphaMagnet3 server is running on port ${port}`);})