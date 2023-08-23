const User = require('../models/userSchema')
const { promisify } = require('util');
const jwt = require('jsonwebtoken')
const AppError = require('../utilities/appError');
const catchAsync = require('../utilities/catchAsync');
require('dotenv').config()
const secretKey = process.env.MY_SECRET_KEY;
const sendEmail = require('../utilities/email')

if (!secretKey) {
//   console.error('Secret key is missing in environment variables.');
  process.exit(1); // Exit the application
}

// Now you can use 'secretKey' in your application logic
// console.log('Secret key:', secretKey);


const signToken= id => {
   return jwt.sign({id: id}, secretKey, {
        expiresIn: process.env.JWT_EXPIRATION_DATE
    })
}
exports.signUp = async(req, res)=>{
    const newUser = new User({
        name: req.body.name,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        countryName: req.body.countryName,
        phoneNumber: req.body.phoneNumber,
    })
    try{await newUser.save()
        const token = signToken(newUser._id)
        res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRATION_DATE * 24 * 60 * 60 * 1000),
        secure: false,
        httpOnly: true
    })
    newUser.password = undefined
    res.status(201).json({
        message: 'success',
        token,
        data: newUser,
    })} catch(err){
        res.status(400).json({
            status: 'failed',
            message: err.message
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
        if(!currentUser){
            return next(new AppError("this user no longer exists", 401))
        }
        else if(currentUser.changedPasswordAfter(decoded.iat)){
            return next(new AppError("user password was changed", 401))
        }
        
        req.user = currentUser
        console.log(req.user);
        next()
    
        //initial function wasnt woorking for some reason
        // User.findById(decoded.id, (err, user) => {
        //     if(err){
        //         return next(new AppError(err))
        //     }
        //     else if(!user){
        //         return next(new AppError("this user no longer exists", 401))
        //     }
        //     else if(user.changedPasswordAfter(decoded.iat)){
        //         return next(new AppError("user password was changed", 401))
        //     }
        //     else if(user){
        //         return req.user = user
        //         next()
        //     }

        // })
        //3 check if the user acct still exists
        // if(decoded){
        //      const currentUser = User.findById(decoded.id)
        //      req.user = currentUser;
        //      next()
        // }
        // else if(!currentUser){
        //     return next(new AppError("this user no longer exists", 401))
        // }
         
        //4 confirm the user hasnt changed its password
        //iat and passwordChangedAt if iat < passwordChangedAt
        // currentUser.changedPasswordAfter(decoded.iat)
        // if(currentUser.changedPasswordAfter(decoded.iat)){
        //     console.log(currentUser.passwordChangedAt, decoded.iat)
            // return next(new AppError("user password was changed", 401))
        // }
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




///not yet working
exports.forgotPassword = catchAsync(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if(!user){
        console.log(req.body.email);
        return next(new AppError('this email address does not belong to a user'))
    }

    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })
    //send mail
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`
    const message = `forgot your password? follow this link to reset it now!! ${resetUrl}, link expires in 10mins.\n if you didn't request this email please ignore this message` 
//    console.log(resetUrl, message);
   
    try{
        await sendEmail({
            email: user.email,
            subject: 'password reset email from alphamagnet🧲',
            message: message
        })
        res.status(200).json({
            status: 'success',
            message: 'mail successfully sent'
        })
    }catch(e){
        user.passwordResetToken = undefined
        user.passwordResetTokenExpires = undefined;
        await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500)
}
})

exports.resetPassword = async(req, res, next) => {
   try{
    ///
   }catch(e){
        res.status(404).json({
            status: 'failed',
            message: e.message
        })

}}