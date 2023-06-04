require('dotenv').config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000
const authRouter = require('./router/auth-router')
const userRouter = require('./router/user-router')
const scheduleRouter = require('./router/schedule-router')
const clientsRouter = require('./router/clients-router')
const errorMiddleware = require("./middlewares/error-middleware")
const initService = require("./service/init-service")

const init = async () => {
    await initService.Init()
}
init()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', scheduleRouter)
app.use('/api', clientsRouter)
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => {
            console.log(`Server started:http://localhost:${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}
start()