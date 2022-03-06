import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import loginRouter from './controllers/loginRouter.js';
import userRouter from './controllers/userRouter.js';
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
app.use("/api/login", loginRouter)
app.use("/api/users", userRouter)
app.use("/api/signup", signupRouter)
app.use("/api/notes", noteRouter)
app.use(express.static('build'))
const isProduction = process.env.NODE_ENV === 'production'
console.log("check", isProduction);
!isProduction &&
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);


export default app