import express from 'express';
import dotenv from 'dotenv';
 import cors from 'cors';
import loginRouter from './controllers/loginRouter.js';
import userRouter from './controllers/userRouter.js';
import noteRouter from './controllers/noteRouter.js';
import middleware from './utils/middlewares.js';

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
app.use("/login", loginRouter)
app.use("/signup", userRouter)
app.use("/note", noteRouter)

app.use(middleware.errorHandler);

app.use(middleware.unknownEndpoint);
const { PORT } = process.env;
app.listen(PORT, () => console.log('application is running on the port ', PORT));
