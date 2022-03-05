import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import loginRouter from './controllers/loginRouter.js';
import userRouter from './controllers/signupRouter.js';
import noteRouter from './controllers/noteRouter.js';
import signupRouter from './controllers/signupRouter.js';
import middleware from './utils/middlewares.js';
import config from './utils/config.js';
import logger from './utils/logger.js';


const app = express();

mongoose
	.connect(config.MONGODB_URI)
	.then(() => logger.info("connected to database"))
	.catch((error) =>
		logger.error("error connecting to database: ", error.message)
	);
app.use(cors())
app.use(express.json());
app.use("/login", loginRouter)
app.use("/users", userRouter)
app.use("/signup", signupRouter)
app.use("/notes", noteRouter)
app.use(express.static('build'))

app.use(middleware.errorHandler);
//app.use(middleware.unknownEndpoint);

export default app