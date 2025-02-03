import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js'
import {cloudinaryConnect} from '../api/config/Cloudinary.js'
import {dbConnect} from './config/DbConnect.js';
dotenv.config();
 


//cloudinary connection 
dbConnect();
cloudinaryConnect();

const app = express();

app.use(express.json());      
app.use(cookieParser());
app.listen(3000, ()=>{
    console.log("server is runnig at 3000");
})



app.use('/api/user/', userRoutes);
app.use('/api/auth/', authRoutes);
app.use('/api/post/', postRoutes);
//middleware

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message  = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
})
