const Client = require('../models/clientModel')

const CryptoJS = require("crypto-js");

//ROUTE HANDLERS
exports.getAllClients = async (req, res, next) => {
  try {
   
    //EXECUTE QUERY
    const Clients = await Client.find();

    // SEND RESPONSE
    res.status(201).json({
      status: 'success',
      results: Clients.length,
      message: 'We got all clients',
      data: {
        user: Clients
      }
    })

  } catch (error) {
    res.status(404).json({
      status: 'failure',
      message: error
    })
  }
  return next();
  }

exports.createCLient = async (req, res) => {
  try {
    
  if(req.body.password) {
    req.body.password = CryptoJS.AES.encrypt('backend-dev', process.env.PASS_SEC).toString()
  }
    const newClient = await Client.create(req.body)
    

    res.status(201).json({
        status: 'success',
        data: {
          user: newClient
        },
        message: 'We created new client'
      })
      } catch (error) {
        res.status(400).json({
          status: 'failed',
          message: error
        })
      }
  }

exports.getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
    //CAN ALS BE WRITTEN AS... Client.findOne({ _id: req.params.id })

    res.status(201).json({
      status: 'success',
      message: 'We got a client',
      data: {
        user: client
      }
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined'
    })
  }
  }

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    

    res.status(201).json({
      status: 'success',
      message: 'We updated a client',
      data: {
        user: client
      }
    })
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error
    })
  }
   
  }

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id)

    res.status(201).json({
      status: 'success',
      message: 'We deleted a client',
      data: {
        user: client
      }
    })
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error
    })
  }

  }
