const express = require('express')
const clientController = require('./../controllers/clientController')
const authController = require('./../controllers/authController')
const router = express.Router()

//Param Middleware
router.param('id', (req, res, next, val) => {
    console.log(`Client id is: ${val}`);
    next();
})

//ROUTERS
router.post('/signup', authController.signup)
router.post('/login', authController.login)


router
.route('/')
.get(clientController.getAllClients)
.post(clientController.createCLient)

router
.route('/:id')
.get(clientController.getClient)
.patch(clientController.updateClient)
.delete(clientController.deleteClient)

module.exports = router;