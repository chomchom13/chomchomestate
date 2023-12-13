import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.mongo_uri).then(()=>{
    console.log("Connected to Mongodb!")
}).catch((err) =>{
    console.log(err);
})

const app = express();

app.listen(3000, ()=>{
    console.log("Server is runnig on port 3000!")
})