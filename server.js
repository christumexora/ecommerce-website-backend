//START SERVER
const mongoose = require('mongoose')

const dotenv = require('dotenv')

dotenv.config({path: './config.env'})

const app = require('./app')

const CryptoJS = require("crypto-js");

const DB = process.env.DATABASE.replace('PASSWORD', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
 })
 .then(() => {
    console.log('DB connection successful');
 })

// //DATABASE TEST-DATA
// const testUser = new User({
//     username: 'domII',
//     email: 'jfgmail.com',
//     password: CryptoJS.AES.encrypt('dominion', process.env.PASS_SEC).toString(),
//     rating: 3.4,
//     price: 445
// })

// testUser.save().then((con) => {
//     console.log(con)
// })
// .catch(err => {
//     console.log('ERROR:', err);
// })


// Decrypt Password
// const decryptedPwd  = CryptoJS.AES.decrypt('dominion', process.env.PASS_SEC);
// const originalText = decryptedPwd.toString(CryptoJS.enc.Utf8);

// console.log(originalText);

// console.log(process.env);
const port = 3000 || process.env.PORT 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })