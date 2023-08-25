const mongoose = require('mongoose')
const crypto = require('crypto')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:[true, 'please tell us your name is required']
    },
    lastName: {
        type: String,
        required:[true, 'please tell us your name is required']
    },
    userName: {
        type: String,
        unique:[true, 'this username already exists'],
        required:[true, 'username is required']
    },
    email: {
        type: String,
        unique: [true, 'a user has signed up with this email already'],
        required:[true, 'an email is required'],
        Lowercase:true,
        validate: [validator.isEmail, 'please provide a valid email']
    },
    photo: String,
    
    password: {
        type: String,
        required:[true, 'please provide your password'],
        minLength: [7, 'password must not be less than 7 characters'],
        select: false
    },
    passwordConfirm: {
        type: String,
        required:[true, 'confirm your password'],
        validate: {
            validator: function(el){
                return el === this.password
            },
            message: 'your passwords are not the same'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    countryName: {
        type: String,
        required: [true, 'please tell us your country'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'please provide a phone number'],
    },
    role: {
        type: String,
        enum: ['affiliate', 'guest','influencer', 'EshopOwners', 'PshopOwners', 'admin' ],
        default: 'guest'
    } 
})
userSchema.pre('save', async function(next){
    //firstly u check if there was a password change/update or creation(!isModified(password))
    //isModified is a built in mongoose function
    if(!this.isModified('password')) return next()
    //asynchronous bcrypt hash function to encrypt the password in dataBase where 12 is the cost-how hard the encryption should be
    this.password= await bcrypt.hash(this.password, 12)
    //u ensure the passwordConfirm is not persistant in the db
    this.passwordConfirm = undefined
    next()

})
userSchema.methods.correctPassword= async (attempt, realPassword) => {
    return await bcrypt.compare(attempt, realPassword)
}
userSchema.methods.changedPasswordAfter = function(jwtTimeStamp){
    if(this.passwordChangedAt){
        const changedAtTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000, 10)
        
        return jwtTimeStamp<changedAtTimeStamp
        }
    return false
}
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex')
    //hash the reset token

    this.passwordResetToken = crypto.createHash('shake256').update(resetToken).digest('hex')
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;
    // console.log(this.passwordResetToken, resetToken);
    return resetToken
}
const User = mongoose.model('UserModel', userSchema)

module.exports = User