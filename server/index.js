import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config();

mongoose.connect(process.env.mongo_uri).then(()=>{
    console.log("Connected to Mongodb!")
}).catch((err) =>{
    console.log(err);
})

const app = express();
app.use(express.json());

app.use('/server/user', userRouter);
app.use('/server/auth', authRouter);

app.listen(3000, ()=>{
    console.log("Server is runnig on port 3000!")
})