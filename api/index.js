import express from 'express'
import mongoose from 'mongoose'
const app = express();
app.use(express.json());
import dotenv from 'dotenv';
import userRouter from './routes/user-route.js'
import authRouter from './routes/auth-route.js'
dotenv.config();




const Port = process.env.PORT || 3000
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Failed to connect to MongoDB', error));



app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)




app.listen(Port, () => {
    console.log('server is listening on port 3000')
})

