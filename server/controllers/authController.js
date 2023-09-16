const User = require('../models/userSchema')
const { promisify } = require('util');
const jwt = require('jsonwebtoken')
const AppError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');
require('dotenv').config()
const secretKey = process.env.MY_SECRET_KEY;
const Email = require('../utilities/email')
const crypto = require('crypto')

if (!secretKey) {
  process.exit(1);
}


const signToken= id => {
   return jwt.sign({id: id}, secretKey, {
        expiresIn: process.env.JWT_EXPIRATION_DATE
    })
}
exports.signUp = async(req, res)=>{
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        countryName: req.body.countryName,
        state: req.body.state,
        city: req.body.city,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        addressCode: req.body.addressCode,
        phoneNumber: req.body.phoneNumber,
        currency: req.body.currency,
        currencySymbol: req.body.currencySymbol,
        Date: new Date(Date.now())
    })
    try{await newUser.save()
        const token = signToken(newUser._id)
        res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRATION_DATE * 24 * 60 * 60 * 1000),
        secure: false,
        httpOnly: true
    })
    newUser.password = undefined
    new Email(newUser, `${process.env.FRONTEND_BASEURL}/createShop`).sendWelcome()
    res.status(201).json({
        message: 'success',
        token,
        data: newUser,
    })} catch(err){
        res.status(400).json({
            status: 'failed',
            message: err.message,
        })
    }
}

exports.signIn= async(req, res) => {
    //1 if username || email & password exists
    const { identity, password } = req.body

    if(!identity && !password){
          try{throw new Error('invalid userName or password')}
          catch(e){res.status(401).json({
            status: 'fail',
            message: e.message
        })}
    return
    };
    //2 if email and password belongs to a user
    const user = await User.findOne(
        {$or: [{ email: identity }, 
            { userName: identity }]})
            .select('+password');
   

    if(!user || !await user.correctPassword(password, user.password)){
        try{throw new Error('your email or password is incorrect')}
        catch(e){res.status(401).json({
            status: 'fail',
            message: e.message
        })}
        return}
    //3 sign a jwt token for the user
    const token = signToken(user._id)
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRATION_DATE * 24 * 60 * 60 * 1000),
        secure: false,
        httpOnly: true
    })
    res.status(200).json({
        message: 'success',
        token
    })
}

///to be tested during prod
exports.protect = async(req, res, next) => {
    //1 check if the token exists
        let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
       return next(new AppError('you are not logged in', 401))
    }
    //2 verify the token belongs to a user
    jwt.verify(token, secretKey, async(err, decoded)=> {
        if(err){
            return next( new AppError(err) )
        }
        const currentUser = await User.findById(decoded.id)
    //3 check if account still exists
        if(!currentUser){
            return next(new AppError("this user no longer exists", 401))
        }
        else if(currentUser.changedPasswordAfter(decoded.iat)){
            return next(new AppError("user password was changed", 401))
        }
        
        req.user = currentUser
        next()
    
    })
        

    
}
exports.restrict = (...roles) => {
    //[guest, affiliate] from req.user.role
    //[admin] from roles array passed if not so? throw error
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
        return next(new AppError('access denied!, you are not permitted to do this'))
    }

    next()
}
}


exports.forgotPassword = catchAsync(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if(!user){
        return next(new AppError('this email address does not belong to a user'))
    }

    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    try{
        await new Email(user, resetToken).sendPasswordReset()
        res.status(200).json({
            status: 'success',
            message: 'mail successfully sent'
        })
    }catch(e){
        user.passwordResetToken = undefined
        user.passwordResetTokenExpires = undefined;
        await user.save({ validateBeforeSave: false });

    return next(
      new AppError(e.message),
      500)
}
})

exports.resetPassword = catchAsync(async(req, res, next) => {
   try{
    const hashedToken = crypto.createHash('shake256').update(req.params.token).digest('hex')
    //1  get user based on token

    const user = await User.findOne({ 
        passwordResetToken: hashedToken,
        passwordResetTokenExpires: { $gt: Date.now() }
    })
    if(!user){
        return next(new AppError('this token is invalid or has expired'))
    }
    //2 set new password if token is valid and user 
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined
    user.passwordResetTokenExpires = undefined
    await user.save()
        
    //4 sign a token for user
    const token = signToken(user._id)
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRATION_DATE * 24 * 60 * 60 * 1000),
        secure: false,
        httpOnly: true
    })
    res.status(200).json({
        message: 'success',
        token
    })
   }catch(e){
        res.status(404).json({
            status: 'failed',
            message: e.message
        })

}})