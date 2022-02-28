import express from 'express';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';
import loginRouter from './routers/loginRouter.js';
import userRouter from './routers/userRouter.js';
import middleware from './utils/middlewares.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use("/login", loginRouter)
app.use("/signup", userRouter)

app.use(middleware.errorHandler);

app.use(middleware.unknownEndpoint);
const { PORT } = process.env;
app.listen(PORT, () => console.log('application is running on the port ', PORT));
