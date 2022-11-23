// const mongoose = require('mongoose')

// const dotenv = require('dotenv')

// dotenv.config({path: './config.env'})

// const User = require('/../models/userModel')
// const CryptoJS = require("crypto-js");

// const DB = process.env.DATABASE.replace('PASSWORD', process.env.DATABASE_PASSWORD)

// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//  })
//  .then(() => {
//     console.log('DB connection successful');
//  })

//  // READ THE JSON FILE TO BE IMPORTED
//  const users = JSON.parse(fs.readFileSync(`${__dirname}/name of the json file`, 'utf-8'));

//  // IMPORT THE DATA INTO DB
//  const importData = async() => {
//     try {
//         await User.create(users)
//     } catch (error) {
//         console.log(error);
//     }
//      process.exit();
//  }

//  //  DELETE ALL DATA FROM THE DB
//  const deleteData = async() => {
//     try {
//         await User.deleteMany(users)
//         console.log('Data deleted successfully');
//     } catch (error) {
//         console.log(error);
//     }
//      process.exit();
//  }

//  if (process.argv[2] === '--import') {
//     importData();
//  } else if (process.argv[2] === '--delete') {
//     deleteData();
//  }

//  console.log(process.argv);