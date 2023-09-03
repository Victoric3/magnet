const nodemailer = require('nodemailer')
require('dotenv').config()
const user = process.env.EMAIL_USERNAME
const password =process.env.EMAIL_PASSWORD


//not yet working
const sendEmail = async options => {
    //define transporter
    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 587,
        auth: {
            auth: 'PLAIN',
            user: 'e70b8baf7cb678',
            pass: '1f8adac4b2b33a'
        },
    })
    
    
    //create the email
    const mailOptions = {
        from: 'victor chukwujiobi <chukwujiobi@victor.io>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    }
    
    //send the email
     await transporter.sendMail(mailOptions)
            
}
module.exports = sendEmail