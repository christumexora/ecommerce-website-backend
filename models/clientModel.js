const mongoose = require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs')
const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name']
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'A user must have a password'],
        minength: 6,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          validator: function (el) {
                return el === this.password;                
            }
        }
    }

});

clientSchema.pre('save', async function(next){
    // ONLY RUN THIS FUNCTION IF THE PASSWORD IS MODIFIED
    if(!this.isModified('password')) return next();

    //HASH THE PASSWORD WITH COST OF 12
     this.password = await bcrypt.hash(this.password, 12);
     
     //DELETE CONFIRMPASSWORD FIELD
     this.confirmPassword = undefined;
     next();
});

clientSchema.methods.correctPassword = async function (candidatePassword, clientPassword) {
    return await bcrypt.compare(candidatePassword, clientPassword)
}

const Client = mongoose.model('Client', clientSchema)


module.exports = Client;