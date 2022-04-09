import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import contentRouter from './controllers/contentRouter.js'
import loginRouter from './controllers/loginRouter.js'
import signupRouter from './controllers/signupRouter.js'
import userRouter from './controllers/userRouter.js'
import config from './utils/config.js'
import logger from './utils/logger.js'
import middleware from './utils/middlewares.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('connected to database'))
  .catch((error) =>
    logger.error('error connecting to database: ', error.message)
  )
app.use(cors())
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/signup', signupRouter)
app.use('/api/content', contentRouter)
app.use(express.static('./build'))
const isProduction = process.env.NODE_ENV === 'production'
isProduction &&
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../build', 'index.html'))
  })
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

export default app
