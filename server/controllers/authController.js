const User = require('../models/userSchema')
const { promisify } = require('util');
const jwt = require('jsonwebtoken')
const AppError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');
const { TrySharp } = require('@mui/icons-material');

const signToken= id => {
   return jwt.sign({id: id}, process.env.MY_JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_DATE
    })
}
module.exports.signUp = async(req, res)=>{
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })
    try{await newUser.save()
        const token = signToken(newUser._id)
    res.status(201).json({
        message: 'success',
        token,
        data: newUser,
    })} catch(err){
        res.status(400).json({
            message: 'an error occured',
            error: err.message
        })
    }
}

module.exports.signIn= async(req, res) => {
    //1 if email & password exists
    const { email, password} = req.body
    if(!email && !password){
          try{throw new Error('invalid email or password')}
          catch(e){res.status(401).json({
            status: 'fail',
            message: e.message
        })}
    return
    };
    //2 if email and password belongs to a user
    const user = await User.findOne({ email }).select('+password');

    if(!user || !await user.correctPassword(password, user.password)){
        try{throw new Error('your email or password is incorrect')}
        catch(e){res.status(401).json({
            status: 'fail',
            message: e.message
        })}
        return}
    //3 sign a jwt token for the user
    res.status(200).json({
        message: 'success',
        token: signToken(user._id)
    })
}

module.exports.protect = async(req, res, next) => {
    //1 check if the token exists
        let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
       return next(new AppError('you are not logged in', 401))
    }
    //2 verify the token belongs to a user
    const decodeJwt = await promisify(jwt.verify)(token, process.env.MY_JWT_SECRET)
        
    //3 check if the user acct still exists
    // const existingUser = await User.findById(decodeJwt.id)
    // if(!existingUser){
    //     try{throw new Error("this user no longer exists")}
    //     catch(e){res.status(401).json({
    //         status: 'fail',
    //         message: e.message
    //     })}
    //     return
    // }

    //4 confirm the user hasnt changed its password
    //iat and passwordChangedAt if iat < passwordChangedAt
    // if(existingUser.changedPasswordAfter(decodeJwt.Iat)){
    //     try{throw new Error("user password was changed")}
    //     catch(e){res.status(401).json({
    //         status: 'fail',
    //         message: e.message
    //     })}
    //     return
    // }

    // req.user = existingUser;
    next()
}