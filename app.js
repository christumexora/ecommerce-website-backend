const express = require('express')
const app = express()
const morgan = require('morgan')

const AppError = require('./utilities/appError')
const globalErrorHandler = require('./controllers/errorController')
const userRouter = require('./routes/userRoutes')
const clientRouter = require('./routes/clientRoute')


//MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.use((req, res, next) => {
    // console.log('Hello from the middleware');
    next();
})

// app.use((req, res, next) => {
//     req.requestTime = newDate().toISOString
//     next()
// })

//ROUTES

// app.get('/api/v1/users', getAllUsers)
// app.post('/api/v1/users', createUser)
// app.get('/api/v1/users/:id', getUser)
// app.patch('/api/v1/users/:id', updateUser)
// app.delete('/api/v1/users/:id', deleteUser)

// TO CREATE AND MOUNT MULTIPLE ROUTERS

app.use('/api/v1/users', userRouter)
app.use('/api/v1/clients', clientRouter)


app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     ststus: 'fail',
    //     message: `Can't find ${req.originalUrl} on this server`
    // })
    
    // // ALTERNATIVELY
    // const error = new Error(`Can't find ${req.originalUrl} on this server`)
    // error.status = 'fail'
    // error.statusCode = 404;

    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
})

app.use(globalErrorHandler)

module.exports = app;