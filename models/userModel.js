const mongoose = require('mongoose')
// const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'A user must have a name']
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true,
        lowercase: true,
        // validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        minlength: 6
    },
    // confirmPassword: {
    //     type: String,
    //     required: [true, 'Please confirm your password'],
    //     validate: {
    //         validator: function (el) {
    //             return el === this.password;                
    //         }
    //     }
    // },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A user must have a price']
    }
 })

const User = mongoose.model('User', userSchema)


module.exports = User;
