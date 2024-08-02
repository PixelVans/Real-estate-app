import express from 'express'
import mongoose from 'mongoose'
const app = express();
import dotenv from 'dotenv';

dotenv.config();




const Port = process.env.PORT || 3000
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Failed to connect to MongoDB', error));












app.listen(Port, () => {
    console.log('server is listening on port 3000')
})

