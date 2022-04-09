import express from 'express'
//import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import middlewares from '../utils/middlewares.js'

const userRouter = express.Router()

userRouter.get('/', async (request, response, next) => {
  try {
    const allUsers = await User.find({}) //.populate('notes', {year:1, text:1, image:1});
    response.json(allUsers)
  } catch (err) {
    next(err)
  }
})
userRouter.get(
  '/:name',
  middlewares.tokenExtractor,
  async (request, response, next) => {
    const name = request.params.name
    try {
      const oneUser = await User.findOne({ userName: name }) //.populate('notes', {year:1, text:1, image:1});
      response.json(oneUser.content)
    } catch (err) {
      next(err)
    }
  }
)

userRouter.delete('/', async (request, response, next) => {
  try {
    const ret = await User.deleteMany()
    response.status(204).json(ret)
  } catch (error) {
    next(error)
  }
})
userRouter.delete('/:id', async (request, response, next) => {
  try {
    const ret = await User.deleteOne({ _id: request.params.id })
    response.status(204).json(ret)
  } catch (error) {
    next(error)
  }
})
export default userRouter
