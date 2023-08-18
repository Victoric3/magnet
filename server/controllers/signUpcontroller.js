const UserModel = require('../models/userSchema')

module.exports.signUp = async(req, res)=>{
    const user = new UserModel(req.body)
    try{await user.save()
    res.status(201).json({
        message: 'success',
        data: user,
    })} catch(err){
        res.status(400).json({
            message: 'an error occured',
            error: err.message
        })
    }
}