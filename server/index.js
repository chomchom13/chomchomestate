import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
dotenv.config();

mongoose.connect(process.env.mongo_uri).then(()=>{
    console.log("Connected to Mongodb!")
}).catch((err) =>{
    console.log(err);
})

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/server/user', userRouter);
app.use('/server/auth', authRouter);
// middleware for handling errors // next means the next middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.json({
        success: false,
        statusCode, // we can also write statusCode: statusCode, here but both have same names in this example so it works
        message
    })
})

app.listen(3000, ()=>{
    console.log("Server is runnig on port 3000!")
})