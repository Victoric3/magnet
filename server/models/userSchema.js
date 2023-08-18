const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {
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
        minLength: [7, 'password must not be less than 7 characters']
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
const UserModel = mongoose.model('UserModel', userSchema)

module.exports = UserModel