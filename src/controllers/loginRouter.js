import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const loginRouter = express.Router()

loginRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const currentUser = await User.findOne({ userName: body.login })
    const passwordCorrect =
      currentUser === null
        ? false
        : await bcrypt.compare(body.password, currentUser.password)
    if (!(currentUser && passwordCorrect)) {
      response.status(401).json({ ERROR: 'wrong password or userName' })
    }
    const userForToken = {
      userName: currentUser.userName,
      id: currentUser._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    response.status(200).json({
      User: currentUser.name,
      Username: currentUser.userName,
      Token: token,
      id: currentUser._id,
    })
  } catch (err) {
    next(err)
  }
})

export default loginRouter
