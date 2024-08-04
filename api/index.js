import express from 'express'
const app = express();
import mongoose from 'mongoose'
app.use(express.json());
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user-route.js'
import authRouter from './routes/auth-route.js'
import cookieParser from 'cookie-parser'
app.use(cookieParser());




const Port = process.env.PORT || 3000
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Failed to connect to MongoDB', error));





app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server Error'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    }) 

})






app.listen(Port, () => {
    console.log('server is listening on port 3000')
})

