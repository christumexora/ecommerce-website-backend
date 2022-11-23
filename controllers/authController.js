const jwt = require('jsonwebtoken');
const Client = require('./../models/clientModel')
const AppError = require('./../utilities/appError')

exports.signup = async(req, res, next) => {
    const newClient = await Client.create(
        {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }
    )

    const token = jwt.sign({ id: newClient._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newClient
        }
    });
    
    next();
};


exports.login = async (req, res, next) => {
    const { email, password } = req.body

    // CHECK IF EMAIL && PASSWORD EXISTS
    if(!email || !password) {
        return next(new AppError('Please provide a valid email or password', 400))
    }

    // CHECK IF USER EXISTS && PASSWORD EXISTS
    const client = await Client.findOne({ email }).select('+password');

    if(!client || !await client.correctPassword(password, client.password)){
        return next(new AppError('Incorrect email or password', 401))
    }



    // IF EVERYTHING OK, SEND TOKEN TO CLIENT
    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    res.status(200).json({
        status: 'success',
        token
    })

    }