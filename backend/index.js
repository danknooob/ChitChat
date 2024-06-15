import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import msgRouter from './routes/messages.route.js'
import userRouter from './routes/user.route.js'
import { app, server } from './socket/socket.js'
import path from "path";
import connectToMongoDB from './db/connectToMongoDB.js';

dotenv.config();

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRouter);
app.use('/api/messages', msgRouter);
app.use('/api/user', userRouter);

server.listen((8000), () => {
    connectToMongoDB();
    console.log("Server is running on port 8000!");
})