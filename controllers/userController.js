const User = require('../models/userModel')

const CryptoJS = require("crypto-js");
const { query } = require('express');

//ROUTE HANDLERS
exports.getAllUsers = async (req, res) => {
  try {

    // //BUILD QUERY
    // const queryObj = { ...req.query };
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach(el => delete queryObj[el])

    // // ADVANCED FILTERING
    // let queryStr = JSON.stringify(queryObj)
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    // console.log(JSON.parse(queryStr));

    // const query = Users.find(queryObj)
   
    //EXECUTE QUERY
    const Users = await User.find();

    // SEND RESPONSE
    res.status(201).json({
      status: 'success',
      results: Users.length,
      message: 'We got all users',
      data: {
        user: Users
      }
    })

  } catch (error) {
    res.status(404).json({
      status: 'failure',
      message: error
    })
  }
  }

exports.createUser = async (req, res) => {
  try {
    
  if(req.body.password) {
    req.body.password = CryptoJS.AES.encrypt('backend-dev', process.env.PASS_SEC).toString()
  }
    const newUser = await User.create(req.body)
    

    res.status(201).json({
        status: 'success',
        data: {
          user: newUser
        },
        message: 'We created new user'
      })
      } catch (error) {
        res.status(400).json({
          status: 'failed',
          message: error
        })
      }
  }

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    //CAN ALS BE WRITTEN AS... User.findOne({ _id: req.params.id })

    res.status(201).json({
      status: 'success',
      message: 'We got a user',
      data: {
        user: user
      }
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined'
    })
  }
  }

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    

    res.status(201).json({
      status: 'success',
      message: 'We updated a user',
      data: {
        user: user
      }
    })
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error
    })
  }
   
  }

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    res.status(201).json({
      status: 'success',
      message: 'We deleted a user',
      data: {
        user: user
      }
    })
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error
    })
  }

  }
